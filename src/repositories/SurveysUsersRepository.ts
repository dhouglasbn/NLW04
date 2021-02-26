// imports das ferramentas typeorm e do modelo da tabela surveys_users

import { EntityRepository, Repository } from "typeorm";
import { SurveyUser } from "../models/SurveyUser";

@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {} // obtendo a tabela de surveys_users

export { SurveysUsersRepository };