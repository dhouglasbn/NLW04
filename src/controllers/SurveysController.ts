// imports de tipagens e recursos para acesso ao banco de dados
import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveysController {
    async create( request: Request, response: Response ) {
        const { title, description } = request.body; // coleta de dados da requisição

        const surveysRepository = getCustomRepository(SurveysRepository); // obtendo o modelo da estrutura de dados

        const survey = surveysRepository.create({
            title,
            description
        }); // inserindo dados da requisição no modelo

        await surveysRepository.save(survey); // salvando o modelo no banco de dados

        return response.status(201).json(survey); // retorno de protocolo 201 (criação dos dados na tabela)
    }

    async show(request: Request, response: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository); // obtendo o modelo da estrutura de dados

        const all = await surveysRepository.find(); // atribuindo a ALL toda uma lista da tabela surveys

        return response.json(all); // retornando uma json com toda a tabela de surveys
    }
}

export { SurveysController }