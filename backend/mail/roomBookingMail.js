const paymentSuccessEmail = (userName, amount, orderId, paymentId) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Room Booking Confirmation</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        background-color: #4caf50;
        padding: 10px;
        border-radius: 8px 8px 0 0;
        color: white;
      }
      .content {
        text-align: left;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #888888;
      }
      .highlight {
        font-weight: bold;
        color: #333333;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Payment Confirmation</h2>
      </div>
      <div class="content">
        <p>Dear <span class="highlight">${userName}</span>,</p>
        <p>Thank you for your payment of <span class="highlight">₹${amount}</span>.</p>
        <p>Your payment has been successfully processed. Here are your payment details:</p>
        <ul>
          <li><strong>Order ID:</strong> ${orderId}</li>
          <li><strong>Payment ID:</strong> ${paymentId}</li>
        </ul>
        <p>We look forward to hosting you. For any queries, feel free to contact our support team.</p>
      </div>
      <div class="footer">
        <p>&copy; 2024 Shelter Seek. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
};

module.exports = paymentSuccessEmail;
