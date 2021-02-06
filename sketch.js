//variable for knife
var knife,knifeimage;

//variable for score
var score;

//variable for gamestates
var PLAY = 1;
var END = 0;
var gameState  = 1;

//variables for fruits
var fruit1,fruit1image;
var fruit2,fruit2image;
var fruit3,fruit3image;
var fruit4,fruit4image;

//variables for groups of fruits
var fruitgroup;

//variables for enemy.
var monster,monster2,monster1image,monster2image,monsterimage;

//variables for enemygroup
var enemygroup;

//variable for gameover
var gameover,gameoverimage;



//function to load images.
function preload(){
  knifeimage = loadImage("sword.png");  
  
  fruit1image = loadImage("fruit1.png");
  fruit2image = loadImage("fruit2.png");
  fruit3image = loadImage("fruit3.png");
  fruit4image = loadImage("fruit4.png");

  monsterimage = loadAnimation("alien1.png","alien2.png");

  gameoverimage = loadImage("gameover.png");
  
  gameoversound = loadSound("gameover.mp3");
  swooshsound = loadSound("knifeSwooshSound.mp3");
}

//funciton to setup the sprites.
function setup(){
  createCanvas(600,600);
  
  //creation of knife/sword.
  knife = createSprite(50,200,20,20);
  knife.addImage(knifeimage);
  knife.scale = 0.7;
  
//for score
  score = 0;
  
//creating groups of fruits and enemy
  fruitgroup = new Group();
  enemygroup = new Group();
}

//function draw
function draw(){
  
  //to colour the background.
  background("lightblue");
  if(gameState === PLAY){
  
  //to move the knife/sword with mouse.
  knife.x = World.mouseX;
  knife.y = World.mouseY;

  //to display score
  text("Score: "+ score, 250,50); 
  
  //to display fruits and enemy functions.
  fruits();
  enemy();

  //to disappear the fruits if knife touches it and increase score
  if(fruitgroup.isTouching(knife)){
    fruitgroup.destroyEach();
    score = score+2;
    swooshsound.play();
  }
}
  
  // to disappear monsters when knife touches it and decrease score
  if(enemygroup.isTouching(knife)){
    gameState = END;
    gameoversound.play(); 
  }
  
  
  if (gameState === END ){
    knife.addImage(gameoverimage);
    knife.x = 300;
    knife.y = 300;
    fruitgroup.destroyEach();
    enemygroup.destroyEach();
    fruitgroup.setVelocityXEach(0);
    enemygroup.setVelocityXEach(0);
  } 

  // to display the sprites.
  drawSprites();
  }

function fruits (){
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug = true;
    r = Math.round(random(1,4));
    if(r == 1){
      fruit.addImage(fruit1image);
    } else if (r == 2){
      fruit.addImage(fruit2image);
    } else if (r == 2){
      fruit.addImage(fruit3image);
    } else if (r == 2){
      fruit.addImage(fruit4image)
    }
    
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -(7+(score/4));
    fruit.setLifetime = 100;
    fruitgroup.add(fruit);
    }
  
}

function enemy(){
  if(World.frameCount%200 === 0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("Monster",monsterimage);
    monster.y = Math.round(random(100.300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    enemygroup.add(monster);
  }
}


