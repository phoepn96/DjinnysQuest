class World{

    constructor(canvas){
        this.width = canvas.width;
        this.height = canvas.height;
        this.x = 0;
        this.y = 0;
        this.player = new Player(this, 500, 600);
        this.gravity = 0.5;
        this.sky = new Sky(this);
        this.enemies = [new SmallDragon(this, 200, 600), new SmallDragon(this, 700, 600)];
        this.backgrounds = [
            [new LastRocks(this, 0),new LastRocks(this, 1),new LastRocks(this, 2)],
            [new FarMountains(this, 0),new FarMountains(this, 1),new FarMountains(this, 2)],
            [new MidMountains(this, 0),new MidMountains(this, 1),new MidMountains(this, 2)],
            [new Trees(this, 0),new Trees(this, 1),new Trees(this, 2)],
            [new Ground(this, 0), new Ground(this, 1),new Ground(this, 2)],
            [new Clouds(this, 0),new Clouds(this, 1),new Clouds(this, 2)]
        ];
    }

    update(){
        this.updateBackgrounds();
        this.updateClouds();
        this.player.update();
        this.checkGravity();        
        this.enemies.forEach(enemy => {
            enemy.update();
            this.updateProjectiles(enemy)
        });
        this.updateProjectiles(this.player);
    
    }

    draw(){
        this.sky.draw();
        this.drawBackgrounds();
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

    checkGravity(){
        if(this.player.y < 600){
            this.player.y += this.player.weight + this.gravity;
            this.gravity += 0.4;
        }else{
            this.player.y = 600;
            this.gravity = 0.5;
            this.player.isJumping = false;
        }
    }

    updateBackgrounds(){
        this.backgrounds.forEach(backgroundLayerArr => {
            this.checkPlatformLeft(backgroundLayerArr);
            this.checkPlatformsRight(backgroundLayerArr);
        });
    }

    drawBackgrounds(){
        this.backgrounds.forEach(backgroundLayerArr =>{
            backgroundLayerArr.forEach(backgroundLayer =>{
                backgroundLayer.draw();
            });
        });
    }

    checkPlatformsRight(backgroundArr){
    if(backgroundArr[1].x + (backgroundArr[1].width) < 0){
	const movedPlatform = backgroundArr.shift();
	const lastPlatform = backgroundArr[backgroundArr.length-1];
	movedPlatform.x = lastPlatform.x + (lastPlatform.width);
	backgroundArr.push(movedPlatform);
}

}

    checkPlatformLeft(backgroundArr){
    if(backgroundArr[1].x > this.width){
	const movedPlatform = backgroundArr.pop();
	const firstPlatform = backgroundArr[0];
	movedPlatform.x = firstPlatform.x - (firstPlatform.width);
	backgroundArr.unshift(movedPlatform);
}
}

    updateClouds(){
        this.backgrounds[5].forEach(cloud =>{
            cloud.update();
        })
    }


}