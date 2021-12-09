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
    templateId: 'd-8b9b8de73d304abb8abc93de546bbcb5',
    dynamicTemplateData: { firstName },
  })
}

export async function sendForgotPasswordEmail(
  to: string,
  token: string
): Promise<void> {
  await sgMail.send({
    from: FROM_ADDRESS,
    to,
    templateId: 'd-9b6217e592934775a1cf5ba9d9f3b199',
    dynamicTemplateData: {
      link: `https://${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`,
    },
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
