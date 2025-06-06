const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const world = new World(canvas);
let stopAni = false;

function animate(){
    if(stopAni) return
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    world.update();
    world.draw();
    requestAnimationFrame(animate);
}

function stopAnimation(){
    stopAni = true;
}

animate();
