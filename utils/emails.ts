import sgMail from 'lib/sendgrid'
import { FROM_ADDRESS } from 'shared/constants'
import { User } from 'shared/types'

export async function sendWelcomeEmail(
  to: string,
  firstName: string
): Promise<void> {
  await sgMail.send({
    from: FROM_ADDRESS,
    to,
    subject: `Welcome to Collabski! We're pleased to meet you.`,
    html: `
        <p>Hi ${firstName},</p><br />
        <p>Sean here, co-founder of Collabski. I want to personally welcome you to our platform. I'm happy you decided to give us a try!</p><br />
        <p>I want to make sure you get the most out of your experience and see firsthand how we can help your business:</p><br />
        <li>Benefit1</li>
        <li>Benefit2</li>
        <li>Benefit3</li>
        <br />
        <p>Please expect an email from a member of our team over the next few days if we haven't verified your account yet.</p><br />
        <p>After we've verified your account, you'll be able to view and place offers for creators. In the meantime, you can update information relating to your account profile in the settings page.</p><br />
        <p>Once again, thank you for signing up to our platform!</p><br />
        <p>Warmly,</p>
        <p>Sean</p>
      `,
  })
}

export async function sendForgotPasswordEmail(
  to: string,
  token: string
): Promise<void> {
  await sgMail.send({
    from: FROM_ADDRESS,
    to,
    subject: `Collabski: Password Reset link`,
    html: `
        <h1>Collabski Password Reset</h1>
        <p>Forgot something did you? Please use the following link to reset your password.</p>
        <p>${process.env.NEXT_PUBLIC_VERCEL_URL}/reset-password?token=${token}</p>
        <hr />
      `,
  })
}

interface Info {
  listing: {
    id: string
  }
  platform: string
  deliverable: string
  description: string
  specs: any[]
}

export async function sendListingNotificationEmail(
  creator: User,
  info: Info
): Promise<void> {
  await sgMail.send({
    from: FROM_ADDRESS,
    to: ['shonum@gmail.com', 'michael@cnotes.co'],
    subject: `Collabski: ${creator.alias} has submitted an listing`,
    html: `
          <h1>${creator.alias} has submitted an listing:</h1>
          <p>User ID: ${creator.id} </p>
          <p>Listing ID: ${info.listing.id} </p>
          <p>Platform: ${info.platform} </p>
          <p>Deliverable: ${info.deliverable} </p>
          <p>Description: ${info.description} </p>
          <p>${Object.entries(info.specs).map(
            item => `${item[0]}: ${item[1]}`
          )}</p>
          <hr />
        `,
  })
}
