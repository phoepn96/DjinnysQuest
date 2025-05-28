class Player{
    constructor(world){
        this.width = 128;
        this.height = 128;
        this.x = 500;
        this.y = 600;

        this.controller = new Controller();

        this.img = new Image();
        this.img.src = "../assets/img/player/completeCharSheet.png"

        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.spiteAnimation = 1;
        this.spriteFrame = 0;
        this.spriteRow = this.spiteAnimation * this.spriteHeight;
        this.spriteColumn = this.spriteFrame * this.width;
        
    }

    update(){

    }

    draw(){
        ctx.drawImage(this.img, this.spriteColumn, this.spriteRow, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
}