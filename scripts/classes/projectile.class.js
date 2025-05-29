class Projectile{
    constructor(player){
        this.width = 64;
        this.height = 64;
        this.y = (player.y + (this.height/2)) + 10;
        this.img = new Image();
        this.img.src = "../assets/img/player/projectile/projSheet.png";
        this.spriteWidth = 256;
        this.spriteHeight = 256;
        
        this.gameFrame = 0;
        this.delayFrames = 5;
        this.spriteColumn = 0;
        this.projectileSpeed = 3;
         
        if(player.direction === "right"){
            this.direction = "right";
            this.x = player.x + this.width;
        }else{
            this.direction = "left";
            this.x = player.x;
        }
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
    }

    startProjectile(projectileSpeed){
        this.spritePosition = Math.floor(this.gameFrame/this.delayFrames) % 6;
        this.x += projectileSpeed;
        this.spriteColumn = this.spritePosition*this.spriteWidth;
        this.gameFrame ++;
    }
} 