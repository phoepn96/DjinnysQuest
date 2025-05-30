class Hitbox{
    constructor(classObj){
        this.x = classObj.hitbox_x_right + classObj.x;
        this.y = classObj.hitboxY + classObj.y;
        this.width = classObj.hitboxWidth + classObj.width;
        this.height = classObj.hitboxHeight + classObj.height;
    }

    update(classObj){
        
        if(classObj.direction === "right"){
            this.x = classObj.hitbox_x_right + classObj.x;
        }else{
            this.x = classObj.hitbox_x_left + classObj.x;
        }
        this.y = classObj.hitboxY + classObj.y;
        this.width = classObj.width - classObj.hitboxWidth;
        this.height = classObj.height - classObj.hitboxHeight;
    }

    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
}