const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Book = require("../models/book");
process.env.NODE_ENV = "test";

describe("Book Routes Test", function () {
    
    beforeEach(async function() {
        await db.query("DELETE FROM books");
        bookData = {
            isbn: "1234567890",
            amazon_url: "https://amazon.com",
            author: "Test Author",
            language: "English",
            pages: 100,
            publisher: "Amazon",
            title: "The Hitchhiker's Guide to the Galaxy",
            year: 2005
        }
        await Book.create(bookData);
    });

    /** GET /books => array of Books  */

    describe("GET /books", function () {
        it("should return an array of books", async function () {
            const res = await request(app)
             .get("/books")
             .expect(200);
            expect(res.body).toHaveProperty("books");
            expect(Array.isArray(res.body.books)).toBe(true);
            expect(res.body.books[0].isbn).toBe("1234567890");
        })
    });

    /** GET /books/isbn => single Book */

    describe("GET /books/:isbn", function () {
        it("should return a single book", async function () {
            const res = await request(app)
            .get("/books/1234567890")
            .expect(200);
            expect(res.body).toHaveProperty("book");
            expect(res.body.book.isbn).toBe("1234567890");
            expect(res.body.book.author).toBe("Test Author");
        });
        it("should error if book not found", async function () {
            const res = await request(app)
            .get("/books/123")
            .expect(404);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("There is no book with an isbn '123");
        });
    });

    /** POST /books => new Book */

    describe("POST /books", function () {
        let newBookData = {
            isbn: "0987654321",
            amazon_url: "https://amazon.com/testbook",
            author: "Test Author 2",
            language: "English",
            pages: 100,
            publisher: "Amazon",
            title: "The Bible",
            year: 0
        }
        it("should create a new book", async function () {
            const res = await request(app)
            .post("/books")
            .send(newBookData)
            .expect(201);
            expect(res.body).toHaveProperty("book");
            expect(res.body.book.isbn).toBe("0987654321");
            expect(res.body.book.author).toBe("Test Author 2");
        });
        it("should error if book already exists", async function () {
            newBookData.isbn = "1234567890" // make isbn same as existing isbn in database
            const res = await request(app)
            .post("/books")
            .send(newBookData)
            .expect(500);
        });
        it("should error if fields are invalid", async function () {
            // remove language property and make pages property invalid
            delete newBookData.language;
            newBookData.pages = -100;

            const res = await request(app)
            .post("/books")
            .send(newBookData)
            .expect(400);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toEqual([
                "instance.pages must be greater than or equal to 1",
                "instance requires property \"language\""]);
        });
    });

    /** PUT /books/:isbn => updated Book */

    describe("PUT /books/:isbn", function() {
        let newBookData = {
            isbn: "1234567890",
            amazon_url: "https://amazon.com/testbook",
            author: "Test Author 2",
            language: "English",
            pages: 100,
            publisher: "Amazon",
            title: "The Bible",
            year: 0
        }
        it("should update a book", async function () {
            const res = await request(app)
           .put("/books/1234567890")
           .send(newBookData)
           .expect(200);
            expect(res.body).toHaveProperty("book");
            expect(res.body.book.isbn).toBe("1234567890");
            expect(res.body.book.author).toBe("Test Author 2");
            expect(res.body.book.title).toBe("The Bible");
        });
        it("should error if book not found", async function () {
            const res = await request(app)
           .put("/books/123")
           .send(bookData)
           .expect(404);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("There is no book with an isbn '123");
        });
    });

    /** DELETE /books/:isbn => deleted Book */

    describe("DELETE /books/:isbn", function() {
        it("should delete a book", async function () {
            const res = await request(app)
          .delete("/books/1234567890")
          .expect(200);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("Book deleted");
        });
        it("should error if book not found", async function () {
            const res = await request(app)
          .delete("/books/123")
          .expect(404);
            expect(res.body).toHaveProperty("message");
            expect(res.body.message).toBe("There is no book with an isbn '123");
        });
    })

});

afterAll(async function () {
    await db.end();
});