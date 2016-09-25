$(function(){
	var $aud = $('#auto');
	$('i#pre')[0].addEventListener('click',function(){
		Player.prevSong();
	});
	$('i#next')[0].addEventListener('click',function(){
		Player.nextSong();
	});
	$('#control')[0].addEventListener('click',function(){
		 Player.clicks();
	});
	$('i#random')[0].addEventListener('click',function(){
		 Player.randomSong();
	});
	
	$('ul.muslist').on('click','span#musicname',function(){
		var name = $(this).text();
		$(this).click(function(){
			Player.clickSong(name);
		})
	})
	
	var Player = {
		isPlay:true,
		timer:'',
		/**
		 * 播放、暂停
		 */
		clicks:function(){
			if(this.isPlay){
				$aud[0].play();
				$('#control').html('&#xe606;');
				this.dragMove(); //滚动条开始滑动
				this.isPlay = false;
				return;
			}
			$aud[0].pause();
			$('#control').html('&#xe612;');
			this.isPlay = true;
			
		},
		/**
		 * 进度条
		 */
		dragMove:function(){
			clearInterval(this.timer);
			this.timer = setInterval(function(){
				var widthLine = Math.round($aud[0].currentTime)/Math.round($aud[0].duration)*265;
				$('input[type=range]').val = widthLine;
			})
		},
		
		/**
		 * 前一首歌曲
		 */
		prevSong:function(){
			var songName = $('#songName').html();
			var newSong,newSrc;
			console.log(songName)
			$.ajax({
				type:"get",
				url:"/music/pbl.json",
				success:function(data){
	//				得到当前歌曲的索引
					var index;
					$.each(data,function(i,value){
						if(value.name == songName){
							index = i;
							console.log('index----'+index);
							return false;
						}
					});
					
					if(index > 0){
						newSong = data[index-1].name;
						newSrc = data[index-1].src;
//						console.log(mewSrc)
//			console.log(newSong+'--'+newSrc)
			$('h2[id=songName]').html(newSong);
			$aud.attr('src','music/'+newSrc);
			$aud[0].play();
			this.isPlay = false;
					}
				}
			});
		},
		
		/**
		 * 下一首歌
		 */
		nextSong:function(){
			console.log('start')
			var songName = $('#songName').html();
			
			var newSong,newSrc;
					var index;
			$.ajax({
				type:"get",
				url:"/music/pbl.json",
				success:function(data){
//					console.log(data)
	//				得到当前歌曲的索引
					$.each(data,function(i,value){
						console.log(value)
						if(value.name == songName){
							index = i;
							return false;
						}
					});
					if(index < data.length-1){
						newSong = data[index+1].name;
						newSrc = data[index+1].src;
						
			$('h2[id=songName]').html(newSong);
			$aud.attr('src','music/'+newSrc);
			$aud[0].play();
			this.isPlay = false;
					}
				}
			});
		},
		
		/**
		 * 随机播放
		 */
		randomSong:function(){
			var songName = $aud.html();
			var newSong,newSrc;
			var index = Math.floor(Math.random()*5);
			$.ajax({
				type:"get",
				url:"/music/pbl.json",
				success:function(data){
					newSong = data[index].name;
					newSrc = data[index].src;
					
			$('h2[id=songName]').html(newSong);
			$aud.attr('src','music/'+newSrc);
			$aud[0].play();
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
						
			$('h2[id=songName]').html(name);
			$aud.attr('src','music/'+newSrc);
			$aud[0].play();
			this.isPlay = false;
					});
				}
			});
		}
	
	}	
	
})

















