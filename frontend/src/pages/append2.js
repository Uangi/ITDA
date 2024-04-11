import React, { useEffect, useState } from 'react';
import axios from 'axios';
import key from '../apikey.js';
import maleData from '../fashion/maleData.js';
import femaleData from '../fashion/femaleData.js';
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

const Append2 = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState('');
    const [gender, setGender] = useState('male');
    const [fashionData, setFashionData] = useState(maleData);

    useEffect(() => {
        const convertTime = () => {
            const now = new Date();
            const month = now.getMonth() + 1;
            const date = now.getDate();
            return `${month}월 ${date}일 `;
        };

        const determineSeason = (temp) => {
            // 섭씨 기온으로 변환
            const celsiusTemp = temp - 273.15;
            if (celsiusTemp < 10) {
                return '겨울';
            } else if (celsiusTemp < 20) {
                return '봄/가을';
            } else {
                return '여름';
            }
        };
    
        const filteredFashionData = () => {
            const season = weatherData ? determineSeason(weatherData.main.temp) : null;
            const currentDateData = gender === 'male' ? maleData : femaleData;
    
            return currentDateData.filter(item => {
                const weatherDescription = weatherData.weather[0].description.toLowerCase();
                return item.season.includes(season) && (item.weather === weatherDescription || item.description2 === weatherDescription);
            });
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
        };
    
        // @@
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

    const handleGenderChange = (e) => {
        setGender(e.target.value);
        setFashionData(e.target.value === 'male' ? maleData : femaleData );
    }
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
            <h1> 추천 패션 리스트</h1>
            {fashionData.map((item) => (
    <div key={item.id}>
        <h4>{item.name}</h4>
        {item.description2 && weatherData.weather[0].description.toLowerCase().includes(item.description2) && (
            <p>
                <Link to={`/clothes/${item.description}`}>
                    <img src={item.photo} alt="" width={150}/>
                </Link>
            </p>
        )}
    </div>
))}
        </div>
        
    );
};

export default Append2;