const express = require('express');
const router = express.Router();
const db = require('../db');


/**
 * @description Get all invoices from the database
 * @route GET /invoices
 * @returns {object} 200 - Array of invoices
 */
router.get('/', async function(req, res, next) {
    try {
        const results = await db.query('SELECT id, comp_code FROM invoices');
        return res.json({ invoices: results.rows });
    } catch (error) {
        return next(error);
    }
});

/**
 * @description Get a single invoice from the database
 * @route GET /invoices/:id
 * @returns {object} 200 - Single invoice
 */
router.get('/:id', async function(req, res, next) {
    const { id } = req.params;
    try {
        // get the invoice from the database
        const invoiceResults = await db.query(
            `SELECT id, amt, paid, add_date, paid_date, comp_code
            FROM invoices WHERE id = $1`, [id]
        );
        // get the company from the database
        const companyResults = await db.query(
            `SELECT name, description FROM companies WHERE code = $1`, [invoiceResults.rows[0].comp_code]
        )
        // delete comp_code from invoice result, put it in company result for proper display
        companyResults.rows[0].code = invoiceResults.rows[0].comp_code;
        delete invoiceResults.rows[0].comp_code;

        return res.json({ invoice: invoiceResults.rows[0], company: companyResults.rows[0] });
    } catch (error) {
        return next(error);
    }
});

/**
 * @description Create a new invoice in the database
 * @route POST /invoices
 * @returns {object} 201 - Invoice created
 */
router.post('/', async function(req, res, next) {
    const { comp_code, amt } = req.body;
    try {
        const results = await db.query(
            `INSERT INTO invoices (amt, comp_code) VALUES ($1, $2) RETURNING *`,
            [amt, comp_code]
        );
        return res.status(201).json({ invoice: results.rows[0] });
    } catch (error) {
        return next(error);
    }
});

/**
 * @description Update a invoice in the database
 * @route PUT /invoices/:id
 * @returns {object} 200 - Invoice updated
 */
router.put('/:id', async function(req, res, next) {
    const { id } = req.params;
    const { amt } = req.body;
    try {
        const results = await db.query(
            `UPDATE invoices SET amt = $1 WHERE id = $2 RETURNING *`,
            [amt, id]
        );
        return res.json({ invoice: results.rows[0] });
    } catch (error) {
        return next(error);
    }
});

/**
 * @description Delete a invoice from the database
 * @route DELETE /invoices/:id
 * @returns {object} 200 - Invoice deleted
 */
router.delete('/:id', async function(req, res, next) {
    const { id } = req.params;
    try {
        const results = await db.query(
            `DELETE FROM invoices WHERE id = $1`, [id]
        );
        return res.json({ status: "deleted" });
    } catch (error) {
        return next(error);
    }
});