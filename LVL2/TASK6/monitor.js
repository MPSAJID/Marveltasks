const chokidar = require('chokidar');
const { exec } = require('child_process');

const sourceDir = 'C:/path/to/source'; 
const destinationHost = 'example.com';
const destinationDir = '/path/to/destination';

const watcher = chokidar.watch(sourceDir, {
  ignored: /^\./, // ignore dotfiles
  persistent: true
});

console.log(`Monitoring ${sourceDir} for new images...`);

watcher.on('add', filePath => {
  console.log(`Detected new image: ${filePath}`);
  transferImage(filePath);
});

function transferImage(filePath) {
  const rsyncCommand = `rsync -avz --remove-source-files "${filePath}" ${destinationHost}:${destinationDir}`;
  exec(rsyncCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error transferring image: ${error}`);
      return;
    }
    console.log(`Image transferred successfully: ${filePath}`);
  });
}
