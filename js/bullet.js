class Bullet{
  constructor(){
    this.w = shark.w * 0.06;
    this.h = shark.w * 0.02;
    this.x = shark.x + shark.gun.x * cos(shark.tilt);
    this.y = shark.y + shark.gun.x * sin(shark.tilt);
    this.vel = width*0.015;
    this.dir = atan2(mouseY - this.y, mouseX - this.x);
    this.rot = shark.turn == "right" ? shark.tilt : -shark.tilt;
  }

  draw(){
    push();
    fill(0);
    noStroke();
    translate(this.x, this.y);
    rotate(this.rot);
    ellipse(0, 0, this.w, this.h);
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
    let hit = false;
    obstacles.forEach(enemy => {
      if(this.x + this.w >= enemy.x && this.x <= enemy.x + enemy.w && this.y + this.h >= enemy.y && this.y <= enemy.y + enemy.h){
        score++;
        if(score == 2 && !boss) boss = new Boss();
        enemy.die();
        hit = true;
      }
    });

    tridents.forEach(trident => {
      if(this.x + this.w >= trident.x && this.x <= trident.x + trident.h && this.y + this.h >= trident.y && this.y <= trident.y + trident.w){
        hit = true;
      }
    });

    if(boss && this.x + this.w >= boss.x && this.x <= boss.x + boss.w && this.y + this.h >= boss.y && this.y <= boss.y + boss.h){
      if(!boss.dying){
        boss.hp -= random(1, 2);
        kill_sound.play();
      }
      hit = true;
    }
    return hit;
  }
}
