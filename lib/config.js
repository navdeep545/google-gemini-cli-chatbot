import Configstore from 'configstore';
import * as fs from 'node:fs' ;
import chalk from 'chalk';
import inquirer from 'inquirer';

const packageJson = JSON.parse(fs.readFileSync('./package.json','utf-8')) ;

const prompt = inquirer.createPromptModule();
const conf = new Configstore(packageJson.name);

export const getKey = () => {
  const key = conf.get('apiKey') ;
  // console.log(key) ;
  return key;
}

export const setKey = async () => {
  const key = getKey() ;
  if(!key){
    const { apiKey } = await prompt({
      type: 'password',
      name: 'apiKey',
      message: 'Enter your Google Gemini API key:'
    });
    conf.set('apiKey', apiKey);
    console.log(apiKey) ;
    console.log(chalk.green('API key saved successfully!'));
  }
  else{  
    console.log(chalk.red('key already exists..'))
  }
};

export const deleteKey = () => {
  conf.delete('apiKey');
  console.log(chalk.yellow('API key removed!'));
};