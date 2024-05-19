import React, { useEffect, useState } from 'react';
import { IoDiamondOutline } from "react-icons/io5";
import axios from 'axios';
import './Charge.css';
import address from '../../API_KEY'
import ToggleButton from 'react-bootstrap/ToggleButton';

const Charge = () => {

    const [selectedOption, setSelectedOption] = useState(null);
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [response, setResponse] = useState(null);

      const identificationCode = 'imp86682148';
      const PGcode = 'kakaopay';
      const PGStoreID = 'TC0ONETIME';
      
      useEffect(() => {
        checkLoginStatus();
        const jquery = document.createElement("script");
        jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
        document.head.removeChild(jquery);
        document.head.removeChild(iamport);
        };
      }, []);

    var today = new Date();
    var hours = today.getHours(); // 시
    var minutes = today.getMinutes();  // 분
    var seconds = today.getSeconds();  // 초
    var milliseconds = today.getMilliseconds();
    var makeMerchantUid = `${hours}` + `${minutes}` + `${seconds}` + `${milliseconds}`;
    var purchasetime = new Intl.DateTimeFormat('kr',{dateStyle : 'long', timeStyle : 'medium'}).format(today);

    var IMP;

      useEffect(() => {
        IMP = window.IMP;
        if (response) {
          const user_email = response.data.userEmail;
          const username = response.data.userName;
      
          // 결제창 함수 넣어주기
          const buyButton = document.getElementById('payment');
          buyButton.onclick = () => {
            console.log(selectedOption)
            if (!selectedOption) {
              alert("다이아를 선택해 주세요.");
              return;
          }
          kakaoPay(user_email, username);
          }
        }
      }, [response,selectedOption]);

    function kakaoPay(useremail, username) {
        if (window.confirm(`다이아 : ${selectedOption.diamonds}개\n가격 : ${selectedOption.price}원\n구매 하시겠습니까?`)) { // 구매 클릭시 한번 더 확인하기
            if (response.data.userName) { // 회원만 결제 가능
                // const emoticonName = document.getElementById('title').innerText

                IMP.init(identificationCode); // 가맹점 식별코드
                IMP.request_pay({
                    pg: `${PGcode}.${PGStoreID}`, // PG사 코드표에서 선택
                    pay_method: 'card', // 결제 방식
                    merchant_uid: "ITDA" + makeMerchantUid, // 결제 고유 번호
                    name: '다이아', // 제품명
                    amount: selectedOption.price, // 가격
                    //구매자 정보 ↓
                    buyer_email: `${useremail}`,
                    buyer_name: `${username}`,
                    buyer_tel : response.data.userTel,
                    buyer_addr : response.data.userAddress
                    // buyer_postcode : 
                }, async function (rsp) { // callback
                    if (rsp.success) { //결제 성공시
                        console.log("유저넘버 : " + response.data.userNo);
                        console.log("구매항목 : " + rsp.name);
                        console.log("구매번호 : " + rsp.merchant_uid);
                        console.log("가격 : " + rsp.paid_amount);
                        console.log("구매일자 : " + purchasetime);
                        //결제 성공시 프로젝트 DB저장 요청
                        axios.post(`${address.backendaddress}/purchase`, {
                              userNo: response.data.userNo,
                              product: rsp.name,
                              orderNumber: rsp.merchant_uid,
                              price: rsp.paid_amount,
                              purchaseTime: purchasetime,
                              amount:selectedOption.diamonds
                            }, {
                              headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                            },
                        })
                        .then(res => {
                          console.log(res.data);
                          window.location.href='/basket'
                      })
                      .catch(error => {
                          console.error('Error sending purchase info:', error);
                      });

                        if (response.status === 200) { // DB저장 성공시
                            alert('결제 완료!')
                            // window.location.reload();
                        } else { // 결제완료 후 DB저장 실패시
                            alert(`error:[${response.status}]\n결제요청이 승인된 경우 관리자에게 문의바랍니다.`);
                            // DB저장 실패시 status에 따라 추가적인 작업 가능성
                        }
                    } else if (rsp.success === false) { // 결제 실패시
                        alert(rsp.error_msg)
                    }
                });
            }
            else { // 비회원 결제 불가
                alert('로그인이 필요합니다!')
            }
        } else { // 구매 확인 알림창 취소 클릭시 돌아가기
            return false;
        }
    }

      const checkLoginStatus = async () => {
        try {
          const response = await axios.get(`${address.backendaddress}/users/logged-in`, { withCredentials: true });
          // setIsLoggedIn(response.data);
          // console.log(response.data);
          setResponse(response);
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };

    const options = [
        { diamonds: 100, price: 1000 },
        { diamonds: 300, price: 2700 },
        { diamonds: 500, price: 4300 },
        { diamonds: 1000, price: 8000 }
    ];


    return (
      <div style={{ textAlign: 'center' }}>
            <h1 style={{ marginTop: '90px' }}>다이아 충전</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', maxWidth: '600px', margin: 'auto', marginTop: '50px', marginBottom:'50px' }}>
                {options.map((option, index) => (
                <div key={index} style={{ width: '130px',height:'220px',margin:'auto', border: '2px solid #ccc', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    
                    <IoDiamondOutline size="70px" color="#4A90E2" style={{marginTop:'15px',marginBottom:'30px'}}/>
                    <ToggleButton
                        key={index}
                        id={`radio-${index}`}
                        type="radio"
                        variant="outline-primary"
                        name="diamonds"
                        value={option.diamonds}
                        checked={selectedOption?.diamonds === option.diamonds}
                        onChange={() => setSelectedOption(option)}
                        style={{ marginTop: '10px' }}
                    >
                        {option.diamonds.toLocaleString()} 개
                    </ToggleButton>

                    <div style={{ fontSize: '18px', color: '#4A90E2', fontWeight: 'bold', marginTop: '10px' }}>₩ {option.price.toLocaleString()}</div>
                </div>
                ))}
            </div>
            <button id='payment' className='chargeButton' style={{ 
                border: 'none',
                color: 'white',
                padding: '15px 32px',
                textAlign: 'center',
                textDecoration: 'none',
                display: 'inline-block',
                fontSize: '16px',
                margin: '4px 2px',
                cursor: 'pointer',
                borderRadius: '10px',
                marginBottom : '50px'
            }}>
              <img src="./img/Kakaopay.png" alt="Payment Icon" style={{
                  width: 'auto',
                  height: '100%',
                  top: 0,
                  left: 0,
                  marginRight:'15px'
              }} />
              결제하기
            </button>
        </div>
    );
};

export default Charge;