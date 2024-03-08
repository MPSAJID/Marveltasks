const chokidar = require('chokidar');
const { exec } = require('child_process');

const sourceDir = 'G:/tech/Marveltasks/LVL2/TASK3/chat'; 

const destinationDir = 'G:/tech/Marveltasks/LVL2/TASK6/imgfolder';

const watcher = chokidar.watch(sourceDir, {
  ignored: ['**/node_modules/**', '**/.env/**',/^\./],
  persistent: true
});

console.log(`Monitoring ${sourceDir} for new images...`);

watcher.on('add', filePath => {
  console.log(`Detected new image: ${filePath}`);
  transferImage(filePath);
});

function transferImage(filePath) {
  const rsyncCommand = `rsync -avz --remove-source-files "${filePath}" ${destinationDir}`;
  exec(rsyncCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error transferring image: ${error}`);
      return;
    }
    console.log(`Image transferred successfully: ${filePath}`);
  });
}
