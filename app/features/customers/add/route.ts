import { NextResponse } from 'next/server';
import { batchAdd, removeAll } from '../../../../lib/customers';
import { Customer } from '../../../../lib/planetscale';

interface reqWithCuntor {
    data: Customer[];
}

async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function POST(request: Request) {
    let req: reqWithCuntor = await request.json();

    // 对地址进行地址信息编码并存储
    // fetch()
    for await (const iterator of req.data) {
        if (iterator.geo_vector === '' || iterator.geo_vector === undefined) {
            const address = iterator.registered_address;

            if (address && address !== '-') {
                // 对address进行url编码
                const encodedAddress = encodeURIComponent(address);

                let req_url = `https://restapi.amap.com/v3/geocode/geo?address=${encodedAddress}&output=JSON&key=${process.env.AMAP_AK}`;

                // let req_url = `https://restapi.amap.com/v3/geocode/geo?address=${address}&output=JSON&key=${process.env.AMAP_AK}`;
                console.log(req_url);

                let geo = await (await fetch(req_url)).json();

                if (geo.status === '1' && geo.geocodes && geo.geocodes.length > 0) {
                    console.log(geo.geocodes[0].location);
                    iterator.geo_vector = geo.geocodes[0].location;
                    // 添加延迟
                    await delay(200); // 延迟 200 毫秒
                } else {
                    console.error('无法获取地理编码信息', geo);
                    await delay(200); // 延迟 200 毫秒
                    geo = await (await fetch(req_url)).json();
                    if (geo.status === '1' && geo.geocodes && geo.geocodes.length > 0) {
                        console.log(geo.geocodes[0].location);
                        iterator.geo_vector = geo.geocodes[0].location;
                        // 添加延迟
                        await delay(200); // 延迟 200 毫秒
                    } else iterator.geo_vector = '115.710262,37.600302'; // 华强丝网
                }
            } else iterator.geo_vector = '115.710262,37.600302'; // 华强丝网
        }
    }

    console.log(req.data.length);
    await batchAdd(req.data);


    return NextResponse.json({ data: 'ok' });
}

export async function GET() {
    await removeAll();
    return NextResponse.json({ data: 'alert' });
}