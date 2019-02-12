// Boilderplate from: https://github.com/villedieumorgan/npm-es6-build-boilerplate/blob/master/package.json

import anime from 'animejs';

const init = () => {
    window.ftue = globalObject();
    setCanvasSize();
    logo();
    preRenderer();
    setScene();
    animateParticles();
    autoClick();
    window.addEventListener('resize', setCanvasSize, false);
};

const globalObject = () => {
    const ftue = {};
    ftue.centerX = window.innerWidth / 2;
    ftue.centerY = window.innerHeight / 2;
    ftue.pointerX = 0;
    ftue.pointerY = 0;
    // ftue.colours = ['#500A28', '#640032', '#AF144B', '#FA551E', '#F0325A', '#FF780F', '#960528'];
    ftue.colours = ['#F0325A', '#FF780F', '#960528'];
    ftue.iconW = 75;
    ftue.grid = null;
    ftue.particles = null;
    ftue.preRenderCanvases = [];
    ftue.currentTime = 0;

    ftue.testCount = 0;
    
    ftue.canvas = document.getElementById("ftue");
    ftue.canvas.style.position = 'absolute';
    ftue.canvas.style.top = '0px';
    ftue.canvas.style.left = '0px';
    ftue.canvas.style.backgroundColor = 'transparent';
    ftue.context = ftue.canvas.getContext('2d');
    ftue.tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';

    ftue.canvas.addEventListener(ftue.tap, (evt) => {
        updateCoords(evt);
        
        const obj = findParticle(window);
        if(obj.state === 'spin' || obj.state === 'hover'){
            obj.state = 'click';
        } else if(obj.state === 'special'){
            setTimeout(createSpecialParticle, 2000);
            
            let i = ftue.particles.length;
            while(i--){
                ftue.particles[i].delay = ftue.currentTime;
                ftue.particles[i].state = 'wave';
    }
        }
    }, false);
    
    ftue.canvas.addEventListener('mousemove', (evt) => {
        updateCoords(evt);
        
        const obj = findParticle(window);
        if(obj.state !== 'fadeIn' && obj.state !== 'fadeOut' && obj.state !== 'hover' && obj.state !== 'special' && obj.state !== 'wave'){
            obj.state = 'hover';
        }
    }, false);
    
    return ftue;
};

const logo = () => {
    const { ftue } = window,
          // logoWidth = 320,
          // logoHeight = 142,
          // xOffset = 160,
          // yOffset = 140;
          logoWidth = 450,
          logoHeight = 450,
          xOffset = 225,
          yOffset = 275;
    
    ftue.logo = document.createElement('canvas');
    ftue.logo.width = window.innerWidth;
    ftue.logo.height = window.innerHeight;
    ftue.logoContext = window.ftue.logo.getContext('2d');
    ftue.logo.svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 86.5 86.55"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:5px;}.cls-2{fill:#fff;fill-rule:evenodd;}</style><symbol id="logo" viewBox="0 0 86.5 86.55"><g><path class="cls-1" d="M54.85,8.2H78.1V31.45L54.85,54.7M8.3,31.45V8.2H31.6L54.85,31.45M31.6,54.7,54.85,78H78.1V54.7M31.6,78H8.3V54.7L31.6,31.45"/><path class="cls-2" d="M14.1,31.6a5.6,5.6,0,0,1-1.7,4.1,5.6,5.6,0,0,1-4.1,1.7,5.6,5.6,0,0,1-4.1-1.7,5.79,5.79,0,0,1,0-8.2,5.6,5.6,0,0,1,4.1-1.7,5.6,5.6,0,0,1,4.1,1.7A5.6,5.6,0,0,1,14.1,31.6Z"/><path class="cls-1" d="M14.1,31.6a5.6,5.6,0,0,1-1.7,4.1,5.6,5.6,0,0,1-4.1,1.7,5.6,5.6,0,0,1-4.1-1.7,5.79,5.79,0,0,1,0-8.2,5.6,5.6,0,0,1,4.1-1.7,5.6,5.6,0,0,1,4.1,1.7A5.6,5.6,0,0,1,14.1,31.6Z"/><path class="cls-2" d="M14.1,8.3a5.6,5.6,0,0,1-1.7,4.1,5.6,5.6,0,0,1-4.1,1.7,5.6,5.6,0,0,1-4.1-1.7A5.6,5.6,0,0,1,2.5,8.3,5.6,5.6,0,0,1,4.2,4.2,5.6,5.6,0,0,1,8.3,2.5a5.6,5.6,0,0,1,4.1,1.7A5.6,5.6,0,0,1,14.1,8.3Z"/><path class="cls-1" d="M14.1,8.3a5.6,5.6,0,0,1-1.7,4.1,5.6,5.6,0,0,1-4.1,1.7,5.6,5.6,0,0,1-4.1-1.7A5.6,5.6,0,0,1,2.5,8.3,5.6,5.6,0,0,1,4.2,4.2,5.6,5.6,0,0,1,8.3,2.5a5.6,5.6,0,0,1,4.1,1.7A5.6,5.6,0,0,1,14.1,8.3Z"/><path class="cls-2" d="M14.1,54.85A5.6,5.6,0,0,1,12.4,59a5.6,5.6,0,0,1-4.1,1.7A5.6,5.6,0,0,1,4.2,59a5.6,5.6,0,0,1-1.7-4.1A5.53,5.53,0,0,1,4.2,50.8a5.6,5.6,0,0,1,4.1-1.7,5.6,5.6,0,0,1,4.1,1.7A5.53,5.53,0,0,1,14.1,54.85Z"/><path class="cls-1" d="M14.1,54.85A5.6,5.6,0,0,1,12.4,59a5.6,5.6,0,0,1-4.1,1.7A5.6,5.6,0,0,1,4.2,59a5.6,5.6,0,0,1-1.7-4.1A5.53,5.53,0,0,1,4.2,50.8a5.6,5.6,0,0,1,4.1-1.7,5.6,5.6,0,0,1,4.1,1.7A5.53,5.53,0,0,1,14.1,54.85Z"/><path class="cls-2" d="M4.2,74.15a5.6,5.6,0,0,1,4.1-1.7,5.6,5.6,0,0,1,4.1,1.7,5.79,5.79,0,0,1,0,8.2,5.6,5.6,0,0,1-4.1,1.7,5.6,5.6,0,0,1-4.1-1.7,5.79,5.79,0,0,1,0-8.2Z"/><path class="cls-1" d="M4.2,74.15a5.6,5.6,0,0,1,4.1-1.7,5.6,5.6,0,0,1,4.1,1.7,5.79,5.79,0,0,1,0,8.2,5.6,5.6,0,0,1-4.1,1.7,5.6,5.6,0,0,1-4.1-1.7,5.79,5.79,0,0,1,0-8.2Z"/><path class="cls-2" d="M37.45,31.6a5.8,5.8,0,0,1-9.9,4.1,5.8,5.8,0,1,1,8.2-8.2A5.6,5.6,0,0,1,37.45,31.6Z"/><path class="cls-1" d="M37.45,31.6a5.8,5.8,0,0,1-9.9,4.1,5.8,5.8,0,1,1,8.2-8.2A5.6,5.6,0,0,1,37.45,31.6Z"/><path class="cls-2" d="M27.55,4.2a5.79,5.79,0,0,1,8.2,0,5.6,5.6,0,0,1,1.7,4.1,5.6,5.6,0,0,1-1.7,4.1,5.79,5.79,0,0,1-8.2,0,5.6,5.6,0,0,1-1.7-4.1A5.6,5.6,0,0,1,27.55,4.2Z"/><path class="cls-1" d="M27.55,4.2a5.79,5.79,0,0,1,8.2,0,5.6,5.6,0,0,1,1.7,4.1,5.6,5.6,0,0,1-1.7,4.1,5.79,5.79,0,0,1-8.2,0,5.6,5.6,0,0,1-1.7-4.1A5.6,5.6,0,0,1,27.55,4.2Z"/><path class="cls-2" d="M27.55,50.8a5.79,5.79,0,0,1,8.2,0,5.53,5.53,0,0,1,1.7,4.05,5.8,5.8,0,0,1-9.9,4.1,5.6,5.6,0,0,1-1.7-4.1A5.53,5.53,0,0,1,27.55,50.8Z"/><path class="cls-1" d="M27.55,50.8a5.79,5.79,0,0,1,8.2,0,5.53,5.53,0,0,1,1.7,4.05,5.8,5.8,0,0,1-9.9,4.1,5.6,5.6,0,0,1-1.7-4.1A5.53,5.53,0,0,1,27.55,50.8Z"/> <path class="cls-2" d="M37.45,78.25a5.8,5.8,0,0,1-9.9,4.1,5.8,5.8,0,1,1,8.2-8.2A5.6,5.6,0,0,1,37.45,78.25Z"/><path class="cls-1" d="M37.45,78.25a5.8,5.8,0,0,1-9.9,4.1,5.8,5.8,0,1,1,8.2-8.2A5.6,5.6,0,0,1,37.45,78.25Z"/><path class="cls-2" d="M54.9,25.8A5.8,5.8,0,0,1,59,35.7a5.8,5.8,0,1,1-8.2-8.2A5.6,5.6,0,0,1,54.9,25.8Z"/><path class="cls-1" d="M54.9,25.8A5.8,5.8,0,0,1,59,35.7a5.8,5.8,0,1,1-8.2-8.2A5.6,5.6,0,0,1,54.9,25.8Z"/><path class="cls-2" d="M54.9,2.5A5.6,5.6,0,0,1,59,4.2a5.6,5.6,0,0,1,1.7,4.1A5.6,5.6,0,0,1,59,12.4a5.79,5.79,0,0,1-8.2,0,5.6,5.6,0,0,1-1.7-4.1,5.6,5.6,0,0,1,1.7-4.1A5.6,5.6,0,0,1,54.9,2.5Z"/><path class="cls-1" d="M54.9,2.5A5.6,5.6,0,0,1,59,4.2a5.6,5.6,0,0,1,1.7,4.1A5.6,5.6,0,0,1,59,12.4a5.79,5.79,0,0,1-8.2,0,5.6,5.6,0,0,1-1.7-4.1,5.6,5.6,0,0,1,1.7-4.1A5.6,5.6,0,0,1,54.9,2.5Z"/><path class="cls-2" d="M54.9,49.1A5.6,5.6,0,0,1,59,50.8a5.53,5.53,0,0,1,1.7,4.05,5.8,5.8,0,0,1-11.6,0,5.53,5.53,0,0,1,1.7-4.05A5.6,5.6,0,0,1,54.9,49.1Z"/><path class="cls-1" d="M54.9,49.1A5.6,5.6,0,0,1,59,50.8a5.53,5.53,0,0,1,1.7,4.05,5.8,5.8,0,0,1-11.6,0,5.53,5.53,0,0,1,1.7-4.05A5.6,5.6,0,0,1,54.9,49.1Z"/><path class="cls-2" d="M50.8,82.35a5.79,5.79,0,1,1,4.1,1.7A5.6,5.6,0,0,1,50.8,82.35Z"/><path class="cls-1" d="M50.8,82.35a5.79,5.79,0,1,1,4.1,1.7A5.6,5.6,0,0,1,50.8,82.35Z"/><path class="cls-2" d="M82.3,27.5a5.79,5.79,0,1,1-4.1-1.7A5.6,5.6,0,0,1,82.3,27.5Z"/><path class="cls-1" d="M82.3,27.5a5.79,5.79,0,1,1-4.1-1.7A5.6,5.6,0,0,1,82.3,27.5Z"/><path class="cls-2" d="M74.1,4.2a5.79,5.79,0,0,1,8.2,0A5.6,5.6,0,0,1,84,8.3a5.6,5.6,0,0,1-1.7,4.1,5.79,5.79,0,0,1-8.2,0,5.6,5.6,0,0,1-1.7-4.1A5.6,5.6,0,0,1,74.1,4.2Z"/><path class="cls-1" d="M74.1,4.2a5.79,5.79,0,0,1,8.2,0A5.6,5.6,0,0,1,84,8.3a5.6,5.6,0,0,1-1.7,4.1,5.79,5.79,0,0,1-8.2,0,5.6,5.6,0,0,1-1.7-4.1A5.6,5.6,0,0,1,74.1,4.2Z"/><path class="cls-2" d="M74.1,50.8a5.79,5.79,0,0,1,8.2,0A5.53,5.53,0,0,1,84,54.85a5.8,5.8,0,0,1-11.6,0A5.53,5.53,0,0,1,74.1,50.8Z"/><path class="cls-1" d="M74.1,50.8a5.79,5.79,0,0,1,8.2,0A5.53,5.53,0,0,1,84,54.85a5.8,5.8,0,0,1-11.6,0A5.53,5.53,0,0,1,74.1,50.8Z"/><path class="cls-2" d="M82.3,74.15a5.79,5.79,0,1,1-4.1-1.7A5.6,5.6,0,0,1,82.3,74.15Z"/><path class="cls-1" d="M82.3,74.15a5.79,5.79,0,1,1-4.1-1.7A5.6,5.6,0,0,1,82.3,74.15Z"/></g></symbol></defs><g><use width="86.5" height="86.55" xlink:href="#logo"/></g></svg>';
    ftue.logo.uri = encodeURIComponent(window.ftue.logo.svg);

    const img = new window.Image();
    img.onload = () => {
        window.ftue.logoContext.drawImage(img, ftue.centerX - xOffset, ftue.centerY - yOffset, logoWidth, logoHeight);
    };
    img.src = "data:image/svg+xml,"+window.ftue.logo.uri;
    
    ftue.canvas.parentNode.insertBefore(ftue.logo, ftue.canvas);
};

const preRenderer = () => {
    let num = ftue.colours.length;

    while(num--){
        ftue.preRenderCanvases.push( preRenderCanvas(ftue.colours[num]) );
    }
};

const preRenderCanvas = (colour) => {
    const circle = document.createElement('canvas');
    circle.width = ftue.iconW;
    circle.height = ftue.iconW;
    
    const circleCxt = circle.getContext('2d'),
          svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16.6 16.6"><defs><style>.cls-1{fill:#fff;fill-rule:evenodd;}.cls-2,.cls-3{fill:none;stroke:'+colour+';stroke-linecap:round;}.cls-2{stroke-linejoin:round;stroke-width:5px;}.cls-3{stroke-miterlimit:2;stroke-width:2px;}</style></defs><title>Asset 3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_5" data-name="Layer 5"><path class="cls-1" d="M4.2,4.2A5.6,5.6,0,0,1,8.3,2.5a5.6,5.6,0,0,1,4.1,1.7,5.53,5.53,0,0,1,1.7,4.05,5.6,5.6,0,0,1-1.7,4.1,5.6,5.6,0,0,1-4.1,1.7,5.6,5.6,0,0,1-4.1-1.7,5.6,5.6,0,0,1-1.7-4.1A5.53,5.53,0,0,1,4.2,4.2Z"/><path class="cls-2" d="M4.2,4.2A5.6,5.6,0,0,1,8.3,2.5a5.6,5.6,0,0,1,4.1,1.7,5.53,5.53,0,0,1,1.7,4.05,5.6,5.6,0,0,1-1.7,4.1,5.6,5.6,0,0,1-4.1,1.7,5.6,5.6,0,0,1-4.1-1.7,5.6,5.6,0,0,1-1.7-4.1A5.53,5.53,0,0,1,4.2,4.2Z"/><line class="cls-3" x1="8.3" y1="1.25" x2="8.3" y2="15.25"/></g></g></svg>',
        uri = encodeURIComponent(svg),

        img = new window.Image();
    img.onload = () => {
        circleCxt.drawImage(img, 0, 0, ftue.iconW, ftue.iconW);
    };
    img.src = "data:image/svg+xml,"+uri;

    return circle;
};

const setCanvasSize = () => {
    const { canvas } = window.ftue;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.getContext('2d').scale(1, 1);

    ftue.grid = setGrid();
    ftue.particles = createParticles();

    createSpecialParticle();
};

const findParticle = ({ftue}) => {
    const x = Math.floor(ftue.pointerX / ftue.iconW),
          y = Math.floor(ftue.pointerY / ftue.iconW);
    
    return (ftue.grid && ftue.grid[x] && ftue.grid[x][y])? ftue.grid[x][y]: {};
};

const setGrid = () => {
    const { canvas } = window.ftue,
          gridW = Math.floor(canvas.width / ftue.iconW),
          gridH = Math.floor(canvas.height / ftue.iconW);

    // ugly, thanks IE11
    const multiArray = new Array(gridW);
    for (var i = 0; i < gridW; i++) {
        multiArray[i] = new Array(gridH);
        for(var j = 0; j < gridH; j++){
            multiArray[i][j] = 0;
        }
    }
    return multiArray;
};

const createParticles = () => {
    const particles = [];

    ftue.grid.map((row, rIndex) => {
        return row.map((cell, cIndex) => {
            const obj = createParticule(rIndex, cIndex);
            ftue.grid[rIndex][cIndex] = obj;
            particles.push(obj);
        });
    });

    return particles;
};

const updateCoords = (evt) => {
  ftue.pointerX = evt.clientX || evt.touches[0].clientX;
  ftue.pointerY = evt.clientY || evt.touches[0].clientY;
};

const recursive = (val, length) => {
    return (val >= length)? recursive((val-length), length) : val;
};

const getColour = (x, y) => {
    const length = ftue.colours.length,
          xOut = recursive(x, length),
          yOut = recursive(y, length),
          sum = recursive( (xOut+yOut) ,length);

    return sum;
};

const getHoverColour = (p) => {
    if(!p.colourChange) return p.colour;
    p.colourChange = false;
    
    return ((p.colour + 1) >= ftue.colours.length)? 0 : (p.colour + 1);
};

const getWaveColour = (p) => {
    if(!p.colourChange) return p.colour;
    p.colourChange = false;
    
    return 0;
};

const createParticule = (x,y) => {
    const p = {};
    p.xArr = x;
    p.yArr = y;
    p.distanceFromSpecial = 0;
    p.xPos = x * ftue.iconW;
    p.yPos = y * ftue.iconW;
    p.width = ftue.iconW;
    p.centre = p.width / 2;
    p.halfW = p.width / 2;
    p.alpha = 0;
    p.delay = 1000;
    p.fadingStart = (p.xPos * 0.5) + (p.yPos * 0.5);
    // p.colour = getColour(p.xPos/ftue.iconW, p.yPos/ftue.iconW);
    p.colour = 0;
    p.outroStart = 0;

    // flags
    p.state = 'fadeIn';
    
    p.remove = false;
    p.bigger = false;
    p.colourChange = false;
    // p.tweening = false;

    p.speed = 1;
    
    p.angle = 0;
    p.radians = Math.PI/180;

    p.fadeIn = () => {
        if((p.fadingStart + p.delay) <= ftue.currentTime){
            p.alpha += 0.1;
            
            if(p.alpha >= 1){
                p.state = 'spin';
            }
        }
    };

    p.fadeOut = () => {
        if((p.fadingStart + p.delay) <= ftue.currentTime){
            p.alpha -= 0.2;

            if(p.alpha < 0.1){
                p.remove = true;
            }
        }
    };

    p.pulse = () => {
        if(!p.bigger){
            p.width = p.width * 0.98;
            if(p.width < 20){
                p.bigger = true;
                p.colour = ftue.colours.length-1;
            }
        } else if(p.bigger){
            p.width = p.width * 1.05;
            p.colour = getHoverColour(p);
            
            if(p.width >= ftue.iconW){
                p.width = ftue.iconW;
                p.bigger = false;
            }
        }
        
        p.halfW = p.width / 2;
    };

    p.hover = () => {
        if(!p.bigger){
            p.width = p.width * 0.9;
            if(p.width < 20){
                p.bigger = true;
                p.colourChange = true;
            }
        } else if(p.bigger){
            p.width = p.width * 1.1;
            p.colour = getHoverColour(p);
            
            if(p.width >= ftue.iconW){
                p.width = ftue.iconW;
                p.bigger = false;
                p.state = 'spin';
            }
        }
        
        p.halfW = p.width / 2;
    };

    p.wave = () => {
        if((p.distanceFromSpecial + p.delay) <= ftue.currentTime){
            if(!p.bigger){
                p.width = p.width * 0.9;
                if(p.width < 20){
                    p.bigger = true;
                    p.colourChange = true;
                }
            } else if(p.bigger){
                p.width = p.width * 1.1;
                p.colour = getWaveColour(p);
                
                if(p.width >= ftue.iconW){
                    p.width = ftue.iconW;
                    p.bigger = false;
                    p.state = 'spin';
                }
            }
        
            p.halfW = p.width / 2;
        }
    };

    p.click = () => {
        p.width = p.width * 0.85;
        p.halfW = p.width / 2;
        if(p.width < 5){ p.remove = true; }
    };
    
    p.update = () => {
        p.angle = (p.angle > 360)? 0 : p.angle + p.speed;
        p.rAngle = p.angle * p.radians;

        switch(p.state){
        case 'special': p.pulse(); break;
        case 'wave': p.wave(); break;
        case 'fadeIn': p.fadeIn(); break;
        case 'fadeOut': p.fadeOut(); break;
        case 'hover':  p.hover(); break;
        case 'click':  p.click(); break;
        default: p.state = 'spin';
        }
    };

    p.draw = () => {
        if(p.state === 'fadeIn' || p.state === 'fadeOut'){
            ftue.context.globalAlpha = p.alpha;
        }
        
        if(!p.remove){
            ftue.context.save(); 
	        ftue.context.translate(p.xPos + p.centre, p.yPos + p.centre);
	        ftue.context.rotate(p.rAngle);
            ftue.context.drawImage(ftue.preRenderCanvases[p.colour], -p.halfW, -p.halfW, p.width, p.width);
	        ftue.context.restore();
        }

        if(p.state === 'fadeOut'){
            ftue.context.globalAlpha = 1;
        }
    };
    
  return p;
};

const createSpecialParticle = () => {
    const random = Math.floor(Math.random() * ftue.particles.length + 1);
    ftue.particles[random].state = 'special';

    let i = ftue.particles.length;
    while(i--){
        ftue.particles[i].distanceFromSpecial = (Math.abs(ftue.particles[random].xArr - ftue.particles[i].xArr) + Math.abs(ftue.particles[random].yArr - ftue.particles[i].yArr)) * 50;
    }
};

const randomClick = () => {
    if(Math.random() < 0.95) return;
    
    const random = Math.floor(Math.random() * ftue.particles.length + 1);

    if(ftue.particles[random] && ftue.particles[random].state !== 'fadeIn' && ftue.particles[random].state !== 'fadeOut' && ftue.particles[random].state !== 'special' && ftue.particles[random].state !== 'wave'){
        ftue.particles[random].state = 'hover';
    }
};

const updateParticles = () => {
    let i = ftue.particles.length;
    while(i--){
        ftue.particles[i].update();
    }
};

const renderParticle = () => {
    ftue.context.clearRect(0, 0, ftue.canvas.width, ftue.canvas.height);
    
    let i = ftue.particles.length;
    while(i--){
        ftue.particles[i].draw();
    }
};

const animateParticles = () => {
    ftue.mainTimeline =  anime.timeline().add({
        targets: ftue.particles,
        duration: Infinity,
        ease: 'linear',
        update: (anim) => {
            if(ftue){
                ftue.currentTime = anim.currentTime;
                randomClick();
                updateParticles();
                renderParticle();
            }
        }
    });
};

const remove = (elem) => {
    ftue.canvas.parentNode.removeChild(elem);
};

const setScene = () => {
    anime.timeline().add({
        targets: ftue.logo,
        opacity: 0,
        duration: 1000,
        easing:'linear',
        delay: 1000,
        complete: () => {
            remove(ftue.logo);
        }
    });

     anime.timeline().add({
        targets: ftue.canvas,
        duration: 1000,
        backgroundColor: [{value: '#fff'}, {value: 'rgb(255, 255, 255)'}],
        easing:'easeInCubic',
        delay: 1000
    });
};

const check = () => {
    
    if(window.mainSeq){
        let i = ftue.particles.length;
        while(i--){
            ftue.particles[i].delay = ftue.currentTime;
            ftue.particles[i].state = 'fadeOut';
        }
        
        clearTimeout(ftue.check);
        ftue.destroy = setTimeout(destroy, 2000);
    } else {
        ftue.check = setTimeout(check, 1000);
    }
};

const destroy = () => {
    clearTimeout(ftue.destroy);

    remove(ftue.canvas);
    ftue = null;

    if(window.mainSeq){
        window.mainSeq();
    }
};

const autoClick = () => {
     anime({
        duration: 5000 ,
        complete: () => {
            check();
        }
    });
};

init();
