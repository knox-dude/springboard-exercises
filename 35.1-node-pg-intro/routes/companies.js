const express = require('express');
const router = express.Router();
const db = require('../db');
const ExpressError = require("../expressError")

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
 * @returns {object} 200 - Single company and its invoices
 */
router.get('/:code', async function(req, res, next) {
  const { code } = req.params;
  try {
    const companyResults = await db.query('SELECT * FROM companies WHERE code = $1', [code]);
    //throw error if company not found
    if (companyResults.rows.length === 0) {
        throw new ExpressError(`Company with code ${code} not found`, 404);
    }
    const invoiceResults = await db.query('SELECT * FROM invoices WHERE comp_code = $1', [code]);
    const company = companyResults.rows[0];
    company.invoices = invoiceResults.rows;
    return res.json({company: company});
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
    //404s if company not found
    if (results.rows.length === 0) {
        throw new ExpressError(`Company with code ${code} not found`, 404);
    }
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
    const check = await db.query('SELECT * FROM companies WHERE code = $1', [code]);
    //404s if company not found
    if (check.rows.length === 0) {
        throw new ExpressError(`Company with code ${code} not found`, 404);
    }
    const results = await db.query('DELETE FROM companies WHERE code = $1', [code]);  
    return res.json({ status: "deleted" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;