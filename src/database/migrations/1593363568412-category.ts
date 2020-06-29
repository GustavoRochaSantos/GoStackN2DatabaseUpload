import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class category1593363568412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'categories',
            columns: [{
                name: 'id',
                type: 'uuid',
                isPrimary:true,
                generationStrategy: "uuid",
                default: 'uuid_generate_v4()'
            },{
                name: 'title',
                type: 'varchar'
            },{
                name: 'created_at', 
                type: 'timestamp with time zone', 
                default: 'now()'
            },{
                name: 'updated_at', 
                type: 'timestamp with time zone', 
                default: 'now()'
            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('categories')
    }

}
