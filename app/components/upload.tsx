'use client';

import { Button } from "@tremor/react";
import { useState, useRef } from "react";
import Papa from 'papaparse';
import { Subject, timer } from "rxjs";
import { delay, mergeAll, take, windowTime, map, concatMap } from 'rxjs/operators';

interface CustomerDTO {
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
}

const CSVUploader = () => {
    const [file, setFile] = useState(null);
    const [encoding, setEncoding] = useState('utf-8');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        // 获取文件编码格式
        const getFileEncoding = (file) => {
            const reader = new FileReader();
            reader.readAsArrayBuffer(file.slice(0, 4));
            reader.onload = (e) => {
                const buffer = e.target.result;
                const view = new DataView(buffer);
                const encoding = view.getUint8(0) === 0xEF && view.getUint8(1) === 0xBB && view.getUint8(2) === 0xBF ? 'utf-8' : 'gbk';
                console.log('文件编码格式:', encoding);
                return encoding;
            };
        };

        setEncoding(getFileEncoding(e.target.files[0]));
    };

    const handleDelAll = async () => {
        await fetch('features/customers/add', {method: 'GET'});
    }

    const handleFileUpload = async () => {
        if (!file) return;
        let buffer: CustomerDTO[] = [];
        let requestCounter = 0;
        let csv$ = new Subject<CustomerDTO[]>();
        // csv$.pipe(concatMap(value => timer(0, 1000).pipe(map(() => value))))
        csv$.pipe(concatMap(value => timer(1500).pipe(map(() => value))))
        .subscribe({async next(value) {
            await fetch('features/customers/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data:value}),
            }); 
            console.log(new Date(), value.length);
            
        },})
        Papa.parse(file, {
            worker: true,
            step: async function (res) {
                const row = res.data;

                const customerDto: CustomerDTO = {
                    company_name: row['公司名称'] || null,
                    operating_status: row['经营状态'] || null,
                    legal_representative: row['法定代表人'] || null,
                    registered_capital: row['注册资本'] || null,
                    paid_in_capital: row['实缴资本'] || null,
                    establishment_date: row['成立日期'] || null,
                    approval_date: row['核准日期'] || null,
                    business_term: row['营业期限'] || null,
                    province: row['所属省份'] || null,
                    city: row['所属城市'] || null,
                    district: row['所属区县'] || null,
                    unified_social_credit_code: row['统一社会信用代码'] || null,
                    taxpayer_identification_number: row['纳税人识别号'] || null,
                    registration_number: row['注册号'] || null,
                    organization_code: row['组织机构代码'] || null,
                    insured_number: row['参保人数'] || null,
                    company_type: row['公司类型'] || null,
                    industry: row['所属行业'] || null,
                    former_name: row['曾用名'] || null,
                    registered_address: row['注册地址'] || null,
                    latest_annual_report_address: row['最新年报地址'] || null,
                    website: row['网址'] || null,
                    phone: row['电话'] || null,
                    other_phone: row['其他电话'] || null,
                    email: row['邮箱'] || null,
                    other_email: row['其他邮箱'] || null,
                    business_scale: row['经营规模'] || null,
                    customer_type: row['客户合同'] || null,
                };

                buffer.push(customerDto);
                // console.log(buffer.length);
                // if (2 < buffer.length) {
                    csv$.next(buffer);
                    // 发送API请求
                    
                    // console.log();
                    // 重置计数器和缓冲区
                    buffer = [];
                // }

            },
            complete: () => {
                const currentTime = new Date();
                console.log('complete当前时间:', currentTime, buffer.length);
                if (buffer.length !== 0) { // 发送API请求
                    csv$.next(buffer);
                }
                csv$.complete(); // 关闭csv$流
            },
            header: true,
            encoding: encoding,
            skipEmptyLines: true,
            // dynamicTyping: true,
        });
    };


    return (
        <div>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <Button onClick={handleFileUpload}>Upload CSV</Button>
            {/* <p> </p>
            <Button onClick={handleDelAll}>DelAll</Button> */}
        </div>
    );
};

export default CSVUploader;