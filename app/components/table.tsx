import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

interface Customer {
  id: number;
  company_name: string;
  customer_type: string;
  business_scale: string;
  geo_vector: string;
}

export default async function CustomersTable({ customers }: { customers: Customer[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>公司名</TableHeaderCell>
          <TableHeaderCell>类型</TableHeaderCell>
          <TableHeaderCell>规模</TableHeaderCell>
          <TableHeaderCell>geo</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {customers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.company_name}</TableCell>
            <TableCell>
              <Text>{customer.customer_type}</Text>
            </TableCell>
            <TableCell>
              <Text>{customer.business_scale}</Text>
            </TableCell>
            <TableCell>
              <Text>{customer.geo_vector}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
