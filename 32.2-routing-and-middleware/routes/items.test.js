process.env.NODE_ENV = "test";

const test = require("supertest");
const app = require("../app");

let test_items = require("../fakeDb");
let test_item = {name: "test", price: 100};

beforeEach(async () => {
    test_items.push(test_item);
});

afterEach(async () => {
    test_items = [];
});

describe("GET /items", () => {
    it("should return an array of items", async () => {
        const resp = await test(app).get("/items");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({items: [test_item]});
    });
});

describe("GET /items/:name", () => {
    it("should return a single item", async () => {
        const resp = await test(app).get("/items/test");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({item: {name: "test", price: 100}});
    });

    it("should return 404 if item not found", async () => {
        const resp = await test(app).get("/items/not-found");
        expect(resp.statusCode).toBe(404);
    });
});

describe("POST /items", () => {
    it("should create a new item", async () => {
        const resp = await test(app).post("/items").send({name: "test2", price: 200});
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({added: {name: "test2", price: 200}});
    });
});

describe("PATCH /items/:name", () => {
    it("should update an existing item", async () => {
        const resp = await test(app).patch("/items/test").send({name: "test2", price: 200});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({updated: {name: "test2", price: 200}});
    });

    it("should return 404 if item not found", async () => {
        const resp = await test(app).patch("/items/not-found").send({name: "test2", price: 200});
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", () => {
    it("should delete an existing item", async () => {
        const resp = await test(app).delete(`/items/${test_item.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({message: "Deleted"});
    });

    it("should return 404 if item not found", async () => {
        const resp = await test(app).delete("/items/not-found");
        expect(resp.statusCode).toBe(404);
    });
});