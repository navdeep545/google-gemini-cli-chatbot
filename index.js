#!/usr/bin/env node
import { Command } from 'commander';
import inquirer from 'inquirer';
import { getKey,setKey,deleteKey } from './lib/config.js';
import {generateResponse} from './lib/gemini.js' ;
import {createLoader,style} from './lib/utils.js' ;

const program = new Command() ;
const prompt = inquirer.createPromptModule() ;

program
  .name('gemini-chat')
  .description('CLI Chatbot using Google Gemini')
  .version('1.0.0');

program.command('setup')
  .description('Set up API key')
  .action(async () => {
    await setKey();
  });

program.command('config')
  .description('Manage API configuration')
  .action(async () => {
    const { action } = await prompt({
      type: 'list',
      name: 'action',
      message: 'Choose action:',
      choices: [
        'Show current key',
        'Update key',
        'Delete key'
      ]
    });

    switch (action) {
      case 'Show current key':
        const key = getKey();
        console.log(key ? `Current key: ${key}` : 'No API key configured');
        break;
      case 'Update key':
        await setKey();
        break;
      case 'Delete key':
        deleteKey();
        break;
    }
  });

program.command('chat')
  .description('Start chatting')
  .action(async () => {
    if (!getKey()) {
      console.log(style.error + 'API key not found. Run setup first!');
      return;
    }

    while (true) {
      const { query } = await prompt({
        type: 'input',
        name: 'query',
        message: style.prompt
      });

      if (query.toLowerCase() === 'exit') break;

      const loader = createLoader();
      try {
        loader.start();
        const response = await generateResponse(query);
        loader.stop();
        console.log(style.response + response);
      } catch (error) {
        loader.stop();
        console.log(style.error + error.message);
      }
    }
  });

program.parse();