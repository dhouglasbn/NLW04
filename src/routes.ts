import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveysController } from './controllers/SurveysController';
import { SendMailController } from './controllers/SendMailController';
import { AnswerController } from './controllers/AnswerController';
import { NpsController } from './controllers/NpsController';

// imports dos controllers

const router = Router();

// instanciando as classes dos controllers
const userController = new UserController();
const surveyController = new SurveysController();

const sendMailController = new SendMailController();

const answerController = new AnswerController();

const npsController = new NpsController();

router.post("/users", userController.create); // cadastro de usuário

router.post("/surveys", surveyController.create); // cadastro de pesquisa
router.get("/surveys", surveyController.show); // listagem de pesquisas

router.post("/sendMail", sendMailController.execute); // envio de email

router.get("/answers/:value", answerController.execute); // resposta da pesquisa

router.get("/nps/:survey_id", npsController.execute); // cálculo de NPS



export { router };