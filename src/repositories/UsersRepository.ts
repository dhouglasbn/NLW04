// imports das ferramentas do typeorm e do modelo da tabela users
import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository(User)
class UsersRepository extends Repository<User> {} // obtendo a tabela de users

export { UsersRepository };
