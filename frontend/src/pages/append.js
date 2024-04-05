import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Append = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [data, setData] = useState([]);
    const [weatherData, setWeatherData] = useState(null);   // 보낼거

    const fetchData = async () => {
        try {
          const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&appid=46b55a9f61cc588200575a3dda8e3069&units=metric');
          setData(response.data.weather);
        } catch (error) {
          console.error('에러', error);
        }
      };
      
      const postDataToBackend = async (data) => {
        try {
          const response = await axios.post('http://localhost:8081/weat', data);
          setWeatherData(response.data);
        } catch (error) {
          console.error('에러', error);
        }
      };  

    useEffect(() => {
        const convertTime = () => {
            const now = new Date();
            const month = now.getMonth() + 1;
            const date = now.getDate();
            return `${month}월 ${date}일 `;
        };

        
        const fetchWeatherData = async () => {
            try {
                
                const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&appid=46b55a9f61cc588200575a3dda8e3069&units=metric');
                const weatherData = weatherResponse.data;
                setWeatherData(weatherData);
            } catch (error) {
                console.error('날씨 정보를 가져오는 중 오류 발생:', error);
            }
        };

        const sendDataToServer = async () => {
            try {
                const dataToSend = {
                    // 서버에 보낼 데이터 객체를 구성합니다.
                    // 예: { key1: value1, key2: value2, ... }
                    
                };
                const serverResponse = await axios.post('http://localhost:8081/weat', dataToSend);
                // 서버 응답에 따른 처리 로직 추가
                console.log('서버 응답:', serverResponse);
            } catch (error) {
                console.error('서버에 데이터를 전송하는 중 오류 발생:', error);
            }
            fetchData();
        };

        const currentTime = convertTime();
        setCurrentTime(currentTime);

        fetchWeatherData(); // 날씨 정보 가져오기
        sendDataToServer(); // 서버에 데이터 전송
    }, []);

    return (
        <div>
            <span className="nowtime">{currentTime}</span>
            <span>현재날씨</span>
            <h3>서울</h3>
            {weatherData && (
                <div>
                    <h3>{weatherData.weather[0].description}</h3>
                    <h3>현재기온: {weatherData.main.temp}</h3>
                    <h3>최저기온: {weatherData.main.temp_min}</h3>
                    <h3>최대기온: {weatherData.main.temp_max}</h3>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt={weatherData.weather[0].description}/>
                </div>
            )}
        </div>
    );
};

export default Append;
