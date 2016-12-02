var exec = require('child_process').exec;
var cmd = 'prince -v builds/pdf/book.html -o builds/pdf/book.pdf';

var helpText = "Run the script with one of the commands: setup, help";

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

  default:
    console.log(helpText);
    process.exit();
  break;
}

function setup(){
  return require('./app/db/models')
    .sequelize.sync({force:true})
    .then(() => {
      console.log('db up!');
      process.exit();
    });
}
//
// exec(cmd, function(error, stdout, stderr) {
// // command output is in stdout
// });
