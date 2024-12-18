
import axios from 'axios';

export default class WhatsAppSender {
    private client_id: string;
    private client_secret: string;

    constructor() {
        this.client_id = process.env.WHATSAPP_CLIENT_ID || '';
        this.client_secret = process.env.WHATSAPP_CLIENT_SECRET || '';
    }

    public async enviarMensaje(phone: string, code: string): Promise<void> {
        const options = {
            method: 'POST',
            url: 'https://developer.tecmm.mx:3313/blink/verificacion/',
            headers: {
                'Content-Type': 'application/json',
                client_id: this.client_id,
                client_secret: this.client_secret,
            },
            data: {
                phone: phone,
                code: code,
            },
        };

        try {
            await axios.request(options);
        } catch (error) {
            console.error('Error al enviar mensaje por WhatsApp:', error);
        }
    }
}
