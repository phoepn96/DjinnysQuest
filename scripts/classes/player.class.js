class Player extends Character{
    constructor(world, x, y){
        super(world, x, y);
        this.width = 90;
        this.height = 120;
        this.hp = 5;
        this.controller = new Controller(this);
        this.direction = "right";
        this.isMoving = false;
        this.isJumping = false;
        this.speed = 5;
        this.velocity = 15;
        this.weight = 2;
        this.isAttacking = false;
        this.isHurt = false;
        this.projectiles = [];

        this.imgRight = new Image();
        this.imgRight.src = "./assets/img/player/completeCharSheet.png";
        this.imgLeft = new Image();
        this.imgLeft.src = "./assets/img/player/completeCharSheetFlipped.png"
        this.img = this.imgRight;
        this.lifebarImg = new Image();
        this.lifebarImg.src = "./assets/img/player/lifebar.png"

        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.spriteRow = 1;
        this.spriteColumn = 0;
        this.gameFrame = 0;
        this.delayFrames = 10;
        this.spritePosition;
        this.shotReady = false;
        this.cooldown = false;


        this.hitboxY= 22;
        this.hitboxWidth = 35;
        this.hitboxHeight = 22;
        this.hitbox_x_right = 20;
        this.hitbox_x_left = (this.width/2) +10;
        this.hitbox = new Hitbox(this);



    }

    update(){
        if(this.direction === "right"){
            this.img = this.imgRight;
            this.checkAnimation(this.speed, this.velocity)
        }else{
            this.img = this.imgLeft;
            this.checkAnimation(-this.speed, this.velocity)
        }
        this.hitbox.update(this);
        this.checkLifebar();
        this.checkHp();
    }

    draw(){
        ctx.drawImage(this.img, this.spriteColumn, this.spriteRow * this.spriteWidth, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
        ctx.drawImage(this.lifebarImg, this.lifebarPosition*256.7, 0, 140, 229.83, 100, 10, 150, 256.7, 140);
        this.hitbox.draw(this);
    }

    calculateGameFrame(){
        if(this.spriteRow === 0 || this.spriteRow === 3 || this.spriteRow === 4){
            this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 4) + 1;
            this.spriteColumn = this.spritePosition * this.spriteWidth;
            this.gameFrame ++;
        }
        if(this.spriteRow === 2){
            this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 2) + 2;
            this.spriteColumn = this.spritePosition * this.spriteWidth;
            
            if(this.spritePosition === 3){
                this.isHurt = false;
            }
            this.gameFrame ++;
        }
        if(this.spriteRow === 1){
             this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 5);
             this.spriteColumn = this.spritePosition * this.spriteWidth;
            if(this.spritePosition === 4){
                console.log("YOU DIED");
                stopAni = true;
            }
             this.gameFrame++
        }

        
        
    }

    checkAnimation(speed, velocity){
        if(this.isMoving && !this.isAttacking && !this.isHurt && !this.isDead){
                this.spriteRow = 4;
                this.delayFrames = 5;
                this.calculateGameFrame();
                if(this.x + this.width >= 650){
                    if(this.direction === "left"){
                        this.x += speed;
                    }else{
                        this.moveBackgrounds(-speed);
                        this.moveEnemies(-speed);
                    } 
                }else if(this.x <= 350){
                    if(this.direction == "right"){
                        this.x += speed;
                    }else{
                        this.moveBackgrounds(-speed);
                        this.moveEnemies(-speed);
                    }
                    
                }else{
                     this.x += speed;
                }
        }

        if(this.isJumping && !this.isHurt && !this.isDead){
                this.y -= velocity;
                this.spriteRow = 4;
                this.delayFrames = 5;
                this.calculateGameFrame();
        }

        if(!this.isMoving && !this.isJumping && !this.isAttacking && !this.isHurt && !this.isDead){
            this.spriteRow = 3;
            this.delayFrames = 18;
            this.calculateGameFrame();
        }

        if(this.isAttacking && !this.isHurt && !this.isDead){
            this.spriteRow = 0;
            this.delayFrames = 4;
            this.calculateGameFrame();
            if(this.spritePosition === 3){
                if(!this.cooldown){
                    this.projectiles.push(new Projectile(this, "./assets/img/player/projectile/projSheet.png", 256, 256, 6))
                    this.cooldown = true;
                    this.isAttacking = false;
                }
            }
        }

        if(this.isHurt && !this.isDead){
            this.spriteRow = 2;
            this.delayFrames = 20;
            this.calculateGameFrame();
        }

        if(this.isDead){
            this.spriteRow = 1;
            this.delayFrames = 40;
            this.calculateGameFrame();
        }
    }

    moveBackgrounds(speed){
        this.world.backgrounds.forEach(backgroundArr => {
            backgroundArr.forEach(background => {
                background.moveBackground(speed);
            });
        });
    }

    moveEnemies(speed){
        this.world.enemies.forEach(enemy =>{
            enemy.x += speed;
        });
    }

    checkLifebar(){
        console.log(this.hp);
        if(this.hp === 5){
            this.lifebarPosition = 0;
        }
        if(this.hp === 4){
            this.lifebarPosition = 1;
        }
        if(this.hp === 3){
            this.lifebarPosition = 2;
        }
        if(this.hp === 2){
            this.lifebarPosition = 3;
        }
        if(this.hp === 1){
            this.lifebarPosition = 4;
        }
        if(this.hp === 0){
            this.lifebarPosition = 5;
        }
    }

    checkHp(){
        if(this.hp === 0){
            this.isDead = true;
            this.gameFrame = 0;
            this.calculateGameFrame();
        }
    }
}