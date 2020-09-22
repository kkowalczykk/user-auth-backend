const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


router.get('/test', (req, res) => {
      res.send("Hello, its working");
})


router.post('/register', async (req, res) => {
      try {
            let { email, password, passwordCheck, displayName } = req.body;


            //Validate 
            if (!email || !password || !passwordCheck)
                  return res.status(400).json({ msg: 'Not all fields have been entered' });
            if (password.length < 5)
                  return res.status(400).json({ msg: 'Password length must be at least 5 characters.' });
            if (password !== passwordCheck)
                  return res.status(400).json({ msg: 'Enter the same password twice for verification.' });

            const existingUser = await User.findOne({ email: email });
            if (existingUser)
                  return res.status(400).json({ msg: 'An account with this email already exists.' });

            if (!displayName)
                  displayName = email;


            //Hash password
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);
            console.log(passwordHash);


            //Save user to database
            const newUser = new User({
                  email,
                  password: passwordHash,
                  displayName,
            });
            const savedUser = await newUser.save();
            res.json(savedUser);

      } catch (err) {
            res.status(500).json({ error: err.message })
      }
})

module.exports = router;