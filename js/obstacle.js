function Obstacle(y){
  this.enemy = true;
  this.w = this.enemy ? width*0.12 : width*0.08;
  this.h = this.enemy ? width*0.1 : width*0.08;
  this.x = round(random(width, width*2));
  this.y = y;
  this.img = enemies_img[floor(random(0, enemies_img.length))];
  this.speed = random(width*0.002, width*0.004);
  this.draw = function(){
    fill(255,255,0);
    image(this.img, this.x, this.y, this.w, this.h);
  };
  this.move = function(){
    if(!lost) this.x-=this.speed;
    if(this.x + this.w < 0){
      this.x = width;
      this.speed = random(width*0.004, width*0.006);
      this.enemy = round(random(0, 1)) == 0 ? false : true;
      this.w = this.enemy ? width*0.12 : width*0.08;
      this.h = this.enemy ? width*0.1 : width*0.08;
      this.img = enemies_img[floor(random(0, enemies_img.length))];
    }
  };
  this.collision = function(){
    if(shark.x + shark.w*0.8 >= this.x + this.w*0.2 && shark.x + shark.w*0.2 <= this.x + this.w*0.8 &&
       shark.y + shark.h*0.7 >= this.y + this.h*0.6 && shark.y <= this.y + this.h && !lost){
        this.die();
        lives--;
        if(lives == 0){
          if(boss) boss.stopShooting();
          lost = true;
          background_song.stop();
          die_sound.play();
        }
    }
  };

  this.die = function(){
    this.x = round(random(width, width*2));
    kill_sound.play();
  };
}
