const otpTemplate = (otp) => {
    return `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f2f4f7;
            color: #333333;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px 30px;
            text-align: center;
        }

        .header {
            background-color: #4f46e5;
            color: white;
            padding: 15px 20px;
            border-radius: 10px 10px 0 0;
            font-size: 24px;
            font-weight: bold;
        }

        .content {
            margin-top: 20px;
        }

        .message {
            font-size: 18px;
            color: #4f46e5;
            font-weight: 600;
            margin-bottom: 20px;
        }

        .otp {
            display: inline-block;
            font-size: 28px;
            font-weight: bold;
            color: #4f46e5;
            background: #f2f0f7;
            padding: 10px 20px;
            border-radius: 8px;
            margin: 20px 0;
        }

        .body-text {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 20px;
            color: #555555;
        }

        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777777;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            Shelter Seek OTP Verification
        </div>
        <div class="content">
            <p class="message">Hello,</p>
            <p class="body-text">
                Welcome to Shelter Seek! To complete your account registration, please use the OTP below to verify your email:
            </p>
            <div class="otp">${otp}</div>
            <p class="body-text">
                This OTP is valid for <strong>5 minutes</strong>. If you did not request this verification, you can safely ignore this email.
            </p>
            <p class="body-text">
                Thank you for choosing Shelter Seek. We're excited to have you on board!
            </p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Shelter Seek. All rights reserved.
        </div>
    </div>
</body>

</html>
`;
};

module.exports = otpTemplate;
