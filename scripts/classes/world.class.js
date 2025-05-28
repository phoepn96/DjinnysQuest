class World{

    constructor(canvas){
        this.width = canvas.width;
        this.height = canvas.height;
        this.player = new Player(this);
    }

    update(){

    }

    draw(){
        this.player.draw();
    }



}