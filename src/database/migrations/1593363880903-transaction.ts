import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class transaction1593363880903 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> { 
        await queryRunner.createTable(new Table({
            name:'transactions',
            columns:[{
                name: 'id',
                type: 'uuid', 
                isPrimary:true,
                generationStrategy:'uuid',
                default: 'uuid_generate_v4()'
            },{
                name: 'title', 
                type: 'varchar', 
            },{
                name: 'type', 
                type: 'varchar', 
            },{
                name: 'value', 
                type: 'numeric', 
            },{
                name: 'category_id', 
                type: 'uuid', 
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

        await queryRunner.createForeignKey('transactions', new TableForeignKey({
            name:'FK_CATEGORY_ID',
            columnNames:['category_id'], 
            referencedColumnNames: ['id'],
            referencedTableName: 'categories',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.dropTable('transactions')
    }

}
