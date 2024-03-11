request = require('supertest');
process.env.NODE_ENV = 'test';
const app = require('../app');
const db = require('../db');

let testCompany;
let testInvoice;

beforeEach(async () => {
    const result = await db.query(
        `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) 
        RETURNING *`, ['TST', 'TestCompany', 'This is a test company']
    );
    testCompany = result.rows[0];
    const result2 = await db.query(
        `INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) 
        RETURNING *`, [testCompany.code, 100]
    );
    testInvoice = result2.rows[0];
    // JSON get returns a string for add_date, so convert here to ensure tests work
    testInvoice.add_date = testInvoice.add_date.toISOString();
});

afterEach(async () => {
    // delete test data
    await db.query('DELETE FROM companies');
    await db.query('DELETE FROM invoices');
});

afterAll(async () => {
    // close database connection
    await db.end();
});

/**
 * GET /companies
 */
describe('GET /companies', () => {
    it('should return an array of companies', async () => {
        const res = await request(app).get('/companies');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({companies: [{code: testCompany.code, name: testCompany.name}]});
    });
});

/**
 * GET /companies/:code
 */
describe('GET /companies/:code', () => {
    it('should return a single company', async () => {
        const res = await request(app).get(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
        let combinedCompany = testCompany;
        combinedCompany.invoices = [testInvoice];
        expect(res.body).toEqual({company: testCompany});
    });
    it('should return 404 if company not found', async () => {
        const res = await request(app).get('/companies/NOTFOUND');
        expect(res.statusCode).toBe(404);
    });
});

/**
 * POST /companies
 */
describe('POST /companies', () => {
    it('should create a new company', async () => {
        const res = await request(app)
          .post('/companies')
          .send({
                code: 'TEST',
                name: 'Test Company',
                description: 'This is a test company'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({company: {code: 'Test-Company', name: 'Test Company', description: 'This is a test company'}});
    });
});

/**
 * PUT /companies/:code
 */
describe('PUT /companies/:code', () => {
    it('should update a company', async () => {
        const res = await request(app)
        .put(`/companies/${testCompany.code}`)
        .send({
                name: 'Updated Test Company',
                description: 'This is an updated test company'
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({company: {code: testCompany.code, name: 'Updated Test Company', description: 'This is an updated test company'}});
    });
    it('should return 404 if company not found', async () => {
        const res = await request(app).put('/companies/NOTFOUND');
        expect(res.statusCode).toBe(404);
    });
});

/**
 * DELETE /companies/:code
 */
describe('DELETE /companies/:code', () => {
    it('should delete a company', async () => {
        const res = await request(app).delete(`/companies/${testCompany.code}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({status: 'deleted'});
    });
    it('should return 404 if company not found', async () => {
        const res = await request(app).delete('/companies/NOTFOUND');
        expect(res.statusCode).toBe(404);
    });
});