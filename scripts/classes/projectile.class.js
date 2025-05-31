class Projectile{
    constructor(charObj, imgSrc, spriteWidth, spriteHeight, spriteAmount){
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
        this.spriteAmount = spriteAmount;
        this.charObj = charObj;
        this.hitbox_x_right = 25;
        this.hitbox_x_left = 25;
        this.hitboxY = 28;
        this.hitboxWidth = 50;
        this.hitboxHeight = 50;
        this.hitbox_x_left;
        this.hitbox = new Hitbox(this)

        if(charObj.direction === "right"){
            this.direction = "right";
            this.x = charObj.x + this.width;
            this.hitboxX = this.hitbox.x_right;
        }else{
            this.direction = "left";
            this.x = charObj.x;
            this.hitboxX = this.hitbox.x_left;
        }
       ;
    }


    update(){
        if(this.direction === "right"){
            this.startProjectile(this.projectileSpeed)
        }else{
            this.startProjectile(-this.projectileSpeed)
        }
        this.checkCollision();
       
    }

    draw(){
        ctx.drawImage(this.img, this.spriteColumn, 0, this.spriteWidth, this.spriteHeight,this.x, this.y, this.width, this.height);
        this.hitbox.draw();
    }

    startProjectile(projectileSpeed){
        this.spritePosition = Math.floor(this.gameFrame/this.delayFrames) % this.spriteAmount;
        this.x += projectileSpeed;
        this.spriteColumn = this.spritePosition*this.spriteWidth;
        this.gameFrame ++;
        this.hitbox.update(this);
    }

    checkCollision() {
    if (this.charObj instanceof Player) {
        this.charObj.world.enemies.forEach(enemy => {
            if(this.hitbox.x < enemy.hitbox.x + enemy.hitbox.width &&
                this.hitbox.x + this.hitbox.width > enemy.hitbox.x &&
                this.hitbox.y < enemy.hitbox.y + enemy.hitbox.height &&
                this.hitbox.y + this.hitbox.height > enemy.hitbox.y
            ){
                enemy.hp -= 1;
                enemy.isHurt = true;
                enemy.gameFrame = 0;
                const deleteThis = this.charObj.projectiles.findIndex(proj => proj === this);
                if(deleteThis !== -1){
                    this.charObj.projectiles.splice(deleteThis, 1);
                }
            }
        });
    }else{
        if(this.hitbox.x < this.charObj.world.player.hitbox.x + this.charObj.world.player.hitbox.width &&
                this.hitbox.x + this.hitbox.width > this.charObj.world.player.hitbox.x &&
                this.hitbox.y < this.charObj.world.player.hitbox.y + this.charObj.world.player.hitbox.height &&
                this.hitbox.y + this.hitbox.height > this.charObj.world.player.hitbox.y
            ){
                this.charObj.world.player.hp -= 1;
                this.charObj.world.player.isHurt = true;
                this.charObj.world.player.gameFrame = 0;
                const deleteThis = this.charObj.projectiles.findIndex(proj => proj === this);
                if(deleteThis !== -1){
                    this.charObj.projectiles.splice(deleteThis, 1);
                }
    }
}
}
}