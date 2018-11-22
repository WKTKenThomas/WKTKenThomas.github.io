var answer = {
	oselect:document.getElementsByClassName('select'),
	cjBtn:document.getElementById('cjBtn'),
	userAnswer:'',
	init:function(){
		this.myScroll = new IScroll("#answer", {
			mouseWheel: true, //鼠标可拖拽
			scrollbars: true, //滚动条
			fadeScrollbars: true, //滚动条淡入淡出
			click: true, //允许点击事件，默认为false
			tap: true //移动端点击事件，默认为false
		})
		//this.next(0,1,'A.气质居家的高颜值暖男','B.穿着考究的精致派绅士')
		this.oselectclick(0,'A.气质居家的高颜值暖男')
		this.oselectclick(1,'B.穿着考究的精致派绅士')
        var that = this;
		this.saveBtn.onclick = function () {
            var answer = that.userAnswer;
            if(answer.length != 4){
                layer.open({content: '请您完成答题',btn: '关闭'});
            	return false;
			}
            $.ajax({
                type: "post",
                data:{answer:answer},
                url: 'index.php?m=default&c=activity181111&a=saveAnswer',
                dataType: "json",
                success: function (res) {
                    if(res.result == true){
                    	window.location = 'index.php?m=default&c=activity181111&a=draw';
                    }else{
                        layer.open({content: res.message,btn: '关闭'});
                        return false;
                    }
                }
            });
        }
	},
	geleid:function(str){
		return document.getElementById(str);
	},
	huida:function(str){
		return `<li><img src="img/touxiang_02.png" class="imgright"><span class="spanright">${str}</span></li>`
	},
	oselectclick:function(num,str){
		var that = this;
		this.oselect[num].onclick = function(){
			this.setAttribute("class", "select beselect")
			this.childNodes[1].setAttribute("class", "iselect beiselect")
			that.userAnswer += str.substr(0,1);
			that.geleid('content').innerHTML+=that.huida(str);
			that.orefresh();
			setTimeout(function(){
				that.geleid('content').innerHTML+=that.biaoti(2,'看下列视频，你内心OS是：');
				that.orefresh();
				setTimeout(function(){
					that.geleid('content').innerHTML+=that.wenti2();
					that.geleid('videoimg').onclick = function(){
						this.style.display = 'none';
						that.geleid('video').play();
					}
					that.orefresh();
					that.oselectclick1(2,'A.生而为赢，逆风翻盘')
					that.oselectclick1(3,'B.人生如旅，一路风景')
				},500)
			},500)
		}
	},
	oselectclick1:function(num,str){
		var that = this;
		this.oselect[num].onclick = function(){
			this.setAttribute("class", "select beselect")
			this.childNodes[1].setAttribute("class", "iselect beiselect")
			that.userAnswer += str.substr(0,1);
			that.geleid('content').innerHTML+=that.huida(str);
			that.orefresh();
			setTimeout(function(){
				that.geleid('content').innerHTML+=that.biaoti(3,'听下面一段音乐，你此时想象自己正：');
				that.orefresh();
				setTimeout(function(){
					that.geleid('content').innerHTML+=that.wenti3();
					that.audioplay();
					that.orefresh();
					that.oselectclick2(4,'A.仰卧车中，仰望星空')
					that.oselectclick2(5,'B.静音驾启，静享愉悦')
				},500)
			},500)
		}
	},
	oselectclick2:function(num,str){
		var that = this;
		this.oselect[num].onclick = function(){
			this.setAttribute("class", "select beselect")
			this.childNodes[1].setAttribute("class", "iselect beiselect")
			that.userAnswer += str.substr(0,1);
			that.geleid('content').innerHTML+=that.huida(str);
			that.orefresh();
			setTimeout(function(){
				that.geleid('content').innerHTML+=that.biaoti(4,'想象一辆Mazda CX-8急驰而过， 你预计前方是');
				that.orefresh();
				setTimeout(function(){
					that.geleid('content').innerHTML+=that.wenti4();
					that.audioplay();
					that.orefresh();
					that.oselectclick3(6,'A.井然有序的十字路口')
					that.oselectclick3(7,'B.空旷无人的辽阔草原')
				},500)
			},500)
		}
	},
	oselectclick3:function(num,str){
		var that = this;
		this.oselect[num].onclick = function(){
			this.setAttribute("class", "select beselect")
			this.childNodes[1].setAttribute("class", "iselect beiselect")
			that.userAnswer += str.substr(0,1);
			that.geleid('content').innerHTML+=that.huida(str);
			that.orefresh();
			setTimeout(function(){
				that.geleid('content').innerHTML+=that.baogao();
				that.orefresh();
				setTimeout(function(){
					that.geleid('content').innerHTML+=that.baogaodna(that.changeDNA());
					that.orefresh();
					that.cjBtn.style.display = 'block';
				},2000)
			},500)
		}
	},
	// next:function(num1,num2,str1,str2){
	// 	this.oselectclick(num1,str1)
	// 	this.oselectclick(num2,str2)
	// },
	// 	that.geleid('content').innerHTML+=fn;
	// 	that.userAnswer += str.substr(0,1);
	// 	if(num == 0||num == 1){
	// 		that.next(2,3,'A.生而为赢，逆风翻盘','B.人生如旅，一路风景',that.wenti3());
	// 	}else if(num == 2||num == 3){
	// 		that.next(4,5,'A.仰卧车中，仰望星空','B.静音驾启，静享愉悦',that.wenti4());
	// 		that.audioplay();
	// 	}else if(num == 4||num == 5){
	// 		that.next(6,7,'A.井然有序的十字路口','B.空旷无人的辽阔草原','');
	// 		that.audioplay();
	// 	}else if(num == 6||num == 7){
	// 		that.geleid('content').innerHTML+=that.baogao();
	// 		setTimeout(function(){
	// 			that.geleid('content').innerHTML+=that.baogaodna(that.changeDNA());
	// 			that.myScroll.refresh();
	// 			that.myScroll.scrollTo(0,that.myScroll.maxScrollY,800);
	// 			that.cjBtn.style.display = 'block';
	// 		},1500)
	// 		console.log(that.userAnswer)
	// 	}
	orefresh:function(){
		this.myScroll.refresh();
		this.myScroll.scrollTo(0,this.myScroll.maxScrollY,800);
	},
	biaoti:function(num,str){
		return `<li class="nomargin"><span class="title">第${num}题/共4题</span><img style="opacity: 0;"></li>
		<li><img src="img/touxiang_01.png"><span>${str}</span></li>`
	},
	wenti2:function(){//看下列视频，你内心OS是：
		return `<li><img src="img/touxiang_01.png"><span><img id="videoimg" src="img/video.png" style="z-index: 999999;height:auto;position: absolute;width: 56.8vw;"><video id="video" controls="controls" src="media/b.mp4"></video></span></li>
		<li><img style="opacity: 0;"><span><div class="select">A.生而为赢，逆风翻盘<div class="iselect"></div></div><div class="select">B.人生如旅，一路风景<div class="iselect"></div></div></span></li>`
	},
	wenti3:function(){//听下面一段音乐，你此时想象自己正：
		return `<li><img src="img/touxiang_01.png"><span><img id="conaudio" src="${img._audio}" style="height: 32.13vw;"></span></li>
		<li><img style="opacity: 0;"><span><div class="select">A.仰卧车中，仰望星空<div class="iselect"></div></div><div class="select">B.静音驾启，静享愉悦<div class="iselect"></div></div></span></li>`
	},
	wenti4:function(){//想象一辆Mazda CX-8急驰而过， 你预计前方是
		return `<li><img src="img/touxiang_01.png"><span><img src="img/answer_04.png"></span></li>
		<li><img style="opacity: 0;"><span><div class="select">A.井然有序的十字路口<div class="iselect"></div></div><div class="select">B.空旷无人的辽阔草原<div class="iselect"></div></div></span></li>`
	},
	baogao:function(){
		return `<li><img src="img/touxiang_01.png"><span>你的最强DNA报告正在出炉！</span></li>`
	},
	baogaodna:function(str){
		return `<li><img src="img/touxiang_01.png"><span><a href="haibao.html?dna=${str}"><img src="img/chathb_${str}.png" style="height: 57.2vw;"></a></span></li>
		<li><img src="img/touxiang_01.png"><span>点击图片长按保存，最强DNA秀 到朋友圈！</span></li>
		<li><img style="opacity: 0;"></li>`
	},
	changeDNA:function(){
		if(this.userAnswer == 'ABAA'||this.userAnswer == 'ABAB'||this.userAnswer == 'ABBA'||this.userAnswer == 'ABBB'){
            return 'ss';
        }else if(this.userAnswer == 'AAAA'||this.userAnswer == 'AAAB'||this.userAnswer == 'AABA'||this.userAnswer == 'AABB'){
            return 'jyl';
        }else if(this.userAnswer == 'BAAB'||this.userAnswer == 'BAAA'||this.userAnswer == 'BABB'||this.userAnswer == 'BABA'){
            return 'yy';
        }else if(this.userAnswer == 'BBAA'||this.userAnswer == 'BBAB'||this.userAnswer == 'BBBA'||this.userAnswer == 'BBBB'){
            return 'axg';
		}
	},
	audioplay:function(){
		this.oaudio = this.geleid('audio');
		var that = this;
		this.geleid('conaudio').onclick = function(){
			if(that.oaudio.paused){ 
	            that.oaudio.play();// 播放 
	        }else{
	            that.oaudio.pause();// 暂停
	        }
		};
	}
}
answer.init();