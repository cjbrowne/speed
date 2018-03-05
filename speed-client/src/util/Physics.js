export default {
    // physics constants
    AIR_RESISTANCE_COEFFICIENT: 0.05,
    TERMINAL_VELOCITY: 20,


    getAccelerationForThrottleInput: (input) => {
        // acceleration is linear for now
        return input * 0.5;
    },
    getDecelerationForBrakeInput: (input) => {
        // deceleration is also linear for now
        return input * 0.3;
    }
}