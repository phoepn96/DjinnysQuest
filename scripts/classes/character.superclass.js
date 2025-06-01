class Character{

    constructor(world, x, y){
        this.hp;
        this.width;
        this.height;
        this.x = x;
        this.y = y;
        this.world = world
        this.speed = 5;
        this.hitboxY;
        this.hitboxWidth;
        this.hitboxHeight;
        this.hitbox_x_right;
        this.hitbox_x_left;
        this.direction = "right";
    }
}