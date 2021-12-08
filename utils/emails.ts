import sgMail from 'lib/sendgrid'
import { FROM_ADDRESS } from 'shared/constants'
import { User } from 'shared/types'

export async function sendBrandWelcomeEmail(
  to: string,
  firstName: string
): Promise<void> {
  await sgMail.send({
    from: FROM_ADDRESS,
    to,
    subject: `[Collabski] Welcome! We're pleased to meet you.`,
    html: `
        <p>Hi ${firstName},</p>
        <p>Sean here, co-founder of Collabski. I want to personally welcome you to our platform. I'm happy you decided to give us a try!</p>
        <p>I want to make sure you get the most out of your experience and see firsthand how we can help your business grow through sponsorship marketing.</p>
        <p>Please expect an email from a member of our team over the next few days if we haven't yet verified your account.</p>
        <p>After we've verified your account, you'll be able to view and place offers for creators. In the meantime, you can update information relating to your account profile in the settings page.</p>
        <p>Once again, thank you for signing up to our platform!</p>
        <p>Warmly, <br />Sean</p>
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
    subject: `[Collabski] Password Reset link`,
    html: `
        <h1>Collabski Password Reset</h1>
        <p>Forgot something did you? Please click <a href="https://${process.env.VERCEL_URL}/reset-password?token=${token}">here</a> to reset your password.</p>
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
    to: ['sean@collabski.com', 'michael@collabski.com'],
    subject: `[Collabski] ${creator.alias} has submitted an listing`,
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

export async function sendUserActivityNotificationEmail(
  user,
  date,
  activity: string
): Promise<void> {
  await sgMail.send({
    from: FROM_ADDRESS,
    to: ['sean@collabski.com', 'michael@collabski.com'],
    subject: `[Collabski] ${user.alias} (${user.role}) - ${activity}`,
    html: `
          <h1>${user.alias} (${user.role})!</h1>
          <p>User Activity: ${activity} </p>
          <p>Date: ${date} </p>
          <p>ID: ${user.id} </p>
          <p>Name: ${user.firstName} ${user.lastName}</p>
          <p>Email: ${user.email} </p>
          <hr />
        `,
  })
}

interface UrlSubmittedEmailProps {
  brand: {
    email: string
    firstName: string
  }
  creator: User
  submittedUrl: string
}

export async function sendUrlSubmittedEmail({
  brand,
  creator,
  submittedUrl,
}: UrlSubmittedEmailProps): Promise<void> {
  await sgMail.send({
    from: FROM_ADDRESS,
    subject: `[Collabski] ${creator.alias} just submitted the Media URL`,
    to: brand.email,
    bcc: ['sean@collabski.com', 'michael@collabski.com'],
    html: `
    <p>Hi ${brand.firstName},</p>
    <p>${creator.alias} has just submitted the Media URL. You can view it <a href="${submittedUrl}" target="_blank">here</a>.</p>
    <p>Please transmit payment to ${creator.alias} on approval, as per the steps highlighted in the previous Introduction Email.</p>
    <p>Sincerely, <br />Team Collabski</p>
    `,
  })
}

interface IntroductoryEmailProps {
  creator: {
    firstName: string
    alias: string
    email: string
    address: any
  }
  brand: {
    firstName: string
    alias: string
    email: string
  }
  platform: string
  deliverable: string
  specs: any
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

// Template ID: d-594ffc1a85f94ca0bd3bdc18b866ee8d
export async function sendIntroductoryEmail({
  creator,
  brand,
  platform,
  deliverable,
  specs,
}: IntroductoryEmailProps): Promise<void> {
  await sgMail.send({
    from: FROM_ADDRESS,
    to: [brand.email, creator.email],
    templateId: 'd-594ffc1a85f94ca0bd3bdc18b866ee8d',
    dynamicTemplateData: {
      creator,
      brand,
      platform: capitalizeFirstLetter(platform),
      deliverable,
      specs,
    },
  })
}
