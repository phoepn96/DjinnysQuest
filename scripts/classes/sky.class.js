class Sky{
    constructor(world){
        this.img = new Image();
        this.img.src = "./assets/img/backgrounds/parallax/layer07_Sky.png"
        this.x = 0;
        this.y = 0;
        this.width = world.width;
        this.height = world.height;
    }

    draw(){
        ctx.drawImage(this.img, this.x , this.y, this.width, this.height);
    }
}