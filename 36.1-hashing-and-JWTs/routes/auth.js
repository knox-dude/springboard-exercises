const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");

const ExpressError = require("../expressError");
const { SECRET_KEY } = require("../config");
const User = require("../models/user");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/

router.post('/login', async function (req, res, next) {
  try {
    const { username, password } = req.body;
    // ensure all fields are present
    if (!username || !password) {
      throw new ExpressError("Missing required fields", 400);
    }
    const authenticated = await User.authenticate(username, password);
    if (authenticated) {
      //update last-login
      await User.updateLoginTimestamp(username);
      // return the resulting jwt
      const token = jwt.sign({ username: username }, SECRET_KEY);
      return res.json({ token });
    }
    else {
      throw new ExpressError("Invalid credentials", 400);
    }
  } catch (err) {
    return next(err);
  }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

router.post("/register", async function (req, res, next) {
  try {
    const { username, password, first_name, last_name, phone } = req.body;
    // ensure all fields are present
    if (!username || !password || !first_name || !last_name || !phone) {
      throw new ExpressError("Missing required fields", 400);
    }
    // register user
    const user = await User.register({username, password, first_name, last_name, phone});
    // update last-login
    await User.updateLoginTimestamp(user.username);
    // return the resulting jwt
    const token = jwt.sign({ username: user.username }, SECRET_KEY);
    return res.json({ token });

  } catch (err) {
    return next(err);
  }
});

module.exports = router;
