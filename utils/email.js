/* eslint-disable camelcase */
'use strict';
const AppError = require('./AppError');

const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

class Email {
  constructor(user, url,verify_code) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.verify_code = verify_code;
    this.from = `Rohit<${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sendgrid
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      verify_code:this.verify_code,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to the Natours Family!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }

  async sendSignUpVerification() {
    await this.send('signUpVerification', 'Sign Up(valid for only 10 minutes)');
  }
}

async function checkTypeAndSendEmail(type, email) {
  if (type === 'signUp') await email.sendSignUpVerification();
  if (type === 'reset') await email.sendPasswordReset();
  if (type === 'signUpSuccessfull') await email.sendWelcome();
}

let retrySendEmailCount = 0;
// max will be => 2
async function sendEmail(req, user, type, path,verification_code) {
  const url = `${req.protocol}://${req.get('host')}/${path}`;
  const email = new Email(user, url,verification_code);


  try {
    await checkTypeAndSendEmail(type, email);
  } catch (err) {
    retrySendEmailCount += 1;
    if (retrySendEmailCount === 2)
      return new AppError('Please try to signUp again!', 500);

    await sendEmail(req, user, type, path,verification_code);
  }
}

// sendEmail().catch((err) => console.log(err));

module.exports = sendEmail;
