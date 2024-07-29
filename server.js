require("dotenv").config(); // Load environment variables
const express = require("express");
const mailer = require("./mailer"); // Import the transporter from mailer.js
const path = require("path");
const bodyParser = require("body-parser"); // Use bodyParser instead of bodyparser
const ejs = require("ejs");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs"); // Set view engine to EJS
app.set("views", path.join(__dirname, "views")); // Set views directory

//  app.get('/', (req, res) => {
//   console.log("get");
//   res.sendFile(path.join(__dirname, 'public/Index.html')); // Absolute path
// });
app.get("/", (req, res) => {
  res.render("Index", {
    about: "no",
    skills: "hidden",
    winnings: "hidden",
    hire: "hidden",
    tw: "0px",
    iw: "54px",
    ab:'text-white',
    sk:'no',
    win:'no',
    hr:'no',
  });
});
app.get("/about", (req, res) => {
  res.render("Index", {
    about: "no",
    skills: "hidden",
    winnings: "hidden",
    hire: "hidden",
    tw: "0px",
    iw: "54px",
    ab:'text-white',
    sk:'no',
    win:'no',
    hr:'no',

  });
});
app.get("/skills", (req, res) => {
  res.render("Index", {
    about: "hidden",
    skills: "no",
    winnings: "hidden",
    hire: "hidden",
    tw: "62px",
    iw: "47.163px",
    sk:'text-white',
    ab:'no',
    win:'no',
    hr:'no',
  });
});
app.get("/winnings", (req, res) => {
  res.render("Index", {
    about: "hidden",
    skills: "hidden",
    winnings: "no",
    hire: "hidden",
    tw: "117px",
    iw: "74px",
    win:'text-white',
    sk:'no',
    ab:'no',
    hr:'no',
  });
});
app.get("/hire", (req, res) => {
  res.render("Index", {
    about: "hidden",
    skills: "hidden",
    winnings: "hidden",
    hire: "no",
    tw: "198px",
    iw: "42px",
    hr:'text-white',
    sk:'no',
    win:'no',
    ab:'no',
  });

});

app.get("*", () => {
  res.render("Opps");
});

// Ensure environment variables are loaded
const fromEmail = process.env.FROM_EMAIL;
const toEmail = process.env.TO_EMAIL;

// Use body-parser to parse incoming request bodies (usually for POST requests)
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data

// ... rest of your code for routing and handling other requests ...

// Send email notification (using imported transporter)
app.post("/", (req, res) => {
  const { name, email, role, jobDescription, link } = req.body;

  // Now you can access the form data using req.body

  const mailData = {
    from: fromEmail,
    to: toEmail,
    subject: "New Hire Me Inquiry",
    html: `
      <h4>Comapnay/Name: ${name}</h4>
      <h4>Email: ${email}</h4>
      <h4>Your Role: ${role}</h5>
      <h4>Project Description: ${jobDescription}</h4>
      <h4>Website Link: ${link}</h4>
    `,
  };

  mailer.sendMail(mailData, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.render("Opps");

      // res.status(500).send('Error sending email'); // Inform client about error
    } else {
      console.log("Email sent successfully:", info.messageId);
      // res.status(200).send('Form submitted successfully!'); // Inform client about success

      res.sendFile("Success");
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
