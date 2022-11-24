import nodemailer, { SendMailOptions } from 'nodemailer'

const createTestCreds = async () => {
  const creds = await nodemailer.createTestAccount()
  console.log({ creds })
}
createTestCreds()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_pass,
  },
})

const sendEmail = async (payload: SendMailOptions) => {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.log(err, 'An error occured when sending email')
    }
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
  })
}

export default sendEmail
