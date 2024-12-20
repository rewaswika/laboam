const { spawn } = require('child_process');

function runCommand(command, args) {
    return new Promise((resolve, reject) => {
        const child = spawn(command, args);

        child.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        child.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        child.on('close', (code) => {
            if (code !== 0) {
                // Reject the promise with an error message including the exit code
                reject(new Error(`Process exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

runCommand('node', ['--version'])
    .then(() => {
        console.log('Command executed successfully');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
