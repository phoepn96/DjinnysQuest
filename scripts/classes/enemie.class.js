class Enemie extends Character{
    constructor(world, x, y, width, height){
        super(world, x, y);
        this.width = width;
        this.height = height;
    }

    checkIfOutOfRender(){
        if(this.x < this.world.x - this.world.width || this.x > this.world.x + (this.world.width * 2)){

        }
    }

   

    moveLeft(){

    }

    moveRight(){

    }

    attack(){

    }
}