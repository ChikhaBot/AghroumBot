// TO run: npm run dev
import { Client, Intents, MessageEmbed } from 'discord.js'
import dotenv from 'dotenv';
import fetch from 'node-fetch'
import { parse } from 'node-html-parser';
import fs from 'fs'

// const { token } = require('./config.json');
dotenv.config()

const token = process.env.TOKEN ?? 'TOKEN';
// const fs = require('fs')

// Read file and get responses
const bankContent = fs.readFileSync('./bank.txt', {encoding: 'utf-8'})
const responses=  bankContent.split('\n')

const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
	]
});

client.once('ready', () => {
	const botTag = client.user.tag
	console.log(`=======================================`)
	console.log(`Ready! Logged in as ${botTag}`)
	console.log(`=======================================`)
});

let cnt = {}


// function to get the raw data
const getRawData = (URL) => {
   return fetch(URL)
      .then((response) => response.text())
      .then((data) => {
         return data;
      });
};

// URL for data
const domain = "https://mawdoo3.com"
const URL = domain+"/"+"%D8%AA%D8%B5%D9%86%D9%8A%D9%81:%D8%A3%D9%83%D9%84%D8%A7%D8%AA_%D8%B3%D8%B1%D9%8A%D8%B9%D8%A9";

// start of the program
const getRecipe = async () => {
  try {
    const RecipeRawData = await getRawData(URL);
    const loadedData = parse(RecipeRawData);
    const recipes = loadedData.querySelector("#grid").childNodes.filter(node => node.rawTagName === "li");
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    if(randomRecipe) {
     const recipeLink = domain + randomRecipe.querySelector("a").attributes.href
     return recipeLink;
    }

  } catch (error) {
    console.log(error);
   return null
  }
  return null

};


client.on('message', function (message) {
	const content = message.content
	const authorId = message.author.id
	const proba = Math.min(Math.random(),0.5)
	// had author ID ranseb zamel boh
	if(Math.random() < proba && authorId != client.user.id && message.channel.id == "901243325833707530"){
		// Reply to that random person with a random reply
		const randomReply = responses[Math.floor(Math.random() * responses.length)]
		message.reply(randomReply)
	}

	if (message.content.startsWith('av')) {
		const user = message.mentions.users.first() || message.author;
		const avatarEmbed = new MessageEmbed()
		  .setColor(0x333333)
		  .setAuthor(`${user.username}'s Avatar`)
		  .setImage(
			`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
		  );
		message.reply({embeds: [avatarEmbed]});
		}



	// TODO: detect convos and select a random person

	if(!cnt[authorId]){ // Ila makantch deja 3endna
		cnt[authorId] = 0
	}

	switch(content) {
		// !ping
		case 'ping':
			message.reply('Pong!');
		case 'zaml':
			message.reply('kan 3rf ha had zaml<@447912513653309442>');
			break
		case '97bat':
			message.reply('<@214522510639759360> <@447912513653309442> <@342071051183849484> <@532675052035112989> <@689907859919601689> ');
		break;
		default:
			if (content.startsWith('chko')){
				cnt[authorId]++
				message.reply(`Li7wak ${cnt[authorId]}-0`);
			}
      if(content.includes('jou3')){
        getRecipe().then(recipe => {
          if(Math.random() < proba ){
            message.reply(recipe)
          }else{
            message.reply("No recipe found, 9wd 3end mok!")
          }
        })
      }
		break
		
	}
});



client.login(token);