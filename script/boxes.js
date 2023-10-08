// Copyright (c) 2022 by Rémi Morvan.
// Derived from a word of Mladen Stanojevic https://codepen.io/mladen___/pen/oXRxbx under MIT license.

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var c = document.getElementById("boxCanvas");
var ctx = c.getContext("2d");

function nbBox() {
	return 0
}

function resize() {
	var box = c.getBoundingClientRect();
	c.width = window.innerWidth;
	c.height = window.innerHeight;
}

var light = {
	x: 160,
	y: 200
}

var colors = ["#eb3b5a", "#2d98da", "#f7b731", "#8854d0"];

function Box(x = Math.floor((Math.random() * c.width) + 1), y = Math.floor((Math.random() * c.height) + 1)) {
	this.half_size = Math.floor((Math.random() * 30) + 20);
	this.x = x;
	this.y = y;
	this.dir = 2 * Math.floor(Math.random() * 2) - 1;
	this.coef = Math.exp(Math.random()*0.3 - 0.15);
	this.r = Math.random() * Math.PI;
	this.points = Math.floor((Math.random() * 6) + 3);
	this.color = colors[Math.floor((Math.random() * colors.length))];
	this.getDots = function() {

		var full = (Math.PI * 2) / this.points;

		var points = [];
		for (var i = 0; i < this.points; i++) {
			points.push({
				x: this.x + this.half_size * Math.sin(this.r + full * i+1),
				y: this.y + this.half_size * Math.cos(this.r + full * i+1)
			});
		};

		return points;

	}
	this.rotate = function() {
		var speed = (this.dir) * (60 - this.half_size) / 35;
		this.r += speed * 0.003;
		this.x += speed;
		this.y += this.coef * speed;
		this.half_size *= 0.998;
	}
	this.draw = function() {
		var dots = this.getDots();
		ctx.beginPath();
		ctx.moveTo(dots[0].x, dots[0].y);
		for (var i = 1; i < dots.length; i++) {
			ctx.lineTo(dots[i].x, dots[i].y);
		};

		ctx.fillStyle = this.color;
		ctx.fill();

		if (this.y - this.half_size > c.height) {
			this.y -= c.height + this.half_size;
		}
		if (this.x - this.half_size > c.width) {
			this.x -= c.width + this.half_size;
		}
		if (this.y < -this.half_size) {
			this.y = c.height + this.half_size;
		}
		if (this.x < -this.half_size) {
			this.x = c.width + this.half_size;
		}
	}
}

var boxes = [];

function draw() {
	ctx.clearRect(0, 0, c.width, c.height);
	for (var i = 0; i < boxes.length; i++) {
		boxes[i].rotate();
	};
	for (var i = 0; i < boxes.length; i++) {
		if (boxes[i].half_size < 5) {
			boxes.splice(boxes[i], 1);
		}
	};
	for (var i = 0; i < boxes.length; i++) {
		collisionDetection(i)
		if (i < boxes.length) {
			boxes[i].draw();
		};
	};
	requestAnimationFrame(draw);
}

document.addEventListener('click',(event)=>//when user clicks on the canvas
	{   
		// for (var k = 0; k < 40; k++) {
		// 	boxes.push(new Box());
		// }
		boxes.push(new Box(event.clientX, event.clientY));
	});

resize();

while (boxes.length < nbBox()) {
	boxes.push(new Box());
}

draw();

window.onresize = resize;

function collisionDetection(b){
	for (var i = boxes.length - 1; i >= 0; i--) {
		if(i != b && b < boxes.length){	
			var dx = (boxes[b].x + boxes[b].half_size) - (boxes[i].x + boxes[i].half_size);
			var dy = (boxes[b].y + boxes[b].half_size) - (boxes[i].y + boxes[i].half_size);
			var d = Math.sqrt(dx * dx + dy * dy);
			if (d < boxes[b].half_size + boxes[i].half_size) {
                if (boxes[b].half_size > 12) {
                    boxes[b].half_size = boxes[b].half_size - 1
                } else {
                    if (i > b) {
                        i -= 1;
                    };
                    boxes.splice(b, 1);
                } ;
                if (boxes[i].half_size > 12) {
                    boxes[i].half_size = boxes[i].half_size - 1;
                } else {
                    boxes.splice(i, 1);
					if (i < b) {
						b -= 1;
						break;
					}
                } ;
                while (boxes.length < nbBox()) {
                    boxes.push(new Box());
                } ;
			}
		}
	}
}