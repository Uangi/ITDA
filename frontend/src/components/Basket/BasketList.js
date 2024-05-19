import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasketItem from './BasketItem';
import address from '../../API_KEY'

const BasketList = () => {
    const [lists, setLists] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    let userNo;

    useEffect(() => {
        checkLoginStatus();
    }, []);
      
    const checkLoginStatus = async () => {
        try {
            const response = await axios.get(`${address.backendaddress}/users/logged-in`, { withCredentials: true });
            setIsLoggedIn(response.data);
            userNo = response.data.userNo;
            if (response.data) {
                fetchData(); // 사용자가 로그인되어 있을 때만 fetchData 호출
            }
        } catch (error) {
            console.error('로그인 상태 확인 중 오류 발생:', error);
        }
    };
    
    const fetchData = async () => {
        
                await axios.post(`${address.backendaddress}/orderlist`,{ userNo : userNo },{
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                })
                .then(res => {
                    setLists(res.data);
                })
                .catch(error => {
                    setLists([]);
                });
        };

    return (
        <div style={{ width: '80%', margin: 'auto', marginTop: '50px', textAlign: 'center' }}>
            <h2>{isLoggedIn.userName}님의 Order List</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderBottom: '2px solid black', padding: '10px' }}>
                <div style={{width:'20%'}}>Order Number</div>
                <div style={{width:'30%'}}>DIA Qty</div>
                <div style={{width:'40%'}}>Date</div>
                <div style={{width:'20%'}}>Price</div>
            </div>
            {lists.length === 0 ? (
                <div style={{fontSize:'35px',margin:'20px 0'}}>비어있습니다</div>
            ) : (
                lists.map((item, index) => (
                    <BasketItem key={index} item={item} />
                ))
            )}
            <button onClick={() => window.location.href='/'} style={{ margin: '20px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>돌아가기</button>
        </div>
    );
};

export default BasketList;