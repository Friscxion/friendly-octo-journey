module.exports = {
    get : () => {
        const {getSunrise, getSunset} = require('sunrise-sunset-js');
        require('dotenv').config();
        let sunrise = getSunrise(process.env.LATITUDE,process.env.LONGITUDE);
        let sunset= getSunset(process.env.LATITUDE,process.env.LONGITUDE);
        sunset.setTime(sunset.getTime() - new Date().getTimezoneOffset()*60*1000);
        sunrise.setTime(sunrise.getTime() - new Date().getTimezoneOffset()*60*1000);
        return {sunset,sunrise};
    }
}
