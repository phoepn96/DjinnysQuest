class Player{
    constructor(world){
        this.width = 128;
        this.height = 128;
        this.x = 500;
        this.y = 600;
        this.world = world

        this.controller = new Controller(this);
        this.direction = "right";
        this.isMoving = false;
        this.isJumping = false;
        this.speed = 5;
        this.velocity = 15;
        this.weight = 2;
        this.isAttacking = false;
        this.projectiles = [];

        this.imgRight = new Image();
        this.imgRight.src = "../assets/img/player/completeCharSheet.png";
        this.imgLeft = new Image();
        this.imgLeft.src = "../assets/img/player/completeCharSheetFlipped.png"
        this.img = this.imgRight;

        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.spriteRow = 1;
        this.spriteColumn = 0;
        this.gameFrame = 0;
        this.delayFrames = 10;
        this.spritePosition;
        this.shotReady = false;
        this.cooldown = false;
        
    }

    update(){
        if(this.direction === "right"){
            this.img = this.imgRight;
            this.checkAnimation(this.speed, this.velocity)


        }else{
            this.img = this.imgLeft;
            this.checkAnimation(-this.speed, this.velocity)
        }
    }

    draw(){
        ctx.drawImage(this.img, this.spriteColumn, this.spriteRow * this.spriteWidth, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    calculateGameFrame(){
        if(this.spriteRow === 0 || this.spriteRow === 3 || this.spriteRow === 4){
            this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 4) + 1;
            this.spriteColumn = this.spritePosition * this.spriteWidth;
            this.gameFrame ++;
        }
        
    }

    checkAnimation(speed, velocity){
        if(this.isMoving && !this.isAttacking){
                this.spriteRow = 4;
                this.delayFrames = 5;
                this.calculateGameFrame();
                this.x += speed;
        }

        if(this.isJumping){
                this.y -= velocity;
                this.spriteRow = 4;
                this.delayFrames = 5;
                this.calculateGameFrame();
        }

        if(!this.isMoving && !this.isJumping && !this.isAttacking){
            this.spriteRow = 3;
            this.delayFrames = 18;
            this.calculateGameFrame();
        }

        if(this.isAttacking){
            this.spriteRow = 0;
            this.delayFrames = 4;
            this.calculateGameFrame();
            if(this.spritePosition === 3){
                if(!this.cooldown){
                    this.projectiles.push(new Projectile(this))
                    this.cooldown = true;
                    this.isAttacking = false;
                }
            }
        }
    }
}