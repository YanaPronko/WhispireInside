import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data?.serviceType || !data?.desiredDate || !data?.phone || !data?.email) {
      return NextResponse.json(
        { success: false, message: 'Пожалуйста, заполните все обязательные поля' },
        { status: 400 }
      )
    }

    // Save to database
    const submission = await prisma.contactSubmission.create({
      data: {
        serviceType: data.serviceType,
        desiredDate: data.desiredDate,
        phone: data.phone,
        email: data.email,
        message: data.message || '',
      },
    })

    // Send email notification
    const htmlBody = `
      <div style="font-family: 'Cormorant Garamond', Georgia, serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #e2e8f0; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0c4a6e 0%, #1e3a5f 100%); padding: 30px 20px; text-align: center;">
          <h1 style="color: #fbbf24; margin: 0; font-size: 32px; font-weight: bold;">✨ Новая заявка ✨</h1>
          <p style="color: #a5f3fc; margin: 10px 0 0 0; font-size: 18px;">Шепот внутри</p>
        </div>
        
        <div style="padding: 30px 20px;">
          <div style="background: rgba(30, 58, 95, 0.3); padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #06b6d4;">
            <h2 style="color: #67e8f9; margin: 0 0 15px 0; font-size: 20px;">Информация о клиенте</h2>
            <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #fbbf24;">Услуга:</strong> ${data.serviceType}</p>
            <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #fbbf24;">Желаемая дата:</strong> ${data.desiredDate}</p>
          </div>
          
          <div style="background: rgba(30, 58, 95, 0.3); padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #8b5cf6;">
            <h2 style="color: #a78bfa; margin: 0 0 15px 0; font-size: 20px;">Контактные данные</h2>
            <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #fbbf24;">Телефон:</strong> <a href="tel:${data.phone}" style="color: #67e8f9; text-decoration: none;">${data.phone}</a></p>
            <p style="margin: 10px 0; font-size: 16px;"><strong style="color: #fbbf24;">Email:</strong> <a href="mailto:${data.email}" style="color: #67e8f9; text-decoration: none;">${data.email}</a></p>
          </div>
          
          ${data.message ? `
          <div style="background: rgba(30, 58, 95, 0.3); padding: 20px; border-radius: 12px; margin-bottom: 20px; border-left: 4px solid #fbbf24;">
            <h2 style="color: #fbbf24; margin: 0 0 15px 0; font-size: 20px;">Сообщение</h2>
            <p style="margin: 0; font-size: 16px; line-height: 1.6;">${data.message}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid rgba(100, 116, 139, 0.3);">
            <p style="color: #94a3b8; font-size: 14px; margin: 0;">
              ✨ Получено: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
            </p>
          </div>
        </div>
      </div>
    `

    try {
      const appUrl = process.env.NEXTAUTH_URL || ''
      const appName = appUrl ? new URL(appUrl).hostname.split('.')[0] : 'Шепот внутри'

      const emailResponse = await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_,
          subject: `✨ Новая заявка на ${data.serviceType}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'yaniarz89@gmail.com',
          sender_email: `noreply@${appUrl ? new URL(appUrl).hostname : 'shepot-vnutri.com'}`,
          sender_alias: appName,
        }),
      })

      const emailResult = await emailResponse.json()
      
      if (!emailResult?.success && !emailResult?.notification_disabled) {
        console.error('Email sending failed:', emailResult)
      }
    } catch (emailError) {
      console.error('Email notification error:', emailError)
      // Continue even if email fails - data is saved
    }

    return NextResponse.json({
      success: true,
      message: 'Заявка успешно отправлена!',
      data: submission,
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { success: false, message: 'Произошла ошибка. Попробуйте позже.' },
      { status: 500 }
    )
  }
}
