var plan = require('flightplan');

plan.target('default', [{
  // host: '139.59.26.160',
  host: '159.203.2.182',
  username: 'root',
  agent: process.env.SSH_AUTH_SOCK
}]);

const uuid = require('uuid');
const tmpDir = uuid.v1();

// run commands on localhost
plan.local(function(local) {
  local.log('Copy files to remote hosts');
  local.exec(`npm run build`);
  var filesToCopy = local.exec('find build/*', {
    silent: true
  });
  // rsync files to all the target's remote hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on the target's remote hosts
plan.remote(function(remote) {
  const serverDir = '/var/www/zeachco.com';
  remote.exec(`rm -rf ${serverDir}`);
  remote.exec(`mkdir -p ${serverDir}`);
  remote.exec(`cp -R /tmp/${tmpDir}/build/* ${serverDir}`);
  remote.rm('-rf /tmp/' + tmpDir);
  remote.exec('find /var/www/zeachco.com');
});
