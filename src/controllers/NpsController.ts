import { Request, Response } from "express"
import { getCustomRepository, Not, IsNull } from "typeorm"
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository"

/**
 * 
 * 1 2 3 4 5 6 7 8 9 10
 * 
 * Detratores => 0 - 6
 * Passivos => 7 - 8
 * Promotores => 9 - 10
 * 
 * (( Número de promotores - números de detratores ) / (número de respondentes)) * 100
 */



class NpsController {
    async execute(request: Request, response: Response) {

        // obtendo o survey id nos params
        const { survey_id } = request.params;

        // obtendo a tabela surveys_users
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // encontrando em surveys_users a survey_id da requisição
        const surveysUsers = await surveysUsersRepository.find({
            survey_id,
            value: Not(IsNull())
        });

        // filter percorre uma array de um a um item atribuindo por meio de uma arrow function

        // obtendo os detratores
        const detractors = surveysUsers.filter(
            survey => survey.value >= 0 && survey.value <= 6).length

        // obtendo os promotores
        const promoters = surveysUsers.filter(
            survey => survey.value >= 9 && survey.value <= 10).length

        // obtendo os passivos
        const passive = surveysUsers.filter(
            survey => survey.value >= 7 && survey.value <= 8).length

        // obtendo o total de usuários
        const totalAnswers = surveysUsers.length;

        // cálculo de NPS
        const calculate = Number((((promoters - detractors) / totalAnswers) * 100).toFixed(2))

        // retornando todos os dados de detratores, promotores, passivos, total de respostas e NPS
        return response.json({
            detractors,
            promoters,
            passive,
            totalAnswers,
            nps: calculate
        })
    }
}

export { NpsController }