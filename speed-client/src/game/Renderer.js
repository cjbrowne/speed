import _ from 'lodash';

import carSprite from '../static/car.png';
import spa from '../static/spa.png';

import gameService from '../services/GameService';

export default class Renderer {
    constructor(ctx, cvs, sessionId) {
        this.ctx = ctx;
        this.cvs = cvs;
        this.sessionId = sessionId;
    }

    drawCars() {
        let cars = gameService.getCarsForSession(this.sessionId);
        _.each(cars, (car) => {
            let {ctx} = this;
            
            ctx.save();
            ctx.translate(car.position.x + this.carImage.width / 2, car.position.y + this.carImage.height /2);
           
            ctx.rotate(-car.heading);

            ctx.drawImage(this.carImage, 
                - this.carImage.width / 2, 
                - this.carImage.height / 2,
                this.carImage.width,
                this.carImage.height
            );
            ctx.restore();

        });
    }


    start() {
        this.trackImage = new Image();
        this.trackImage.src = spa; // todo: support multiple tracks
        this.trackImage.onload = () => {
            this.ctx.drawImage(this.trackImage, 0, 0, this.cvs.width, this.cvs.height);
        }

        this.carImage = new Image();
        this.carImage.src = carSprite;

        this.carImage.width=16;
        this.carImage.height=16;

        this.drawCars();

        setInterval(() => {
            this.tick();
        }, 100);
    }

    tick() {
        let cars = gameService.getCarsForSession(this.sessionId);
        this.ctx.drawImage(this.trackImage, 0, 0, this.cvs.width, this.cvs.height);
        this.drawCars(this.ctx, cars);
    }
}