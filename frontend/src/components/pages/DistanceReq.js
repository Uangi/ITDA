import React, { useState, useEffect } from 'react';
import axios from 'axios';
import address from '../../API_KEY';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import { IoLocationSharp,IoDiamondOutline } from "react-icons/io5";

const DistanceReq = ({ user,setIsLoading }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [valueId, setValueId] = useState(user?.userNo || '');
    const [num, setNum] = useState(0);

    useEffect(() => {

        if (num === 0 || !user) {
            return;
        }

        if (valueId === '') {
            return;
        }

        distanceReq()

        function distanceReq(){

        axios.post(`${address.backendaddress}/testonelist`, { userNo: valueId }, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
        .then(res => {
            setData(res.data);
            // console.log(res.data);
            setLoading(false);
            setError('');
        })
        .catch(error => {
            setData({});
            setLoading(true);
            setError('데이터를 찾을 수 없습니다.');
        });

        

        }
        
    }, [num, user, valueId]);
    
    const search = () => {
        setIsLoading(true);
        setNum(num + 1);
        setTimeout(() => {
            setIsLoading(false); // 1초 후에 로딩 상태를 해제
        }, 1000);
    };

    return (
        <div style={{ width: '100%',textAlign: 'center' }}>
            {user ? (
                <>
                    <Form.Control
                        type="text"
                        name="userId"
                        value={valueId}
                        onChange={evt => setValueId(evt.target.value)}
                        disabled
                        style={{display:'none'}}
                    />
                    <br/>
                    <div>
                        {loading ? 
                                <Col style={{width:'100%'}}>
                                    <Card>
                                        <Card.Body>
                                            <Card.Title> <IoLocationSharp /> 가까운 동네 친구</Card.Title>
                                            <Card.Text>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                    : (
                            <Row xs={1} md={2} className="g-4">
                                {data && data.length > 0 ? (
                                    data.map((item, index) => (
                                        <Col key={index} align={'center'}>
                                            <Card style={{width:'80%', background:'pink'}}>
                                            <Card.Img style={{ width: 'auto', maxHeight: '400px', objectFit: 'contain', margin: '5%' }} variant="top" src={'./profile/' + item.user_Profile} />
                                                <Card.Body>
                                                    <Card.Title style={{fontSize:'30px', color:'white'}}>{item.user_id}</Card.Title>
                                                    <Card.Text style={{fontSize:'25px', color:'white'}}>
                                                        #{item.user_Address} #{item.distance}Km
                                                        <br />
                            {(() => {
                                // 나이 계산
                                let birth = parseInt(item.user_Age); // 출생일 (예: YYMMDD)
                                let birthYear = Math.floor(birth / 10000); // 출생 연도
                                let adjustedBirthYear = (birthYear > 30) ? 1900 + birthYear : 2000 + birthYear; // 2000년 이후 출생한 경우 보정
                                let today = new Date(); // 현재 날짜
                                let todayYear = today.getFullYear(); // 현재 연도
                                let age = todayYear - adjustedBirthYear + 1;
                                // 나이 출력
                                return `${age}살`;
                            })()} #{item.user_MBTI}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))
                                ) : (
                                    <Col style={{width:'100%'}}>
                                        <Card>
                                            <Card.Body>
                                                <Card.Text style={{color:'red'}}>
                                                    더 이상 요청할 수 없습니다.
                                                    <br/>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )}
                            </Row>
                        )}
                    </div>
                        <br/>
                            <Button style={{ background:'#cc99cc',borderColor:'white', width:'30%', height:'50px'}} onClick={search}>Near ITDA <IoDiamondOutline/> 30</Button>
                        <br/>
                    <p>{error}</p>
                </>
            ) : (
                <p>로그인이 필요한 페이지입니다.</p>
            )}
        </div>
    );
};

export default DistanceReq;
