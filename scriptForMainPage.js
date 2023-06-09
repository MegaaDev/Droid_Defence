const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
let stars = [];
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;
function Stars(w, h, color, dy) {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.color = color;
  this.dy = dy;
  this.w = w;
  this.h = h;

  this.draw = function () {
    c.beginPath();
    c.fillStyle = this.color;
    c.roundRect(this.x, this.y, this.w, this.h, 20);

    c.fill();
    c.closePath();
  };

  this.update = function () {
    if (this.y > canvas.height) {
      this.y = 0;
    }
    this.y += this.dy;
    this.draw();
  };
}

for (let i = 0; i < 100; i++) {
  stars[i] = new Stars(0.8, 0.8, "rgb(255,255,255,0.9)", 0.3);
}
for (let i = 100; i < 300; i++) {
  stars[i] = new Stars(2, 2, "rgb(255,255,255,0.9)", 0.5);
}
for (let i = 300; i < 400; i++) {
  stars[i] = new Stars(4, 4, "rgb(255,255,255,0.9)", 0.8);
}

const animate = () => {
  animateit = requestAnimationFrame(animate);
  c.fillStyle = `rgba(10,10,10,1)`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
  }
};
animate();
