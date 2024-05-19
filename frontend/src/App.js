import "./App.css"
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import { Route,Redirect,useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Login from "./components/users/Login";
import UserList from "./components/users/UserList";
import { useState,useEffect } from "react";
import ReqList from "./components/users/ReqList";
import MeetSchedule from "./components/users/MeetSchedule";
import Board from "./components/users/Board";
import DistanceReq from "./components/pages/DistanceReq";
import Complete from "./components/pages/Complete";
import CreateUser from "./components/pages/CreateUser";
import ConditionsOfUse from "./components/FooterDescription/ConditionsOfUse";
import LocationServicePolicy from "./components/FooterDescription/LocationServicePolicy";
import PrivacyPolicy from "./components/FooterDescription/PrivacyPolicy";
import YouthProtectionPolicy from "./components/FooterDescription/YouthProtectionPolicy";
import Footer from "./components/Footer";
import Main from "./components/Main";
import address from './API_KEY'
import axios from 'axios';
import Loading from "./components/pages/Loading";
import Charge from "./components/Diamond/Charge";
import BasketList from "./components/Basket/BasketList";
import Pay from "./components/Payment/Pay";
import CSBoardList from "./components/CustomerService/CSBoardList";
import CSBoardWrite from "./components/CustomerService/CSBoardWrite";
import CSBoardDetail from "./components/CustomerService/CSBoardDetail";
import CSBoardEdit from "./components/CustomerService/CSBoardEdit";
import CSAnswerWrite from "./components/CustomerService/CSAnswerWrite";
import CSAnswerDetail from "./components/CustomerService/CSAnswerDetail";
import CSAnswerEdit from "./components/CustomerService/CSAnswerEdit";
import WeatherAndFashion from "./components/pages/WeatherAndFashion";



function App() {
  const location = useLocation();
  const [loggedInUser, setLoggedInUser] = useState(null);

  const [user, setUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUserData();
    }, [setUser,setIsLoading]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${address.backendaddress}/users/logged-in`, { withCredentials: true });
            setUser(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } 
    };

    const handleLogout = async () => {
        try {
            await axios.post(`${address.backendaddress}/logout`, null, { withCredentials: true });
            setUser(null);
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };


  return (
    <div style={{ minHeight: '100vh' }} className="font"> 
      <Header user={user} handleLogout={handleLogout} isLoading={isLoading}/>
      <Container style={{ minHeight: 'calc(100vh - 280px)' }}>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact render={() => <Main />} />
        <Route path="/users" exact render={() => <UserList loggedInUser={loggedInUser} />} />
        <Route path="/login" exact render={() => <Login setLoggedInUser={setLoggedInUser} />} />
        <Route path="/req_list" component={ReqList} />
        <Route path="/schedule" component={MeetSchedule} />
        <Route path="/board" component={Board} />
        <Route path="/distanceReq" exact render={() => <DistanceReq user={user} setIsLoading={setIsLoading} />} />
        <Route path="/createUser" exact render={() => <CreateUser user={user} setIsLoading={setIsLoading} />} />
        <Route path="/complete" exact component={Complete}/>

        <Route path="/charge" exact component={Charge}/>
        <Route path="/basket" exact component={BasketList}/>
        <Route path="/pay" exact component={Pay}/>

        {/* 고객센터 */}
        <Route path="/boardlist" exact component={CSBoardList}/>
        <Route path="/boardWrite" component={CSBoardWrite} />
        <Route path="/boardDetail/:boardNo" component={CSBoardDetail} />
        <Route path="/boardEdit/:boardNo" component={CSBoardEdit} />
        <Route path="/answerWrite/:boardNo" component={CSAnswerWrite} />
        <Route path="/answerDetail/:answerNo" component={CSAnswerDetail} />
        <Route path="/answerEdit/:answerNo" component={CSAnswerEdit} />

        {/* 날씨 */}
        <Route path="/WeatherAndFashion" exact component={WeatherAndFashion}/>

        {/* Footer 영역 SSR 고려 */}
        <Route path="/ConditionsOfUse" exact component={ConditionsOfUse}/>
        <Route path="/LocationServicePolicy" exact component={LocationServicePolicy}/>
        <Route path="/PrivacyPolicy" exact component={PrivacyPolicy}/>
        <Route path="/YouthProtectionPolicy" exact component={YouthProtectionPolicy}/>

      </Container>
      {isLoading && <Loading/>} {/* 로딩 중일 때만 Loading 컴포넌트를 렌더링 */}
      <Footer />
    </div>
  );
}

export default App;
