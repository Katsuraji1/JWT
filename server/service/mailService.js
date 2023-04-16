require('dotenv').config()
const nodemailer = require('nodemailer')
class MailService {

    constructor() {
        this.transparent = nodemailer.createTransport({
            secure: false,
            port: process.env.MAIL_PORT,
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD,
            },
        })
    }

    async sendActivationLink(to, link) {
        this.transparent.sendMail({
            from: process.env.MAIL_USER,
            to,
            text: '',
            subject: 'Авторизация',
            html:
                `
                <div>
                    <h1>Авторизация на ${process.env.MAIN_HOST}</h1>
                    <a href = ${link}>Подтвердить</a>
                </div>
                `
        })
    } 
}

module.exports = new MailService()