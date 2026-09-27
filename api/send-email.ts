import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import type { VercelRequest, VercelResponse } from "@vercel/node";


interface EmailRequestBody {
  to: string;
  subject: string;
  body: string;
}

const normalizeTo = (to: string) => to.trim();
const normalizeSubject = (subject: string) => subject.trim();
const normalizeBody = (body: string) => body.trim();


function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader("Allow", "POST");

    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { to, subject, body } = req.body as EmailRequestBody;

  if (!to || !subject || !body) {
    res.status(400).json({ error: 'Missing required fields (to, subject, body)' });
    return;
  }

  if (!isValidEmail(to)) {
    res.status(400).json({ error: 'El correo no es valido' });
    return;
  }

  const region = process.env.AWS_REGION || "us-east-1";
  const fromEmail = process.env.AWS_SES_FROM_EMAIL;
  const toEmail = process.env.AWS_SES_TO_EMAIL || to;

  try {

    const sesClient = new SESClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new SendEmailCommand({
      Source: fromEmail,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: { Data: subject },
        Body: { Text: { Data: body } },
      },
    });

    await sesClient.send(command);

    res.status(200).json({
      success: true,
      message: `Email enviado exitosamente a ${to}`,
    });
    return;
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message || 'Error al enviar email con SES',
    });
    return;
  }
}
