const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const enemyBotImage = document.querySelector(".enemybot");
const villain = document.querySelector(".villain");

let stars = [];
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;

let centreX = canvas.width / 2;
let centreY = canvas.height / 2;

addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerWidth;
  centreX = canvas.width / 2;
  centreY = canvas.height / 2;
  init();
});

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

function VillainBot(x, y, w, h, image, angle, dx, dy) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.h = h;
  this.w = w;

  this.image = image;
  this.angle = angle;
  this.radius = this.h / 2;
  this.villainDropBool = false;
  if (Math.random() < 0.5) {
    this.choice = true;
  }

  this.draw = function () {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.drawImage(this.image, -this.w / 2, -this.h / 2, this.w, this.h);
    c.restore();

    // c.drawImage(this.image, this.position.x, this.position.y);
  };

  this.update = function () {
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}
travellingBot1 = [];
travellingBot2 = [];
let timer1 = 0;
let timer2 = 0;
upbot = setInterval(() => {
  travellingBot1.push(
    new VillainBot(-70, 500, 50, 50, enemyBotImage, Math.PI / 4, 1, -1)
  );
}, 1500);
downbot = setInterval(() => {
  travellingBot2.push(new VillainBot(700, -70, 50, 50, villain, 0, -1, 1));
}, 1500);

// upbot = setInterval(() => {
//   travellingBot1.push(new VillainBot(-70, 500, 70, 70, villain, 0, 1, -1));
// }, 1493);
// downbot = setInterval(() => {
//   travellingBot2.push(new VillainBot(700, -70, 70, 70, villain, 0, -1, 1));
// }, 1493);

const init = () => {
  for (let i = 0; i < 100; i++) {
    stars[i] = new Stars(0.8, 0.8, "rgb(255,255,255,0.9)", 0.3);
  }
  for (let i = 100; i < 300; i++) {
    stars[i] = new Stars(2, 2, "rgb(255,255,255,0.9)", 0.5);
  }
  for (let i = 300; i < 400; i++) {
    stars[i] = new Stars(4, 4, "rgb(255,255,255,0.9)", 0.8);
  }
};

init();

const animate = () => {
  animateit = requestAnimationFrame(animate);
  c.fillStyle = `rgba(10,10,10,1)`;
  c.fillRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
  }
  for (let i = 0; i < travellingBot1.length; i++) {
    travellingBot1[i].update();
    if (travellingBot1[i].x > canvas.width || travellingBot1[i].y < -200) {
      travellingBot1.splice(i, 1);
    }
  }
  for (let i = 0; i < travellingBot2.length; i++) {
    travellingBot2[i].update();
    if (travellingBot2[i].x < -200 || travellingBot2[i].y > canvas.height) {
      travellingBot2.splice(i, 1);
    }
  }
};
animate();

addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    window.location = "game.html";
  }
});
