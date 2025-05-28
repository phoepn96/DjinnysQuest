class Controller{
    constructor(player){
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
        });
        document.addEventListener("keyup",(event) => {
            if(event.key === "d" || event.key === "ArrowRight"){
                player.isMoving = false;
            }
            if(event.key === "a" || event.key === "ArrowLeft"){
                player.isMoving = false;
            }
        });
    }
}