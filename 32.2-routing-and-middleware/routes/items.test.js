process.env.NODE_ENV = "test";

const test = require("supertest");
const app = require("../app");

let items = require("../fakeDb");
let item = {name: "test", price: 100};

beforeEach(async () => {
    items.push(item);
});

afterEach(async () => {
    items = [];
});

describe("GET /items", () => {
    it("should return an array of items", async () => {
        const res = await test(app)
          .get("/items")
          .expect(200)
          .expect("Content-Type", /application\/json/);

        expect(res.body).toHaveLength(1);
    });
});