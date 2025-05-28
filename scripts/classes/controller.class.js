class Controller{
    constructor(player){
        this.keys = {};
        document.addEventListener("keydown",(event) => {
            if(event.key === "d" || event.key === "ArrowRight") this.keys[event.key] = true;
            if(event.key === "a" || event.key === "ArrowLeft") this.keys[event.key] = true;
        });
        document.addEventListener("keyup",(event) => {
            if(event.key === "d" || event.key === "ArrowRight") this.keys[event.key] = false;
            if(event.key === "a" || event.key === "ArrowLeft") this.keys[event.key] = false;
        });
    }
}