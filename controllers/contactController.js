const nodemailer = require("nodemailer");

const handleContactForm = async (req, res) => {
    const {name, email, message} = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ msg: "Please fill in all fields." });
      }
      console.log("Received contact form:", req.body);
      
      try{
        const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS,}});
        const mailOptions = {
            from: email,
            to: process.env.RECEIVER_EMAIL,
            subject: `Message from ${name}`,
            text: `You got a message from ${name} (${email}):\n\n${message}`,
          };
          
          await transporter.sendMail(mailOptions);
          res.status(200).json({ msg: "Message sent successfully!" });
      }
      catch (error) {
        console.error("Email send error:", error);
        res.status(500).json({ error: "Something went wrong. Try again later." });
      }
      
};
module.exports = { handleContactForm };