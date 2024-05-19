import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import './UserModal.css';
import { PiSirenDuotone } from 'react-icons/pi';


const Report = ({selUser,onClose,report}) => {
    const [reportReason, setReportReason] = useState('');

    
    
    return (
        <div className='Modal'>
            <div className='bg'></div>
            <div className='popup'>
                <h2><PiSirenDuotone color='red'/> 사용자 신고 <PiSirenDuotone color='red'/></h2>
                <p className='reportInfo'>제목 : {selUser.title}</p>
                <p className='reportInfo'>내용 : {selUser.content} </p>
              <p className='reportInfo'>신고사유&nbsp;
                    <select id='reportReason' value={reportReason} onChange={(e) => setReportReason(e.target.value)}>
                        <option value="부적절한 표현">부적절한 표현</option>
                        <option value="비합리적인 발언">비합리적인 발언</option>
                        <option value="거짓 정보">거짓 정보</option>
                        <option value="선정적이거나 민감한 내용">선정적이거나 민감한 내용</option>
                        <option value="혐오를 조장하는 내용">혐오를 조장하는 내용</option>
                        <option value="무분별한 공격성">무분별한 공격성</option>
                        <option value="스팸 혹은 불필요한 정보">스팸 혹은 불필요한 정보</option>
                    </select>
                </p>
                <span><button style={{backgroundColor:'transparent',border:'none'}} onClick={onClose}><FaWindowClose  style={{color:'white', fontSize:'30px'}}/></button></span>
                <div>
                        <button className="button_red"  onClick={() => report({reportReason},selUser.title,selUser.content,selUser.writerId)}>사용자 신고하기</button>
                </div>
            </div>
         
        </div>
    );
};

export default Report;