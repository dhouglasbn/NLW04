// imports de tipagens e recursos para acesso ao banco de dados
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from "../repositories/UsersRepository";
import * as yup from "yup";
import { AppError } from '../errors/AppError';

class UserController {
    
    async create(request: Request, response: Response) {
        const { name, email } = request.body; // dados da requisição

        // validação de dados

        const schema = yup.object().shape({
            name: yup.string().required("Name is required"),
            email: yup.string().email().required("Wrong Email")
        })

        // if(!(await schema.isValid(request.body))) {
        //     return response.status(400).json({
        //         error: "Validation Failed!"
        //     })
        // }

        try {
            await schema.validate(request.body, { abortEarly: false })
        } catch (err) {
            throw new AppError(err)           
        }

        const usersRepository = getCustomRepository(UsersRepository) // obtendo o modelo da estrutura de dados

        const userAlreadyExists = await usersRepository.findOne({
            email
        }); // coletando o email da requisição no banco de dados

        if(userAlreadyExists) {
            throw new AppError("User already exists!") // se ele encontrar o email => retorna erro
        } // se ele não encontrar segue o código

        const user = usersRepository.create({
            name, email
        }) // inserindo dados da requisição no modelo

        await usersRepository.save(user); // salvando a requisição no modelo de user

        return response.status(201).json(user); // retornando o json dos dados da requisição
    }
}

export { UserController };
