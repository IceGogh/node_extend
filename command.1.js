var program = require('commander');
const { resolve } = require('path')
program
  .version('0.1.0')
  .command('rmdir <dir> [otherDirs...]')
  .action(function (dir, otherDirs) {

    console.log('rmdir %s', resolve(__dirname, dir));
    if (otherDirs) {
      otherDirs.forEach(function (oDir) {
        console.log('rmdir %s', oDir);
      });
    }
  });
 
program.parse(process.argv);