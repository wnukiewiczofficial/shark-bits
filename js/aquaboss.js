class Boss{
    constructor(){
      this.w = width*0.2;
      this.h = height*0.4;
      this.x = width;
      this.y = height/2 - this.h/2;
      this.summoned = false;
      this.dying = false;
      this.speed = width*0.005;
      this.ydir = 1;
      this.hp = 100;

      this.shootingInterval;
    }

    summon(){
      if(this.x > width-(this.w*1.2)) this.x -= this.speed;
      else{
        this.summoned = true;
        this.shootingInterval = setInterval(this.shoot, 3000);
      }
    }

    die(){
      if(this.x < width) this.x += this.speed;
      else{
        score += 50;
        boss = undefined;
      }
    }

    move(){
      this.y -= this.ydir * this.speed/4;
      if(this.y <= height/2 - this.h/2) this.ydir = -1;
      else if(this.y + this.h >= height*0.8) this.ydir = 1;
    }

    stopShooting(){
      clearInterval(this.shootingInterval);
    }

    shoot(){
      tridents.push(new Trident());
    }

    fight(){
      if(this.hp <= 0){
        this.hp = 0;
        if(!this.dying) this.dying = true;
        this.die();
      }

      if(this.x + this.w*0.8 >= shark.x && this.x + this.w*0.2 <= shark.x + shark.w && this.y + this.h*0.9 >= shark.y && this.y + this.h*0.1 <= shark.y + shark.h && !lost){
        lives = 0;
        lost = true;
        background_song.stop();
        die_sound.play();
      }
    }

    draw(){
        image(trident_img, this.x+this.w*0.1, this.y, this.w*0.2, this.h*0.8);
        image(boss_img, this.x, this.y, this.w, this.h);

        //HP indicator
        push();

        fill(0, 200, 0);
        noStroke();
        let hpWidth = map(this.hp, 0, 100, 0, this.w*0.5);
        rect(this.x+this.w*0.5/2, this.y - this.h*0.1, hpWidth, this.h*0.05);

        noFill();
        stroke(0);
        strokeWeight(width*0.002);
        rect(this.x+this.w*0.5/2, this.y - this.h*0.1, this.w*0.5, this.h*0.05);
        pop();
    }
}
