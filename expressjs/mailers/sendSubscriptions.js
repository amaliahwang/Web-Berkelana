const nodemailer = require('nodemailer');

module.exports = {
	sendSubscriptionMail: async function (email) {
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
			from: 'Mediakita Team',
			to: email,
			subject: 'Selamat Bergabung, Mari Berkelana Bersama Kami 💫',
			html: `
			<img src="https://if2-berkelana.vercel.app/berkelana-logodark.png" style="margin-top: 36px; width:200px; margin-left: auto; margin-right: auto; display: block" />
			<div
				style="
					max-width: 700px;
					margin-top: 50px;
					font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
					margin-left: auto;
					margin-right: auto;
					margin-bottom: 100px;
					padding: 60px 20px;
					background-color: #f3f4f6;
				">
				<h2 style="color: #333; text-align: center; font-weight: 800; font-size: 2.25rem">Promo Khusus untuk Pengguna Baru</h2>
				<p style="color: #555; text-align: center; font-size: 1rem; text-align: justify; margin-top: 4rem">
					${email}, Terimakasih telah menggunakan Berkelana untuk menemukan dan menemani perkelanaanmu dan bersedia menerima informasi seputar wisata yang ada di Yogyakarta dengan mengakses aplikasi kami 😊. Kami memiliki voucher untuk kamu
					sebagai hadiah yang dapat di gunakan diseluruh destinasi wisata yang bermitra dengan kami di Yogyakarta 👒.
				</p>
			
				<div style="max-width: 900px; margin: 2rem auto; background-color: #3b82f6; border-radius: 10px">
					<div style="padding: 20px">
						<h2 style="color: #fff; text-align: center; margin-top: 0">Voucher Kupon</h2>
						<div style="background-color: #f1f1f1; color: #fff; text-align: center; padding: 20px; border-radius: 5px">
							<p style="margin: 0; font-size: 0.8rem; color: #333">Diskon 10% untuk pengguna baru</p>
							<p style="color: #3b82f6; margin-top: 10px; font-size: 2rem; margin-bottom: 0; font-family: 'Courier New', Courier, monospace"><strong>DISKON10</strong></p>
						</div>
					</div>
				</div>
			
				<p style="color: #555; text-align: center; font-size: 1rem; text-align: justify; margin-top: 2rem">
					Segera gunakan kupon promo tersebut untuk liburan dengan yang tercinta 💑. Hati-hati saat melakukan perjalanan, dan yang dihati kapan kita bisa menjalani kisah kita dengan
					penuh kehangatan 😌.
				</p>
			
				<hr style="margin-top: 100px" />
				<div style="text-decoration: none;">
					<p style="color: #696969; text-align: center; font-size: 0.7rem; text-align: center; margin-top: 4rem">
						Memiliki pertanyaan? Silahkan melihat <a href="https://if2-berkelana.vercel.app/bantuan" style="text-decoration: none; font-weight: bold; color: #555;">FaQ</a> atau kamu bisa menghubungi
						<a href="" style="text-decoration: none; font-weight: bold; color: #555;">Customer service kami</a>
					</p>
				</div>
				
				</div>
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
