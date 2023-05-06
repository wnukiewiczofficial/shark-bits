var canvas;

var score = 0;
var lives = 3;
var lost = false;
var gameStopped = false;


var scene = "menu";

var boss;

var shark;
var obstacles = [];

var bullets = [];
var tridents = [];

//Buttons
var playBtn;

var menu_bg_img = [];
var enemies_img = [];
var shark_img = [];
var gun_img;
var bg_img = [];

var boss_img;
var trident_img;

//Musuic
var background_song;
var kill_sound;
var shoot_sound;
var die_sound;

var bg = [], bgmid = [], bgfor = [];

function preload(){
  menu_bg_img[0] = loadImage('images/menu/background.png');
  menu_bg_img[1] = loadImage('images/menu/title.png');
  menu_bg_img[2] = loadImage('images/menu/play.png');

  bg_img[0] = loadImage('images/level1/lvl1a.png');
  bg_img[1] = loadImage('images/level1/lvl1b.png');
  bg_img[2] = loadImage('images/level1/lvl1c.png');
  bg_img[3] = loadImage('images/level1/lvl1d.png');
  bg_img[4] = loadImage('images/level1/mid.png');
  bg_img[5] = loadImage('images/level1/for.png');

  //Enemies
  for(let i = 1; i <= 5; i++) enemies_img[i-1] = loadImage(`images/enemies/${i}.png`);

  //Boss
  boss_img = loadImage('images/bosses/boss.png');
  trident_img = loadImage('images/bosses/trident.png');

  shark_img[0] = loadImage('images/shark/shark1.png');
  shark_img[1] = loadImage('images/shark/shark2.png');
  shark_img[2] = loadImage('images/shark/shark3.png');
  shark_img[3] = loadImage('images/shark/shark4.png');
  gun_img = loadImage('images/gun.png');

  //Sounds
  background_song = loadSound('sounds/background.wav');
  background_song.setVolume(0.2);
  shoot_sound = loadSound('sounds/shoot.wav');
  shoot_sound.setVolume(0.1);
  kill_sound = loadSound('sounds/kill.wav');
  die_sound = loadSound('sounds/die.wav');
}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  if(width < height){
    background_song.pause();
    gameStopped = true;
    document.querySelector('#rotInfo').style.display = "block";
    canvas.hide();
  } else{
    document.querySelector('#rotInfo').style.display = "none";
    canvas.show();
    gameStopped = false;
    if(scene == "game" && !background_song.isPlaying()) background_song.play();
  }
  shark = new Shark();

  playBtn = new Button(width*0.6,height*0.6,width*0.2,height*0.1);

  for(let i = 0; i < 5; i++){
  obstacles.push(new Obstacle(i*(height/5)));
  }

  for(let i = 0; i < 4; i++){
    bg.push(new Background(i*width, bg_img[i], bg));
  }
  for(let i = 0; i < 2; i++){
    bgmid.push(new Background(i*width, bg_img[4], bgmid));
    bgfor.push(new Background(2*i*width+width, bg_img[5], bgfor));
  }

  textFont('VT323');
  pixelDensity(1);

  document.querySelector('.lds-ring').style.display = "none";
}

function draw() {

  if(scene == "game"){
    bg.forEach(view => {
      view.update();
    });
    bgmid.forEach(view => {
      view.update();
    });
    bgfor.forEach(view => {
      view.update();
    });


    shark.draw();
    if(!gameStopped) shark.move();

    obstacles.forEach(obstacle => {
      if(!gameStopped) obstacle.move();
      if(!lost) obstacle.collision();
      obstacle.draw();
    });

    for(let i in bullets){
      if(!gameStopped && !lost) bullets[i].move();
      bullets[i].draw();
      if(bullets[i].outOfBounds() || bullets[i].hit()) bullets.splice(i, 1);
    }

    for(let i in tridents){
      if(!gameStopped) tridents[i].move();
      tridents[i].draw();
      if(tridents[i].outOfBounds() || tridents[i].hit()) tridents.splice(i, 1);
    }
  }

  if(boss){
    boss.draw();
    if(!boss.summoned) boss.summon();
    else{
      if(!boss.dying) boss.move();
      boss.fight();
    }
  }

  UI();
}

function windowResized(){
  resizeCanvas(window.innerWidth, window.innerHeight);
  if(width < height){
    background_song.pause();
    gameStopped = true;
    document.querySelector('#rotInfo').style.display = "block";
    canvas.hide();
  } else{
    document.querySelector('#rotInfo').style.display = "none";
    canvas.show();
    gameStopped = false;
    if(scene == "game" && !background_song.isPlaying()) background_song.play();
  }

  for(let i = 0; i < 4; i++){
    bg[i].x = i*width;
  }
  for(let i = 0; i < 2; i++){
    bgmid[i].x = i*width;
    bgfor[i].x = 2*i*width+width;
  }

  if(boss){
    boss.w = width*0.2;
    boss.h = height*0.4;
    boss.x = width-(boss.w*1.2);
  }

  playBtn = new Button(width*0.6,height*0.6,width*0.2,height*0.1);
}

function mouseClicked(){
  if(!gameStopped && !touches.length){
    if(scene == "menu"){
      if(playBtn.clicked(mouseX, mouseY)){
        scene = "game";
        noCursor();
        background_song.loop();
      }
    }else{
      if(lost){
        lost = false;
        lives = 3;
        score = 0;
        shark = new Shark();
        boss = undefined;
        bg = [];
        bullets = [];
        tridents = [];
        for(let i = 0; i < 4; i++) bg.push(new Background(i*width, bg_img[i], bg));
        background_song.loop();
      }
      else{
        bullets.push(new Bullet());
        shoot_sound.play();
      }
    }
  }
}

function mouseMoved(){
  if(scene == "menu"){
    if(playBtn.clicked(mouseX, mouseY)) cursor("pointer");
    else cursor("default");
  }
}

function touchStarted(){
  if(!gameStopped){
    if(scene == "menu"){
      if(playBtn.clicked(mouseX, mouseY)){
        scene = "game";
        noCursor();
        background_song.loop();
      }
    }else{
      if(lost){
        lost = false;
        lives = 3;
        score = 0;
        shark = new Shark();
        boss = undefined;
        bg = [];
        bullets = [];
        tridents = [];
        for(let i = 0; i < 4; i++) bg.push(new Background(i*width, bg_img[i], bg));
        background_song.loop();
      }
      else if(touches.length > 1){
        bullets.push(new Bullet());
        shoot_sound.play();
      }
    }
  }
}

function UI(){

  if(scene == "game"){
    fill(0);
    stroke(255);
    strokeWeight(width*0.002);
    textAlign(RIGHT, TOP);
    textSize(width*0.06);
    text(`Score: ${score}`, width, 0);
    textAlign(LEFT, TOP);
    text(`Lives: ${lives}`, 0, 0);

    if(lost){
      fill(200,0,0);
      stroke(0);
      textAlign(CENTER, CENTER);
      text(`You lost!`, width/2, height/2);
      text(`Click to restart...`, width/2, height/2+textAscent());
    }
  }
  else{
    image(menu_bg_img[0],0,0,width,height);
    image(menu_bg_img[1],width*0.45,height*0.1,width*0.5,height*0.4);
    image(menu_bg_img[2],width*0.6,height*0.6,width*0.2,height*0.1);
  }
}

function Button(x, y, width, height){
  this.x = x;
  this.y = y;
  this.w = width;
  this.h = height;
  this.clicked = function(mx, my){
    if(mx >= this.x && mx <= this.x+this.w && my >= this.y && my <= this.y+this.h) return true;
    else return false;

  }
}

function Background(x, img, bgarr){
  this.x = x;
  this.img = img;
  this.speed = bgarr == bgfor ? width*0.003 : bgarr == bgmid ? width*0.002 : width*0.001;
  this.bgarr = bgarr;
  this.update = function(){
    if(!lost && !gameStopped) this.x -= this.speed;
    if(this.x + width < 0) this.x = (this.bgarr.length-1) * width - this.speed;
    image(this.img, this.x, 0, width, height);
  }
}

function getMouseVector(x, y){
	let mouseXalt = mouseX - x;
	let mouseYalt = mouseY - y;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}

 document.addEventListener('contextmenu', event => event.preventDefault());
