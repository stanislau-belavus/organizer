var CronJob = require('cron').CronJob;
var forker = require('child_process');
new CronJob('* * * * *', function() {
    console.log('START EXECUTION TEST', new Date());
    forker.exec('npm run tests', function(err, stdout) {
        console.log(stdout);
        console.log('FINISH, EXECUTION TEST', new Date());
     });
}, null, true, 'America/Los_Angeles');