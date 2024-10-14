import nodemailer from 'nodemailer';

export default class Mailer {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
            }
        });
    }

    public async enviarCorreo( destinatario: string, asunto: string, contenido: string): Promise<void> {
        const mailOptions = {
            from: "uriel.aguilera@tecmm.edu.mx",
            to: destinatario,
            subject: asunto,
            text: contenido
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
        } catch (error) {
            console.error("Error sending email: ", error);
        }
    }
}
