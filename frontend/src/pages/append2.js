import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import key from '../apikey.js';
import csvToDatabaseRequest from './gender/csvToDatabaseRequest.js'; // 새로운 파일 추가

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

const Append2 = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState('Seoul');
    const [gender, setGender] = useState('male');
    const [fashionData, setFashionData] = useState([]);
    const [csvDataToDB, setCsvDataToDB] = useState(null);
    const [isDataSaved, setIsDataSaved] = useState(false);

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
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };
        
        const getFashionData = async () => {
            try {
                const response = await axios.get('/api/fashion');
                const filteredFashionData = response.data.filter((item, index) => index !== 0);
                setFashionData(filteredFashionData);
            } catch (error) {
                console.error('Error fetching fashion data:', error);
            }
        };

        const currentTime = convertTime();
        setCurrentTime(currentTime);
        
        if (cityName.trim() !== '') {
            fetchWeatherData();
            getFashionData();
        }


    }, [cityName]);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleGenderChange = async (e) => {
        setGender(e.target.value);
        if (e.target.value === 'female') {
            try {
                const csvDataToDB = await csvToDatabaseRequest(); // 새로운 파일에서 가져온 함수 호출
                setCsvDataToDB(csvDataToDB);   // DB 상태 화면 단에 업데이트
            } catch (error) {
                console.error('Error fetching fashion data:', error);
            }
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
                <h2>
                    <label>
                        <input
                            type="radio"
                            value="male"
                            checked={gender === 'male'}
                            onChange={handleGenderChange}
                            
                        />
                        남자
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="female"
                            checked={gender === 'female'}
                            onChange={handleGenderChange}
                        />
                        여자
                    </label>
                </h2>
            </div>
            <h1>추천 패션 리스트</h1>
            

            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {fashionData.map((item, index) => (
                    <div key={index} style={{ marginRight: '20px' }}>
                        <h4>{item.subject.replace(/"/g, '')}</h4>
                        <img src={item.image.replace(/"/g, '')} alt={item.subject.replace(/"/g, '')} width={150} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Append2;
