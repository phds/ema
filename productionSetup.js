var exec = require('child_process').exec;
var cmd = 'prince -v builds/pdf/book.html -o builds/pdf/book.pdf';

var helpText = "Run the script with one of the commands: seed, help";

if (process.argv.length !== 3){
  console.log(helpText);
  process.exit();
}

switch(process.argv[2]) {
  case 'help':
    console.log(helpText);
    process.exit();
  break;

  case 'seed':
    seed();
  break;

  case 'setup':
    setup();
  break;

  case 'all':

    setup().then(()=> {
      seed();
    });

  break;
}

function seed(){
  // var exec = require('child_process').exec;
  // var cmd = 'node_modules/sequelize-cli/bin/sequelize db:seed --seed productionSeed.js';
  //
  //
}

function setup(){
  return require('app/db/models')
    .sequelize.sync({force:true})
    .then(() => {
      console.log('db up!');
    });
}
//
// exec(cmd, function(error, stdout, stderr) {
// // command output is in stdout
// });
