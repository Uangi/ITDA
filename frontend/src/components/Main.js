import React, { useRef, useEffect } from 'react';
import './Main.css'; // CSS 파일을 import 합니다.

const Main = () => {
  const slideshowRef = useRef(null);

  useEffect(() => {
    // 이미지 슬라이드 쇼 설정
    const images = ['./image/show2.png', './image/show3.png', './image/show4.png', './image/show5.png', './image/show6.png'];
    const displayTimes = [2500,2500,2500,3500, 4000]; // 각 이미지에 대한 노출 시간 (밀리초)
    let currentImageIndex = 0;

    const showNextImage = () => {
      if (slideshowRef.current) {
        slideshowRef.current.src = images[currentImageIndex];
        currentImageIndex = (currentImageIndex + 1) % images.length;
        setTimeout(showNextImage, displayTimes[currentImageIndex]);
      }
    };

    // 첫 번째 이미지 표시
    slideshowRef.current.src = images[currentImageIndex];

    // 다음 이미지 표시 스케줄링
    setTimeout(showNextImage, displayTimes[currentImageIndex]);

    return () => clearTimeout(); // 컴포넌트가 언마운트될 때 clearTimeout 호출하여 메모리 누수 방지
  }, []);

  return (
    <div className="main-background"> {/* 슬라이드 쇼를 배경으로 설정하는 div 요소 */}
     
        {/* 동영상을 배치합니다 */}
        <div className="video-container">
          <video className="bg-video" src="./image/itda.mp4" type="video/mp4" autoPlay muted loop />
        </div>
        {/* 이미지 슬라이드 쇼를 배치합니다 */}
        <div style={{justifyContent:'center'}} className="image-slideshow">
          <img ref={slideshowRef} alt="Slide" />
        </div>
      
    </div>
  );
};

export default Main;
