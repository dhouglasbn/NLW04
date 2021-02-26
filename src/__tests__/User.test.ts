// imports das ferramentas do express e da classe app
import { response } from 'express';
import request from 'supertest';
import { app } from '../app';
import { getConnection } from "typeorm";

// import da createconnection da index.ts
import createConnection from '../database';

// describe é a função que se faz o teste
// describe("Título", função)
describe("User", () => {
    // beforeAll para realizar processos antes do próprio teste
    beforeAll(async () => {
        // criando conexão com o banco de dados
        const connection = await createConnection(); 
        // rodando as migrations
        await connection.runMigrations();
    })
    
    // deletando o banco de dados após os testes
    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    // it(descrição do que deve acontecer, função)
    it("Should be able to create a new user", async () => {
        const response = await request(app).post("/users").send({
        email: "user@example.com",
        name: "User Example"
    });
    // o teste espera que o processo resulte em algo
    // expect(processo).toBe(resultado)
    expect(response.status).toBe(201);
    })

    it("Should not be able to create a user with exists email", async () => {
        const response = await request(app).post("/users").send({
            email: "user@example.com",
            name: "User Example"
        });
        // o teste espera que o processo resulte em algo
        // expect(processo).toBe(resultado)
        expect(response.status).toBe(400);
    })
})