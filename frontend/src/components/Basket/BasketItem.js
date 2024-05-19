import React from 'react';
import { IoDiamondOutline } from "react-icons/io5";

const Item = ({ item }) => {

    if (!item) {
        return <div style={{fontSize:'35px',margin:'20px 0'}}>비어있습니다</div>;
    }

    const {orderNumber,amount,price,purchaseTime} = item

    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '1px solid #ccc', padding: '10px' }}>
            <div style={{width:'20%'}}>{orderNumber}</div>
            <div style={{width:'30%'}}><IoDiamondOutline /> {amount}</div>
            <div style={{width:'40%'}}>{purchaseTime}</div>
            <div style={{width:'20%'}}>{price.toLocaleString()}원</div>
        </div>
    );
};

export default Item;