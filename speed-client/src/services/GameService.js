import MathUtil from '../util/MathUtil';
import MapUtil from '../util/MapUtil';
import Physics from '../util/Physics';
import Car from '../game/Car';
import _ from 'lodash';
import TrackData from '../static/tracks/spa';
// TODO: this should connect to the server and let the server handle the sessions

// will probably need to completely re-implement this later on
export class GameService {
    constructor() {
        this.sessions = {
        }

        this.isPaused = false;

        let updateSensors = (car, trackData) => {

        }

        let tickSession = (session) => {
            if(!session) return;

            let tickCar = (car) => {
                if(car.velocity > 0) {
                    let {x,y} = MathUtil.travel(car.velocity, car.heading, car.position.x, car.position.y);
                    car.position.x = MathUtil.clamp(x, 0, 1280);
                    car.position.y = MathUtil.clamp(y, 0, 700);
                }
                let velocityDelta = Physics.getAccelerationForThrottleInput(car.accelerator) -
                    (Physics.AIR_RESISTANCE_COEFFICIENT
                        + MapUtil.getSurface(car.position.x, car.position.y, session.track).frictionCoefficient
                        + Physics.getDecelerationForBrakeInput(car.brake)
                    )
                ;

                car.heading = MathUtil.wrap(car.heading + car.steeringWheel, 0, Math.PI * 2);

                car.velocity = MathUtil.clamp(car.velocity + velocityDelta, 0, Physics.TERMINAL_VELOCITY);

                updateSensors(car, TrackData);

                // this will still remain here when we switch to the socket.io version
                if(car.code && typeof car.code.onTick === "function") {
                    car.code.onTick(car);
                }
                console.debug(car);
            }

            _.each(session.cars, tickCar);
        }

        let tick = () => {
            if(this.isPaused) {
                setTimeout(tick, 100);
                return;
            }
            _.each(this.sessions, tickSession);
            setTimeout(tick, 100);
        }
        // later on we will just connect to a socket.io server and update our state 
        // whenever we get an update from the server
        setTimeout(tick, 100);

    }

    onSessionStart(session) {
        _.each(session.cars, (car) => {
            console.log(car.code);
            if(car.code && typeof car.code.onStart === "function") {
                car.code.onStart(car);
            }
        });
    }

    destroySession(sessionId) {
        this.sessions[sessionId] = null;
    }

    createTestSession(car) {
        return new Promise((resolve, reject) => {
            this.sessions.test = {
                id: 'test',
                cars: [
                    new Car(car.id, 210, 580, MathUtil.toRadians(120), car.code)
                ]
            }

            this.onSessionStart(this.sessions.test);
            resolve(this.sessions.test);
        });
    }

    getCarsForSession(sessionId) {
        if(this.sessions[sessionId]) {
            return this.sessions[sessionId].cars;
        } else {
            return [];
        }
    }

    pause() {
        this.isPaused = true;
    }

    play() {
        this.isPaused = false;
    }
}

export default new GameService();