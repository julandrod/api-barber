const gmailOptions = (userEmail, subjectEmail, htmlTemplate) => { 
    return {
        from: process.env.GMAIL_ACCOUNT,
        to: userEmail,
        subject: subjectEmail,
        html: htmlTemplate
    }
}

module.exports = gmailOptions