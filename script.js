//IMPORT CANVAS//
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

//IMAGES//
const space = document.querySelector(".space");
const base = document.querySelector(".base");
const villain = document.querySelector(".villain");
const pause = document.querySelector(".pause");
const resume = document.querySelector(".resume");
const playerImage = document.querySelector(".player");
const bulletImage = document.querySelector(".bullet");
const enemyBotImage = document.querySelector(".enemybot");
const enemyBulletImage = document.querySelector(".enemyBullet");
const spaceOrb = document.querySelector(".spaceOrb");
const powerupDropImg1 = document.querySelector(".powerupDropImg1");
const powerupDropImg2 = document.querySelector(".powerupDropImg2");
const powerupDropImg3 = document.querySelector(".powerupDropImg3");

const booster1 = document.querySelector(".booster1");
const booster2 = document.querySelector(".booster2");
const booster3 = document.querySelector(".booster3");

//AUDIO//
const bgMusic = new Audio("bgMusic.mp3");
const shootSound = new Audio("shoot.mp3");
const boosterSound = new Audio("boosterSound.mp3");

//BACKGROUND MUSIC LOOP//
bgMusic.addEventListener(
  "ended",
  function () {
    this.currentTime = 0;
    this.play();
    this.volume = 0.5;
  },
  false
);
//MOUSE LISTENER//
canvas.addEventListener("mousemove", (event) => {
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
});

//VARIABLES//
let animateit;
let baseLifeActual;
let player;
let playerSize;
let villainbot;
let villainbots;
let villainBotSize;
let fpsCount;
let move;
let musicBool = true;
let bullets;
let bulletsEnemyBot;
let powerUp1 = [];
let ispeed;
let orb;
let playerLife;
let text;
let highScoreText;
let powerupdrop1;
let score = 0;
let highScore = localStorage.getItem("high--score") || 0;
let powerupdrop2;
let boolPlsDrop = false;
let powerupdrop3;
let playerLifeActual;
let homeBase;
let lifeCountPlayer;
let count2;
let villainBotLife;
let lifeCountVillain;
let villainLifeActual;
let dropVillainInterval;
let animateUs;
let villains = [];
let baseLife;
let lifeCountBase;
let stars = [];
let powerUp2 = [];
let powerUp3 = [];
let animateMe;
//VARIABLE BOOLS//
let villainDropBool;
let villainBool = true;
let speedBool;
let villainDropProcessBool = true;
let gameOverBool = false;
let booldrop1 = false;
let booldrop2 = false;

let booldrop3 = false;

let bulletBool = false;
let booldroppedfor1 = true;
let booldroppedfor2 = true;
let booldroppedfor3 = true;

//SIZING//
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let centreX = canvas.width / 2;
let centreY = canvas.height / 2;

//RESIZE//

addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  centreX = canvas.width / 2;
  centreY = canvas.height / 2;

  if (highScore < score) {
    highScore = score;
    localStorage.setItem("high--score", highScore);
  }
  cancelAnimationFrame(animateit);
  villainBool = false;
  villainDropProcessBool = false;
  bgMusic.pause();
  setTimeout(() => {
    villainBool = true;
    villainDropProcessBool = true;
    VillainSpawn();

    init();
    bgMusic.play();
    bgMusic.volume = 0.4;

    animateit = requestAnimationFrame(animate);
  }, 1000);
});

//DISTANCE//
function distance(x, y, otherx, othery) {
  var X = x - otherx;
  var Y = y - othery;
  var distanceit = Math.hypot(X, Y);
  return distanceit;
}

//RANDOM RANGE//
function randomRangeGenerator(min, max) {
  let randomNumber = Math.random() * (max - min) + min;
  return randomNumber;
}

//MOUSE POINTER//
const mouse = {
  x: undefined,
  y: undefined,
};

//PLAYER//
function Player(x, y, w, h, image) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.h = h;
  this.w = w;
  this.speed = 5;
  this.image = image;
  this.angle = 0;
  this.life = 80;
  this.radius = this.h / 2;
  this.draw = function () {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.drawImage(this.image, -this.w / 2, -this.h / 2, this.w, this.h);
    c.restore();
    c.beginPath();

    c.roundRect(this.x - 40, this.y + 60, 80, 10, 10);
    c.fillStyle = "grey";
    c.fill();
    c.closePath();
    c.beginPath();
    c.roundRect(this.x - 40, this.y + 60, this.life, 10, 10);
    c.fillStyle = "green";
    c.fill();

    c.closePath();
  };

  this.update = function () {
    this.angle = Angle(this.x, this.y, mouse.x, mouse.y) + Math.PI / 2;
    if (
      this.y - this.radius + this.dy < 0 ||
      this.y + this.radius + this.dy > canvas.height ||
      (this.y + this.dy > homeBase.y &&
        this.y + this.dy < homeBase.y + homeBase.h &&
        this.x + this.dx > homeBase.x &&
        this.x + this.dx < homeBase.x + homeBase.w)
    ) {
      this.dy = 0;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

//Base
function Base(x, y, w, h) {
  this.x = x;
  this.y = y;

  this.w = w;
  this.h = h;

  this.draw = function () {
    c.drawImage(base, this.x, this.y, this.w, this.h);
  };

  this.update = function () {
    this.draw();
  };
}

function Bullets(x, y, w, h, velocity, image, angle) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.w = w;
  this.h = h;
  this.velocity = velocity;
  this.angle = angle;
  this.radius = this.w / 2;
  this.image = image;

  this.draw = function () {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.drawImage(this.image, -this.w / 2, -this.h / 2, this.w, this.h);
    c.restore();
  };

  this.update = function () {
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.draw();
  };
}

function Villain(x, y, w, h, velocity) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.radius = this.w / 2;
  this.velocity = velocity;

  this.draw = function () {
    c.drawImage(villain, this.x, this.y, this.w, this.h);
  };

  this.update = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    this.draw();
  };
}

//TEXT//
function Text(x, y) {
  this.x = x;
  this.y = y;

  this.draw = function () {
    c.fillStyle = "white";
    c.font = " 20pt Russo One";

    c.fillText(`Score: ${score}`, x, y);
  };

  this.update = function () {
    this.draw();
  };
}
function TextForHighscore(x, y) {
  this.x = x;
  this.y = y;

  this.draw = function () {
    c.fillStyle = "white";
    c.font = " 20pt Russo One";

    c.fillText(`HighScore: ${highScore}`, x, y);
  };

  this.update = function () {
    this.draw();
  };
}

function BulletsForEnemy(x, y, w, h, velocity, image, angle) {
  this.x = x;
  this.y = y;
  this.dx = 0;
  this.dy = 0;
  this.w = w;
  this.h = h;
  this.velocity = velocity;
  this.angle = angle;
  this.radius = this.w / 2;
  this.image = image;

  this.draw = function () {
    c.save();
    c.translate(this.x, this.y);
    c.rotate(this.angle);
    c.drawImage(this.image, -this.w / 2, -this.h / 2, this.w, this.h);
    c.restore();
  };

  this.update = function () {
    this.y += this.velocity.y;
    this.x += this.velocity.x;
    this.draw();
  };
}

function Angle(x, y, otherx, othery) {
  let angle = Math.atan2(othery - y, otherx - x);
  return angle;
}

//SHOOTING BOT//

function VillainBot(x, y, w, h, image) {
  this.x = x;
  this.y = y;
  this.dx = Math.random() < 0.5 ? 1 : -1;
  this.dy = 1;
  this.h = h;
  this.w = w;
  this.life = 81;
  this.image = image;
  this.angle = 0;
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
    c.beginPath();

    c.roundRect(this.x - 40, this.y - 60, 81, 10, 10);
    c.fillStyle = "grey";
    c.fill();
    c.closePath();
    c.beginPath();
    c.roundRect(this.x - 40, this.y - 60, this.life, 10, 10);
    c.fillStyle = "red";
    c.fill();

    c.closePath();
    // c.drawImage(this.image, this.position.x, this.position.y);
  };

  this.update = function () {
    if (this.choice) {
      this.angle =
        Angle(
          this.x,
          this.y,
          homeBase.x + homeBase.w / 2,
          homeBase.y + homeBase.h / 2
        ) +
        Math.PI / 2;
    } else {
      this.angle = Angle(this.x, this.y, player.x, player.y) + Math.PI / 2;
    }

    if (
      this.x - this.radius + this.dx < 50 ||
      this.x + this.radius + this.dx > canvas.width - canvas.width / 5
    ) {
      this.dx = -this.dx;
    }
    if (
      this.y - this.radius + this.dy < canvas.height / 20 &&
      this.villainDropBool
    ) {
      this.dy = -this.dy;
    }
    if (this.y + this.radius + this.dy > canvas.height / 4) {
      this.villainDropBool = true;
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  };
}

function Life(x, y, w, h, color, bool) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.bool = bool;
  this.w = w;
  this.h = h;

  this.draw = function () {
    c.beginPath();
    c.fillStyle = this.color;
    c.roundRect(this.x, this.y, this.w, this.h, 10);

    c.fill();
    c.closePath();
  };

  this.update = function () {
    if (bool) {
      if (lifeCountBase >= 300) {
        this.color = color;
      } else if (lifeCountBase < 300 && lifeCountBase >= 200) {
        this.color = "green";
      } else if (lifeCountBase < 200 && lifeCountBase >= 100) {
        this.color = "#F97B22";
      } else {
        this.color = "red";
      }
    }

    this.draw();
  };
}

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

function Orb(w, h, image, dy) {
  this.w = w;
  this.h = h;
  this.x = randomRangeGenerator(canvas.width - this.w, 0);
  this.y = Math.random() * canvas.height;

  this.dy = dy;

  this.image = image;
  this.draw = function () {
    c.globalAlpha = 0.05;
    c.drawImage(this.image, this.x, this.y, this.w, this.h);
    c.globalAlpha = 1;
  };

  this.update = function () {
    if (this.y > canvas.width) {
      this.y = -this.w;
    }
    this.y += this.dy;
    this.draw();
  };
}

function powerUpDrop(w, h, image, dx, number) {
  this.w = w;
  this.h = h;
  this.dx = dx;

  this.number = number;
  if (this.number === 1) {
    this.x = canvas.width + this.w;
    this.dx = -this.dx;
  } else {
    this.x = -this.w;
    this.dx = dx;
  }

  this.y = canvas.height / 20;

  this.image = image;
  this.draw = function () {
    c.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  this.update = function () {
    this.x += this.dx;
    this.draw();
  };
}

function BoosterDrop(x, y, w, h, image, dy) {
  this.w = w;
  this.h = h;
  this.dy = dy;
  this.x = x;
  this.y = y;

  this.image = image;
  this.draw = function () {
    c.drawImage(this.image, this.x, this.y, this.w, this.h);
  };

  this.update = function () {
    this.y += this.dy;
    this.draw();
  };
}

//SPAWN VILLAINS//
const VillainSpawn = () => {
  if (villainBool) {
    setTimeout(() => {
      animateUs = requestAnimationFrame(VillainSpawn);
      let x;
      let y;
      x = Math.random() * canvas.width;
      y = -40;
      let h;
      let w;
      h = 50;
      w = 50;
      let angle = Math.atan2(
        homeBase.y + homeBase.h / 2 - (y + h / 2),
        homeBase.x + homeBase.w / 2 - (x + w / 2)
      );
      // console.log(angle);

      let velocity = {
        x: Math.cos(angle) * 2,
        y: Math.sin(angle) * 2,
      };
      villains.push(
        new Villain(x, y, w, h, {
          x: velocity.x,
          y: velocity.y,
        })
      );
    }, ispeed);
    setTimeout(() => {
      if (!speedBool) ispeed -= 50;
      if (ispeed < 600) {
        speedBool = true;
      }
    }, 3000);
  }
};

VillainSpawn();

//VILLAIN BOT SPAWN//
const dropVillain = () => {
  villainbots.push(
    new VillainBot(
      randomRangeGenerator(canvas.width / 8, canvas.width - canvas.width / 4),
      -100,
      70,
      70,
      enemyBotImage
    )
  );
};

dropVillainInterval = setInterval(() => {
  if (villainDropProcessBool) {
    dropVillain();
  }
}, 4000);
dropVillainProcess = setInterval(() => {
  for (let i = 0; i < villainbots.length; i++) {
    let angle, angleConst;
    if (villainbots[i].choice) {
      angle = Math.atan2(
        homeBase.y + homeBase.h / 2 - villainbots[i].y,
        homeBase.x + homeBase.w / 2 - villainbots[i].x
      );
      angleConst =
        Angle(
          homeBase.x + homeBase.h / 2,
          homeBase.y + homeBase.w / 2,
          villainbots[i].x,
          villainbots[i].y
        ) - Math.PI;
    } else {
      angle = Math.atan2(
        player.y - villainbots[i].y,
        player.x - villainbots[i].x
      );
      angleConst =
        Angle(player.x, player.y, villainbots[i].x, villainbots[i].y) - Math.PI;
    }

    const velocity = {
      x: Math.cos(angle) * 25,
      y: Math.sin(angle) * 25,
    };
    bulletsEnemyBot.push(
      new BulletsForEnemy(
        villainbots[i].x,
        villainbots[i].y,
        100,
        30,
        {
          x: velocity.x,
          y: velocity.y,
        },
        enemyBulletImage,
        angleConst
      )
    );
  }
}, 3000);

setInterval(() => {
  if (booldroppedfor1) {
    boolPlsDrop = true;
    powerupdrop1 = new powerUpDrop(
      120,
      120,
      powerupDropImg1,
      5,
      Math.floor(Math.random() * 2)
    );
    setTimeout(() => {
      booldrop1 = true;

      powerUp1.push(
        new BoosterDrop(
          powerupdrop1.x + 20,
          powerupdrop1.y + 80,
          35,
          35,
          booster1,
          3
        )
      );
    }, randomRangeGenerator(6000, 1000));
  }
}, 35000);

setInterval(() => {
  if (booldroppedfor2) {
    boolPlsDrop = true;
    powerupdrop1 = new powerUpDrop(
      120,
      120,
      powerupDropImg2,
      5,
      Math.floor(Math.random() * 2)
    );
    setTimeout(() => {
      booldrop2 = true;

      powerUp2.push(
        new BoosterDrop(
          powerupdrop1.x + 20,
          powerupdrop1.y + 80,
          35,
          35,
          booster2,
          3
        )
      );
    }, randomRangeGenerator(6000, 1000));
  }
}, 20000);
setInterval(() => {
  if (booldroppedfor3) {
    boolPlsDrop = true;
    powerupdrop1 = new powerUpDrop(
      120,
      120,
      powerupDropImg3,
      5,
      Math.floor(Math.random() * 2)
    );
    setTimeout(() => {
      booldrop3 = true;

      powerUp3.push(
        new BoosterDrop(
          powerupdrop1.x + 20,
          powerupdrop1.y + 80,
          35,
          35,
          booster3,
          3
        )
      );
    }, randomRangeGenerator(6000, 1000));
  }
}, 50000);

function init() {
  powerUp1 = [];
  baseLife = new Life(50, 50, 400, 30, "grey");
  ispeed = 2000;
  animateUs;
  playerLife;
  playerLifeActual;
  //OBJECT SIZES//
  playerSize = 30;
  lifeCountPlayer = 70;
  lifeCountVillain = 70;
  lifeCountBase = 400;
  score = 0;

  villainBotSize = 30;
  bullets = [];
  bulletsEnemyBot = [];
  villainbots = [];
  powerUp2 = [];
  powerUp3 = [];
  count2 = 15000;
  villains = [];
  //BOOLS//
  booldrop1 = false;
  bulletBool = false;
  villainBool = true;
  gameOverBool = false;
  booldroppedfor1 = true;
  booldroppedfor2 = true;
  booldroppedfor3 = true;

  boolPlsDrop = false;
  villainDropProcessBool = true;
  villainDropBool = false;
  musicBool = true;
  speedBool = false;
  //FPS//
  fpsCount = 60;

  //MOVE BOOLS//
  move = {
    right: {
      pressed: false,
    },
    left: {
      pressed: false,
    },
  };

  player = new Player(
    randomRangeGenerator(canvas.width / 8, canvas.width - canvas.width / 8),

    canvas.height - canvas.height / 10,
    90,
    90,
    playerImage
  );

  homeBase = new Base(
    centreX - 150 / 2,
    canvas.height - canvas.height / 3,
    150,
    150
  );
  for (let i = 0; i < 100; i++) {
    stars[i] = new Stars(0.8, 0.8, "rgb(255,255,255,0.9)", 0.3);
  }
  for (let i = 100; i < 300; i++) {
    stars[i] = new Stars(2, 2, "rgb(255,255,255,0.9)", 0.5);
  }
  for (let i = 300; i < 400; i++) {
    stars[i] = new Stars(4, 4, "rgb(255,255,255,0.9)", 0.8);
  }
  /////

  ////
}
orb = new Orb(600, 600, spaceOrb, 0.2);
text = new Text(canvas.width - canvas.width / 6, 70);
highScoreText = new TextForHighscore(canvas.width - canvas.width / 6, 130);
init();

//MAIN GAME LOOP//
const animate = () => {
  animateit = requestAnimationFrame(animate);

  //CLEAR FRAME EVERY TIME//
  c.fillStyle = `rgba(10,10,10,1)`;
  c.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
  }
  orb.update();

  if (boolPlsDrop) {
    if (
      (powerupdrop1.x < canvas.width && powerupdrop1.number === 0) ||
      (powerupdrop1.x > 0 && powerupdrop1.number === 1)
    ) {
      powerupdrop1.update();
    }
  }

  if (booldrop1)
    for (let i = 0; i < powerUp1.length; i++) {
      powerUp1[i].update();
      if (powerUp1[i].y - powerUp1[i].h / 2 > canvas.height) {
        powerUp1.splice(i, 1);
      }

      if (
        distance(
          player.x,
          player.y,
          powerUp1[i].x + powerUp1[i].w / 2,
          powerUp1[i].y + powerUp1[i].h / 2
        ) <
        player.radius + distance(powerUp1[i].w / 2, powerUp1[i].h / 2, 0, 0)
      ) {
        bulletBool = true;
        bulletPowerUp();
        setTimeout(() => {
          bulletBool = false;
        }, 6000);
        powerUp1.splice(i, 1);
        boosterSound.play();
      }
    }

  if (booldrop2)
    for (let i = 0; i < powerUp2.length; i++) {
      powerUp2[i].update();
      if (powerUp2[i].y - powerUp2[i].h / 2 > canvas.height) {
        powerUp2.splice(i, 1);
      }

      if (
        distance(
          player.x,
          player.y,
          powerUp2[i].x + powerUp2[i].w / 2,
          powerUp2[i].y + powerUp2[i].h / 2
        ) <
        player.radius + distance(powerUp2[i].w / 2, powerUp2[i].h / 2, 0, 0)
      ) {
        powerUp2.splice(i, 1);
        player.life = 80;
        boosterSound.play();
      }
    }
  if (booldrop3)
    for (let i = 0; i < powerUp3.length; i++) {
      powerUp3[i].update();
      if (powerUp3[i].y - powerUp3[i].h / 2 > canvas.height) {
        powerUp3.splice(i, 1);
      }

      if (
        distance(
          player.x,
          player.y,
          powerUp3[i].x + powerUp3[i].w / 2,
          powerUp3[i].y + powerUp3[i].h / 2
        ) <
        player.radius + distance(powerUp3[i].w / 2, powerUp3[i].h / 2, 0, 0)
      ) {
        powerUp3.splice(i, 1);
        lifeCountBase = 400;
        boosterSound.play();
      }
    }
  //UPDATE FUNCTIONS//

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    if (
      bullets[i].x + bullets[i].w / 2 < 0 ||
      bullets[i].x - bullets[i].w / 2 > canvas.width ||
      bullets[i].y + bullets[i].w / 2 < 0 ||
      bullets[i].y - bullets[i].w / 2 > canvas.height
    ) {
      bullets.splice(i, 1);
    }
  }

  //PLAYER UPDATE//
  if (
    (move.right.pressed &&
      player.x + player.radius + player.dx < canvas.width &&
      (player.y < homeBase.y || player.y > homeBase.y + homeBase.h)) ||
    (move.right.pressed &&
      (player.x + player.dx > homeBase.x + homeBase.w ||
        player.x + player.dx + 5 < homeBase.x) &&
      player.x + player.radius + player.dx < canvas.width &&
      player.y > homeBase.y &&
      player.y < homeBase.y + homeBase.h)
  ) {
    player.dx = player.speed;
  } else if (
    (move.left.pressed &&
      player.x - player.radius + player.dx > 0 &&
      (player.y < homeBase.y || player.y > homeBase.y + homeBase.h)) ||
    (move.left.pressed &&
      (player.x + player.dx - 5 > homeBase.x + homeBase.w ||
        player.x + player.dx < homeBase.x) &&
      player.x - player.radius + player.dx > 0 &&
      player.y > homeBase.y &&
      player.y < homeBase.y + homeBase.h)
  ) {
    player.dx = -player.speed;
  } else {
    player.dx = 0;
  }
  player.update();

  //VILLAINBOT UPDATE//

  for (let i = 0; i < villainbots.length; i++) {
    villainbots[i].update();
    for (let j = 0; j < bullets.length; j++) {
      if (bullets[j] && villainbots[i]) {
        if (
          distance(
            bullets[j].x,
            bullets[j].y,
            villainbots[i].x,
            villainbots[i].y
          ) <
          bullets[j].radius + villainbots[i].radius
        ) {
          villainbots[i].life -= 27;
          score += 40;
          bullets.splice(j, 1);

          if (villainbots[i].life === 0) {
            villainbots.splice(i, 1);
          }
        }
      }
    }
  }

  for (let i = 0; i < bulletsEnemyBot.length; i++) {
    bulletsEnemyBot[i].update();
    if (
      bulletsEnemyBot[i].x + bulletsEnemyBot[i].w / 2 < 0 ||
      bulletsEnemyBot[i].x - bulletsEnemyBot[i].w / 2 > canvas.width ||
      bulletsEnemyBot[i].y + bulletsEnemyBot[i].w / 2 < 0 ||
      bulletsEnemyBot[i].y - bulletsEnemyBot[i].w / 2 > canvas.height
    ) {
      bulletsEnemyBot.splice(i, 1);
    }
    if (bulletsEnemyBot[i]) {
      if (
        distance(
          bulletsEnemyBot[i].x,
          bulletsEnemyBot[i].y,
          player.x,
          player.y
        ) <
        bulletsEnemyBot[i].radius + player.radius
      ) {
        bulletsEnemyBot.splice(i, 1);
        player.life -= 10;
        score -= 20;
        if (player.life === 0) {
          console.log("end");
          gameOverBool = true;
        }
      }
    }
    if (bulletsEnemyBot[i]) {
      if (
        distance(
          bulletsEnemyBot[i].x,
          bulletsEnemyBot[i].y,
          homeBase.x + homeBase.w / 2,
          homeBase.y + homeBase.h / 2
        ) <
        bulletsEnemyBot[i].radius +
          distance(homeBase.w / 2, homeBase.h / 2, 0, 0)
      ) {
        bulletsEnemyBot.splice(i, 1);
        lifeCountBase -= 20;
        score -= 20;
        if (lifeCountBase === 0) {
          gameOverBool = true;
          console.log("lifeoverBase");
          gameOverBool = true;
        }
      }
    }
  }

  for (let i = 0; i < villains.length; i++) {
    villains[i].update();
    for (let j = 0; j < bullets.length; j++) {
      if (villains[i] !== undefined && bullets[j] !== undefined) {
        if (
          distance(bullets[j].x, bullets[j].y, villains[i].x, villains[i].y) <
          bullets[j].radius + villains[i].radius
        ) {
          villains.splice(i, 1);
          score += 30;
          bullets.splice(j, 1);
        }
      }
    }
    if (villains[i]) {
      if (
        distance(
          homeBase.x + homeBase.w / 2,
          homeBase.y + homeBase.h / 2,
          villains[i].x,
          villains[i].y
        ) <
        distance(homeBase.h / 2, homeBase.w / 2, 0, 0) + villains[i].radius
      ) {
        villains.splice(i, 1);
        lifeCountBase -= 20;
        score -= 20;
        if (lifeCountBase === 0) {
          console.log("lifeoverBase");
          gameOverBool = true;
        }
      }
    }
    if (villains[i]) {
      if (
        distance(villains[i].x, villains[i].y, player.x, player.y) <
        villains[i].radius + player.radius
      ) {
        villains.splice(i, 1);
        player.life -= 10;
        score -= 20;
        if (player.life === 0) {
          console.log("end");
          gameOverBool = true;
        }
      }
    }
  }

  //BASE UPDATE//
  baseLife = new Life(50, 50, 400, 30, "grey", false);
  baseLife.update();

  baseLifeActual = new Life(50, 50, lifeCountBase, 30, "#21ff1f", true);
  baseLifeActual.update();
  homeBase.update();

  if (gameOverBool) {
    if (highScore < score) {
      highScore = score;
      localStorage.setItem("high--score", highScore);
    }
    cancelAnimationFrame(animateit);
    villainBool = false;
    villainDropProcessBool = false;
    bgMusic.pause();
    setTimeout(() => {
      villainBool = true;
      villainDropProcessBool = true;
      VillainSpawn();

      init();
      bgMusic.play();
      bgMusic.volume = 0.4;

      animateit = requestAnimationFrame(animate);
    }, 2000);
  }

  text.update();
  highScoreText.update();

  // playerLife = new Life(player.x - 35, player.y + 50, 70, 10, "grey");
  // playerLifeActual = new Life(
  //   player.x - 35,
  //   player.y + 50,
  //   lifeCountPlayer,
  //   10,
  //   "green"
  // );
  // playerLife.update();
  // playerLifeActual.update();
};
animate();

//EVENT LISTENERS//
document.addEventListener("keydown", (event) => {
  if (musicBool) bgMusic.play();
  bgMusic.volume = 0.4;

  musicBool = false;
  if (event.key == "D" || event.key == "d" || event.key == "ArrowRight") {
    move.right.pressed = true;
  }
  if (event.key == "W" || event.key == "w" || event.key == "ArrowUp") {
    player.dy = -player.speed;
  }
  if (event.key == "A" || event.key == "a" || event.key == "ArrowLeft") {
    move.left.pressed = true;
  }
  if (event.key == "S" || event.key == "s" || event.key == "ArrowDown") {
    player.dy = player.speed;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key == "D" || event.key == "d" || event.key == "ArrowRight") {
    move.right.pressed = false;
  }
  if (event.key == "W" || event.key == "w" || event.key == "ArrowUp") {
    player.dy = 0;
  }
  if (event.key == "A" || event.key == "a" || event.key == "ArrowLeft") {
    move.left.pressed = false;
  }
  if (event.key == "S" || event.key == "s" || event.key == "ArrowDown") {
    player.dy = 0;
  }
});
document.querySelector("canvas").addEventListener("click", (event) => {
  let angle = Math.atan2(event.clientY - player.y, event.clientX - player.x);
  let angleConst = Angle(player.x, player.y, mouse.x, mouse.y) + 2 * Math.PI;
  const velocity = {
    x: Math.cos(angle) * 30,
    y: Math.sin(angle) * 30,
  };
  bullets.push(
    new Bullets(
      player.x,
      player.y,
      80,
      8,
      {
        x: velocity.x,
        y: velocity.y,
      },
      bulletImage,
      angleConst
    )
  );
  shootSound.currentTime = 0;
  shootSound.play();
});

const bulletPowerUp = () => {
  if (bulletBool) {
    setTimeout(() => {
      animateMe = requestAnimationFrame(bulletPowerUp);

      let angle = Math.atan2(mouse.y - player.y, mouse.x - player.x);
      let angleConst =
        Angle(player.x, player.y, mouse.x, mouse.y) + 2 * Math.PI;
      const velocity = {
        x: Math.cos(angle) * 30,
        y: Math.sin(angle) * 30,
      };
      bullets.push(
        new Bullets(
          player.x,
          player.y,
          80,
          8,
          {
            x: velocity.x,
            y: velocity.y,
          },
          bulletImage,
          angleConst
        )
      );
      shootSound.currentTime = 0;
      shootSound.play();
    }, 50);
  }
};

document.querySelector(".pause").addEventListener("click", () => {
  cancelAnimationFrame(animateit);
  villainBool = false;
  villainDropProcessBool = false;
  bgMusic.pause();
  document.querySelector(".pause").classList.remove("display");
  document.querySelector(".resume").classList.add("display");
});
document.querySelector(".resume").addEventListener("click", () => {
  console.log("hi");
  animateit = requestAnimationFrame(animate);
  villainBool = true;
  VillainSpawn();
  villainDropProcessBool = true;
  bgMusic.play();
  bgMusic.volume = 0.4;
  // animateMe = requestAnimationFrame(bulletPowerUp);
  // animateUs = requestAnimationFrame(VillainSpawn);
  document.querySelector(".resume").classList.remove("display");
  document.querySelector(".pause").classList.add("display");
});
