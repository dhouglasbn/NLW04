import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs"; // firesystem

class SendMailService {
    private client: Transporter

    // constructor é um método que é executado assim que é criado
    constructor() {
        // then é uma forma mais antiga que o async await

        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            });

            this.client = transporter;
        })

    }

    async execute(to: string, subject: string, variables: object, path: string) { 
        // leitura do arquivo
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        // compilando o template
        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse(variables)

        // informações para envio de e-mail
        
        const message = await this.client.sendMail({
            to,
            subject,
            html,
            from: "NPS <noreplay@nps.com.br>"
        })

        console.log("Message sent: %s", message.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message))
    }
}

export default new SendMailService();