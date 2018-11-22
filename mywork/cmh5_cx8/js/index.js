var index = {
	hdjsBtn:document.getElementsByClassName('hdjsBtn'),
	alert:document.getElementsByClassName('alert')[0],
	alertBtn:document.getElementsByClassName('alertBtn')[1],
	zjcx:document.getElementsByClassName('zjcx'),
	init:function(){
		var m = this.getQueryString("m");
		if(m == 1){
			this.showzjcx();
		}
		var that = this;
		this.hdjsBtn[0].onclick = function(){
			that.alert.style.display = 'block';
		}
		this.hdjsBtn[1].onclick = function(){
			that.alert.style.display = 'block';
		}
		this.alertBtn.onclick = function(){
			that.alert.style.display = 'none';
		}
	},
	showzjcx:function(){
		this.zjcx[0].style.display = 'block';
		this.zjcx[1].style.display = 'block';
	},
	getQueryString:function(name){
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	}
}
index.init();