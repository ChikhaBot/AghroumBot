// TO run: npm run dev
import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';
import fs from 'fs';

// const { token } = require('./config.json');
dotenv.config();

const token = process.env.TOKEN || 'TOKEN';
// const fs = require('fs')

// Read file and get responses
const bankContent = fs.readFileSync('./bank.txt', {
  encoding: 'utf-8',
});
const responses = bankContent.split('\n');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.once('ready', () => {
  const botTag = client.user.tag;
  console.log(`=======================================`);
  console.log(`Ready! Logged in as ${botTag}`);
  console.log(`=======================================`);
});

let cnt = {};

// function to get the raw data
const getRawData = (URL) => {
  return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};

// URL for data
const domain = 'https://mawdoo3.com';
const URL =
  domain +
  '/' +
  '%D8%AA%D8%B5%D9%86%D9%8A%D9%81:%D8%A3%D9%83%D9%84%D8%A7%D8%AA_%D8%B3%D8%B1%D9%8A%D8%B9%D8%A9';

// start of the program
const getRecipe = async () => {
  try {
    const RecipeRawData = await getRawData(URL);
    const loadedData = parse(RecipeRawData);
    const recipes = loadedData
      .querySelector('#grid')
      .childNodes.filter((node) => node.rawTagName === 'li');
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    if (randomRecipe) {
      const recipeLink =
        domain + randomRecipe.querySelector('a').attributes.href;
      return recipeLink;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
  return null;
};

client.on('messageCreate', function (message) {
  console.log('message', message);

  const content = message.content;
  const authorId = message.author.id;
  const hasRole = (role) =>
    message.member.roles.cache.some((r) => r.id === role);
  const isTargetable = hasRole('1022108621527593010'); // NOSTRA ONLY
  const proba = 0.25;

  // TODO: detect convos and select a random person

  if (!cnt[authorId]) {
    // Ila makantch deja 3endna
    cnt[authorId] = 0;
  }
  console.log('content', content);
  switch (content) {
    case 'ping':
      return message.reply('Pong!');
    case 'zaml':
      return message.reply('kan 3rf ha had zaml <@386191247829762049>');
    case '97ba':
      return message.reply('hahiya <@386191247829762049>');
    default:
      if (
        Math.random() < proba &&
        authorId != client.user.id &&
        isTargetable &&
        (message.channel.id == '929539397253222440' ||
          message.channel.id == '956758369979469857' ||
          message.channel.id == '986308230806372392' ||
          message.channel.id == '973054418914263092' ||
          message.channel.id == '643968735941754880')
      ) {
        // Reply to that random person with a random reply
        const randomReply =
          responses[Math.floor(Math.random() * responses.length)];
        return message.reply(randomReply);
      }

      if (message.content.startsWith('av')) {
        const user = message.mentions.users.first() || message.author;
        const avatarEmbed = new MessageEmbed()
          .setColor(0x333333)
          .setAuthor(`${user.username}'s Avatar`)
          .setImage(
            `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
          );
        return message.reply({
          embeds: [avatarEmbed],
        });
      }

      if (
        (message.content.includes('<@447912513653309442>') ||
        message.content.includes('<@214522510639759360>') ||
        message.content.includes('<@342071051183849484>')) &&
        authorId != client.user.id
      ) {
        return message.reply(`<@${authorId}> hadak baba dor oula n7wik`);
      }

      if (message.content.includes('<@631447671697178624>')) {
        return message.reply(`<@${authorId}> taggi mamak`);
      }

      if (content.startsWith('chko')) {
        cnt[authorId]++;
        return message.reply(`Li7wak ${cnt[authorId]}-0`);
      }
      if (content.includes('jou3') || content.includes('jo3')) {
        getRecipe().then((recipe) => {
          if (Math.random() < proba) {
            return message.reply(recipe);
          } else {
            return message.reply('No recipe found, 9wd 3end mok!');
          }
        });
      }
      if (content.startsWith('chikha')) {
        if (Math.random() < 0.7) {
          return message.reply('3ti lmadam ti9ar awld l9hba');
        }
      }
      if (content.startsWith('/play')) {
        const ajwiba = [
          'wrk 3la `tab` juj merat a l2adabi',
          'wach mklkh awld l9hba',
          'WA TAB AZEBI TAAAAAAAB',
        ];
        return message.reply(ajwiba[Math.floor(Math.random() * ajwiba.length)]);
      }
      break;
  }
});

client.login(token);
