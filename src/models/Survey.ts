// imports de ferramentas do typeorm e do formato v4 de uuid
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid';

// classe de entidaade no formato da tabela surveys
@Entity("surveys")
class Survey {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    // verificando se há um id no formato uuid
    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { Survey }