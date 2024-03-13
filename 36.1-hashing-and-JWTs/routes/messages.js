const express = require("express");
const router = new express.Router();

const ExpressError = require("../expressError");
const db = require("../db");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");
const User = require("../models/user");
const Message = require("../models/message");

/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/

router.get("/:id", ensureCorrectUser, async function (res, req, next) {
    try {
      const message = await Message.get(req.params.id);
      return res.json(message);
    } catch (err) {
      next(err);
    }
})

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/

router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
      const message = await Message.create(req.body);
      return res.json(message);
    } catch (err) {
      next(err);
    }
})


/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post("/:id/read", ensureCorrectUser, async function (req, res, next) {
    try {
      const message = await Message.markAsRead(req.params.id);
      return res.json(message);
    } catch (err) {
      next(err);
    }
})


module.exports = router;