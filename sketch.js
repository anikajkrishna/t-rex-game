var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstaclesgroup;
var cloudsgroup;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var invisibleGround;
var obstacle;
var obstacle1;
var obstacle2;
var obstacle3;
var obstacle4;
var obstacle5;
var obstacle6;
var cloud;
var cloudImg;
var score, gameover, restart,gameOverImg, restartImg;




function preload() {
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trex_collided = loadAnimation("trex_collided.png");
groundImage = loadImage("ground2.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
cloudImg = loadImage ("cloud.png");
restartImg = loadImage ("restart.png");
gameOverImg = loadImage ("gameOver.png");
}

function setup() {
createCanvas(600, 200);
//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("collided",trex_collided);
trex.scale = 0.5;
//create a ground sprite
ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -4;
invisibleGround = createSprite (200,190,400,20);
invisibleGround.visible = false;
restart = createSprite (300,140);
gameover = createSprite (290,100);
restart.addImage(restartImg);
gameover.addImage(gameOverImg);

restart.scale = 0.5;
gameover.scale = 0.5;

restart.visible = false;
gameover.visible = false;

obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
  trex.setCollider("circle",0,0,35);
 
  //trex.debug = true;

  score = 0;
}



function draw() {
background(180);
trex.collide(invisibleGround);
drawSprites();
text ("Score: "+score,500,20);

if(gameState === PLAY){
//jump when the space button is pressed
        if (keyDown("space")&& trex.y >= 150)                            {
        trex.velocityY = -12;
        }


trex.velocityY = trex.velocityY + 0.7
        if (ground.x < 0) {
                ground.x = ground.width / 2;
                }
 if(obstaclesGroup.isTouching(trex)){
                        gameState = END;
                    }
spawnCloud();
spawnObstacles();
score = score + 1;


}



if(gameState === END){

        ground.velocityX = 0;
        trex.velocityY = 0
        trex.changeAnimation("collided", trex_collided);

        obstaclesGroup.setVelocityXEach(0);
        cloudsGroup.setVelocityXEach(0);

        obstaclesGroup.setLifetimeEach(-1);
        cloudsGroup.setLifetimeEach(-1);
        restart.visible = true;
        gameover.visible = true;

        if(mousePressedOver(restart)) {
                reset();
              }
        
}

}

function spawnCloud(){
    if (frameCount % 60 === 0){   
cloud = createSprite (600,60,10,10);
cloud.y = Math.round(random(30,90));
cloud.velocityX = -4;
cloud.addImage(cloudImg);
cloud.scale = 0.1;
cloud.lifetime = 150;
cloud.depth = trex.depth;
trex.depth = trex.depth + 1;
cloudsGroup.add(cloud);
    }
}


function spawnObstacles(){
    if (frameCount % 80 === 0){   
obstacle = createSprite (600,160,10,10);
obstacle.velocityX = -4;

num = Math.round(random(1,6));
console.log(num);
switch(num) {
    case 1: obstacle.addImage(obstacle1);
            obstacle.scale = 0.1;
            break;
    case 2: obstacle.addImage(obstacle2);
            obstacle.scale = 0.1;
            break;
    case 3: obstacle.addImage(obstacle3);
            obstacle.scale = 0.1;
            break;
    case 4: obstacle.addImage(obstacle4);
            obstacle.scale = 0.04;
            break;
    case 5: obstacle.addImage(obstacle5);
            obstacle.scale = 0.05;
            break;
    case 6: obstacle.addImage(obstacle6);
            obstacle.scale = 0.1;
            break;
    default: break;
  }


obstacle.lifetime = 150;
obstaclesGroup.add(obstacle);
    }
}



function reset(){

gameState = PLAY;
gameover.visible = false;
  restart.visible = false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  ground.velocityX = -4;
 



}