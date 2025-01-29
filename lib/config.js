import Configstore from 'configstore';
import * as fs from 'node:fs' ;
import chalk from 'chalk';
import inquirer from 'inquirer';

const packageJson = JSON.parse(fs.readFileSync('./package.json','utf-8')) ;

const prompt = inquirer.createPromptModule();
const conf = new Configstore(packageJson.name);

<<<<<<< HEAD
// Change module.exports to ES exports
export const getKey = () => {
  const key = conf.get('apiKey') ;
  // console.log(key) ;
  return key;
}
=======
export const getKey = () => conf.get('apiKey');
>>>>>>> 2d46c118671b197593ef658541ad8009589b4866

export const setKey = async () => {
  const { apiKey } = await prompt({
    type: 'text',
    name: 'apiKey',
    message: 'Enter your Google Gemini API key:'
  });
  conf.set('apiKey', apiKey);
  console.log(apiKey) ;
  console.log(chalk.green('API key saved successfully!'));
};

export const deleteKey = () => {
  conf.delete('apiKey');
  console.log(chalk.yellow('API key removed!'));
};
