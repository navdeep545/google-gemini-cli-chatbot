import Configstore from 'configstore';
import chalk from 'chalk';
import inquirer from 'inquirer';

const prompt = inquirer.createPromptModule();
const conf = new Configstore('gemini-cli');

export const getKey = () => conf.get('apiKey');

export const setKey = async () => {
  const { apiKey } = await prompt({
    type: 'password',
    name: 'apiKey',
    message: 'Enter your Google Gemini API key:'
  });
  conf.set('apiKey', apiKey);
  console.log(chalk.green('API key saved successfully!'));
};

export const deleteKey = () => {
  conf.delete('apiKey');
  console.log(chalk.yellow('API key removed!'));
};
