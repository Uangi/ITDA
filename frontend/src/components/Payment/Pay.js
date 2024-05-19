import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentItem from './PaymentItem';
import address from '../../API_KEY'

const Pay = () => {
    const [lists, setLists] = useState([]);
    const [error, setError] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        checkLoginStatus();
      }, []);
      
      const checkLoginStatus = async () => {
        try {
          const response = await axios.get(`${address.backendaddress}/users/logged-in`, { withCredentials: true });
          setIsLoggedIn(response.data);
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };

    useEffect(() => {
        axios.get(`${address.backendaddress}/api/payList`, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setLists(response.data);
                }
            })
            .catch(error => {
                if (error.response) {
                    switch(error.response.status) {
                        case 400:
                            setError("사용자 ID가 제공되지 않았습니다.");
                            break;
                        case 404:
                            setError("주문 리스트를 찾을 수 없습니다.");
                            break;
                        case 500:
                            setError("서버 내부 오류가 발생했습니다.");
                            break;
                        default:
                            setError("알 수 없는 오류가 발생했습니다.");
                    }
                } else {
                    setError("서버에 연결할 수 없습니다.");
                }
            });
    }, []);

    const handleToggle = index => {
        const newLists = lists.map((item, i) => {
            if (i === index) {
                return { ...item, checked: !item.checked };
            }
            return item;
        });
        setLists(newLists);
        calculateTotal(newLists);
    };

    const handleDelete = index => {
        const newLists = lists.filter((_, i) => i !== index);
        setLists(newLists);
        calculateTotal(newLists);
    };

    const calculateTotal = (items) => {
        const total = items.filter(item => item.checked).reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    };

    const handlePayment = () => {

    };

    return (
        <div style={{ width: '80%', margin: 'auto' }}>
            <h2 style={{ textAlign: 'center' }}>주문 결제</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '2px solid black', padding: '10px' }}>
                <span>항목 체크</span>
                <span>순번</span>
                <span>다이아몬드 수량</span>
                <span>가격</span>
                <span>삭제</span>
            </div>
            {lists.map((item, index) => (
                <PaymentItem key={index} item={item} index={index} onToggle={handleToggle} onDelete={handleDelete} />
            ))}
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p>
            <span>합계 금액: {totalPrice} 원</span>
            </p>
                <div style={{ margin: '10px 0' }}>
                </div>
                <button onClick={handlePayment} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>결제하기</button>
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </div>
    );
};

export default Pay;