// import 'server-only';
import { Generated, Kysely } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';

// import { PlanetScaleDialect } from 'kysely-planetscale';

// interface User {
//   id: Generated<number>;
//   name: string;
//   username: string;
//   email: string;
// }

export interface Customer {
  id: Generated<number>;
  company_name: string;
  operating_status: string | null;
  legal_representative: string | null;
  registered_capital: string | null;
  paid_in_capital: string | null;
  establishment_date: string | null;
  approval_date: string | null;
  business_term: string | null;
  province: string | null;
  city: string | null;
  district: string | null;
  unified_social_credit_code: string | null;
  taxpayer_identification_number: string | null;
  registration_number: string | null;
  organization_code: string | null;
  insured_number: string | null;
  company_type: string | null;
  industry: string | null;
  former_name: string | null;
  registered_address: string | null;
  latest_annual_report_address: string | null;
  website: string | null;
  phone: string | null;
  other_phone: string | null;
  email: string | null;
  other_email: string | null;
  business_scale: string | null;
  customer_type: string | null;
  geo_vector: string | null;
  created_at: Date;
  updated_at: Date;
  created_by: string | null;
  updated_by: string | null;
}

// interface User {
//   id: Generated<number>;
//   name: string;
//   username: string;
//   email: string;
//   password: string;
//   created_at: Date;
//   updated_at: Date;
// }

interface Database {
  customers: Customer;
  // users: User;
  // https://github.com/nextauthjs/next-auth/issues/4922
}

// export const queryBuilder = new Kysely<Database>({
//   dialect: new PlanetScaleDialect({
//     url: process.env.DATABASE_URL
//   })
// });

export const queryBuilder = createKysely<Database>();