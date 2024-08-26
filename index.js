const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
    .version('1.0.0')
    .description('CLI TODO APP')
    .option('-a, --add <task>', 'add a new task')
    .option('-l, --list', 'list all tasks')

program.command('add')
    .description('add a new task')
    .argument('<task>', 'add a new task')
    .action(function (task) {
        let data = fs.readFileSync('to-do.txt', 'utf8');
        let datasize = data.length;
        // handled for first todo 
        if(data[datasize - 1] !== '\n') {
            data = data + '\n';
        }
        fs.writeFileSync('to-do.txt', data + task);
        console.log('Task added successfully!');
    })

program.command('list')
    .description('list all tasks')
    .action(function () {
        const data = fs.readFileSync('to-do.txt', 'utf8');
        const datasplit = data.split('\n').filter(Boolean);
        for (let i = 0; i < datasplit.length; i++) {
            console.log(`${i + 1}. ${datasplit[i]}`);
        }
    })

program.command('delete')
    .description('delete a task')
    .argument('<task>', 'delete a task')
    .action(function () {
        const data = fs.readFileSync('to-do.txt', 'utf8');
        let tasks = data.split('\n').filter(Boolean);
        let task = program.args[1];
        if (!isNaN(task)) {
            if (task > tasks.length) {
                console.log('Task not found!');
                return;
            } else {
                tasks.splice(task - 1, 1);
                fs.writeFileSync('to-do.txt', tasks.join('\n'));
                console.log('Task deleted successfully!');
            }
        } else {
            let taskslowercase = data.toLowerCase().split('\n').filter(Boolean);
            task = task.toLowerCase();
            if (taskslowercase.includes(task)) {
                tasks.splice(taskslowercase.indexOf(task), 1);
                fs.writeFileSync('to-do.txt', tasks.join('\n'));
                console.log('Task deleted successfully!');
            } else {
                console.log('Task not found!');
            }
        }
    })

program.parse();