import nodemailer, { SendMailOptions } from 'nodemailer'
import { SMTP } from '../config/default'

const createTestCreds = async () => {
  const creds = await nodemailer.createTestAccount()
  console.log({ creds })
}
createTestCreds()

const transporter = nodemailer.createTransport({
  ...SMTP,
  auth: {
    user: SMTP.user,
    pass: SMTP.pass,
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
