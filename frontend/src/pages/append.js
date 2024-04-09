import React, { useEffect, useState } from 'react';
import axios from 'axios';
import key from '../apikey.js';
import maleData from '../fassion/maleData.js';
import femaleData from '../fassion/femaleData.js';
import { Link } from 'react-router-dom/cjs/react-router-dom.js';

const cityNamesMap = {
    '서울': 'Seoul',
    '부산': 'Busan',
    '인천': 'Incheon',
    '대구': 'Daegu',
    '대전': 'daejeon',
    '광주': 'gwangju',
    '울산': 'ulsan',
    '제주': 'jeju',
    '고양': 'goyang',
    '세종': 'sejong',
    '용인': 'yongin',
    '용산': 'yongsan',
    '파주': 'paju',


    // 추가 도시 매핑이 필요합니다.
};

const Append = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState('');


    useEffect(() => {
        const convertTime = () => {
            const now = new Date();
            const month = now.getMonth() + 1;
            const date = now.getDate();
            return `${month}월 ${date}일 `;
        };

        

        const fetchWeatherData = async () => {
            try {
                // 도시 이름을 영어로 변환합니다.
                const cityNameInEnglish = cityNamesMap[cityName] || cityName;
                const WEATHER_API_KEY = key.WEATHER_API_KEY;


                const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameInEnglish},kr&appid=${WEATHER_API_KEY}`);
                const weatherData = weatherResponse.data;
                setWeatherData(weatherData);
            } catch (error) {
                console.error('날씨 정보를 가져오는 중 오류 발생:', error);
            }
        };

        const currentTime = convertTime();
        setCurrentTime(currentTime);

        if (cityName.trim() !== '') {
            fetchWeatherData();
        }
    }, [cityName]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="지역명을 입력해주세요" />
                {/* <button type="submit">확인</button> */}
            </form>
            <span className="nowtime">{currentTime}</span>
            <span>현재날씨</span>
            <h3>{cityName}</h3>
            {weatherData && (
                <div>
                    <h3>{weatherData.weather[0].description}</h3>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description}/>
                    <h3>현재기온: {weatherData.main.temp}</h3>
                    <h3>최저기온: {weatherData.main.temp_min}</h3>
                    <h3>최대기온: {weatherData.main.temp_max}</h3>
                </div>
            )}
            <h1> 추천 패션 리스트</h1>
            {maleData.map((item) => (
                <div key = {item.id}>
                    <h1>
                        {item.name}
                    </h1>
                    <p>
                        <Link to = {`/clothes/${item.description}`}>
                            <img src = {item.photo} alt = "" width = {150}/>
                        </Link>
                    </p>
                </div>
            ))}
        </div>
        
    );
};

export default Append;
