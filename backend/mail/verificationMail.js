

const otpTemplate=(otp)=>{

    return `
<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #aee3f8;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: black;
				margin: 0;
				padding: 0;
                margin-top:40px;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
                border:3px solid rgb(2, 2, 152);
                border-radius:8px;
                background-color: white;
                /* background: linear-gradient(90deg, rgb(27, 21, 137) 0%, rgb(44, 44, 199) 52%, rgba(0,212,255,1) 100%); */
			}
	
			
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			
	
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			
			<div class="message">OTP Verification Email</div>
			<div class="body">
				<p>Dear User,</p>
				<p>Thank you for registering with Shelter-Seek. To complete your registration, please use the following OTP
					(One-Time Password) to verify your account:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.
				Once your account is verified, you will have access to our platform and its features.</p>
			</div>
			
		</div>
	</body>
	
	</html> `
}
module.exports=otpTemplate;