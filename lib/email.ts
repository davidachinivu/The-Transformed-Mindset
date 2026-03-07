import nodemailer from 'nodemailer'
import { Resend } from 'resend'

export interface SendEmailOptions {
  to: string
  subject: string
  text: string
  html?: string
  from?: string
}

export interface EmailConfig {
  smtpHost: string
  smtpPort: number
  smtpUser: string
  smtpPass: string
  fromAddress: string
}

export interface ResendConfig {
  apiKey: string
  fromAddress: string
}

export function getEmailConfig(): EmailConfig | null {
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const fromAddress = process.env.CONTACT_EMAIL_FROM || process.env.EMAIL_FROM || ''

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !fromAddress) {
    return null
  }

  return {
    smtpHost,
    smtpPort,
    smtpUser,
    smtpPass,
    fromAddress,
  }
}

export function getResendConfig(): ResendConfig | null {
  const apiKey = process.env.RESEND_API_KEY
  const fromAddress = process.env.RESEND_FROM || process.env.CONTACT_EMAIL_FROM || process.env.EMAIL_FROM || ''

  if (!apiKey || !fromAddress) {
    return null
  }

  return { apiKey, fromAddress }
}

export async function sendEmail(options: SendEmailOptions) {
  const resendConfig = getResendConfig()
  if (resendConfig) {
    const resend = new Resend(resendConfig.apiKey)
    return await resend.emails.send({
      from: options.from || resendConfig.fromAddress,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })
  }

  const config = getEmailConfig()
  if (!config) {
    throw new Error(
      'Email configuration is missing. Set RESEND_API_KEY (with RESEND_FROM) or SMTP_HOST/SMTP_PORT/SMTP_USER/SMTP_PASS (with CONTACT_EMAIL_FROM) in your environment.',
    )
  }

  const transporter = nodemailer.createTransport({
    host: config.smtpHost,
    port: config.smtpPort,
    secure: config.smtpPort === 465, // true for 465, false for other ports
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass,
    },
  })

  const mailOptions = {
    from: options.from || config.fromAddress,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  }

  const info = await transporter.sendMail(mailOptions)
  return info
}
