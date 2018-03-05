export default {
    toRadians: (deg) => {
        return deg * Math.PI / 180;
    },
    travel: (velocity, heading, startX, startY) => {
        let x,y;

        x = startX - (velocity * Math.sin(heading));
        y = startY - (velocity * Math.cos(heading));

        return {x,y};
    },
    clamp: (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    },
    wrap: (value, min, max) => {
        if(value < min) {
            return max - (min - value);
        } else {
            return min + (value - max);
        }
    }
}