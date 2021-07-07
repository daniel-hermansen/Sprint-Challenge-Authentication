const request = require('supertest');
const server = require('../api/server.js');
const db = require("../database/dbConfig");


describe('register functionality', () => {
    it('should return status 201', async () => {
        const res = await request(server)
            .post("/api/auth/Register")
            .send({
                username: "lambda",
                password: "lambdaschool"
            });
        expect(res.status).toBe(201);
    });
  
    it("should return json", async () => {
        const res = await request(server)
            .post("/api/auth/Register")
            .send({
                username: "lambda",
                password: "lambdaschool"
            });
        expect(res.type).toBe("application/json");
    });

    it("returns an id", async () => {
        const res = await request(server)
            .post("/api/auth/Register")
            .send({
                username: "lambda",
                password: "lambdaschool"
            });
        expect(res.body.id).not.toBeNaN();
    });
    
    beforeEach(async () => {
        await db("users").truncate();
    });
});

describe("login functionality", () => {
    it("should return status 200", async () => {
        const res = await request(server)
            .post("/api/auth/Login")
            .send({ 
                username: "lambda", 
                password: "lambdaschool" 
            });
        expect(res.status).toBe(200);
    });
  
    it("should return a token", async () => {
        const res = await request(server)
            .post("/api/auth/Login")
            .send({ 
                username: "lambda", 
                password: "lambdaschool" 
            });
        expect(res.body.token).toBeTruthy();
    });
  
    it("should return json", async () => {
        const res = await request(server)
            .post("/api/auth/Login")
            .send({ 
                username: "lambda", 
                password: "lambdaschool" 
            });
        expect(res.type).toBe("application/json");
    });
});