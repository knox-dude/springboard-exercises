/** User class for message.ly */

const bcrypt = require('bcrypt');
const db = require('../db');
const ExpressError = require('../expressError');
const { BCRYPT_WORK_FACTOR } = require('../config');

/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
    try {
      const result = await db.query(
          `INSERT INTO users (username, password, first_name, last_name, phone, join_at, last_login_at)
           VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
           RETURNING *`,
          [username, hashedPassword, first_name, last_name, phone]);
      return result.rows[0];
    }
    catch (err) {
      throw new ExpressError(err.message);
   }
  }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    try {
      const result = await db.query(
          `SELECT * FROM users WHERE username = $1`,
          [username]);
      const user = result.rows[0];
      if (user) {
        const valid = await bcrypt.compare(password, user.password);
        return valid;
      } else {
        return false;
      }
    }
    catch (err) {
      throw new ExpressError(err.message);
    }
  }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    try {
      const result = await db.query(
          `UPDATE users SET last_login_at=NOW() WHERE username = $1`,
          [username]);
      return result.rows[0];
    }
    catch (err) {
      throw new ExpressError(err.message);
    }
  }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() {
    try {
      const result = await db.query(
          `SELECT username, first_name, last_name, phone FROM users`);
      return result.rows;
    }
    catch (err) {
      throw new ExpressError(err.message);
    }
   }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) {
    try {
      const result = await db.query(
          `SELECT username, first_name, last_name, phone, join_at, last_login_at
           FROM users WHERE username = $1`,
          [username]);
      return result.rows[0];
    }
    catch (err) {
      throw new ExpressError(err.message);
    }
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) {
    try {
      const result = await db.query(
          `SELECT id, username, first_name, last_name, phone, body, sent_at, read_at
           FROM messages JOIN users on users.username = messages.to_username
           WHERE from_username = $1`,
          [username]);
      let m = result.rows;
      for (let i = 0; i < m.length; i++) {
        m[i].to_user = {
          username: m[i].username,
          first_name: m[i].first_name,
          last_name: m[i].last_name,
          phone: m[i].phone
        }
        delete m[i].username;
        delete m[i].first_name;
        delete m[i].last_name;
        delete m[i].phone;
      }
      return m;
    }
    catch (err) {
      throw new ExpressError(err.message);
    }
  }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) {
    try {
      const result = await db.query(
          `SELECT id, username, first_name, last_name, phone, body, sent_at, read_at
           FROM messages JOIN users ON users.username = messages.from_username
           WHERE to_username = $1`,
          [username]);
      let m = result.rows;
      for (let i = 0; i < m.length; i++) {
        m[i].from_user = {username: m[i].username, first_name: m[i].first_name, last_name: m[i].last_name, phone: m[i].phone}
        delete m[i].username;
        delete m[i].first_name;
        delete m[i].last_name;
        delete m[i].phone;
      }
      return m;
    }
    catch (err) {
      throw new ExpressError(err.message);
    }
  }
}


module.exports = User;