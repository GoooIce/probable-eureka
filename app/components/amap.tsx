'use client';

import Image from "next/image";
import { useState } from "react";
import { Map, LngLat, Markers, Marker } from "react-amap";

interface Customer {
  company_name: string;
  legal_representative: string;
  phone: string;
  customer_type: string | null;
  position: {longitude:number,latitude:number} | null;
}


export default function AMapWrapper({customers}: {customers:Customer[]}) {
  let [_customers, _] = useState(customers);

  function renderMarkerLayout(extData: Customer){
    const styleC = {
      // background: `url('icons/marker-account-outline.svg')`,
      // backgroundSize: 'contain',
      // backgroundRepeat: 'no-repeat',
      // backgroundPosition: 'center',
      width: '30px',
      height: '40px',
      color: '#000',
      textAlign: 'center',
      lineHeight: '40px'
    }

    let icon_name = 'question';
    if(extData.customer_type) icon_name = 'check';

    return <div style={styleC}>{
      // https://www.iconarchive.com/show/material-map-icons-by-pictogrammers.html
      <Image src={`icons/marker-${icon_name}-outline.svg`} width={30} height={40} alt={`${extData.legal_representative} : ${extData.phone}`} />
    }</div>
  }

    return <><Map amapkey={process.env.AMAP_AK} center={[115.710262,37.600302]} >
      <Markers markers={_customers} render={renderMarkerLayout} useCluster={true}/>
      {/* {_customers.map((cu) => {
        return <Marker position={cu.position} />
      })} */}
    </Map></>;
    // return <Map amapkey="1f51664225485312077a07e58a673de9" />;
  }
  