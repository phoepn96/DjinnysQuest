class Player{
    constructor(world){
        this.width = 128;
        this.height = 128;
        this.x = 500;
        this.y = 600;

        this.controller = new Controller(this);
        this.direction = "right";
        this.isMoving = false;
        this.isJumping = false;
        this.speed = 1;
        this.velocity = 20;
        this.weight = 2;

        this.img = new Image();
        this.img.src = "../assets/img/player/completeCharSheet.png"

        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.spriteRow = 1;
        this.spriteColumn = 0;
        
    }

    update(){
        if(this.isMoving){
            if(this.direction === "right"){
                if(this.spriteColumn < 5) this.spriteColumn++;
                else this.spriteColumn = 0;
                this.x += this.speed;
            }else{
                this.x -= this.speed;
            }
        }
        if(this.isJumping){
                this.y -= this.velocity;
        }
    }

    draw(){
        ctx.drawImage(this.img, this.spriteColumn * this.spriteHeight, this.spriteRow * this.spriteWidth, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}