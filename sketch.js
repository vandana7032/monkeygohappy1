var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var jungle,jungleImage;

function preload(){
  monkey_running=loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungleImage=loadImage("jungle.jpg");

}

function setup() {

ground=createSprite(400,250,900,10)  
ground.velocityX=-7;
ground.x=ground.width/2;
console.log(ground.x);  
  
jungle=createSprite(0,0,400,400);
jungle.addImage(jungleImage); 
jungle.velocityX=-7;  
jungle.x=jungle.width/2;
  
monkey=createSprite(80,250,20,20)  
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.09;  
    
foodGroup=createGroup();
obstacleGroup=createGroup();  
survivalTime=0;  
score=0;  
}

function draw() {
background("white");

  
if(gameState===PLAY){ 

if(jungle.x<0){
jungle.x=jungle.width/2;
}    
  
if(ground.x<0){
ground.x=ground.width/2;
}  
  
  
if(keyDown("space")&& monkey.y >= 200){
monkey.velocityY=-14;
} 
  
monkey.velocityY=monkey.velocityY +0.8;  
  
if(foodGroup.isTouching(monkey)){
foodGroup.destroyEach();
score=score+10;  
  
    switch(score){
      case 10:monkey.scale=0.11;
      break;  
       case 20:monkey.scale=0.14;  
      break;  
      case 30:monkey.scale=0.16;
      break;      
      case 40:monkey.scale=0.020;
      break;  
      default: break;
    }  
}  
  
food();  
spawnObstacle();
  
if(obstacleGroup.isTouching(monkey)){
    gameState=END;
} 
}if(gameState===END){
    stroke("black");
    fill("black")
    textSize(20);    
    text("SurvivalTime: "+survivalTime,200,20)  
    
    ground.velocityX = 0;
    jungle.velocityX = 0;
    
  
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  
    monkey.velocityY=monkey.velocityY +0.8;   
  
    
  }   
  
  
monkey.collide(ground);
  
drawSprites();  
stroke("red");
fill("red")
textSize(20);
text("Score: "+score,100,20);
  
stroke("black");
fill("black")
textSize(20);  
survivalTime=Math.ceil(frameCount/frameRate())  
text("SurvivalTime: "+survivalTime,200,20)  
}

function food(){
if(frameCount %80===0){
banana=createSprite(500,20,10,20)
banana.y=Math.round(random(120,20));
banana.addImage(bananaImage);
banana.velocityX=-4;
banana.scale=0.1; 
banana.lifetime=200;
 
foodGroup.add(banana);  
   }  
}

function spawnObstacle(){
if(frameCount % 300===0){
var obstacle=createSprite(500,210,23,32);
obstacle.velocityX=-5;
obstacle.addImage(obstacleImage); 
obstacle.scale=0.2;  
obstacle.lifetime=200;
obstacle.setCollider("circle", 0, 0, 200);  
  
  obstacleGroup.add(obstacle);
  
   }  
}




