import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Append = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [weatherData, setWeatherData] = useState(null);

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
                sendDataToServer(weatherData); // 서버에 데이터 전송
            } catch (error) {
                console.error('날씨 정보를 가져오는 중 오류 발생:', error);
            }
        };

        const sendDataToServer = async (weatherData) => {
            try {
                const dataToSend = {
                    nowtemp: weatherData.main.temp,
                    hightemp: weatherData.main.temp_max,
                    lowtemp: weatherData.main.temp_min
                };
                const serverResponse = await axios.post('http://localhost:8081/weat', dataToSend);
                console.log('서버 응답:', serverResponse);
            } catch (error) {
                console.error('서버에 데이터를 전송하는 중 오류 발생:', error);
            }
        };

        const currentTime = convertTime();
        setCurrentTime(currentTime);

        fetchWeatherData(); // 날씨 정보 가져오기
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
