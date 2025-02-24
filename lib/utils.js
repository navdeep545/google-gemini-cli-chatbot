import ora from 'ora';
import chalk from 'chalk';

export const createLoader = () =>{
    return ora('Generating response...').start() ;
}

export const style = {
    prompt: chalk.yellow.bold('You:'),
    response: chalk.green.bold('Bot:'),
    error: chalk.red.bold('Error:')
}