import React from 'react';

const PaymentItem = ({ item, index, onToggle, onDelete }) => {
    
    return (
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onToggle(index)}
            />
            <span>{index + 1}</span>
            <span>{item.diamonds} 개</span>
            <span>{item.price} 원</span>
            <button onClick={() => onDelete(index)} style={{ color: 'red', cursor: 'pointer' }}>삭제</button>
        </div>
    );
};

export default PaymentItem;