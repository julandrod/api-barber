const { createTransport } = require('nodemailer')

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD
    }
})

transporter.verify().then(() => {
    console.log('ready for send emails')
})

module.exports = transporter