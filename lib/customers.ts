import { sql } from "kysely";
import { queryBuilder, Customer } from "./planetscale";

export async function removeAll() {
    await queryBuilder.deleteFrom('customers').execute();
}

export async function batchAdd(customers: Customer[]) {

    // 多行存入，参考代码
    console.log('customers batch add');
    
    const insertObjects = customers.map((customer) => ({
        company_name: customer.company_name,
        created_at: new Date(),
        updated_at: new Date(),
        operating_status: customer.operating_status,
        legal_representative: customer.legal_representative,
        registered_capital: customer.registered_capital,
        paid_in_capital: customer.paid_in_capital,
        establishment_date: customer.establishment_date,
        approval_date: customer.approval_date,
        business_term: customer.business_term,
        province: customer.province,
        city: customer.city,
        district: customer.district,
        unified_social_credit_code: customer.unified_social_credit_code,
        taxpayer_identification_number: customer.taxpayer_identification_number,
        registration_number: customer.registration_number,
        organization_code: customer.organization_code,
        insured_number: customer.insured_number,
        company_type: customer.company_type,
        industry: customer.industry,
        former_name: customer.former_name,
        registered_address: customer.registered_address,
        latest_annual_report_address: customer.latest_annual_report_address,
        website: customer.website,
        phone: customer.phone,
        other_phone: customer.other_phone,
        email: customer.email,
        other_email: customer.other_email,
        business_scale: customer.business_scale,
        customer_type: customer.customer_type,
        geo_vector: customer.geo_vector,
    }));

    await queryBuilder
        .insertInto('customers')
        .values(insertObjects).execute();

        // .onDuplicateKeyUpdate({
        //     company_name: sql`VALUES(company_name)`,
        //     operating_status: sql`VALUES(operating_status)`,
        //     legal_representative: sql`VALUES(legal_representative)`,
        //     registered_capital: sql`VALUES(registered_capital)`,
        //     paid_in_capital: sql`VALUES(paid_in_capital)`,
        //     establishment_date: sql`VALUES(establishment_date)`,
        //     approval_date: sql`VALUES(approval_date)`,
        //     business_term: sql`VALUES(business_term)`,
        //     province: sql`VALUES(province)`,
        //     city: sql`VALUES(city)`,
        //     district: sql`VALUES(district)`,
        //     unified_social_credit_code: sql`VALUES(unified_social_credit_code)`,
        //     taxpayer_identification_number: sql`VALUES(taxpayer_identification_number)`,
        //     registration_number: sql`VALUES(registration_number)`,
        //     organization_code: sql`VALUES(organization_code)`,
        //     insured_number: sql`VALUES(insured_number)`,
        //     company_type: sql`VALUES(company_type)`,
        //     industry: sql`VALUES(industry)`,
        //     former_name: sql`VALUES(former_name)`,
        //     registered_address: sql`VALUES(registered_address)`,
        //     latest_annual_report_address: sql`VALUES(latest_annual_report_address)`,
        //     website: sql`VALUES(website)`,
        //     phone: sql`VALUES(phone)`,
        //     other_phone: sql`VALUES(other_phone)`,
        //     email: sql`VALUES(email)`,
        //     other_email: sql`VALUES(other_email)`,
        //     business_scale: sql`VALUES(business_scale)`,
        //     customer_type: sql`VALUES(customer_type)`,
        //     geo_vector: sql`VALUES(geo_vector)`
        // })

        // .execute();
}