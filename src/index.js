const telegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000
require('dotenv').config();
const openai = require('openai');

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const bot = new telegramBot(TELEGRAM_TOKEN,{polling: true});

app.get('/',(req,res)=>{
    res.send("<center><h1>Nothing Here</h1></center>");
})

app.listen(port,()=>{
    console.log("App is listening on PORT 4000");
})

const gpt = new openai.OpenAIApi(new openai.Configuration({
    apiKey: process.env.OPENAI_TOKEN
}))

bot.onText(/\/start/,(message)=>{
    bot.sendMessage(message.from.id,"Hello, This is a Telegram Bot with ChatGPT builtin :)\n\nCreated By: Satya Bhaskar");
})

bot.on('message',async (message)=>{
    console.log(message.text);
    const response = await gpt.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role:"user",content:message.text}],
    })
    console.log(response.data.choices[0].message.content);
    bot.sendMessage(message.from.id,response.data.choices[0].message.content);
})