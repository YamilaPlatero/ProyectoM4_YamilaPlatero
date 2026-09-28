import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

import type { VercelRequest, VercelResponse } from "@vercel/node";


interface EmailRequestBody {
  nombre: string;
  correo: string;
  msj: string;
}

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

  const { nombre, correo, msj } = req.body as EmailRequestBody;

  if (!nombre || !correo || !msj) {
    res.status(400).json({ error: 'No se encuentra (nombre, correo, msj)' });
    return;
  }

  if (!isValidEmail(correo)) {
    res.status(400).json({ error: 'El correo no es valido' });
    return;
  }

  const fromEmail = process.env.AWS_SES_FROM_EMAIL;
  const toEmail = process.env.AWS_SES_TO_EMAIL || nombre;

  try {

    const region = process.env.AWS_REGION?.trim() || "us-east-1";

    const sesClient = new SESClient({
      region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new SendEmailCommand({
      Source: fromEmail,
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Subject: { Data: correo },
        Body: { Text: { Data: msj } },
      },
    });

    await sesClient.send(command);

    res.status(200).json({
      success: true,
      message: `Email enviado exitosamente a ${nombre}`,
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
