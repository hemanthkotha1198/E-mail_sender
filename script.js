const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/send', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', 
    auth: {
      user: 'praneeth1198@gmail.com',
      pass: 'rjplmkkukxvagjbe' 
    }
  });

  const mailOptions = {
    from: 'praneeth1198@gmail.com', 
    to: req.body.email, 
    subject: req.body.subject,
    html: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error.message);
      res.redirect('/');
    } else {
      console.log('Message sent:', info.response);
      res.redirect('/');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
