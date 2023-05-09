const TelegramApi = require('node-telegram-bot-api')
const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000

const TOKEN = process.env.TOKEN

// console.log(TOKEN); Дебаг
const bot = new TelegramApi(TOKEN, {polling: true})
        
// bot.on('message', msg => {
//             const text = msg.text;
//             const chatId = msg.chat.id;
//             console.log(chatId);
//         })

app.get('/', (req, res) => {
    res.send('Bot on')
})

app.post('/api/form', (req, res) => {
    try {
        const name = req.body.name
        const phone = req.body.phone
        const message = req.body.message
        bot.sendMessage(
            process.env.CHAT_ID, 
            `Новазя заявка: 
                Имя - ${name}, 
                Телефон - ${phone}, 
                Сообщение - ${message}`);

        res.send('Данные получены!')

    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT, () => {
    console.log(`Server working on PORT ${PORT}`);
})