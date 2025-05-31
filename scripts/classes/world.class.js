class World{

    constructor(canvas){
        this.width = canvas.width;
        this.height = canvas.height;
        this.x = 0;
        this.y = 0;
        this.player = new Player(this, 500, 600);
        this.gravity = 0.5;
        this.enemies = [new SmallDragon(this, 200, 600), new SmallDragon(this, 700, 600)]
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
        
        this.enemies.forEach(enemy => {
            enemy.update();
            this.updateProjectiles(enemy)
        });
        this.updateProjectiles(this.player);
    }

    draw(){
        this.player.draw();
        this.player.projectiles.forEach(proj => {
            proj.draw();
        })
        this.enemies.forEach(enemy => {
            enemy.draw();
            enemy.projectiles.forEach(proj => {
                proj.draw();
            });
        });
    }

    updateProjectiles(charObj){
        for(let i = charObj.projectiles.length -1 ; i >= 0; i--){
            const proj = charObj.projectiles[i];
            proj.update();
            if(proj.x + proj.width < this.x || proj.x > this.x + this.width){
                charObj.projectiles.splice(i, 1)
            }
        }
    }


}