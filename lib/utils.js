import ora from 'ora';
import chalk from 'chalk';

const spinner = ora('Loading unicorns').start() ;

export const createLoader = () =>{
    spinner.text='Generating response...';
    spinner.color='cyan';
}

export const style = {
    prompt: chalk.yellow.bold('You: '),
    response: chalk.green.bold('Bot: '),
    error: chalk.red.bold('Error: ')
}