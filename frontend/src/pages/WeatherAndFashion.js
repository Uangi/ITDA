import React, { useEffect, useState } from 'react';
import key from '../../apikey.js';
import axios from 'axios';

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
    '파주': 'paju'
};

const WeatherAndFashion = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState('Seoul');
    const [fashionData, setFashionData] = useState([]);

    useEffect(() => {
        const convertTime = () => {
            const now = new Date();
            const month = now.getMonth() + 1;
            const date = now.getDate();
            return `${month}월 ${date}일 `;
        };

        const fetchWeatherData = async () => {
            try {
                const WEATHER_API_KEY = key.WEATHER_API_KEY;
                const cityNameInEnglish = cityNamesMap[cityName] || cityName;
                const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameInEnglish},kr&appid=${WEATHER_API_KEY}`);
                setWeatherData(weatherResponse.data);
                await axios.get("http://localhost:4000/csvToDatabase", {withCredentials : true});
            } catch (error) {
                console.error('Error fetching weather data:', error);
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

    const handleFashionButtonClick = async () => {
        try {
            await getFashionData();
        } catch (error) {
            console.error('Error fetching fashion data:', error);
        }
    };

    const getFashionData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/fashion");
            const filteredFashionData = response.data.filter((item, index) => index !== 0);
            // Remove double quotes from image URLs
            const formattedFashionData = filteredFashionData.map(item => ({
                ...item,
                image: item.image.replace(/"/g, ''),
                description: item.description.replace(/"/g, '')
            }));
            setFashionData(formattedFashionData);
        } catch (error) {
            console.error('Error fetching fashion data:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={cityName} onChange={(e) => setCityName(e.target.value)} placeholder="지역명을 입력해주세요" />
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
            <div>
                <button onClick={handleFashionButtonClick}>추천 데이트룩 조회</button>
            </div>
            <div>
                <h1>추천 패션 리스트</h1>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {fashionData.map((item, index) => (
                        <div key={index} style={{ marginRight: '20px' }}>
                            <h4>{item.description}</h4>
                            <img src={item.image} alt={item.description} width={150} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherAndFashion;
