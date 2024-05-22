import React, { useEffect, useState } from 'react';
import key from '../../apikey.js';
import axios from 'axios';
import address from '../../API_KEY';
import './WeatherAndFashion.css';
import './Weather.css';
import cityList from './CityNamesList.js';


const WeatherAndFashion = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [cityName, setCityName] = useState('');
    const [fashionData, setFashionData] = useState([]);
    const [fashionDataFetched, setFashionDataFetched] = useState(false);
    
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
                const cityNameInEnglish = cityList[cityName] || cityName;
                const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameInEnglish},kr&appid=${WEATHER_API_KEY}`);
                setWeatherData(weatherResponse.data);
            } catch (error) {
                // console.error('Error fetching weather data:', error);
            }
        };

        const currentTime = convertTime();
        setCurrentTime(currentTime);
        
        if (cityName.trim().length >= 2) {
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

    if (!fashionDataFetched) {

        try {
            const response = await axios.get(`${address.backendaddress}/api/fashion`);
            const filteredFashionData = response.data.filter((item, index) => index !== 0);
            // Remove double quotes from image URLs
            const formattedFashionData = filteredFashionData.map(item => ({
                ...item,
                image: item.image.replace(/"/g, ''),
                description: item.description.replace(/"/g, '')
            }));
            setFashionData(formattedFashionData);
            setFashionDataFetched(true);
        } catch (error) {
            console.error('Error fetching fashion data:', error);
        }
    }
    };

    return (
        
        <div style={{ margin: 'auto' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'center' }}>
    <div>
        <input type="text" value={cityName} className="weather_InputContainer" onChange={(e) => setCityName(e.target.value)} placeholder="지역명을 입력해주세요" />
    </div>
</form>

            
            {weatherData && (
                <div style={{textAlign: 'center'}}>
                <div class="cmp-cur-weather wbg wbg-type2 BGDB00">
                    <ul class="wrap-1">
                        <li class="w-icon w-temp no-w">
                            <span classNameName="hid">{currentTime}{cityName}의 기온 </span><span classNameName="wic DB00 large"></span>
                        </li>
		
			
		
	</ul>
	<ul class="wrap-2 no-underline">
		<li><span className="lbl ic-hm">현재 기온<small>&nbsp;</small></span><span className="val">{weatherData.main.temp}℃</span></li>
		
		<li><span className="lbl ic-wind">최저 기온<small>&nbsp;</small></span><span className="val">{weatherData.main.temp_min}℃</span></li>
		
		<li><span className="lbl rn-hr1 ic-rn">최대 기온</span><span className="val">{weatherData.main.temp_max}℃</span></li>
	</ul>
</div>

                </div>
            )}
            <div style={{ width: '80%', margin: 'auto', marginTop: '50px', textAlign: 'center' }}>
                <div>
                    <button onClick={handleFashionButtonClick} className='datalook_button'>STYLING</button>
                </div>
                <div>
                    <div style={{ display: 'flex',justifyContent:'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                        {fashionData.map((item, index) => (
                            <div key={index} style={{ marginRight: '20px', marginBottom: index % 4 === 3 ? '20px' : '0', width: '23%' }}>
                                <img src={item.image} alt={item.description} width={150} />
                                <h6 className='desc'>{item.description}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default WeatherAndFashion;
