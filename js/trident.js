class Trident{
  constructor(){
    this.w = boss.w * 0.2;
    this.h = boss.h * 0.5;
    this.x = boss.x;
    this.y = boss.y + boss.h/2;
    this.vel = width*0.006;
    this.dir = atan2(shark.y - this.y, shark.x - this.x);
    this.rot = atan2(shark.y - this.y, shark.x - this.x) + PI/2;
    this.img = trident_img;
  }

  draw(){
    push();
    translate(this.x, this.y);
    rotate(this.rot);
    image(this.img, 0, 0, this.w, this.h);
    pop();
  }

  move(){
    this.x+= cos(this.dir)*this.vel;
    this.y+= sin(this.dir)*this.vel;
  }

  outOfBounds(){
    return (this.x + this.w <= 0 || this.x >= width || this.y + this.h <= 0 || this.y >= height);
  }

  hit(){
    if(this.x + this.h >= shark.x + shark.w*0.2 && this.x <= shark.x + shark.w*0.5 && this.y + this.w >= shark.y + shark.h*0.1 && this.y <= shark.y + shark.h*0.6 && !lost){
      lives--;
      if(lives == 0){
        boss.stopShooting();
        lost = true;
        background_song.stop();
        die_sound.play();
      }
      return true;
    }
  }
}
