//浏览器兼容
var requestAnimationFrame =
	window.requestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

//障碍物类
class Obstacle {
	constructor(id, left) {
		this.id = id;
		this.left = left;
		this.img = window.document.createElement('img');
		this.t = -100;
	}
	move() {
		this.t += game.speed;
		game.c.drawImage(this.img, this.left, this.t, this.img.width * 1.4, this.img.height * 1.4);
		if (this.t > game.canvas.height) {
			delete game.ObsObj[this.id];
		} else if (
			game.collision(
				{
					l: this.left,
					t: this.t,
					w: this.img.width * 1.4,
					h: this.img.height * 1.4
				},
				{
					l: game.carleft,
					t: game.cartop,
					w: game.carimg.width,
					h: game.carimg.height
				}
			)
		) {
			raf = function() {};
			game.gameover();
		}
	}
}
class Obs1 extends Obstacle {
	constructor(id, left) {
		super(id, left);
		this.img.src = './img/hind1.png';
	}
}
class Obs2 extends Obstacle {
	constructor(id, left) {
		super(id, left);
		this.img.src = './img/hind2.png';
	}
}
class Obs3 extends Obstacle {
	constructor(id, left) {
		super(id, left);
		this.img.src = './img/hind3.png';
	}
}

function animate() {
	//清除画面
	game.c.clearRect(0, 0, canvas.width, canvas.height);
	//背景
	game.back();
	//创建障碍频率
	--game.pinglv;
	if (game.pinglv == 0) {
		game.randomObs();
		game.pinglv = game.gamepinglv();
	}
	//障碍物
	for (var item in game.ObsObj) {
		game.ObsObj[item].move();
	}
	//汽车
	game.car();
	//时间
	game.playertime();
	raf();
}
var raf = function() {
	requestAnimationFrame(animate);
};

var game = {
	canvas: document.getElementById('canvas'),
	c: this.canvas.getContext('2d'),
	t: -4740,
	speed: 5,
	pinglv: 10,
	carleft: 420,
	cartop: document.body.offsetHeight * 0.7,
	gametime: 0,
	ObsObj: {},
	begin: document.getElementById('begin'),
	init: function() {
		canvas.width = document.body.offsetWidth;
		canvas.height = document.body.offsetHeight;
		this.draw();
		this.touchmove();
		var that = this;
		this.begin.onclick = function() {
			this.remove();
			animate();
		};
	},
	draw: function() {
		this.carimg = document.createElement('img');
		this.carimg.src = './img/car.png';

		this.bgimg = document.createElement('img');
		this.bgimg.src = './img/back.jpg';
	},
	car: function() {
		this.c.drawImage(this.carimg, this.carleft, this.cartop, this.carimg.width, this.carimg.height);
	},
	playertime: function() {
		this.gametime += 0.0167; //requestAnimationFrame,0.167更新一次
		this.c.font = '70px Verdana';
		this.c.fillText(this.gametime.toFixed(2) + 's', 10, 80);
	},
	back: function() {
		this.t += this.speed;
		this.t = this.t >= 0 ? -4740 : this.t;
		this.c.drawImage(this.bgimg, 0, this.t + 4740, this.canvas.width, 4740);
		this.c.drawImage(this.bgimg, 0, this.t, this.canvas.width, 4740);
	},
	randomObs: function() {
		var rn = Math.random();
		var rnum = parseInt(1 + Math.random() * 6);
		switch (rnum) {
			case 1:
				this.ObsObj[rn] = new Obs1(rn, 635);
				this.ObsObj[rn + 1] = new Obs2(rn + 1, 420);
				break;
			case 2:
				this.ObsObj[rn] = new Obs3(rn, 205);
				this.ObsObj[rn + 1] = new Obs1(rn + 1, 635);
				break;
			case 3:
				this.ObsObj[rn] = new Obs2(rn, 420);
				this.ObsObj[rn + 1] = new Obs3(rn + 1, 205);
				break;
			case 4:
				this.ObsObj[rn] = new Obs2(rn, 635);
				this.ObsObj[rn + 1] = new Obs2(rn + 1, 205);
				break;
			case 5:
				this.ObsObj[rn] = new Obs1(rn, 205);
				this.ObsObj[rn + 1] = new Obs1(rn + 1, 420);
				break;
			case 6:
				this.ObsObj[rn] = new Obs3(rn, 420);
				this.ObsObj[rn + 1] = new Obs3(rn + 1, 635);
				break;
		}
	},
	gamepinglv: function() {
		var rnum = parseInt(1 + Math.random() * 10);
		switch (rnum) {
			case 1:
			case 2:
			case 3:
			case 4:
				return 120;
			case 5:
			case 6:
				return 110;
			case 7:
			case 8:
			case 9:
			case 10:
				return 130;
		}
	},
	collision: function(obj1, obj2) {
		var l1 = obj1.l > obj2.l + obj2.w;
		var l2 = obj2.l > obj1.l + obj1.w;
		var t1 = obj1.t > obj2.t + obj2.h;
		var t2 = obj2.t > obj1.t + obj1.h;
		if (!(l1 || l2 || t1 || t2)) {
			return true;
		} else {
			return false;
		}
	},
	touchmove: function() {
		var that = this;
		document.addEventListener('touchstart', function(e) {
			(startX = e.changedTouches[0].pageX), (startY = e.changedTouches[0].pageY);
		});
		document.addEventListener('touchend', function(e) {
			(moveEndX = e.changedTouches[0].pageX),
				(moveEndY = e.changedTouches[0].pageY),
				(X = moveEndX - startX),
				(Y = moveEndY - startY);
			var num = 5;
			if (X > 0) {
				that.moveR = setInterval(function() {
					if (num != 0 && that.carleft < 635) {
						num--;
						that.carleft += 43;
					} else {
						clearInterval(that.moveR);
					}
				}, 15);
			} else if (X < 0) {
				that.moveL = setInterval(function() {
					if (num != 0 && that.carleft > 205) {
						num--;
						that.carleft -= 43;
					} else {
						clearInterval(that.moveL);
					}
				}, 15);
			}
		});
	},
	gameover: function() {
		if (this.gametime < 50) {
			alert('你是新手吧，成绩为' + this.gametime.toFixed(2) + 's');
			window.location.reload();
		} else if (this.gametime >= 50 && this.gametime < 80) {
			alert('你这车技有点，嗯~~成绩为' + this.gametime.toFixed(2) + 's');
			window.location.reload();
		} else if (this.gametime >= 80 && this.gametime < 110) {
			alert('还不错呦~去修车吧~成绩为' + this.gametime.toFixed(2) + 's');
			window.location.reload();
		} else if (this.gametime >= 110 && this.gametime < 140) {
			alert('呦呵~厉害呦~成绩为' + this.gametime.toFixed(2) + 's');
			window.location.reload();
		} else if (this.gametime >= 140) {
			alert('老司机~老司机~成绩为' + this.gametime.toFixed(2) + 's');
			window.location.reload();
		}
	}
};
game.init();
