import Particle from './particle';
import { createCanvas } from './canvasHelper';

const settings = {
    tag: ".dashboard"
};

function animateParticles(timestamp){
    window.requestAnimationFrame(animateParticles);
}

function init (){
    const context = createCanvas({selector: settings.tag});
    // window.requestAnimationFrame(animateParticles);
}

init();
