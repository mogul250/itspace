
import { createTransport } from 'nodemailer';

const sendmail =  async (email,message,html) => {
		const transporter = createTransport({
			host: 'smtppro.zoho.com',
			port: 465,
			secure: true,
			auth: {
				user: "info@itspace.rw",
				pass: "01UHsymPE8cB"
			}
		});
		const mailOptions = {
			from: "ITSPACE LTD <info@itspace.rw>",
			to: email,
			subject: message.subject,
			html: html
		};
        const info = new Promise((resolve, reject) => {
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              resolve({ success: false, message: 'Mails were not sent' });
            } else {
              resolve({ success: true, message: 'Mails sent' });
            }
          });
        });
        return info;

}

const _sendmail = sendmail;
export { _sendmail as sendmail };