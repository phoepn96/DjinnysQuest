class World{

    constructor(canvas){
        this.width = canvas.width;
        this.height = canvas.height;
        this.x = 0;
        this.y = 0;
        this.player = new Player(this, 500, 600);
        this.gravity = 0.5;
        this.enemie = new SmallDragon(this, 200, 600)
    }

    update(){
        this.player.update();
        if(this.player.y < 600){
            this.player.y += this.player.weight + this.gravity;
            this.gravity += 0.4;
        }else{
            this.player.y = 600;
            this.gravity = 0.5;
            this.player.isJumping = false;
        }
        this.enemie.update();
        this.updateProjectiles();
    }

    draw(){
        this.player.draw();
        this.player.projectiles.forEach(proj => {
            proj.draw();
        })
        this.enemie.draw();
    }

    updateProjectiles(){
        for(let i = this.player.projectiles.length -1 ; i >= 0; i--){
            const proj = this.player.projectiles[i];
            proj.update();
            if(proj.x + proj.width < this.x || proj.x > this.x + this.width){
                this.player.projectiles.splice(i, 1)
            }
        }
    }


}