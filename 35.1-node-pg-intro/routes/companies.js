const express = require('express');
const router = express.Router();
const db = require('../db');

/**
 * @description Get all companies from the database
 * @route GET /companies
 * @returns {object} 200 - Array of companies
 */
router.get('/', async function(req, res, next) {
  try {
    const results = await db.query('SELECT code, name FROM companies');
    return res.json({ companies: results.rows });
  } catch (error) {
    return next(error);
  }
});

/**
 * @description Get a single company from the database
 * @route GET /companies/:code
 * @returns {object} 200 - Single company
 */
router.get('/:code', async function(req, res, next) {
  const { code } = req.params;
  try {
    const results = await db.query('SELECT * FROM companies WHERE code = $1', [code]);
    return res.json({ company: results.rows[0] });
  } catch (error) {
    return next(error);
  }
});

/**
 * @description Create a new company in the database
 * @route POST /companies
 * @returns {object} 201 - Company created
 */
router.post('/', async function(req, res, next) {
  const { code, name, description } = req.body;
  try {
    const results = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *', [code, name, description]);
    return res.status(201).json({ company: results.rows[0] });
  } catch (error) {
    return next(error);
  }
});

/**
 * @description Update a company in the database
 * @route PUT /companies/:code
 * @returns {object} 200 - Company updated
 */
router.put('/:code', async function(req, res, next) {
  const { code } = req.params;
  const { name, description } = req.body;
  try {
    const results = await db.query('UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING *', [name, description, code]);
    return res.json({ company: results.rows[0] });
  } catch (error) {
    return next(error);
  }
});

/**
 * @description Delete a company from the database
 * @route DELETE /companies/:code
 * @returns {object} 200 - Company deleted
 */
router.delete('/:code', async function(req, res, next) {
  const { code } = req.params;
  try {
    const results = await db.query('DELETE FROM companies WHERE code = $1 RETURNING *', [code]);
    return res.json({ status: "deleted" });
  } catch (error) {
    return next(error);
  }
});