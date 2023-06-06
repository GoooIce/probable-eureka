// pages/api/import-csv.ts
import { Readable } from 'stream';
import { NextApiRequest, NextApiResponse } from 'next';
// import { addCustomer } from '../../app/services/customerServer';

// export const config = {
//   api: {
//     bodyParser: false,
//     // externalResolver: true,
//   },
// };

export const runtime = 'nodejs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const stream = new Readable().wrap(req);

    stream
      .pipe(csvParser({}))
      .on('data', async (customer) => {
        // await addCustomer(customer);
        console.log('data trans');
        
        console.log(customer);
      })
      .on('end', () => {
        res.status(200).json({ message: '数据已成功导入' });
        res.end()
      })
      .on('error', (error) => {
        res.status(500).json({ message: '处理CSV文件时发生错误', error });
        res.end()
      });
  } else {
    res.status(405).json({ message: '请求方法不允许' });
    res.end()
  }
  // res.end();
}