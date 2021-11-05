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
const bankContent = fs.readFileSync('./bank.txt', { encoding: 'utf-8' })
const responses = bankContent.split('\n')

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
const URL = domain + "/" + "%D8%AA%D8%B5%D9%86%D9%8A%D9%81:%D8%A3%D9%83%D9%84%D8%A7%D8%AA_%D8%B3%D8%B1%D9%8A%D8%B9%D8%A9";

// start of the program
const getRecipe = async () => {
	try {
		const RecipeRawData = await getRawData(URL);
		const loadedData = parse(RecipeRawData);
		const recipes = loadedData.querySelector("#grid").childNodes.filter(node => node.rawTagName === "li");
		const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
		if (randomRecipe) {
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
	const isTargetable = message.member.roles.cache.has('906198570804338708')
	if (authorId==="898268191464239204"){
		return
	}
	const proba = 0.4// Math.min(Math.random(), 0.5)

	// TODO: detect convos and select a random person

	if (!cnt[authorId]) { // Ila makantch deja 3endna
		cnt[authorId] = 0
	}

	switch (content) {
		// !ping
		case 'ping':
			return message.reply('Pong!');
			break
		case 'zaml':
			return message.reply('kan 3rf ha had zaml<@447912513653309442>');
			break
		case '97bat':
			return message.reply('<@214522510639759360> <@447912513653309442> <@342071051183849484> <@532675052035112989> <@689907859919601689> ');
			break;
		default:
			if (Math.random() < proba && authorId != client.user.id && isTargetable && message.channel.id == "901243325833707530")
			 {
				// Reply to that random person with a random reply
				const randomReply = responses[Math.floor(Math.random() * responses.length)]
				return message.reply(randomReply)
			}
		
			if (message.content.startsWith('av')) {
				const user = message.mentions.users.first() || message.author;
				const avatarEmbed = new MessageEmbed()
					.setColor(0x333333)
					.setAuthor(`${user.username}'s Avatar`)
					.setImage(
						`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
					);
				return message.reply({ embeds: [avatarEmbed] });
			}
		
			if (content.startsWith('chko')) {
				cnt[authorId]++
				return message.reply(`Li7wak ${cnt[authorId]}-0`);
			}
			if (content.includes('jou3')) {
				getRecipe().then(recipe => {
					if (Math.random() < proba) {
						return message.reply(recipe)
					} else {
						return message.reply("No recipe found, 9wd 3end mok!")
					}
				})
			}
			if (content.startsWith('chikha')) {
				if (Math.random() < 0.7) {
					return message.reply('3ti lmadam ti9ar awld l9hba');
				}
			}
			if (content.startsWith('/play')) {
				const ajwiba=["wrk 3la `tab` juj merat a l2adabi","wach mklkh awld l9hba","WA TAB AZEBI TAAAAAAAB"]
				return message.reply(ajwiba[Math.floor(Math.random()*ajwiba.length)]);

			}
			break

	}
});



client.login(token);