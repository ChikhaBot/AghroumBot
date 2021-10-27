// TO run: npm run dev
import { Client, Intents } from 'discord.js'
import dotenv from 'dotenv';
import fetch from 'node-fetch'
import { parse } from 'node-html-parser';

// const { token } = require('./config.json');
dotenv.config()

const token = process.env.TOKEN ?? 'TOKEN';
// const fs = require('fs')

// Read file and get responses
const fs = require('fs')
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
    const loadedData = nparse.parse(RecipeRawData);
    const recipes = loadedData.querySelector("#grid").childNodes.filter(node => node.rawTagName === "li");
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    if(randomRecipe) {
     const recipeLink = domain + randomRecipe.querySelector("a").attributes.href
     return recipeLink;
    }

  } catch (error) {
   return null
  }
  return null

};


client.on('message', function (message) {
	const content = message.content
	const authorId = message.author.id
	const proba = Math.random()

	// had author ID ranseb zamel boh
	if(Math.random() < proba && authorId != client.user.id && message.channel.id == "901243325833707530"){
		// Reply to that random person with a random reply
		const randomReply = responses[Math.floor(Math.random() * responses.length)]
		message.reply(randomReply)
	}



	// TODO: detect convos and select a random person

	if(!cnt[authorId]){ // Ila makantch deja 3endna
		cnt[authorId] = 0
	}

	switch(content) {
		// !ping
		case 'ping':
			message.reply('Pong!');
		break;
		default:
			if (content.startsWith('chko')){
				cnt[authorId]++
				message.reply(`Li7wak ${cnt[authorId]}-0`);
			}
      if(content.includes('jou3')){
        getRecipe().then(recipe => {
          if(recipe){
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