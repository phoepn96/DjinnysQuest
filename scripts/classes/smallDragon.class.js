class SmallDragon extends Enemie{
    constructor(world, x, y){
        super(world, x, y);
        this.height = 200;
        this.width = 200;
        this.img = new Image();
        this.img.src = "../assets/img/enemies/smallDragon/completeSheet.png"
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.spriteRow = 0;
        this.spriteColumn = 0;
        this.isMoving = true;
        this.gameFrame = 0;
        this.delayFrames = 25;
        this.hitboxY = 40;
        this.hitboxWidth = 100;
        this.hitboxHeight = 150;
        this.hitbox_x_right = 5;
        this.hitbox_x_left = 20;
        this.direction = "right";
        this.hitbox = new Hitbox(this);
    }

    update(){
        if(!this.isMoving){
            this.spriteRow = 1;
            this.calculateGameFrame();
        }
        if(this.isMoving){
            this.spriteRow = 4;
            this.calculateGameFrame();
        }

        this.hitbox.update(this);
    }

    draw(){
        ctx.drawImage(this.img, this.spriteColumn, this.spriteRow * this.spriteWidth, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight)
        this.hitbox.draw();
    }

    calculateGameFrame(){
        if(this.spriteRow === 1 || this.spriteRow === 2){
            this.delayFrames = 25;
            this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 3);
            this.spriteColumn = this.spritePosition * this.spriteWidth;
            this.gameFrame ++;
        }
        if(this.spriteRow === 4){
            this.spritePosition = (Math.floor(this.gameFrame/this.delayFrames) % 4)
            this.spriteColumn = this.spritePosition * this.spriteWidth;
            this.gameFrame ++;
        }
    }
}