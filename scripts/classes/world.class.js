class World{

    constructor(canvas){
        this.width = canvas.width;
        this.height = canvas.height;
        this.player = new Player(this);
        this.gravity = 0.5;
    }

    update(){
        this.player.update();
        if(this.player.y < 600){
            this.player.y += this.player.weight + this.gravity;
            this.gravity += 0.2;
        }else{
            this.player.y = 600;
            this.gravity = 0.5;
            this.player.isJumping = false;
            console.log(this.gravity)
        }
    }

    draw(){
        this.player.draw();
    }



}