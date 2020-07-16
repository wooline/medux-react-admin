// function spawn(command, args, errorMessage) {
//   const isWindows = process.platform === 'win32'; // spawn with {shell: true} can solve .cmd resolving, but prettier doesn't run correctly on mac/linux
//   const result = childProcess.spawnSync(isWindows ? command + '.cmd' : command, args, {stdio: 'inherit'});
//   if (result.error) {
//     console.error(result.error);
//     process.exit(1);
//   }
//   if (result.status !== 0) {
//     console.error(chalk`{red.bold ${errorMessage}}`);
//     console.error(`non-zero exit code returned, code=${result.status}, command=${command} ${args.join(' ')}`);
//     process.exit(1);
//   }
// }
// module.exports = {spawn};
