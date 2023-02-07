// const nodemailer = require('nodemailer')

// module.exports = async(email, subject, text) => {
// 	try{
// 		const transporter = nodemailer.createTransport({
// 			host: process.env.HOST,
// 			service: process.env.SERVICE,
// 			post: Number(process.env.EMAIL_PORT),
// 			secure: Boolean(process.env.SECURE),
// 			auth: {
// 				user: process.env.EMAIL_USERNAME,
// 				pass: process.env.PASSWORD
// 			}
// 		})

// 		await transporter.sendMail({
// 			from: process.env.EMAIL_USERNAME,
// 			to: email,
// 			subject: subject,
// 			text: text
// 		})
// 		console.log("Email sent succesfully");
// 	}catch(error){
// 		console.log("Email not send");
// 		console.log(error);
// 	}
// }