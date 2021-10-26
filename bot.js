// TO run: npm run dev
const { Client, Intents } = require('discord.js');
const dotenv = require('dotenv');

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

client.on('message', function (message) {
	const content = message.content
	const authorId = message.author.id
	const proba = Math.random()

	// had author ID ranseb zamel boh
	if(Math.random() < proba && authorId != client.user.id && message.channel.id !== "901232039439761428"){
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
		break
	}
});


client.login(token);