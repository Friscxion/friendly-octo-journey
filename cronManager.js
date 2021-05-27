
//let test= new CronTime('0 0 0 * * *','Europe/Paris');
class managerCron{
    constructor() {

    }
    init(){
        this.autoSet();
        this.createJobs();
    }
    createJobs(){
        const CronJob = require('cron').CronJob;

        this.main = new CronJob('0 0 0 * * *', function() {
            this.refresh();
            console.log('Daily refresh');
        }, null, true, 'Europe/Paris');
        this.main.start();

        this.sunsetJob = new CronJob(`${this.sunset[0]} ${this.sunset[1]} ${this.sunset[2]} * * *`, function() {
            console.log('Daily sunset');
        }, null, true, 'Europe/Paris');
        this.sunsetJob.start();

        this.sunriseJob = new CronJob(`${this.sunrise[0]} ${this.sunrise[1]} ${this.sunrise[2]} * * *`, function() {
            console.log('Daily sunrise');
        }, null, true, 'Europe/Paris');
        this.sunriseJob.start();

    }

    refresh(){
        const CronTime = require('cron').CronTime;
        this.autoSet();

        this.sunriseJob.stop();
        this.sunriseJob.setTime(new CronTime(`${this.sunrise[0]} ${this.sunrise[1]} ${this.sunrise[2]} * * *`,'Europe/Paris'));
        this.sunriseJob.start();
        this.sunsetJob.stop();
        this.sunsetJob.setTime(new CronTime(`${this.sunset[0]} ${this.sunset[1]} ${this.sunset[2]} * * *`,'Europe/Paris'));
        this.sunsetJob.start();
    }

    autoSet(){
        const Today = require('./today');
        const params = require('./params.json');
        const {sunrise, sunset}= Today.get();

        sunrise.setUTCMinutes(sunrise.getUTCMinutes() + params.lever);
        sunset.setUTCMinutes(sunset.getUTCMinutes() + params.coucher);


        console.log(sunrise,sunset)
        this.sunrise=Today.dateToTab(sunrise);
        this.sunset=Today.dateToTab(sunset);
    }

}
module.exports.manager=new managerCron();
