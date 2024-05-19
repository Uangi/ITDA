import React, { useState } from 'react';
import { FaWindowClose } from "react-icons/fa";
import './UserModal.css';
import MeetRequest from './MeetRequest';

const calculateAge = (birthYear) => {
    const currentYear = new Date().getFullYear();
    const yearString = birthYear.toString();
    const shortenedYear = parseInt(yearString.substring(0, 2));
    return currentYear - (parseInt(shortenedYear) + 1900);
};

const UserModal = ({ selUser, onClose }) => {
    const [showMeetRequestModal, setShowMeetRequestModal] = useState(false);
    const [requestButtonText, setRequestButtonText] = useState('데이트 신청하기');

    const handleMeetRequest = () => {
        setShowMeetRequestModal(true);
        setRequestButtonText('요청창 닫기');
    };

    const handleCancelRequest = () => {
        setShowMeetRequestModal(false);
        setRequestButtonText('데이트 신청하기');
    };

    return (
        <div className='Modal'>
            <div className='bg'></div>
            <div className='popup'>
                <img src={'./profile/' + selUser.userProfile} alt='Profile' width='400px' height='auto' />
                <h2>{selUser.userName}</h2>
                <p>#{calculateAge(selUser.userAge)}살 #{selUser.userAddress} #{selUser.userMBTI}</p>
                <span><button style={{backgroundColor:'transparent',border:'none'}} onClick={onClose}><FaWindowClose  style={{color:'white', fontSize:'30px'}}/></button></span>
                {showMeetRequestModal && (
                <div className="MeetRequestModal">
                    <MeetRequest selUser={selUser} />
                </div>
            )}
                <div>
                    {showMeetRequestModal ? (
                        <button className="button" onClick={handleCancelRequest}>{requestButtonText}</button>
                    ) : (
                        <button className="button" onClick={handleMeetRequest}>{requestButtonText}</button>
                    )}
                </div>
            </div>
         
        </div>
    );
};

export default UserModal;
