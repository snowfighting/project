$(function(){
	var $aud = $('#auto');
	$('i#pre')[0].addEventListener('click',function(){
		Player.prevSong();
		$('div.musrotate').addClass('active');
		$('#tiao').removeClass('tactive');
		Player.dragTimer();
	});
	$('i#next')[0].addEventListener('click',function(){
		Player.nextSong();
		$('div.musrotate').addClass('active');
		$('#tiao').removeClass('tactive');
		Player.dragTimer();
	});
	$('#control')[0].addEventListener('click',function(){
		 Player.clicks();
	});
	$('i#random')[0].addEventListener('click',function(){
		 Player.randomSong();
	});
	
	$('i#refresh')[0].addEventListener('click',function(){
		 Player.refresh();
	});
	
	$('input[type=range]').change(function(e){
		change();
	})
	$('ul.muslist').on('mouseenter','li',function(){
		var name = $(this).children().eq(0).text();
		$(this).click(function(){
			Player.clickSong(name);
		})
	});
	
	
	function change(){
		var w = $('input[type=range]').val();
		console.log(w);
		var totalTime = parseInt($aud[0].duration);
		var nowTime = parseInt(w/265*totalTime);
		$aud[0].currentTime=nowTime;
		console.log(nowTime+'--'+$aud[0].currentTime)
	}
	
	
	
	
	/**
	 * 音量控制
	 */
	var count = 0;
	$('i.yin').on(
		'click',function(){
			if(count%2 == 0){
				$('#volume').css('display','block');
			}else{
				$('#volume').css('display','none');
			}
			count++;
		}
	)
	$('#volume').click(function(e){
		e = e || window.event;
		var h =93 - e.offsetY;
		$('i.col').height(h);
		$aud.volume = h/100;
		
//		console.log(e.offsetY+'--'+h)
	})
	
	var Player = {
		isPlay:true,
		timer:'',
		timerP:'',
		timerN:'',
		/**
		 * 播放、暂停
		 */
		clicks:function(){
			change();
			if(this.isPlay){
				$aud[0].play();
				$('#control').html('&#xe606;');
				this.isPlay = false;
				this.dragTimer();
				$('div.musrotate').addClass('active');
				$('#tiao').removeClass('tactive');
				return;
			}
			$aud[0].pause();
			$('#control').html('&#xe612;');
			this.isPlay = true;
			$('div.musrotate').removeClass('active');
			$('#tiao').addClass('tactive');
		},
		
		/**
		 * 刷新
		 */
		refresh:function(){
			$aud[0].currentTime = 0;
			$('#currentTime').html('00:00');
			$('input[type=range]').val('0');
		},
		
		/**
		 * 进度条
		 */
		dragTimer:function(){
			var totalTime = parseInt($aud[0].duration);
			$aud[0].addEventListener('timeupdate',function(){
				var current =parseInt($aud[0].currentTime);
				var strCurrent = '';
				var strDuration = '';
				var mini = parseInt(current/60); 
				if(mini==0){
					strCurrent = '00:'+(current%60<10?('0'+current%60):(current%60));
				}else{
					strCurrent = String(mini<10?('0'+mini):mini)+':'+(current%60<10?('0'+current%60):(current%60));
				}
				
				$('#currentTime').html(strCurrent);
				
				var widthline = parseInt(current/totalTime*265);
				$('input[type=range]').val(widthline);
				
//				音乐播放完时,重置属性
				if(current == totalTime){
					$('#control').html('&#xe612;');
					this.isPlay = true;
					$('div.musrotate').removeClass('active');
					$('#tiao').addClass('tactive');
				}
			});
			
			var tmini = parseInt(totalTime/60);
			if(tmini==0){
				strDuration = '00:'+(totalTime%60<10?('0'+totalTime%60):(totalTime%60));
			}else{
				strDuration = String(tmini<10?('0'+tmini):tmini)+':'+(totalTime%60<10?('0'+totalTime%60):(totalTime%60));
			}
			$("#totalTime").html('/'+strDuration);
		},
		
		/**
		 * 手动控制播放进度
		 * @param {Object} w 进度条的值
		 */
		/*autoControl:function(w){
			var totalTime = parseInt($aud[0].duration);
			var nowTime = parseFloat(w/265*totalTime);
			
			return nowTime;
//			console.log($aud[0].currentTime+'---'+parseInt(w/265*totalTime));
		},*/
		
		/**
		 * 前一首歌曲
		 */
		prevSong:function(){
			this.getSongInfo(true);
			
		},
		
		/**
		 * 下一首歌
		 */
		nextSong:function(){
			this.getSongInfo();
		},
		
		/**
		 * 随机播放
		 */
		randomSong:function(){
			 this.getSongInfo();
		},
		
		/**
		 * 获取歌曲信息
		 * 有参数表示播放前一首或后一首
		 * 没有参数表示随机播放
		 * @param {Object} isPre 是否是播放前一首歌
		 */
		getSongInfo:function(isPre){
			var songName = $('#songName').html();
			var newSong='';
			var newSrc='';
			var index,n;
			if(arguments.length==0){
				n = Math.floor(Math.random()*5);
			}
			$.ajax({
				type:"get",
				url:"/music/pbl.json",
				success:function(data){
					if(arguments.length==0){
						newSong = data[n].name;
						newSrc = data[n].src;
					}else{
		//				得到当前歌曲的索引
						$.each(data,function(i,value){
							if(value.name == songName){
								index = i;
								return false;
							}
						});
						
						if(isPre){
							clearTimeout(this.timerP);
							if(index > 0){
								newSong = data[index-1].name;
								newSrc = data[--index].src;
							}else{
								$('h2[id=songName]').html('前面已经没有歌曲了亲~^_^');
								$('h2[id=songName]').addClass('txt');
								this.timerP = setTimeout(function(){
									$('h2[id=songName]').html(songName);
									$('h2[id=songName]').removeClass('txt');
								},2000)
								return;
							}
						}else{
							clearTimeout(this.timerN);
							if(index < data.length-1){
								newSong = data[index+1].name;
								newSrc = data[++index].src;
							}else{
								$('h2[id=songName]').html('当前是最后一首歌了哦^_^');
								$('h2[id=songName]').addClass('txt');
								this.timerN = setTimeout(function(){
									$('h2[id=songName]').html(songName);
									$('h2[id=songName]').removeClass('txt');
								},2000)
								return;
							}
						}
					}
					
					$('h2[id=songName]').html(newSong);
					$aud.attr('src','music/'+newSrc);
					$aud[0].play();
					$('#control').html('&#xe606;');
					this.isPlay = false;
				}
			});
		},
			
	
		
		/**
		 * 点击歌曲播放
		 * @param {Object} name 歌曲名
		 */
		clickSong:function(name){
			var newSrc = '';
			$.ajax({
				type:'get',
				url:'/music/pbl.json',
				success:function(data){
					$.each(data, function(index,value) {
						if(value.name == name){
							newSrc = value.src;
							return false;
						}
						
					});
					
					$('h2[id=songName]').html(name);
					$aud.attr('src','music/'+newSrc);
					$aud[0].play();
					$('#control').html('&#xe606;');
					$('div.musrotate').addClass('active');
					$('#tiao').removeClass('tactive');
					this.isPlay = false;
				}
			});
		},
		
	
	}	
	
})

















