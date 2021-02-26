import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

// definindo a estrutura dos dados que deve ser recebida na requisição
@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: Date;

    // verificação do formato uuid no id
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
    
}

export { User };