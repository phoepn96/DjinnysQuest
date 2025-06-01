class Background{
    constructor(world, position){
        this.world = world;
        this.parallaxDivider;
        this.img;
        this.width = world.width;
        this.height = world.height;
        this.x = position * this.width; 
        this.y = 0;
     
    }

    draw(){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    moveBackground(speed){
        this.x += speed/this.parallaxDivider;
    }

}