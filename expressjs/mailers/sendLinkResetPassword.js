const nodemailer = require('nodemailer');

module.exports = {
	sendResetPasswordEmail: async function (email, resetPasswordToken) {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: false,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: 'Developer Handal Bismillah',
			to: email,
			subject: 'Reset Password Link',
			html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin-top:50px; margin-left:auto; margin-right:auto; padding: 100px 40px; background-color: #f3f4f6;">
                    <h2 style="color: #333; text-align: center;">Password Reset Invocation</h2>
                    <p style="color: #555; text-align: center;">
                        We received a ${email} request to reset your password. Click the link below to reset it:
                    </p>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <a href="http://localhost:3001/api/v1/reset-password?resetPasswordToken=${resetPasswordToken}" 
                        style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; font-size: 16px;">
                        Reset Password
                        </a>
                    </div>
                    
                    <p style="color: #555; text-align: center; margin-top: 20px;">
                        If you didn't request this, please ignore this email. Your account security is important to us.
                    </p>
                </div>
            `,
		};

		return new Promise((resolve, reject) => {
			transporter.sendMail(mailOptions, (err) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	},
};
