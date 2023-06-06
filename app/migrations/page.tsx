import 'server-only';
import { Kysely } from 'kysely'
import {queryBuilder} from '../../lib/planetscale';

export async function up(db: Kysely<any>): Promise<void> {
  // await db.schema
  //   .createTable('person')
  //   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
  //   .addColumn('first_name', 'varchar(255)', (col) => col.notNull())
  //   .addColumn('last_name', 'varchar(255)')
  //   .addColumn('gender', 'varchar(50)', (col) => col.notNull())
  //   .execute()

  // await db.schema
  //   .createTable('pet')
  //   .addColumn('id', 'integer', (col) => col.autoIncrement().primaryKey())
  //   .addColumn('name', 'varchar(255)', (col) => col.notNull().unique())
  //   .addColumn('owner_id', 'integer', (col) => col.notNull())
  //   .addColumn('species', 'varchar(255)', (col) => col.notNull())
  //   .execute()

  // await db.schema
  //   .createIndex('pet_owner_id_index')
  //   .on('pet')
  //   .column('owner_id')
  //   .execute()
    // 创建 customers 表

}

export async function down(db: Kysely<any>): Promise<void> {
  // await db.schema.dropTable('person').execute()
  // await db.schema.dropTable('pet').execute()
  // await db.schema.dropTable('categories').execute()
  // await db.schema.dropTable('users').execute()
}

export default async function MigrationsPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const slug = searchParams.q ?? '';
  if('up' == slug) await up(queryBuilder);
  if('down' == slug) await down(queryBuilder);
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      finish {slug}
    </main>
  );
}
