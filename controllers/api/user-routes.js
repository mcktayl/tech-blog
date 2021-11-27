const router = require('express').Router();
const User = require('../../models/User');

// route to handle a login request and create a session
router.post('/login', async (req, res) => {
  try {
    console.log('Login request received');

    const userInfo = await User.findOne({ where: { email: req.body.email } });
    if (!userInfo) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log(userInfo);

    const validPassword = await userInfo.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    console.log(validPassword);

    // create session variables based on the logged in user
    req.session.save(() => {
      req.session.user_id = userInfo.id;
      req.session.logged_in = true;

      res.json({ user: userInfo, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// logging out a user in a current session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
