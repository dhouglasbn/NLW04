import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUsers1614251682714 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"surveys_users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "survey_id",
                        type: "uuid"
                    },
                    {
                        name: "value",
                        type: "number",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                // foreign keys para referenciar ao banco de dados um tipo de dado que está em outra tabela

                foreignKeys: [
                    {
                        name: "FKUser", // nome
                        referencedTableName: "users", // tabela estrangeira
                        referencedColumnNames: ["id"], // coluna estrangeira
                        columnNames: ["user_id"], // coluna desta tabela
                        // Um usuário pode deletar sua conta e tudo o que está relacionado a ele deve ser deletado
                        // CASCADE é um bom metodo para deletar/alterar tudo que está relacionado a ele

                        onDelete: "CASCADE", 
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "FKSurvey", // nome
                        referencedTableName: "surveys", // tabela estrangeira
                        referencedColumnNames: ["id"], // coluna estrangeira
                        columnNames: ["survey_id"], // coluna desta tabela
                        // Um usuário pode deletar sua conta e tudo o que está relacionado a ele deve ser deletado
                        // CASCADE é um bom metodo para deletar/alterar tudo que está relacionado a ele
                        
                        onDelete: "CASCADE", 
                        onUpdate: "CASCADE"
                    }
                ]
            })
            // para essa estrutura teria-se de adaptar a droptable
            // deletar a foreign key, depois a tabela users
            
            // await queryRunner.createForeignKey
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys_users")
    }

}
