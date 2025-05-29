class Controller{
    constructor(player, world){
        this.keys = {};
        document.addEventListener("keydown",(event) => {
            if(event.key === "d" || event.key === "ArrowRight"){
                player.direction = "right";
                player.isMoving = true;;
            };
            if(event.key === "a" || event.key === "ArrowLeft"){
                player.direction = "left";
                player.isMoving = true;
            }
            if(event.key === " "){
                player.isJumping = true;
            }
            if(event.key === "f"){
                if(event.repeat) return;
                player.gameFrame = 0;
                player.isAttacking = true;
                console.log("attacking");   
            }
        });
        document.addEventListener("keyup",(event) => {
            if(event.key === "d" || event.key === "ArrowRight"){
                player.isMoving = false;
            }
            if(event.key === "a" || event.key === "ArrowLeft"){
                player.isMoving = false;
            }
            if(event.key === "f"){
                player.isAttacking = false;
                player.cooldown = false;
            }
        });
    }
}