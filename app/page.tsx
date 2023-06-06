import { Card, Title, Text, Button } from '@tremor/react';
import { queryBuilder } from '../lib/planetscale';
import AMapWrapper from './components/amap';
import Search from './components/search';
import CustomersTable from './components/table';
import CSVUploader from './components/upload';
import { getCustomers } from './services/customerServer';
import { sql } from "@vercel/postgres";

export const dynamic = 'force-dynamic';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const customers = await getCustomers(search);
  // const { rows } = await sql`SELECT * from users where email=${search}`;


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>销售机会</Title>
      <CSVUploader />
      {/* <Button onClick={uploadCsvFile('app/test.csv')}>csv</Button> */}

      <Search />
      <Card className="mt-6">
        {/* @ts-expect-error Server Component */}
        <CustomersTable customers={customers} />
        {/* <div className="mt-6 p-4 h-screen"><AMapWrapper customers={customers} /></div> */}
        {/* <div>
          {rows.map((row) => (
            <div key={row.id}>
              {row.id} - {row.quantity}
            </div>
          ))}
        </div> */}
      </Card>


    </main>
  );
}
