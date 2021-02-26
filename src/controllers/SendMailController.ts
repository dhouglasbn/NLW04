import { Request, Response } from "express"
import { resolve } from 'path';
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import SendMailService from "../services/SendMailService";
import { AppError } from "../errors/AppError";

class SendMailController {

    async execute(request: Request, response: Response) {
        // coleta de dados da requisição (email e survey_id)
        const { email, survey_id } = request.body;

        // obtendo as tabelas de users, surveys e surveys_users
        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveysRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        // tentando encontrar um usuário pelo email
        const user = await usersRepository.findOne({email})


        // se a user retornar false (não encontrou o email), returna erro(400)
        if (!user) {
            throw new AppError("User does not exists!")
        }

        // tentando encontrar um survey pelo seu id
        const survey = await surveysRepository.findOne({id: survey_id})

        // se survey retornar false(não encontrou o id igual ao survey_id)
        // retorna erro(400)
        if(!survey) {
            throw new AppError("Survey does not exists!")
        }

        // obtendo o html de e-mail
        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")

        // verificando se há um surveyUser existente
        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: {user_id: user.id, value: null},
            relations: ["user", "survey"]
        });

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            id: "",
            link: process.env.URL_MAIL
        }

        if(surveyUserAlreadyExists) {
            variables.id = surveyUserAlreadyExists.id;
            await SendMailService.execute(email, survey.title, variables, npsPath);
            return response.json(surveyUserAlreadyExists);
        }

        // Salvar as informações na tabela surveys_users

        // atribuindo a surveyUser os dados de user_id e survey_id
        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        });

        // inserindo surveyUser na tabela surveys_users
        await surveysUsersRepository.save(surveyUser);

        variables.id = surveyUser.id;

        // Enviar e-mail para o usuário


        await SendMailService.execute(email, survey.title, variables, npsPath)

        return response.json(surveyUser);
    }
}

export { SendMailController }