// imports das ferramentas do supertest e da classe app
import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';
// import da createconnection da index.ts
import createConnection from '../database';


// describe é a função que se faz o teste
// describe("Título", função)
describe("Surveys", () => {
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
    it("Should be able to create a new survey", async () => {
        const response = await request(app).post("/surveys").send({
        title: "Title Example",
        description: "Description Example"
    });
    // o teste espera que o processo resulte em algo
    // expect(processo).toBe(resultado)
    expect(response.status).toBe(201);
    // Espera-se que o corpo da requisição tenha um id
    expect(response.body).toHaveProperty("id")
    });


    it("Should be able to get all surveys", async () => {
        await request(app).post("/surveys").send({
            title: "Title Example2",
            description: "Description Example2"
        });
        // atribuindo a response todos os dados que há em database.test.sqlite
        const response = await request(app).get("/surveys");

        // espera-se que a lista de surveys tenha um total de 2 items
        expect(response.body.length).toBe(2);
    })

})