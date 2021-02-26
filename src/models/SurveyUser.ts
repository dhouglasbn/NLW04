// imports de ferramentas do typeorm e do formato v4 de uuid
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Survey } from "./Survey";
import { User } from "./User";

// classe de entidaade no formato da tabela surveys
@Entity("surveys_users")
class SurveyUser {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({name:"user_id"})
    user: User

    @Column()
    survey_id: string;
        
    @ManyToOne(() => Survey)
    @JoinColumn({name:"survey_id"})
    survey: Survey

    @Column()
    value: number

    @CreateDateColumn()
    created_at: Date;

    // verificando se há um id no formato uuid
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { SurveyUser }