var bg, bgImg;
var bottomGround;
var topGround;
var balloon, balloonImg;
var obstacleTop, obsTop1, obsTop2;
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3;
var gameOverIMG, restartIMG;
var dieSound, jumpSound;
var gameState = "PLAY";
var invisbleGround;

function preload() {
  bgImg = loadImage("assets/bg.png");

  balloonImg = loadAnimation(
    "assets/balloon1.png",
    "assets/balloon2.png",
    "assets/balloon3.png"
  );

  obsTop1 = loadImage("assets/obsTop1.png");
  obsTop2 = loadImage("assets/obsTop2.png");

  obsBottom1 = loadImage("assets/obsBottom1.png");
  obsBottom2 = loadImage("assets/obsBottom2.png");
  obsBottom3 = loadImage("assets/obsBottom3.png");

  gameOverIMG = loadImage("assets/gameOver.png");

  restartIMG = loadImage("assets/restart.png");

  dieSound = loadSound("assets/die.mp3");

  jumpSound = loadSound("assets/jump.mp3");
}

function setup() {
  createCanvas(400, 400);
  //background image
  bg = createSprite(165, 485, 1, 1);
  bg.addImage(bgImg);
  bg.scale = 1.3;

  obstacleGroup = new Group();

  //creating top and bottom grounds
  bottomGround = createSprite(200, 390, 800, 20);
  bottomGround.visible = false;

  topGround = createSprite(200, 10, 800, 20);
  topGround.visible = false;

  //creating balloon
  balloon = createSprite(100, 100, 20, 50);
  balloon.addAnimation("balloon", balloonImg);
  balloon.scale = 0.15;

  gameover = createSprite(200, 150, 50, 50);
  gameover.addImage(gameOverIMG);
  gameover.scale = 0.5;

  restart = createSprite(200, 200, 30, 30);
  restart.addImage(restartIMG);
  restart.scale = 0.3;

  gameover.visible = false;
  restart.visible = false;

  invisibleGround = createSprite(200, 350, 400, 10);
  invisibleGround.visible = false;
}

function draw() {
  background("black");

  if (gameState == "PLAY") {
    restart.visible = false;
    gameover.visible = false;
    balloon.visible = true;
    if (keyDown("space")) {
      balloon.velocityY = -6;
      jumpSound.play();
      jumpSound.setVolume(0.1);
    }

    balloon.velocityY = balloon.velocityY + 2;

    Bar();

    spawnObstaclesTop();

    spawnObstaclesBottom();

    if (balloon.isTouching(obstacleGroup)) {
      gameState = "END";
      dieSound.play();
    }
  }
  if (gameState == "END") {
    gameover.visible = true;

    restart.visible = true;

    obstacleGroup.setVelocityXEach(0);

    balloon.visible = false;

    obstacleGroup.setLifetimeEach(-1);

    if (mousePressedOver(restart)) {
      restartGame();
    }
  }
  balloon.collide(invisibleGround);
  drawSprites();
}

function restartGame() {
  gameState = "PLAY";
  obstacleGroup.destroyEach();
}

function spawnObstaclesTop() {
  if (World.frameCount % 60 === 0) {
    obstacleTop = createSprite(400, 50, 40, 50);

    obstacleTop.scale = 0.05;
    obstacleTop.velocityX = -4;

    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(30, 70));

    //generate random top obstacles
    var rand = Math.round(random(1, 2));
    switch (rand) {
      case 1:
        obstacleTop.addImage(obsTop1);
        break;
      case 2:
        obstacleTop.addImage(obsTop2);
        break;
      default:
        break;
    }

    //assign lifetime to the variable
    obstacleTop.lifetime = 100;

    balloon.depth = balloon.depth + 1;

    obstacleGroup.add(obstacleTop);
  }
}

function spawnObstaclesBottom() {
  if (World.frameCount % 60 === 0) {
    obstacleBottom = createSprite(400, 300, 50, 50);

    obstacleBottom.velocityX = -4;
    obstacleBottom.scale = 0.05;

    var rand = Math.round(random(1, 3));
    switch (rand) {
      case 1:
        obstacleBottom.addImage(obsBottom1);
        break;
      case 2:
        obstacleBottom.addImage(obsBottom2);
        break;
      case 3:
        obstacleBottom.addImage(obsBottom3);
        break;
    }
    obstacleBottom.lifetime = 100;
    obstacleGroup.add(obstacleBottom);
  }
}
function Bar() {
  if (World.frameCount % 60 === 0) {
    var bar = createSprite(400, 200, 10, 800);
    bar.velocityX = -6;
    bar.depth = balloon.depth;
    bar.lifetime = 70;
    bar.visible = false;
  }
}
