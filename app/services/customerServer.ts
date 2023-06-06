import 'server-only'
import { queryBuilder } from '../../lib/planetscale';

export async function getCustomers(search: string) {
  let customers = await queryBuilder
  .selectFrom('customers')
  .select([
    'id',
    'company_name',
    'operating_status',
    'legal_representative',
    'registered_capital',
    'paid_in_capital',
    'establishment_date',
    'approval_date',
    'business_term',
    'province',
    'city',
    'district',
    'unified_social_credit_code',
    'taxpayer_identification_number',
    'registration_number',
    'organization_code',
    'insured_number',
    'company_type',
    'industry',
    'former_name',
    'registered_address',
    'latest_annual_report_address',
    'website',
    'phone',
    'other_phone',
    'email',
    'other_email',
    'business_scale',
    'customer_type',
    'geo_vector',
  ])
  .where('company_name', 'like', `%${search}%`)
  .execute();

  let final_customers: Customer[] = customers;

  final_customers.forEach(customer => {
    if (customer.geo_vector) {
      let geo_vector = customer.geo_vector.split(',');
  
      customer.position = {
        longitude: parseFloat(geo_vector[0]),
        latitude: parseFloat(geo_vector[1]),
      };
    } else {
      // Optionally, set a default value for customer.position
      customer.position = null;
    }
  });

  return final_customers;
}

// 导入csv文件并将客户信息存储到customers表
import fs from 'fs/promises';
// import { Blob } from 'buffer';

interface Customer {
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
  position: {longitude:number,latitude:number} | null;
  created_at: Date;
  updated_at: Date;
  created_by: string | null;
  updated_by: string | null;
}


// export async function uploadCsvFile(filePath: string) {
//   // 读取文件内容
//   // const fileContent = fs.readFileSync(filePath);
//   const fileContent = await fs.readFile(filePath);
//   // 将文件内容转换为字符串
//   const csvData = fileContent.toString();

//   const parsedData = await parseCSV(csvData as string);

// }

// async function parseCSV(csvData: string) {

//   const lines = csvData?.split('\n');

//   const headers = lines[0].split(',');

//   // const data = [];

//   for (let i = 1; i < lines.length; i++) {

//     const row = lines[i].split(',');
//     // const record: any = {}; // 添加索引签名

//     // for (let j = 0; j < headers.length; j++) {

//     //   record[headers[j]] = row[j];

//     // }

//     console.log(row[0]);
//     const customer: Customer = {
      
//         company_name:row[0],
//         operating_status:row[1],
//         legal_representative:row[2],
//         registered_capital:row[3],
//         paid_in_capital: row[4],
//         establishment_date:row[5],
//         approval_date:row[6],
//         business_term:row[7],
//         province:row[8],
//         city:row[9],
//         district:row[10],
//         unified_social_credit_code:row[11],
//         taxpayer_identification_number:row[12],
//         registration_number:row[13],
//         organization_code:row[14],
//         insured_number:row[15],
//         company_type: row[16],
//         industry:row[17],
//         former_name:row[18],
//         registered_address: row[19],
//         latest_annual_report_address:row[20],
//         website: row[21],
//         phone:row[22],
//         other_phone:row[23],
//         email:row[24],
//         other_email:row[25],
  
//     };

//     await queryBuilder
//       .insertInto('customers')
//       .values(customer)
//       .execute();

//   }

//   // return data;

// }

// export async function uploadCsvFile(filePath: string) {

//   const file = filePath;

//   const reader = new FileReader();

//   reader.onload = function (e) {

//     const csvData = e.target?.result;

//     const parsedData = await parseCSV(csvData as string);

//     // 在这里发送解析后的数据到后端 API


//   };

//   reader.readAsText(file);

//   // 遍历每行客户信息
//   // for await (const record of parser) {
//   //   // 插入客户信息到customers表
//   //   await queryBuilder
//   //     .insertInto('customers')
//   //     .columns([
//   //       'company_name',
//   //       'operating_status',
//   //       'legal_representative',
//   //       'registered_capital',
//   //       'paid_in_capital',
//   //       'establishment_date',
//   //       'approval_date',
//   //       'business_term',
//   //       'province',
//   //       'city',
//   //       'district',
//   //       'unified_social_credit_code',
//   //       'taxpayer_identification_number',
//   //       'registration_number',
//   //       'organization_code',
//   //       'insured_number',
//   //       'company_type',
//   //       'industry',
//   //       'former_name',
//   //       'registered_address',
//   //       'latest_annual_report_address',
//   //       'website',
//   //       'phone',
//   //       'other_phone',
//   //       'email',
//   //       'other_email',
//   //     ])
//   //     .values([
//   //       record.公司名称,
//   //       record.经营状态,
//   //       record.法定代表人,
//   //       record.注册资本,
//   //       record.实缴资本,
//   //       record.成立日期,
//   //       record.核准日期,
//   //       record.营业期限,
//   //       record.所属省份,
//   //       record.所属城市,
//   //       record.所属区县,
//   //       record.统一社会信用代码,
//   //       record.纳税人识别号,
//   //       record.注册号,
//   //       record.组织机构代码,
//   //       record.参保人数,
//   //       record.公司类型,
//   //       record.所属行业,
//   //       record.曾用名,
//   //       record.注册地址,
//   //       record.最新年报地址,
//   //       record.网址,
//   //       record.电话,
//   //       record.其他电话,
//   //       record.邮箱,
//   //       record.其他邮箱,
//   //     ])
//   //     .execute();
//   // }
//   // 多行存入，参考代码
//   // for await (const record of parser) {
//   //   await queryBuilder
//   //     .insertInto('customers')
//   //     .values([
//   //       record.公司名称,
//   //       record.经营状态,
//   //       record.法定代表人,
//   //       record.注册资本,
//   //       record.实缴资本,
//   //       record.成立日期,
//   //       record.核准日期,
//   //       record.营业期限,
//   //       record.所属省份,
//   //       record.所属城市,
//   //       record.所属区县,
//   //       record.统一社会信用代码,
//   //       record.纳税人识别号,
//   //       record.注册号,
//   //       record.组织机构代码,
//   //       record.参保人数,
//   //       record.公司类型,
//   //       record.所属行业,
//   //       record.曾用名,
//   //       record.注册地址,
//   //       record.最新年报地址,
//   //       record.网址,
//   //       record.电话,
//   //       record.其他电话,
//   //       record.邮箱,
//   //       record.其他邮箱,
//   //     ])
//   //     .onDuplicateKeyUpdate(({ fn: { values } }) => ({
//   //       company_name: values('company_name'),
//   //       operating_status: values('operating_status'),
//   //       legal_representative: values('legal_representative'),
//   //       registered_capital: values('registered_capital'),
//   //       paid_in_capital: values('paid_in_capital'),
//   //       establishment_date: values('establishment_date'),
//   //       approval_date: values('approval_date'),
//   //       business_term: values('business_term'),
//   //       province: values('province'),
//   //       city: values('city'),
//   //       district: values('district'),
//   //       unified_social_credit_code: values('unified_social_credit_code'),
//   //       taxpayer_identification_number: values('taxpayer_identification_number'),
//   //       registration_number: values('registration_number'),
//   //       organization_code: values('organization_code'),
//   //       insured_number: values('insured_number'),
//   //       company_type: values('company_type'),
//   //       industry: values('industry'),
//   //       former_name: values('former_name'),
//   //       registered_address: values('registered_address'),
//   //       latest_annual_report_address: values('latest_annual_report_address'),
//   //       website: values('website'),
//   //       phone: values('phone'),
//   //       other_phone: values('other_phone'),
//   //       email: values('email'),
//   //       other_email: values('other_email'),
//   //     }))
//   //     .execute();
//   // }
// }