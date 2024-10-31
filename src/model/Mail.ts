import nodemailer from 'nodemailer';

export default class Mailer {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: process.env.MAIL_USER,
                clientId: process.env.MAIL_ID,
                clientSecret: process.env.MAIL_SECRET,
                refreshToken: process.env.MAIL_TOKEN
            }
        });
    }

    public async enviarCorreo( destinatario: string, asunto: string, contenido: string): Promise<void> {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to: destinatario,
            subject: asunto,
            text: contenido
        };

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error("Error sending email: ", error);
        }
    }
}
