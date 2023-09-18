/*
    File: SplashSection.jsx
    Author: Ed Park
    Copyright: 2023 - Ed Park https://edpark.space
    Version: 1.0
*/

import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';

SplashSection.propTypes = {
    splashMessage: PropTypes.string.isRequired,
    message: PropTypes.string,
    isDarkMode: PropTypes.bool.isRequired,
    isErrorMode: PropTypes.bool.isRequired,
}

function UseHero({ message, isDarkMode, isErrorMode }) {
    const displayCanvasPrompt = useRef(true);
    const animationId = useRef();

    useEffect(() => {
        const canvasPrompt = document.getElementById('canvas-prompt');
        const canvasArrow = document.getElementById('canvas-arrow');

        class HeroCanvas {
            constructor(splashMessage) {
                this.canvas = document.getElementById('splash-intro');
                this.ctx = this.canvas.getContext('2d', {
                    willReadFrequently: true
                });

                // initialize properties that depend on screensize
                this.splashMessage = splashMessage;
                this.width = 0;
                this.height = 0;
                this.globeParticleSize = 0;
                this.fontSize = 0;
                this.lineHeight = 0;
                this.letterParticleSize = 0;
                this.mouseRadius = 0;
                this.letterLineWidth = 0;

                this.initializeCanvas();
            }

            initializeCanvas() {
                this.width = window.innerWidth;
                const maxWidth = 1280;
                const minWidth = 200;

                if (this.width > maxWidth) {
                    this.width = maxWidth;
                }

                if (this.width < minWidth) {
                    this.width = minWidth;
                }

                //Below describes how I derived the values to determine property ranges based on linear formula: y=mx+b
                // mx1+b = y1; mx2+b = y2. By linear proportions we can derive...
                // b = [(x1*y2)-(x2*y1)] / (x1-x2)
                // m = (y1 - b) / x1

                // 2000 = m*200 + b    => x1=200; y1=2000;
                // 5000 = m*1280 + b   => x2=1280; y2=5000;
                // Therefore m=2.77777 b=1444.44444
                this.mouseRadius = Math.ceil((2.77777 * this.width) + 1444.44444);

                // minHeight: 300 maxHeight: 450
                // 300 = m*200 + b    => x1=200; y1=300;
                // 450 = m*1280 + b   => x2=1280; y2=450;
                // Therefore m=0.1388 b=272.2222
                this.height = Math.ceil((0.1388 * this.width) + 272.2222);

                // 1 = m*200 + b    => x1=200; y1=1;
                // 3 = m*1280 + b   => x2=1280; y2=3;
                // Therefore m=0.0018 b=0.6296
                this.letterParticleSize = Math.ceil((0.0018 * this.width) + 0.6296);

                // 1 = m*200 + b    => x1=200; y1=1;
                // 2 = m*1280 + b   => x2=1280; y2=2;
                // Therefore m=0.00092 b=0.81481
                this.globeParticleSize = Math.ceil((0.00092 * this.width) + 0.81481);

                // 1 = m*200 + b    => x1=200; y1=1;
                // 4 = m*1280 + b   => x2=1280; y2=4;
                // Therefore m=0.00277 b=0.44444
                this.letterLineWidth = Math.ceil((0.00277 * this.width) + 0.44444);

                // 30 = m * 200 + b    => x1=200; y1=30;
                // 105 = m * 1280 + b   => x2=1280; y2=100;
                // Therefore m=0.06481 b=17.03703
                this.fontSize = Math.ceil((0.06481 * this.width) + 17.03703);
                this.lineHeight = this.fontSize;

                this.canvas.width = this.width;
                this.canvas.height = this.height;
            }
        }

        class Globe {
            constructor(canvasWidth, canvasHeight) {
                this.globeRadius = 0;
                this.globeCenterX = 0;
                this.globeCenterY = 0;
                this.globeCenterZ = 0;
                this.globePerspective = 0;

                this.initializeGlobe(canvasWidth, canvasHeight);
            }

            initializeGlobe(canvasWidth, canvasHeight) {
                // This check ensures globe will always fit in view without getting cut off
                this.globeRadius = (canvasWidth < canvasHeight) ? canvasWidth / 2 : canvasHeight / 2;
                this.globeCenterX = canvasWidth / 2; //Globe origin is at center X
                this.globeCenterY = canvasHeight / 2; // Globe origin is at center Y
                this.globeCenterZ = -this.globeRadius; //Z axis of globe origin
                this.globePerspective = canvasWidth * 0.8;
            }
        }

        class StageLock {
            constructor(totalCount) {
                this.completedCount = 0;
                this.totalCount = totalCount;
            }

            incrementCount() {
                this.completedCount++;
            }

            getUnlockStatus() {
                return (this.completedCount === this.totalCount);
            }
        }

        class ParticleStages {
            constructor() {
                this.stage = 1;
            }

            getStage() {
                return this.stage;
            }

            goToNextStage() {
                this.stage++;
            }
        }

        class Particle {
            constructor(effect, x, y, color) {
                this.effect = effect;
                // starting x and y coords
                this.currX = heroCanvas.width / 2;
                this.currY = heroCanvas.height / 2;

                // Establish positioning for globe formation
                // Random value between 0 and 2PI
                const theta = Math.random() * 2 * Math.PI;
                // Random value between -1 and 1
                const phi = Math.acos((Math.random() * 2) - 1);

                this.globeX = globe.globeRadius * Math.sin(phi) * Math.cos(theta);
                this.globeY = globe.globeRadius * Math.sin(phi) * Math.sin(theta);
                this.globeZ = (globe.globeRadius * Math.cos(phi)) + globe.globeCenterZ;

                this.color = color;

                this.stage = new ParticleStages();

                //ending x and y coords
                this.finalX = x;
                this.finalY = y;

                //distance between mouse cursor and particle horizontally and vertically
                this.dx = 0;
                this.dy = 0;

                //velocities
                this.vx = 0;
                this.vy = 0;

                //push particle at certain speed and angle of that push
                this.force = 0;
                this.angle = 0;

                this.distance = 0;
                this.friction = Math.random() * 0.60 + 0.10; //Math.random() * 0.6 + 0.15;
                this.ease = 0.045;

                this.firstTime = true;
                this.repeat = 0;
                this.rotationSeed = 253.29999999701977;

                const [globeX, globeY, size] = this.refreshGlobeParticle();

                this.globeStartX = globeX;
                this.globeStartY = globeY;
                this.currSize = size;

                this.particleStartDist = 0;
                this.particleSizeFactor = 1;
                this.finalSize = heroCanvas.letterParticleSize;
                // this.uniqueName = 'asd' + entNum; //Debugging
            }

            draw() {
                heroCanvas.ctx.fillStyle = this.color;
                heroCanvas.ctx.fillRect(this.currX, this.currY, this.currSize, this.currSize);
            }

            update() {
                if (this.stage.getStage() > 3) {
                    // Enable mouse interaction once grand intro is complete
                    this.interactPointer();
                } else {
                    if (this.stage.getStage() === 1) {
                        this.spawnGlobe();
                    } else if (this.stage.getStage() === 2) {
                        this.orbitGlobe();
                    } else if (this.stage.getStage() === 3) {
                        this.formText();
                    }
                }
            }

            spawnGlobe() {
                this.currX += (this.vx *= this.friction) + (this.globeStartX - this.currX) * this.ease;
                this.currY += (this.vy *= this.friction) + (this.globeStartY - this.currY) * this.ease;

                if (this.globeStartX + 2 >= this.currX && this.globeStartY + 2 >= this.currY) {
                    // Ensures we increment count once per particle
                    if (this.firstTime) {
                        effect.stageLock.incrementCount();
                        this.firstTime = false;
                    }

                    if (effect.stageLock.getUnlockStatus()) {
                        this.vx = 0;
                        this.vy = 0;
                        this.stage.goToNextStage();
                    }
                }
            }

            refreshGlobeParticle() {
                const rotation = this.rotationSeed * 0.0004;
                const sin = Math.sin(rotation);
                const cos = Math.cos(rotation);

                const rotationX = cos * this.globeX + sin * (this.globeZ - globe.globeCenterZ);
                const rotationZ = -sin * this.globeX + cos * (this.globeZ - globe.globeCenterZ) + globe.globeCenterZ;

                const orbitSizeProjection = globe.globePerspective / (globe.globePerspective - rotationZ);
                const globeX = ((rotationX * orbitSizeProjection) + globe.globeCenterX) - heroCanvas.globeParticleSize;
                const globeY = (this.globeY * orbitSizeProjection) + globe.globeCenterY - heroCanvas.globeParticleSize;
                const size = heroCanvas.globeParticleSize * 2 * orbitSizeProjection;

                return [globeX, globeY, size];
            }

            orbitGlobe() {
                // Arbitrary increment value, higher the number, faster the globe moves
                // 65
                this.rotationSeed += 75;

                const [globeX, globeY, size] = this.refreshGlobeParticle();

                this.currX = globeX;
                this.currY = globeY;
                this.currSize = size;

                // Rotation duration
                if (this.repeat > 130) {
                    // Particle can be at any point record its current distance to final X and Y
                    const xDiff = (this.currX - this.finalX);
                    const yDiff = (this.currY - this.finalY);

                    this.particleStartDist = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
                    this.particleSizeFactor = Math.abs(this.currSize - this.finalSize);
                    this.stage.goToNextStage();
                }

                this.repeat++;
            }

            // once all particles are in globe formation, particles then travel to center and form text in a stream
            formText() {
                const xDiff = (this.finalX - this.currX);
                const yDiff = (this.finalY - this.currY);

                this.currX += (this.vx *= this.friction) + xDiff * this.ease;
                this.currY += (this.vy *= this.friction) + yDiff * this.ease;

                // resize particle with respect to how close particle is to meeting its final point
                const currentDistance = Math.sqrt((xDiff * xDiff) + (yDiff * yDiff));
                this.currSize = (this.particleSizeFactor * (1 - ((this.particleStartDist - currentDistance) / this.particleStartDist))) + this.finalSize;

                if (this.finalX + 2 >= this.currX && this.finalY + 2 >= this.currY) {
                    // Some particles may happen to be within 2px of the place where they should go, this helps conform sizes
                    if (displayCanvasPrompt.current) {
                        displayCanvasPrompt.current = false;
                        canvasPrompt.style.opacity = 1;
                        canvasArrow.style.opacity = 1;
                    }

                    this.currSize = heroCanvas.letterParticleSize;
                    this.ease = Math.random() * 0.015 + 0.020; //Math.random() * 0.01 + 0.02;
                    this.stage.goToNextStage();
                }
            }

            interactPointer() {
                this.dx = this.effect.mouse.x - this.currX;
                this.dy = this.effect.mouse.y - this.currY;
                this.distance = (this.dx * this.dx) + (this.dy * this.dy);
                this.force = -this.effect.mouse.radius / this.distance;

                if (this.distance < this.effect.mouse.radius) {
                    this.angle = Math.atan2(this.dy, this.dx);
                    this.vx += this.force * Math.cos(this.angle);
                    this.vy += this.force * Math.sin(this.angle);
                }

                this.currX += (this.vx *= this.friction) + (this.finalX - this.currX) * this.ease;
                this.currY += (this.vy *= this.friction) + (this.finalY - this.currY) * this.ease;
            }
        }

        class Effect {
            constructor() {
                // positions text
                this.textX = 0;
                this.textY = 0;
                this.maxTextWidth = 0;
                this.particles = [];
                this.gap = heroCanvas.letterParticleSize;
                this.mouse = {
                    radius: heroCanvas.mouseRadius,
                    x: 0,
                    y: 0
                };

                this.stageLock = '';
                this.resize();

                heroCanvas.canvas.addEventListener('mousemove', scatterParticleOnMove);
                heroCanvas.canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
                heroCanvas.canvas.addEventListener('touchmove', handleTouchMove);
            }

            async setupText() {
                // const gradient = this.context.createLinearGradient(0, 0, canvas.width, canvas.height);

                const gradient = heroCanvas.ctx.createRadialGradient(heroCanvas.width / 2, heroCanvas.height / 2, 0,
                    heroCanvas.width / 2, heroCanvas.height / 2, heroCanvas.width / 2);

                if (isErrorMode) {
                    gradient.addColorStop(0, isDarkMode ? '#610316' : '#AB091E');
                    gradient.addColorStop(0.3, isDarkMode ? '#E12D39' : '#EF4E4E');
                    gradient.addColorStop(0.6, isDarkMode ? '#610316' : '#AB091E');
                    gradient.addColorStop(1, isDarkMode ? '#E12D39' : '#EF4E4E');
                } else {
                    gradient.addColorStop(0, isDarkMode ? '#061178' : '#132DAD');
                    gradient.addColorStop(0.3, isDarkMode ? '#2251CC' : '#3A66DB');
                    gradient.addColorStop(0.6, isDarkMode ? '#061178' : '#132DAD');
                    gradient.addColorStop(1, isDarkMode ? '#2251CC' : '#3A66DB');
                }

                heroCanvas.ctx.strokeStyle = isDarkMode ? '#B0D0FF' : '#0A1C37';
                heroCanvas.ctx.fillStyle = gradient;
                heroCanvas.ctx.font = `normal 800 ${heroCanvas.fontSize}px Orbitron`;
                heroCanvas.ctx.textAlign = 'center';
                heroCanvas.ctx.textBaseline = 'middle';
                heroCanvas.ctx.lineWidth = heroCanvas.letterLineWidth;

                // break multilines
                let linesArray = [];
                let lineCounter = 0;
                let line = '';
                let words = heroCanvas.splashMessage.split(' ');

                for (let i = 0; i < words.length; i++) {
                    let testLine = line + words[i] + ' ';

                    if (heroCanvas.ctx.measureText(testLine).width > this.maxTextWidth) {
                        line = words[i] + ' ';
                        lineCounter++;
                    } else {
                        line = testLine;
                    }

                    linesArray[lineCounter] = line;
                }

                let textHeight = heroCanvas.lineHeight * lineCounter;
                this.textY = heroCanvas.height / 2 - textHeight / 2;

                linesArray.forEach((el, index) => {
                    heroCanvas.ctx.fillText(el, this.textX, this.textY + (index * heroCanvas.lineHeight));
                    heroCanvas.ctx.strokeText(el, this.textX, this.textY + (index * heroCanvas.lineHeight));
                });

                this.convertToParticles();
            }

            convertToParticles() {
                this.particles = [];
                const pixels = heroCanvas.ctx.getImageData(0, 0, heroCanvas.width, heroCanvas.height).data;
                heroCanvas.ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
                // let ccc = 0; //Debugging

                // both these loop had this.gap at end of foor loop declare
                for (let y = 0; y < heroCanvas.height; y += heroCanvas.letterParticleSize) {
                    for (let x = 0; x < heroCanvas.width; x += heroCanvas.letterParticleSize) {
                        const index = (y * heroCanvas.width + x) * 4;
                        const alpha = pixels[index + 3];

                        if (alpha > 0) {
                            // ccc++;//Debugging
                            const red = pixels[index];
                            const green = pixels[index + 1];
                            const blue = pixels[index + 2];
                            const color = `rgb(${red}, ${green}, ${blue})`;

                            this.particles.push(new Particle(this, x, y, color));
                            // this.particles.push(new Particle(this, x, y, color, ccc)); //Debugging
                        }
                    }
                }

                this.stageLock = new StageLock(this.particles.length);
            }

            render() {
                this.particles.forEach(particle => {
                    particle.update();
                    particle.draw();
                });
            }

            resize() {
                this.textX = heroCanvas.width / 2;
                this.textY = heroCanvas.height / 2;
                this.particles = [];
                this.maxTextWidth = heroCanvas.width * 0.8;
                this.mouse = {
                    radius: heroCanvas.mouseRadius,
                    x: 0,
                    y: 0
                };
            }
        }

        function handleTouchStart(event) {
            event.preventDefault();
        }

        function handleTouchMove(event) {
            const elemOffset = heroCanvas.canvas.getBoundingClientRect();
            effect.mouse.x = event.touches[0].clientX - elemOffset.left;
            effect.mouse.y = event.touches[0].clientY - elemOffset.top;
        }

        function scatterParticleOnMove(event) {
            const elemOffset = heroCanvas.canvas.getBoundingClientRect();
            effect.mouse.x = event.x - elemOffset.left;
            effect.mouse.y = event.y - elemOffset.top;
        }

        function animate() {
            heroCanvas.ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
            effect.render();
            animationId.current = window.requestAnimationFrame(animate);
        }

        function resetCanvas() {
            displayCanvasPrompt.current = true;
            canvasPrompt.style.opacity = 0;
            canvasArrow.style.opacity = 0;

            heroCanvas.initializeCanvas();
            globe.initializeGlobe(heroCanvas.width, heroCanvas.height);
            effect.resize(heroCanvas.width, heroCanvas.height);
            //do not attempt to get font since it's already loaded
            effect.setupText();
        }

        const splashMessage = message;
        const heroCanvas = new HeroCanvas(splashMessage);
        const globe = new Globe(heroCanvas.width, heroCanvas.height);
        const effect = new Effect();
        let timeoutReset;

        effect.setupText();
        effect.render();
        animate();

        function resizeAnimationHandle() {
            clearTimeout(timeoutReset);
            timeoutReset = setTimeout(resetCanvas, 500);
        }

        window.addEventListener('resize', resizeAnimationHandle);

        return () => {
            window.cancelAnimationFrame(animationId.current);
            window.removeEventListener('resize', resizeAnimationHandle);
            heroCanvas.canvas.removeEventListener('mousemove', scatterParticleOnMove);
            heroCanvas.canvas.removeEventListener('touchstart', handleTouchStart, { passive: false });
            heroCanvas.canvas.removeEventListener('touchmove', handleTouchMove);
        }
    }, [message, isDarkMode, isErrorMode]);
}

export default function SplashSection({ splashMessage, isDarkMode, isErrorMode }) {
    return (
        <div className="relative w-[100%] flex flex-col flex-nowrap items-center justify-center gap-0 sm:gap-8 md:gap-9 lg:gap-10">
            <div className="relative sm:absolute sm:top-0 sm:right-0 flex flex-col flex-nowrap items-center justify-center mx-mobileBound sm:mr-8 text-center">
                <p id="canvas-prompt" className="opacity-0 transition-[opacity] duration-[2000ms]">Hover Over Letters</p>
                <svg id="canvas-arrow" className="opacity-0 transition-[opacity] duration-[2000ms] absolute sm:relative top-8 sm:top-auto animate-hero-pointer-bounce-mobile sm:animate-hero-pointer-bounce sm:mt-0 h-9 sm:h-10 md:h-11 lg:h-[80px]" enableBackground="new 0 0 122.433 122.88" version="1.1" viewBox="0 0 52.513 52.695" xmlns="http://www.w3.org/2000/svg">
                    <title>Arrow pointing to animation canvas</title>
                    <g transform="matrix(.4069 0 0 .4069 1.3475 1.3475)" fill="hsl(var(--color-primBlue-200))" style={{ mixBlendMode: 'normal' }}>
                        <polygon points="0 59.207 39.403 59.207 39.403 0 83.033 0 83.033 59.207 122.43 59.207 61.216 122.88" clipRule="evenodd" fill="hsl(var(--color-primBlue-200))" fillRule="evenodd" />
                    </g>
                    <g transform="matrix(.4069 0 0 .4069 1.3475 1.3475)" fill="hsl(var(--color-primBlue-200))">
                        <polygon points="39.403 59.207 39.403 0 83.033 0 83.033 59.207 122.43 59.207 61.216 122.88 0 59.207" clipRule="evenodd" fill="hsl(var(--color-primBlue-200))" fillRule="evenodd" />
                    </g>
                </svg>
            </div>
            <canvas id="splash-intro" className="w-[100%] mt-3" aria-label={`Interactive particle animation that displays text ${splashMessage}`} role="img">Your browser does not support the HTML canvas tag.</canvas>
            <UseHero message={splashMessage} isDarkMode={isDarkMode} isErrorMode={isErrorMode} />
        </div>
    );
}