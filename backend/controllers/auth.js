const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
// const WhitelistUser = require("../models/whitelist");

// sendgrid
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// ACCOUNT SIGN UP FUNTION -----------------------------------------------------
// exports.signup = (req, res) => {
//   const { email, password } = req.body;

//   // WhitelistUser.findOne({ email }).exec((err, whitelist) => {
//   //   if (!whitelist) {
//   //     console.log(whitelist);
//   //     console.log("This email is not authorized to register");
//   //     return res.status(400).json({
//   //       error: "This email is not authorized to register",
//   //     });
//   //   }

//   //   console.log(whitelist);
//   User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({
//         error: "Email is taken",
//       });
//     }

//     const token = jwt.sign(
//       { email, password },
//       process.env.JWT_ACCOUNT_ACTIVATION,
//       { expiresIn: "10m" }
//     );

//     const emailData = {
//       from: process.env.EMAIL_FROM,
//       to: email,
//       subject: `Account activation link`,
//       html: `
//           <!DOCTYPE html>
//           <html>
//           <head>

//           <meta charset="utf-8">
//           <meta http-equiv="x-ua-compatible" content="ie=edge">
//           <title>Email Confirmation</title>
//           <meta name="viewport" content="width=device-width, initial-scale=1">
//           <style type="text/css">
//           /**
//            * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
//            */
//           @media screen {
//             @font-face {
//       font-family: 'Source Sans Pro';
//       font-style: normal;
//       font-weight: 400;
//       src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
//     }
//     @font-face {
//       font-family: 'Source Sans Pro';
//       font-style: normal;
//       font-weight: 700;
//       src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
//     }
//   }
//   /**
//    * Avoid browser level font resizing.
//    * 1. Windows Mobile
//    * 2. iOS / OSX
//    */
//   body,
//   table,
//   td,
//   a {
//     -ms-text-size-adjust: 100%; /* 1 */
//     -webkit-text-size-adjust: 100%; /* 2 */
//   }
//   /**
//    * Remove extra space added to tables and cells in Outlook.
//    */
//   table,
//   td {
//     mso-table-rspace: 0pt;
//     mso-table-lspace: 0pt;
//   }
//   /**
//    * Better fluid images in Internet Explorer.
//    */
//   img {
//     -ms-interpolation-mode: bicubic;
//   }
//   /**
//    * Remove blue links for iOS devices.
//    */
//   a[x-apple-data-detectors] {
//     font-family: inherit !important;
//     font-size: inherit !important;
//     font-weight: inherit !important;
//     line-height: inherit !important;
//     color: inherit !important;
//     text-decoration: none !important;
//   }
//   /**
//    * Fix centering issues in Android 4.4.
//    */
//   div[style*="margin: 16px 0;"] {
//     margin: 0 !important;
//   }
//   body {
//     width: 100% !important;
//     height: 100% !important;
//     padding: 0 !important;
//     margin: 0 !important;
//   }
//   /**
//    * Collapse table borders to avoid space between cells.
//    */
//   table {
//     border-collapse: collapse !important;
//   }
//   a {
//     color: #1a82e2;
//   }
//   img {
//     height: auto;
//     line-height: 100%;
//     text-decoration: none;
//     border: 0;
//     outline: none;
//   }
//   </style>

//   </head>
//   <body style="background-color: #e9ecef;">

//   <!-- start preheader -->
//   <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
//   Click the link in the email to finish signing up!
//   </div>
//   <!-- end preheader -->

//   <!-- start body -->
//   <table border="0" cellpadding="0" cellspacing="0" width="100%">

//   <!-- start logo -->
//     <tr>
//     <td align="center" bgcolor="#e9ecef">
//     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
//           <tr>
//           <td align="center" valign="top" style="padding: 36px 24px;">
//           <a href='https://postimg.cc/mtzMMXL9' target='_blank'><img src='https://i.postimg.cc/mtzMMXL9/Logo-TO.png' border='0' alt='Logo-TO' width="48" style="display: block; width: 48px; max-width: 48px; min-width: 100px;"/></a>
//           </td>
//           </tr>
//           </table>
//           </td>
//           </tr>
//     <!-- end logo -->

//     <!-- start hero -->
//     <tr>
//     <td align="center" bgcolor="#e9ecef">
//     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
//     <tr>
//     <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
//     <h1 style="text-align: center; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
//     </td>
//     </tr>
//         </table>
//       </td>
//     </tr>
//     <!-- end hero -->

//     <!-- start copy block -->
//     <tr>
//     <td align="center" bgcolor="#e9ecef">
//     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

//     <!-- start copy -->
//     <tr>
//     <td align="left" bgcolor="#ffffff" style=" text-align: center; padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
//     <p style="margin: 0;">Tap the button below to be directed to the Take One App page where you will confirm your email address.</p>
//     </td>
//     </tr>
//           <!-- end copy -->

//           <!-- start button -->
//           <tr>
//           <td align="left" bgcolor="#ffffff">
//           <table border="0" cellpadding="0" cellspacing="0" width="100%">
//           <tr>
//           <td align="center" bgcolor="#ffffff" style="padding: 12px;">
//           <table border="0" cellpadding="0" cellspacing="0">
//           <tr>
//           <td align="center" style="border-radius: 6px; background: linear-gradient(90deg, #02cce7 0%, #4883d7 100%);">
//           <a href="${process.env.CLIENT_URL}/activate-account/${token}" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Complete Signup!</a>
//           </td>
//           </tr>
//           </table>
//           </td>
//           </tr>
//           </table>
//           </td>
//           </tr>
//           <!-- end button -->

//           <!-- start copy -->
//           <tr>
//           <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
//           <p style="margin: 0; text-align: center;">If that doesn't work, click the following link or copy and paste it in your browser:</p>
//           <p style="text-align: center; margin: 10;"><a href="${process.env.CLIENT_URL}/activate-account/${token}" target="_blank">${process.env.CLIENT_URL}/activate-account/${token}</a></p>
//           </td>
//           </tr>
//           <!-- end copy -->

//           <!-- start copy -->
//           <tr>
//           <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
//           <p style=" text-align: center; margin: 0;">Thanks!<br> Take One App</p>
//           </td>
//           </tr>
//           <!-- end copy -->

//           </table>
//           </td>
//           </tr>
//     <!-- end copy block -->

//     <!-- start footer -->
//     <tr>
//     <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
//     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

//     <!-- start permission -->
//     <tr>
//     <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
//     <p style="margin: 0;">You received this email because we received a signup request for your Take One App account. If you didn't make this request you can safely delete this email.</p>
//     </td>
//     </tr>
//     <!-- end permission -->

//     <!-- start unsubscribe -->
//     <tr>
//     <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
//     <p style="margin: 0;">Copyright of Take One Films 2022</p>
//     <p style="margin: 0;">36 Phoebe St, Toronto, ON M5T 1A9</p>
//     </td>
//           </tr>
//           <!-- end unsubscribe -->

//           </table>
//           </td>
//           </tr>
//           <!-- end footer -->

//           </table>
//           <!-- end body -->

//           </body>
//           </html>
//           `,
//     };

//     sgMail
//       .send(emailData)
//       .then((sent) => {
//         console.log("SIGNUP EMAIL SENT", sent);
//         return res.json({
//           message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
//         });
//       })
//       .catch((err) => {
//         console.log("SIGNUP EMAIL SENT ERROR", sent);
//         return res.json({
//           message: err.message,
//         });
//       });
//   });
//   // });
// };

// ACCOUNT SIGN UP FUNTION -----------------------------------------------------
exports.signup = (req, res) => {
  const { email, password } = req.body;

  // WhitelistUser.findOne({ email }).exec((err, whitelist) => {
  //   if (!whitelist) {
  //     console.log(whitelist);
  //     console.log("This email is not authorized to register");
  //     return res.status(400).json({
  //       error: "This email is not authorized to register",
  //     });
  //   }

  //   console.log(whitelist);
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    const newUser = new User({ email, password });

    newUser.save((err, user) => {
      if (err) {
        console.log("ERROR saving user in database. ", err);
        return res.status(401).json({
          error: "Failed to create new account. Please try again.",
        });
      }
      return res.json({
        message: "Signup success. Please signin.",
      });
    });
  });
  // });
};

// ACCOUNT ACTIVATION FUNTION -----------------------------------------------------
exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    // verify token by passing the token along with the secret key
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
          return res.status(401).json({
            error: "Expired link. Signup again",
          });
        }

        const { email, password } = jwt.decode(token);

        const user = new User({ email, password });

        user.save((err, user) => {
          if (err) {
            console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
            return res.status(401).json({
              error: "ERROR saving user in database. Try signup again",
            });
          }
          return res.json({
            message: "Signup success. Please signin.",
          });
        });
      }
    );
  } else {
    return res.json({
      message: "Something went wrong. Try again.",
    });
  }
};

// ACCOUNT SIGN IN FUNTION -----------------------------------------------------
exports.signin = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }

    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match.",
      });
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Id FOR SIGNING", { _id: user._id });

    const { _id, email, role } = user;
    console.log("Signin Success");

    return res.json({
      accessToken,
      user: { _id, email, role },
    });
  });
};

//USER MIDDLEWARE ---------------------------------------------------------------
exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
});

//ADMIN MIDDLEWARE ---------------------------------------------------------------
exports.adminMiddleware = (req, res, next) => {
  User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (user.role !== "admin" || "support") {
      return res.status(400).json({
        error: "Admin Access denied",
      });
    }

    req.profile = user;
    next();
  });
};

// ME ENDPOINT FUNCTION  ------------------------------------------------------------
exports.getUserToken = (req, res) => {
  // @ts-ignore
  const token = req.headers.authorization;

  // get the decoded payload and header
  const decoded = jwt.decode(token, { complete: true });

  if (decoded) {
    // define ID variable
    const { _id: userId } = decoded.payload;

    // find user in database with matching email
    User.findById(userId).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email does not exist. Please signup",
        });
      }
      console.log("Before deletion", user);
      // delete password data
      // delete user.hashed_password;
      // delete user.salt;

      // store user data in variable userData
      const userData = user;

      // console.log("after deletion", userData);
      return res.status(200).json({ userData });
    });
  } else {
    return res.status(401).json({ error: { error: "Invalid User" } });
  }
};
