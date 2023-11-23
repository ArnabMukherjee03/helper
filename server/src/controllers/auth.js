const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const {
  validateRegisterInput,
  validatePassword,
} = require("../validation/register");
const passport = require("passport");
const { sendMail } = require("../utils/mail");
const jwt = require("jsonwebtoken");
const { get } = require("mongoose");
const { getIo } = require("../utils/socket");

exports.signUp = async (req, res) => {
  try {
    const data = await req.body;
    const { isValid, errors } = validateRegisterInput(data);

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    const { username, email, password } = data;

    const isEmail = await User.findOne({ email });

    if (isEmail) {
      return res.status(400).json({ error: ["User with this email is exist"] });
    }

    const isUsername = await User.findOne({ username });

    if (isUsername) {
      return res
        .status(400)
        .json({ error: ["Username already exists take another "] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      ...data,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return res.status(400).json({ error: ["Something Went Wrong..."] });
    }

    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    const resetPage = `http://localhost:3000/verify/${token}`;
    const subject = `Please Verify Your Email`;
    const html = `<a href='${resetPage}'>Verify</a>`;

    await sendMail({ email: savedUser.email, subject, html });

    res.status(200).json({ message: "Please Verify Your Email..." });
  } catch (error) {
    res.status(500).json({ error: [error.message] });
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }

      if (info) {
        return res.status(401).json({ message: info });
      }

      // Assuming user.token is set in your authentication logic
      const token = user.token;

      // Store user.id in the session
      req.login(user, (loginErr) => {
        if (loginErr) {
          return next(loginErr);
        }

        res.cookie("jwt", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
          domain:"vercel.app"
        });

        
       
        return res.status(200).json({ id:user.id, message: "Login Successful" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  })(req, res, next);
};

exports.checkAuth = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json(req.user);
    } else {
      res.status(400).json({ message: "Not Authorize User" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.clearCookie("jwt", { httpOnly: true, secure: true });
    res.status(201).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPasswordReq = async (req, res) => {
  try {
    const { email } = await req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User with this email doesn't exist" });
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });

    user.resetToken = token;
    await user.save();

    const resetPage = `http://localhost:3000/resetpassword/${token}`;
    const subject = `Please Verify it's you,${user.name}, Please click on the link to complete the password reset`;
    const html = `<a href='${resetPage}'>Verify</a>`;

    if (email) {
      console.log(email);
      const response = await sendMail({ email, subject, html });
      return res
        .status(200)
        .json({ message: "Reset password link sent to your Mail" });
    }

    res.status(500).json({ error: "Email Not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resetPasswordRes = async (req, res) => {
  try {
    const { token, password, confirmPassword } = await req.body;
    const { isValid, errors } = validatePassword({ password, confirmPassword });

    if (!isValid) {
      return res.status(400).json({ error: errors });
    }

    if (!token) {
      return res.status(400).json({ error: "Token not Found" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      return res.status(400).json({ error: "Token not Found" });
    }

    const user = await User.findOne({ email: decodedToken.email });

    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    if (token !== user.resetToken) {
      return res.status(400).json({ error: "Already Password Changed.." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetToken = null;

    await user.save();

    const subject = `Password Successfully Updated`;
    const html = `Password Successfully Updated`;

    await sendMail({ email: user.email, subject, html });

    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verify = async (req, res) => {
  try {
    const {token} = await req.body;

    if (!token) {
      return res.status(400).json({ error: "Token not Found" });
    }

    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

   

    const user = await User.findById(id);

    
    if (!user) {
      return res.status(400).json({ error: "User Not Found" });
    }

    if(user.verifyUser === true){
      return res.status(400).json({ error: "User Already Verified.." });
    }

    user.verifyUser = true;

    await user.save();

    res.status(200).json({name: user.name,message: "User Verification Successfull"});

  } catch (error) {
    res.status(400).json({ error: "User Not Found" });
  }
};
