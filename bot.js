// Import required libraries
const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const axios = requhttps://chatgpt.com/c/676890fe-31bc-8002-bcb0-baadaab6db27ire('axios');
const express = require('express');

// Set up the Express server
const app = express();
app.use(express.json()); // To parse JSON body

// Create a new Discord client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages
    ]
});

// Discord bot token (make sure to keep this secret)
const TOKEN = 'YOUR_BOT_TOKEN'; // Replace with your actual bot token

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    
    // Register slash commands
    const commands = await client.application.commands;
    await commands.create(new SlashCommandBuilder().setName('hello').setDescription('Say hello to the bot!'));
});

// Handle interactions (slash commands)
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'hello') {
        await interaction.reply('Hello, world!');
    }
});

// Login the bot
client.login(TOKEN);

// Set up a basic API endpoint to trigger actions in the bot
app.post('/trigger-bot', async (req, res) => {
    const { command } = req.body;
    try {
        // You can add more commands here and map them to bot actions
        if (command === 'hello') {
            await client.application.commands.get('hello').execute();
            res.status(200).send({ message: 'Command triggered successfully' });
        } else {
            res.status(400).send({ message: 'Unknown command' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to trigger command' });
    }
});

// Start the Express server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
