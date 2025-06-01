class SmallDragon extends Enemie{
    constructor(world, x, y){
        super(world, x, y);
        this.height = 200;
        this.width = 200;
        this.img = new Image();
        this.img.src = "./assets/img/enemies/smallDragon/completeSheet.png"
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.spriteRow = 0;
        this.spriteColumn = 0;
        this.speed = 1;
        this.isMoving = true;
        this.isAttacking = false;
        this.isHurt = false;
        this.gameFrame = 0;
        this.delayFrames = 25;
        this.hitboxY = 40;
        this.hitboxWidth = 100;
        this.hitboxHeight = 150;
        this.hitbox_x_right = 5;
        this.hitbox_x_left = 20;
        this.direction = "right";
        this.hitbox = new Hitbox(this);
        this.projectiles = [];
        this.cooldown = false;
        this.hp = 10;
        this.isDead = false;
        this.attackCooldown = 4;
    }

    update(){
        this.checkHitpoints();
        this.checkDirection();
        this.moveUp();
        this.attack();
        if(!this.isMoving && !this.isAttacking && !this.isDead){
            this.spriteRow = 1;
            this.calculateGameFrame();
        }
        if(this.isMoving && !this.isAttacking && !this.isDead){
            this.spriteRow = 4;
            this.calculateGameFrame();
        }
        if(this.isAttacking && !this.isDead){
            this.spriteRow = 2;
            this.calculateGameFrame();
        }
        if(this.isHurt && !this.isDead){
            this.spriteRow = 3;
            this.calculateGameFrame();
        }

        this.hitbox.update(this);
    }

    draw(){
        ctx.drawImage(this.img, this.spriteColumn, this.spriteRow * this.spriteWidth, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight)
        this.hitbox.draw();
    }

    checkDirection(){
        if(this.direction === "right"){
            this.img.src = "./assets/img/enemies/smallDragon/completeSheet.png";
        }else{
            this.img.src = "./assets/img/enemies/smallDragon/completeSheetReverse.png"
        }
    }

    calculateGameFrame(){
        if(this.spriteRow === 1){
            this.delayFrames = 25;
            this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 3);
            this.spriteColumn = this.spritePosition * this.spriteWidth;
            this.gameFrame ++;
        }
        if(this.spriteRow === 2){
            this.delayFrames = 25;
            this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 3);
            this.spriteColumn = this.spritePosition * this.spriteWidth;
            if(this.spritePosition === 2){
                this.projectiles.push(new Projectile(this, "./assets/img/enemies/smallDragon/projectileSheet.png", 64, 64, 8))
                this.isAttacking = false;
            }
            this.gameFrame++;
        }
        if(this.spriteRow === 4){
            this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 4)
            this.spriteColumn = this.spritePosition * this.spriteWidth;
            this.gameFrame ++;
        }
        if(this.spriteRow === 0){
            this.delayFrames = 50;
            this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 4);
            this.spriteColumn = this.spritePosition * this.spriteWidth;
            if(this.spritePosition === 3){
                const deleteThis = this.world.enemies.findIndex(enemy => enemy === this);
                if (deleteThis !== -1) {
                    setTimeout(()=>{
                        this.world.enemies.splice(deleteThis, 1);
                    }, 2000)
                    return
                }
        }
         this.gameFrame ++;
         this.calculateGameFrame();
    }
    if(this.spriteRow === 3){
        this.delayFrames = 100;
        this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 2)
        this.spriteColumn = this.spritePosition * this.spriteWidth;
        if(this.spritePosition === 1){
            this.isHurt = false;
        }
        this.gameFrame++
    }
}

    moveUp(){
        if(this.isAttacking || this.isDead || this.isHurt) return
        if(this.x + this.width < this.world.player.x){
            this.isMoving = true;
            this.direction = "right";
            this.x += this.speed;
        }else if(this.x > this.world.player.x + this.world.player.width){
            this.isMoving = true;
            this.direction = "left";
            this.x -= this.speed;
        }else{
            this.isMoving = false;
        }
   }

   attack(){
    if(!this.cooldown && !this.isDead && !this.isHurt)
        if(this.x >= this.world.x && this.x + this.width <= this.world.x + this.world.width){
            this.isAttacking = true;
            this.cooldown = true;
            this.gameFrame = 0;
            setTimeout(()=>{
               this.cooldown = false;
            }, this.attackCooldown * 1000);
        }
   }

   checkHitpoints(){
    if(this.hp === 0 && !this.isDead){
        this.isDead = true;
        this.spriteRow = 0;
        this.gameFrame = 0;
        this.calculateGameFrame();
    }
   }
}