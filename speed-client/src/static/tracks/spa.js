import MapUtil from '../MapUtil';
import _ from 'lodash';

let tiles =  _.map(_.range(1280), (tileX) => {
    return _.map(_.range(720), (tileY) => {
        return {
            surface: MapUtil.Surface.TARMAC,
            car: false,
            wall: false
        };
    });
});

export {
    tiles
}