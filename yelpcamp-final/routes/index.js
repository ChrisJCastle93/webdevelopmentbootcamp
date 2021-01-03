// ALL THE REST CAMPGROUNDS ROUTES
// REPLACED app. with router. throughout
// ADD module.export to the bottom

var express                 = require("express"); // MUST REQUIRE AGAIN IN THIS FILE
var app                     = express();
var router                  = express.Router();
var passport                = require("passport");
var Campground              = require("../models/campground");   
var campgrounds             = require("../models/campground");
var async                   = require("async");
var nodemailer              = require("nodemailer");
var User                    = require("../models/user");             // MOVED PASSPORT AND USER OVER FROM APP.JS
var middleware              = require("../middleware");
var flash                   = require("connect-flash");
var crypto                  = require("crypto");
var Notification            = require("../models/notification");
const { isLoggedIn }        = require('../middleware');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/", function(req, res){
    res.render("landing");
})

// =======================
// AUTH ROUTES
// =======================

// router.get("/register", function(req, res){
//     res.render("register");
// })

router.get("/register", function(req, res){
    res.render("register", {page: 'register'}); 
 });

router.get("/secret", middleware.isLoggedIn, function(req,res){               // NEED TO CHECK IF USER LOGGED IN. isLoggedIn function at bottom of page
    // res.render("secret");
    res.redirect("/campgrounds");
});

// LOGIN ROUTES

router.get("/login", function(req, res){
    res.render("login", {page: 'login'}); 
 });

router.post("/login", passport.authenticate("local", {     // CHECKS THE CREDENTIALS
    successRedirect: "/secret",                         // ITS MIDDLEWARE. RUNS IN THE MIDDLE OF ROUTE
    failureRedirect: "/login"
}), function(req, res){           
});

// LOGOUT ROUTES

router.get("/logout", function(req, res){
    req.logout();                                       // STRAIGHTFORWARD LOGOUT req.
    req.flash("success", "logged you out");               // ADDS IN FLASH MESSAGE FOR LOGGING OUT ON EVERY PAGE
    res.redirect("/campgrounds");
})

// FORGOT PASSWORD ROUTES

router.get("/forgot", function(req,res){               // NEED TO CHECK IF USER LOGGED IN. isLoggedIn function at bottom of page
    res.render("forgot");
});

router.post('/forgot', function(req, res, next) {
    async.waterfall([
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString('hex');
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.email }, function(err, user) {
          if (!user) {
            req.flash('error', 'No account with that email address exists.');
            return res.redirect('/forgot');
          }
  
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  
          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail',                                             //NEED TO ADD IN OUR DETAILS HERE
          auth: {
            user: 'chrisjcastle93@gmail.com',
            pass: '.Dougal39' // process.env.GMAILPW use the DOT ENV program/file
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'chrisjcastle93@gmail.com',
          subject: 'Node.js Password Reset',
          text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
            'http://' + req.headers.host + '/reset/' + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          console.log('mail sent');
          req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
          done(err, 'done');
        });
      }
    ], function(err) {
      if (err) return next(err);
      res.redirect('/forgot');
    });
  });
  
  router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('reset', {token: req.params.token});
    });
  });
  
  router.post('/reset/:token', function(req, res) {
    async.waterfall([
      function(done) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
          if(req.body.password === req.body.confirm) {
            user.setPassword(req.body.password, function(err) {
              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
  
              user.save(function(err) {
                req.logIn(user, function(err) {
                  done(err, user);
                });
              });
            })
          } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect('back');
          }
        });
      },
      function(user, done) {
        var smtpTransport = nodemailer.createTransport({
          service: 'Gmail', 
          auth: {
            user: 'chrisjcastle93@gmail.com',
            pass: '.Dougal39' //process.env.GMAILPW
          }
        });
        var mailOptions = {
          to: user.email,
          from: 'chrisjcastle93@gmail.com',
          subject: 'Your password has been changed',
          text: 'Hello,\n\n' +
            'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
        };
        smtpTransport.sendMail(mailOptions, function(err) {
          req.flash('success', 'Success! Your password has been changed.');
          done(err);
        });
      }
    ], function(err) {
      res.redirect('/campgrounds');
    });
  });
  
// USER PROFILE ROUTES

//handle sign up logic

router.post("/register", function(req, res){
    var newUser = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: req.body.avatar
      });

    if(req.body.adminCode === process.env.ADMINCODE) {
      newUser.isAdmin = true;
    }

    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.redirect("back"); 
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/checkout"); 
        });
    });
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: 'Welcome to YelpCamp!'
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "See you later!");
   res.redirect("/campgrounds");
});

// USER PROFILE ROUTES
router.get("/users/:id", async function(req, res){
  try{
      let user = await User.findById(req.params.id).populate("followers").exec();
      // let user = await User.findById(req.user._id).populate("followers").exec();
      let campgrounds = await Campground.find().where("author.id").equals(user._id).exec();
      res.render("users/show", { user, campgrounds });
  } catch(err){
      req.flash("error", err.message);
      return res.redirect("back");
  }
});

// follow user
router.get('/follow/:id', middleware.isLoggedIn, async function(req, res) {
  try {
    let user = await User.findById(req.params.id);
    user.followers.push(req.user._id);
    user.save();
    req.flash('success', 'Successfully followed ' + user.username + '!');
    res.redirect('/users/' + req.params.id);
  } catch(err) {
    req.flash('error', err.message);
    res.redirect('back');
  }
});

// view all notifications
router.get('/notifications', middleware.isLoggedIn, async function(req, res) {
  try {
    let user = await User.findById(req.user._id).populate({
      path: 'notifications',
      options: { sort: { "_id": -1 } }
    }).exec();
    let allNotifications = user.notifications;
    res.render('notifications/index', { allNotifications });
  } catch(err) {
    req.flash('error', err.message);
    res.redirect('back');
  }
});

// handle notification
router.get('/notifications/:id', middleware.isLoggedIn, async function(req, res) {
  try {
    let notification = await Notification.findById(req.params.id);
    notification.isRead = true;
    notification.save();
    res.redirect(`/campgrounds/${notification.campgroundId}`);
  } catch(err) {
    req.flash('error', err.message);
    res.redirect('back');
  }
});


// STRIPE PAYMENTS INTEGRATION 
// npm install stripe --save

const { resolve } = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// GET checkout
router.get('/checkout', middleware.isLoggedIn, (req, res) => {
  if (req.user.isPaid) {
      req.flash('success', 'Your account is already paid');
      return res.redirect('/campgrounds');
  }
  res.render('checkout', { amount: 20 });
});

// POST pay
router.post('/pay', middleware.isLoggedIn, async (req, res) => {
  const { paymentMethodId, items, currency } = req.body;

  const amount = 2000;

  try {
    // Create new PaymentIntent with a PaymentMethod ID from the client.
    const intent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      error_on_requires_action: true,
      confirm: true
    });

    console.log("💰 Payment received!");

    req.user.isPaid = true;
    await req.user.save();
    // The payment is complete and the money has been moved
    // You can add any post-payment code here (e.g. shipping, fulfillment, etc)

    // Send the client secret to the client to use in the demo
    res.send({ clientSecret: intent.client_secret });
  } catch (e) {
    // Handle "hard declines" e.g. insufficient funds, expired card, card authentication etc
    // See https://stripe.com/docs/declines/codes for more
    if (e.code === "authentication_required") {
      res.send({
        error:
          "This card requires authentication in order to proceeded. Please use a different card."
      });
    } else {
      res.send({ error: e.message });
    }
  }
});

//////////////

// SENDGRID

//GET CONTACT

// GET /contact
router.get('/contact', isLoggedIn, (req, res) => {
  res.render('contact');
});

//POST CONTACT

// POST /contact
router.post('/contact', async (req, res) => {
  let { name, email, message } = req.body;
  name = req.sanitize(name);
  email = req.sanitize(email);
  message = req.sanitize(message);
  const msg = {
    to: 'hi@chrisjcastle.com',
    from: 'hi@chrisjcastle.com',
    // from: email,
    subject: `YelpCamp Contact Form Submission from ${name}`,
    text: message,
    html: `
    <h1>Hi there, this email is from, ${name}, ${email}</h1>
    <p>${message}</p>
    `,
  };
  try {
    await sgMail.send(msg);
    req.flash('success', 'Thank you for your email, we will get back to you shortly.');
    res.redirect('/contact');
  } catch (error) {
    console.error(error);
    console.log(email);
    if (error.response) {
      console.error(error.response.body)
    }
    req.flash('error', 'Sorry, something went wrong, please contact admin@website.com');
    res.redirect('back');
  }
});

//////////////

module.exports = router;