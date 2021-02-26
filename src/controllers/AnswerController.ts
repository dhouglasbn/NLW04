import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';


class AnswerController {
    // http://localhost:3333/answers/10?u=50c10d70-88ed-4ec3-801c-1bf138db8dcb:

    async execute(request: Request, response: Response) {
        // obtendo dados de value e u
        const { value } = request.params;
        const { u } = request.query;

        // obtendo a tabela de surveys_users
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // tentando encontrar na tabela surveys_users uma surveyId com um id
        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        // caso retorne false o programa retorna erro
        if(!surveyUser) {
            throw new AppError("Survey User does not exists!")
        }

        // alterando valor da value de surveyUser
        surveyUser.value = Number(value);

        // salvando os dados no B.D
        await surveysUsersRepository.save(surveyUser);

        // resposta da requisição (status code:200)
        return response.status(200).json(surveyUser);

    }
}

export { AnswerController }