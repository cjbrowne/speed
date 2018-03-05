// currently backed by localstorage, may back this by server later on once we have user mgmt

/* eslint import/no-webpack-loader-syntax: off */
import defaultCarCode from '!raw-loader!../static/default_car_code.txt';

// private functions
let getNewId = () => {
    let lastCarId = localStorage.getItem('lastCarId') || 0;
    if(localStorage.getItem(`car:${lastCarId}`) !== null) {
        localStorage.setItem('lastCarId', (+lastCarId) + 1);
    }
    return lastCarId;
}

export class CarService {
    loadCar(carId) {
        return new Promise((resolve, reject) => {
            let car = localStorage.getItem(`car:${carId}`);
            if(car != null) {
                resolve(JSON.parse(car));
            } else {
                reject(`Car ${carId} missing`);
            }
        });
    }
    saveCar(carId, car) {
        return new Promise((resolve, reject) => {
            try { 
                localStorage.setItem(`car:${carId}`, JSON.stringify(car));
            } catch (e) {
                console.error(e);
                reject(`Local storage exception when saving ${carId}, probably local storage is full?`);
            }
        });
    }
    // Later the default code might be stored server-side, for example in a database, so we can update the default car
    // without deploying
    createNewCar() {
        return new Promise((resolve, reject) => {
            resolve({
                code: defaultCarCode,
                id: getNewId()
            });
        });
    }
}

export default new CarService();