module.exports = {
    get : () => {
        const {getSunrise, getSunset} = require('sunrise-sunset-js');
        require('dotenv').config();
        const sunrise = getSunrise(process.env.LATITUDE,process.env.LONGITUDE,new Date());
        const sunset= getSunset(process.env.LATITUDE,process.env.LONGITUDE,new Date());
        console.log(new Date())
        return {sunset,sunrise};
    }
}
