module.exports = {
    get : () => {
        const {getSunrise, getSunset} = require('sunrise-sunset-js');
        require('dotenv').config();
        let sunrise = getSunrise(process.env.LATITUDE,process.env.LONGITUDE);
        let sunset= getSunset(process.env.LATITUDE,process.env.LONGITUDE);
        sunset.setTime(sunset.getTime() - sunset.getTimezoneOffset()*120*1000);
        sunrise.setTime(sunrise.getTime() - sunrise.getTimezoneOffset()*120*1000);
        console.log(sunset,sunrise);
        return {sunset,sunrise};
    }
}
