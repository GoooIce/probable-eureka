import 'server-only'
import { queryBuilder } from '../../../lib/planetscale';
export async function getUsers(search:string) {
    return await queryBuilder
      .selectFrom('users')
      .select(['id', 'name', 'username', 'email'])
      .where('name', 'like', `%${search}%`)
      .execute();
  }
  