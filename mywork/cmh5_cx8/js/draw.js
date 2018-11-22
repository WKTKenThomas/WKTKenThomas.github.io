var draw = {
	jiangpin:document.getElementsByClassName("jiangpin")[0],
	cjBtn:document.getElementsByClassName("cjbtn")[0],
	hdjsBtn:document.getElementsByClassName('hdjsBtn')[0],
	alert:document.getElementsByClassName('alert')[0],
	alertBtn:document.getElementsByClassName('alertBtn')[0],
	name:document.getElementsByName('name')[0],
	mobile:document.getElementsByName('mobile')[0],
	address:document.getElementsByName('address')[0],
	liuzi:document.getElementById('liuzi'),
	liuziBtn:document.getElementsByClassName('liuziBtn')[0],
	zhongjiangtishi:document.getElementsByClassName('zhongjiangtishi'),
	backBtn:document.getElementsByClassName('backBtn')[0],
	flag:true,
	init:function(){
		this.androidInputBugFix();
		this.zhongjiangListRun();
		var that = this;
		this.liuziBtn.onclick = function(){
            if(that.name.value==''){
                layer.open({content: '请输入姓名',btn: '关闭'});
                return;
            }else if(!(/[\u4E00-\u9FA5]/.test(that.name.value))){
                layer.open({content: '请输入正确的姓名',btn: '关闭'});
                return;
            }else if(that.mobile.value==''){
                layer.open({content: '请输入手机号',btn: '关闭'});
                return;
            }else if(!(/^1\d{10}$/.test(that.mobile.value))){
                layer.open({content: '请输入正确的手机号',btn: '关闭'});
                return;
            }else if(that.address.value==''){
                layer.open({content: '请输入地址',btn: '关闭'});
                return;
            }else if(!(/[\u4E00-\u9FA5]/.test(that.address.value))){
                layer.open({content: '请输入正确的地址',btn: '关闭'});
                return;
            }else if(!(that.flag)){
            	layer.open({content: '您已抽过奖',btn: '关闭'});
			}else{
				that.flag = false;
				that.hideliuzi();
				
/*----------------------------------转动转盘--------------------------------------*/
				that.selectZhuan(1);
			}
		}
		this.cjBtn.onclick = function(){
			if(that.name.value == ''&&that.mobile.value==''&&that.address.value==''){
				that.showliuzi();
			}
		}
		this.hdjsBtn.onclick = function(){
			that.alert.style.display = 'block';
		}
		this.alertBtn.onclick = function(){
			that.alert.style.display = 'none';
		}
	},
	showliuzi:function(){
		this.liuzi.style.display = 'block';
	},
	hideliuzi:function(){
		this.liuzi.style.display = 'none';
	},
	showbackBtn:function(){
		this.backBtn.style.display = 'block';
	},
	selectZhuan:function(num){
        if(num == 0){
            this.zhuan(202.5,'谢谢参与',num);//谢谢参与
        }else if(num == 1){
            this.zhuan(67.5,'恭喜获得50元话费',num);//50元话费
        }else if(num == 2){
            this.zhuan(22.5,'恭喜获得双肩包',num);//双肩包
        }else if(num == 3){
            this.zhuan(292.5,'恭喜获得移动硬盘',num);//移动硬盘
        }
	},
	zhuan:function(deg,jp,num){
		deg+=5400;
		var that = this;
		this.jiangpin.style.transition = "transform 6s";
		this.jiangpin.style.transform = "rotate("+deg+"deg)";
		setTimeout(function(){
			layer.open({content: jp,btn: '关闭'});
			that.zhongjiangtishishow(num);
			that.showbackBtn();
		},6200)
	},
	zhongjiangtishishow:function(num){
		if(num == 0){
			this.zhongjiangtishi[0].innerHTML = '摸摸头...与大奖擦肩而过';
			this.zhongjiangtishi[1].innerHTML = '分享朋友圈再抽一次';
        }else if(num == 1){
			this.zhongjiangtishi[0].innerHTML = '天选之子！恭喜获得50元话费';
        }else if(num == 2){
			this.zhongjiangtishi[0].innerHTML = '天选之子！恭喜获得双肩包';
        }else if(num == 3){
			this.zhongjiangtishi[0].innerHTML = '天选之子！恭喜获得移动硬盘';
        }
	},
	androidInputBugFix:function(){
	if (/Android/gi.test(navigator.userAgent)) {
	    window.addEventListener('resize', function () {
	        if (document.activeElement.tagName == 'INPUT' || document.activeElement.tagName == 'TEXTAREA') {
	            window.setTimeout(function () {
	                document.activeElement.scrollIntoViewIfNeeded();
	            }, 0);
	        }
	    })
	  }
	},
	zhongjiangListRun:function(){
		var zhongjiangList = document.querySelector(".huojianglist ul");
		var zhongjiangListDiv = document.querySelector(".huojianglist");
		var listH = zhongjiangList.offsetHeight;
		var listDivH = zhongjiangListDiv.offsetHeight;
				
		var speed = 1;
		var t = 0;
		var timer;
		
		if(listH>listDivH){
			timer = setInterval(function(){
				t -=speed;
				zhongjiangList.style.top = t+"px";
				
				if(-t>listH-listDivH){
					t = 0;
				}
			},50)
		}
	}
}
draw.init();