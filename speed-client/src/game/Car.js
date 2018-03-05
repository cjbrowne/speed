import MathUtil from '../util/MathUtil';

class Sensor {
    obstacle = 0;
    trackEdge = 0;
    update(obstacle, trackEdge) {
        this.obstacle = obstacle;
        this.trackEdge = trackEdge;
    }
}

export default class Car {
    position = {
        x: 0,
        y: 0
    };

    velocity = 0;

    heading = 0;

    id = 0;
    
    accelerator = 0;
    brake = 0;
    steeringWheel = 0;

    sensors = {
        frontLeft: new Sensor(),
        frontRight: new Sensor(),
        front: new Sensor(),
        rear: new Sensor()
    };

    code = {
        onTick: (car) => {},
        onStart: (car) => {},
        onFinish: (car) => {}
    };

    constructor(id, initialX, initialY, initialHeading, code) {
        if(typeof(code) === "string") {
            this.code = eval(`(${code})`);
        } else {
            this.code = code;
        }
        this.heading = initialHeading;
        this.position = {
            x: initialX,
            y: initialY
        };
        this.id = id;
    }

    setAccelerator(newValue) {
        this.accelerator = MathUtil.clamp(newValue, 0.0, 1.0);
    }

    setBrake(newValue) {
        this.brake = MathUtil.clamp(newValue, 0.0, 1.0);
    }

    setSteeringAngle(newValue) {
        this.steeringWheel = MathUtil.clamp(newValue, -1.0, 1.0);
    }
};