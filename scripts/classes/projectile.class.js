class Projectile{
    constructor(charObj, imgSrc, spriteWidth, spriteHeight){
        this.width = 64;
        this.height = 64;
        this.y = (charObj.y + (this.height/2)) + 10;
        this.direction = "right"
        this.img = new Image();
        this.img.src = imgSrc;
        this.spriteWidth = spriteWidth;
        this.spriteHeight = spriteHeight;
        this.x = charObj.x + this.width;
        this.gameFrame = 0;
        this.delayFrames = 5;
        this.spriteColumn = 0;
        this.projectileSpeed = 3;

        if(charObj.direction === "right"){
            this.direction = "right";
            this.x = charObj.x + this.width;
        }else{
            this.direction = "left";
            this.x = charObj.x;
        }
        this.hitbox_x_right = 25;
        this.hitbox_x_left = 25;
        this.hitboxY = 28;
        this.hitboxWidth = 50;
        this.hitboxHeight = 50;
        this.hitbox = new Hitbox(this);
    }


    update(){
        if(this.direction === "right"){
            this.startProjectile(this.projectileSpeed)
        }else{
            this.startProjectile(-this.projectileSpeed)
        }
       
    }

    draw(){
        ctx.drawImage(this.img, this.spriteColumn, 0, this.spriteWidth, this.spriteHeight,this.x, this.y, this.width, this.height);
        this.hitbox.draw();
    }

    startProjectile(projectileSpeed){
        this.spritePosition = Math.floor(this.gameFrame/this.delayFrames) % 6;
        this.x += projectileSpeed;
        this.spriteColumn = this.spritePosition*this.spriteWidth;
        this.gameFrame ++;
        this.hitbox.update(this);
    }
}