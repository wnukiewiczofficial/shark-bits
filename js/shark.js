function Shark(){
  this.w = width*0.12;
  this.h = width*0.12;
  this.x = width*0.2;
  this.y = height*0.8;
  this.speed = width > height ? height*0.003 : width*0.003;
  this.xvel = 0;
  this.xcvel = width*0.00005;
  this.yvel = 0;
  this.ycvel = width*0.00005;
  this.tilt = 0;
  this.turn = "right";
  this.imgI = 3;
  this.imgHandler = -1;
  this.frameCounter = 0;
  this.gun = {x: this.w*0.15, y: this.w*0.05, w: this.w*0.3, h: this.w*0.2}; /// Related to shark

  this.draw = function(){
    push();
    translate(this.x, this.y);
    if(lost){
      if(this.turn == "left") scale(-1, 1);
      scale(1, -1);
      rotate(PI/2)
    }
    else{
      if(this.turn == "left") scale(-1, 1);
      else scale(1, 1);
      if(this.turn == "right")rotate(PI/4 - PI/12);
      else rotate(-PI/2 - PI/4 - PI/12);
      rotate(this.tilt);
    }


    if(!lost){
      this.frameCounter++;
      if(this.frameCounter > 10){
        this.frameCounter = 0;
        this.imgI+=this.imgHandler;
        if(this.imgI >= shark_img.length-1) this.imgHandler = -1;
        else if(this.imgI <= 0) this.imgHandler = 1;
      }
    } else this.imgI = 0;
    image(shark_img[this.imgI], -this.w/2, -this.h/2, this.w, this.h);

    push();
    rotate(-PI/4);
    image(gun_img, this.gun.x, this.gun.y, this.gun.w, this.gun.h);
    pop();

    pop();
  };
  this.move = function(){
    this.tilt = atan2(mouseY - this.y, mouseX - this.x);
    if(this.turn == "left") this.tilt *= -1;
    if(!lost && !touches.length){
      if(keyIsDown(UP_ARROW)  || keyIsDown(87)){
        if(abs(shark.yvel) <= width*0.002) shark.yvel -= width*0.0002;
      }
      if(keyIsDown(DOWN_ARROW) || keyIsDown(83)){
        if(abs(shark.yvel) <= width*0.002) shark.yvel += width*0.0002;
      }
      if(keyIsDown(LEFT_ARROW) || keyIsDown(65)){
        if(abs(shark.xvel) <= width*0.002) shark.xvel -= width*0.0002;
      }
      if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)){
        if(abs(shark.xvel) <= width*0.002) shark.xvel += width*0.0002;
      }
    }

    if(touches.length && !lost){
      let vec = createVector((touches[0].x - shark.x)/100, (touches[0].y - shark.y)/100);
      shark.xvel += constrain(vec.x*width*0.0002, -width*0.0002, width*0.0002);
      shark.yvel += constrain(vec.y*width*0.0002, -width*0.0002, width*0.0002);
    }

    if(!lost){
      if(mouseX > this.x) shark.turn = "right";
      else shark.turn = "left";
    }

    if(this.xvel > 0) this.xvel -= this.xcvel;
    else if(this.xvel < 0) this.xvel += this.xcvel;
    this.x += this.xvel * this.speed;

    if(this.yvel > 0) this.yvel -= this.ycvel;
    else if(this.yvel < 0) this.yvel += this.ycvel;
    this.y += this.yvel * this.speed;

    if(this.x - this.w/2< 0){
      this.x = this.w/2;
      this.xvel *= -1;
    }
    if(this.x + this.w/2 > width){
      this.x = width - this.w;
      this.xvel *= -1;
    }
    if(this.y - this.h/2 < 0){
      this.y = this.h/2;
      this.yvel *= -1;
    }
    if(this.y + this.h/2 > height){
      this.y = height - this.h/2;
      this.yvel *= -1;
    }
  };
}
