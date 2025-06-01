class MidMountains extends Background{
    constructor(world, position){
        super(world, position);
        this.img = new Image();
        this.img.src = "../assets/img/backgrounds/parallax/layer04_Hills_2.png"
        this.parallaxDivider = 3;
    }
}

class FarMountains extends Background{
    constructor(world, position){
        super(world, position);
        this.img = new Image();
        this.img.src = "../assets/img/backgrounds/parallax/layer03_Hills_1.png"
        this.parallaxDivider = 4;
    }
}

class LastRocks extends Background{
    constructor(world, position){
        super(world, position);
        this.img = new Image();
        this.img.src = "../assets/img/backgrounds/parallax/layer06_Rocks.png"
        this.parallaxDivider = 5;
    }
}

class Trees extends Background{
    constructor(world, position){
        super(world, position);
        this.img = new Image();
        this.img.src = "../assets/img/backgrounds/parallax/layer02_Trees.png"
        this.parallaxDivider = 2;
    }
}

class Ground extends Background{
    constructor(world, position){
        super(world, position);
        this.img = new Image();
        this.img.src = "../assets/img/backgrounds/parallax/layer01_Ground.png"
        this.parallaxDivider = 1;
    }
}

class Clouds extends Background{
    constructor(world, position){
        super(world, position)
        this.img = new Image();
        this.img.src = "../assets/img/backgrounds/parallax/layer05_Clouds.png"
        this.parallaxDivider = 2;
    }

    update(){
        this.x -= 0.6;
    }

    draw(){
        ctx.drawImage(this.img, this.x, this.y , this.width, this.height);
    }
}