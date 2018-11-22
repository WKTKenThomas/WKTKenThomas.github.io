var haibao = {
	hbbg:document.getElementById('hbbg'),
	hbimg:document.getElementById('hbimg'),
	init:function(){
		var dna = this.getQueryString("dna");
		this.hbbg.setAttribute("class", "haibao "+dna)
		hbimg.src = "img/"+dna+".jpg"
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
haibao.init();