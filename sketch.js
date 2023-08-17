var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var bullets = 70;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var life = 3;

function preload(){
  
  //carrege as imagens do atirador parado e atirando
  bgImg = loadImage("assets/bg.jpeg")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg = loadImage("assets/zombie.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
}


function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
  
  heart1= createSprite(displayWidth - 150,40,20,20)
  heart1.visible = false;
  heart1.addImage("heart1", heart1Img);
  heart1.scale = 0.4

  heart2 = createSprite(displayWidth - 100,40,20,20)
  heart2.visible = false;
  heart2.addImage("heart2", heart2Img);
  heart2.scale = 0.4

  heart3= createSprite(displayWidth - 150,40,20,20)
  //heart3.visible = true;
  heart3.addImage("heart3", heart3Img);
  heart3.scale = 0.4

//crie o sprite do jogador de acordo com o exemplo do bg acima e ajuste o tamanho
 player = createSprite(displayWidth - 1200, displayHeight - 300, 50,50)
 player.addImage(shooterImg)
 player.scale = 0.5


 
  player.debug = true
  //player.debug = false
  //player.Debug =false
  //Player.debug = true

  //player.Collider("rectagle",0,0,300,300)
  //player.setcollider("rectangle",0,0)
  player.setCollider("rectangle",0,0,300,300)
  //player.Setcollider("rectangle",0,0,300,300)

  zombieGroup = new Group();
  bulletGroup = new Group();

}

function draw() {
  background(0); 

  if(life === 1){
    heart1.visible = true;
    heart2.visible = false;
    heart3.visible = false;
  }

  if(life === 2){
    heart1.visible = false;
    heart2.visible = true;
    heart3.visible = false;
  }

  if(life === 3){
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = true;
  }

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando touches (toques)
  if(keyDown("UP_ARROW") && player.y > 380||touches.length>0){
    //escreva o código
    player.y -= 30
    console.log(player.y)
  }

  if(keyDown("DOWN_ARROW") && player.y < 630||touches.length>0){
    //escreva o código
    player.y += 30
    console.log(player.y)
  }


//libere as balas e mude a imagem do personagem para a posição de tiro quando a tecla espaço for pressionada
  if(keyWentDown("space")){
    bullet = createSprite(displayWidth - 1150, player.y - 40, 20,10);
    bullet.velocityX = 20;
    bulletGroup.add(bullet);
    bullets = bullets - 1;
    //escreva o código
    player.addImage(shooter_shooting)
  }

//jogador volta pra imagem original quando liberar a tecla espaço
  else if(keyDown("enter")){
  //player.addImage( shooter_shooting )
  //player.addImage()
  player.addImage(shooterImg)
  //player.addImage(shooter_1.png)
  }

if(zombieGroup.isTouching(bulletGroup)){
  for(var i = 0; i < zombieGroup.length; i++ ){
    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
    }
  }
}


if(zombieGroup.isTouching(player)){
  for(var i = 0; i < zombieGroup.length; i++) {
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      life -= 1;
    }
  }
}

  enemy();
drawSprites();

}

function enemy(){
 if(frameCount % 50 === 0){
  zombie = createSprite(random(500,1100), random(300,600), 40,40);
  zombie.addImage(zombieImg);
  zombie.scale = 0.15;
  zombie.velocityX = -3;
  zombie.lifetime = 500;
  zombie.debug = true;
  zombie.setCollider("rectangle", 0,0,400,400);
  zombieGroup.add(zombie);
 }
}


