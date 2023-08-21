var rock1Img, rock2Img, rock3Img;
var backgroundImg;
var tuskenRaiderImg;
var rocks,rocksGroup;
var tuskenRaider,tuskenRaiderGroup;
var podracer, podracerImg;
var gamestate = 1;
var rank = 5;


function preload()
{
  backgroundImg = loadImage("assets/background.jpeg");
  rock1Img = loadImage("assets/ufo.png");
  rock2Img = loadImage("assets/asteroid.png");
  rock3Img = loadImage("assets/satellite.png");
  tuskenRaiderImg = loadImage("assets/alien.png");
  podracerImg = loadImage("assets/rocket.png");
}

function setup()
{
createCanvas(windowWidth, windowHeight);
podracer = createSprite(width/2, height/2 + 250, 10, 10);
podracer.addImage(podracerImg);
podracer.debug = true;
podracer.setCollider("rectangle", 0, 0, 20, 50);
rocksGroup = new Group()
tuskenRaiderGroup = new Group()

}

function draw()
{
  background(backgroundImg);

  if(gamestate == 1){
  createRocks();
  createTuskenRaider();
  movePlayer();
 
  rank = rank + round(frameRate/60)
  
  if(podracer.position.x <= 0){
    podracer.position.x = 15
  }

  if(podracer.position.x >= width - 20){
    podracer.position.x = width-45
  }

  if(podracer.isTouching(rocksGroup)|| podracer.isTouching(tuskenRaiderGroup)){
    gamestate = 2;
  }
}
displayRank();
drawSprites();
  console.log(gamestate);
if(gamestate == 2)
{
  gameOver();
}
}

function createRocks()
{
  if(frameCount%130==0)
  {
  rocks = createSprite(Math.round(random(50,width-40)),0,10,10);
  var img = Math.round(random(1,3));
  //console.log(frameCount);
    rocksGroup.add(rocks)
  switch(img)
  {
    case 1:
      rocks.addImage(rock1Img);
      break;
    case 2:
      rocks.addImage(rock2Img);
      break;
    case 3:
      rocks.addImage(rock3Img);
      break;
  }
  rocks.velocityY = 3;
  rocks.lifetime = 400/3;
}
}

function createTuskenRaider()
{
  if(frameCount%250==0)
  {
  tuskenRaider = createSprite(Math.round(random(50,width-40)),0,10,10);
  tuskenRaider.addImage(tuskenRaiderImg);
  tuskenRaider.velocityY = 4;
  tuskenRaider.lifetime = 1000/4;
  tuskenRaider.scale = 0.3;
  tuskenRaiderGroup.add(tuskenRaider);
  }
}

function movePlayer() {
if(gamestate == 1){
  if(keyIsDown(LEFT_ARROW)){
    podracer.position.x -= 5;
  }

  if(keyIsDown(RIGHT_ARROW)){
    podracer.position.x += 5;
  }
}
}

function displayRank() {
  textSize(27);
 text("Rank: " + rank, width - 150, 50);
}

function gameOver() {
    tuskenRaiderGroup.setVelocityYEach(0);
    rocksGroup.setVelocityYEach(0);
    tuskenRaiderGroup.setLifetimeEach(-1);
    rocksGroup.setLifetimeEach(-1);
    swal({
      title: `Game Over`,
      text: "Oops you died....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
}