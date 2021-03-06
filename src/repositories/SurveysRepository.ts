// imports das ferramentas typeorm e do modelo da tabela survey
import { EntityRepository, Repository } from "typeorm";
import { Survey } from "../models/Survey";

@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey> {} // obtendo a tabela de survey

export { SurveysRepository };
