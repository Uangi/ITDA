import React, { useEffect, useState } from 'react';
import $ from 'jquery'; // jQuery가 실제로 필요한 경우에만 가져옵니다

const Append = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        // 현재 시간 가져오기
        const convertTime = () => {
            const now = new Date();
            const month = now.getMonth() + 1;
            const date = now.getDate();
            return `${month}월 ${date}일`;
            
        };

        const currentTime = convertTime();
        setCurrentTime(currentTime);

        // jQuery를 사용하여 현재 시간 추가
        $('.nowtime').text(currentTime);

        // OpenWeatherMap API를 통해 날씨 정보 가져오기
        $.getJSON('https://api.openweathermap.org/data/2.5/weather?q=Seoul,kr&appid=46b55a9f61cc588200575a3dda8e3069&units=metric',
            function (WeatherResult) {
                // 기온 정보 추가
                $('.SeoulNowtemp').text(`현재기온: ${WeatherResult.main.temp}`);
                $('.SeoulLowtemp').text(`최저기온: ${WeatherResult.main.temp_min}`);
                $('.SeoulHightemp').text(`최대기온: ${WeatherResult.main.temp_max}`);

                // 날씨 아이콘 추가
                const weatherIconUrl = `<img src="http://openweathermap.org/img/wn/${WeatherResult.weather[0].icon}.png" alt="${WeatherResult.weather[0].description}"/>`;
                $('.SeoulIcon').html(weatherIconUrl);
            });
    }, []); // useEffect의 두 번째 매개변수로 빈 배열을 전달하여 한 번만 실행되도록 합니다.

    return (
        <div>
            <span className="nowtime"></span>
            <span>현재날씨</span>
            <h3>경기도</h3>
            <h3 className="SeoulIcon"></h3>
            <h3 className="SeoulNowtemp">현재기온:</h3>
            <h3 className="SeoulLowtemp">최저기온:</h3>
            <h3 className="SeoulHightemp">최대기온:</h3>
        </div>
    );
};

export default Append;
