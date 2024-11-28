const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let messages = [];

app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;
    messages.push({ name, email, message });
    res.status(200).send('Повідомлення отримано!');
});

app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/adventBot', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
const Message = require('./database');

app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(200).send('Повідомлення отримано!');
});