import { program } from 'commander';
import fs from 'fs';
import chalk from 'chalk';

function print(x, task) {
    switch (x) {
        case 1: console.log(chalk.red(task)); break;
        case 2: console.log(chalk.green(task)); break;
        case 3: console.log(chalk.yellow(task)); break;
        case 4: console.log(chalk.blue(task)); break;
        case 5: console.log(chalk.magenta(task)); break;
        default:
    }
}

program
    .version('1.0.0')
    .description('CLI TODO APP')

program.command('add')
    .description('add a new task')
    .argument('<task>', 'add a new task')
    .action(function (task) {
        let data = fs.readFileSync('to-do.txt', 'utf8');
        let datasize = data.length;
        // handled for first todo 
        if (data[datasize - 1] !== '\n') {
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
            print(i % 5 + 1, `${i + 1}. ${datasplit[i]}`);
        }
    })

program.command('delete')
    .description('delete a task using task number / task')
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

program.command('clear')
    .description('clear all tasks')
    .action(function () {
        fs.writeFileSync('to-do.txt', '');
        console.log('All tasks cleared successfully!');
    })

program.command('mark')
    .description('mark a task as completed')
    .argument('<task>', 'mark a task as completed')
    .action(function () {
        const data = fs.readFileSync('to-do.txt', 'utf8');
        let tasks = data.split('\n').filter(Boolean);
        let task = program.args[1];
        if (!isNaN(task)) {
            if (task > tasks.length) {
                console.log('Task not found!');
                return;
            } else {
                tasks[task - 1] = `${tasks[task - 1]} ✅`;
                fs.writeFileSync('to-do.txt', tasks.join('\n'));
                console.log('Task marked as completed!');
            }
        } else {
            let taskslowercase = data.toLowerCase().split('\n').filter(Boolean);
            task = task.toLowerCase();
            if (taskslowercase.includes(task)) {
                tasks[taskslowercase.indexOf(task)] = `${tasks[taskslowercase.indexOf(task)]} ✅`;
                fs.writeFileSync('to-do.txt', tasks.join('\n'));
                console.log('Task marked as completed!');
            } else {
                console.log('Task not found!');
            }
        }
    })

program.parse(process.argv);