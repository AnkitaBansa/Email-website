const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const apiKey= 'key-a0f9e5551e5c30cf165c04517c702da0';
const domain= 'sandbox1f4db661903c4c75a98572b922dc70bd.mailgun.org';
const mg = mailgun({apiKey: apiKey, domain: domain});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/ankita.html');
});

app.post('/', (req, res) => {
    const email = req.body.email;

    const data = {
        from: 'Ankita<ankita4759.be22@chitkara.edu.in>',
        to: 'ankita4759.be22@chitkara.edu.in',
        subject: 'WELCOME EMAIL!',
        text: `Hello Subscribers\nWelcome To Daily Insider.`
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', body);
            res.sendFile(__dirname + '/ankita.html');
        }
    });
});

app.listen(3500, () => {
    console.log("Server is running at port 3500!!!");
}); 