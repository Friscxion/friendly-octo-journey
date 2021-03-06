
//let test= new CronTime('0 0 0 * * *','Europe/Paris');


const axios = require("axios");

class managerCron{
    constructor() {

    }
    init =async()=>{
        await this.autoSet();
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
            axios.get('http://localhost:2021/close').then(()=>{
                console.log('Daily sunset Closed!');
            })
        }, null, true, 'Europe/Paris');
        this.sunsetJob.start();

        this.sunriseJob = new CronJob(`${this.sunrise[0]} ${this.sunrise[1]} ${this.sunrise[2]} * * *`, function() {
            axios.get('http://localhost:2021/open').then(()=>{
                console.log('Daily sunrise Opened!');
            })
        }, null, true, 'Europe/Paris');
        this.sunriseJob.start();

    }

    refresh = async()=>{
        const CronTime = require('cron').CronTime;
        await this.autoSet();

        this.sunriseJob.stop();
        this.sunriseJob.setTime(new CronTime(`${this.sunrise[0]} ${this.sunrise[1]} ${this.sunrise[2]} * * *`,'Europe/Paris'));
        this.sunriseJob.start();
        this.sunsetJob.stop();
        this.sunsetJob.setTime(new CronTime(`${this.sunset[0]} ${this.sunset[1]} ${this.sunset[2]} * * *`,'Europe/Paris'));
        this.sunsetJob.start();

    }

    autoSet= async()=>{
        const Today = require('./today');
        const fs = require('fs').promises;
        let params=await fs.readFile('params.json')
        params = JSON.parse(params.toString());

        const {sunset, sunrise}= Today.get();


        sunrise.setMinutes(sunrise.getMinutes() + parseInt(params.lever));
        sunset.setMinutes(sunset.getMinutes() + parseInt(params.coucher));


        this.sunrise=Today.dateToTab(sunrise);
        this.sunset=Today.dateToTab(sunset);
        console.log(this.sunset,this.sunrise)

    }

}
module.exports.manager=new managerCron();
