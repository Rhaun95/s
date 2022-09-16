import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route,Routes} from 'react-router-dom'
import React from 'react'

//장호
import MovieHome from './pages/MovieHome';
import UpdateMovie from './admin/components/UpdateMovie';
import MovieApi from './pages/MovieApi';
import DetailMovie from './pages/DetailMovie';
import InsertMovie from './admin/components/InsertMovie';
import StoreHome from './pages/StoreHome';
import DetailStore from './pages/DetailStore';
import UpdateStore from './admin/components/UpdateStore';
import InsertStore from './admin/components/InsertStore';
import CinemaHome from './pages/CinemaHome';
import InsertCinema from './admin/components/InsertCinema';
import UpdateCinema from './admin/components/UpdateCinema';
import DetailCinema from './pages/DetailCinema';
import Register from './pages/Register';
import LoginForm from './components/LoginForm';



//관리자 페이지

import AdminHeader from './Header/AdminHeader';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminHomePage from './pages/AdminHomePage';

//수현
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";

import SeatForm from "./pages/basket/SeatForm";
import Booking from "./pages/basket/Booking";
import BookingHome from "./pages/basket/BookingHome";
import Basket from "./pages/basket/Basket";
import PaymentForm from "./pages/basket/PaymentForm";

import ThunderMap from "./pages/Thunder/ThunderMap";
import Thunder from "./pages/Thunder/Thunder";
import ThunderDetail from './pages/Thunder/ThunderDetail';
import ThunderInsert from './pages/Thunder/ThunderInsert';

import ThunderAdmin from './admin/pages/ThunderAdmin';

//서현

import Board from "./pages/Board/Board";
import BoardDetails from "./pages/Board/BoardDetails";
import BoardDetails_A from './pages/Board/BoardDetails_A';
import BoardForm from "./pages/Board/BoardForm";
import BoardUpdateForm from "./pages/Board/BoardUpdateForm";
import CommentForm from './pages/Comment/Comment';
import CommentUpdateForm from './pages/Comment/CommentUpdateForm';
import ReviewBoard from './pages/ReviewBoard/ReviewBoard';
import ReviewDetails from './pages/ReviewBoard/ReviewDetails';
import Review_MoveImage from './pages/ReviewBoard/Review_MoveImage';
import MovePage from './pages/Board/movePage';


function App() {


  return (
    <div className='App'>

  
    <div style={{backgroundColor : 'black',position : 'fixed', zIndex : 2 }}>
      <LoginForm/>
    </div>

        <Routes>

        {/* 관리자 */}
            {/* 관리자페이지 로그인 */}
            <Route path="/admin"  element={<AdminHomePage/>} />
            {/* <Route path="/adminHome"  element={<AdminHomePage/>} /> */}
 


        {/* 유저 */}

               
            {/* 장호    */}

            {/* 실시간 영화 정보 */}
              <Route path="/movieapi"  element={<MovieApi/>} />


            {/* 영화 유저 페이지 */}
              <Route path="/"  element={<MovieHome/>} />
              <Route path="/movie/:id" element={<DetailMovie/>}/>

            {/* 영화 관리자 페이지 */}
              <Route path="/insertmovie" element={<InsertMovie/>}/>
              <Route path="/updatemovie/:id" element={<UpdateMovie/>}/>


            {/* 스토어 유저 페이지 */}
              <Route path="/store" element={<StoreHome/>}/> 
              <Route path="/store/:id" element={<DetailStore/>}/>

            {/* 스토어 관리자 페이지 */}
              <Route path="/insertstore" element={<InsertStore/>}/>
              <Route path="/updatestore/:id" element={<UpdateStore/>}/>


            {/* 영화관 유저 페이지 */}
              <Route path="/cinema/" element={<CinemaHome/>}/>
              <Route path="/cinema/:id" element={<DetailCinema/>}/>


            {/* 영화관 관리 페이지 */}
              <Route path="/insertcinema" element={<InsertCinema/>}/>
              <Route path="/updatecinema/:id" element={<UpdateCinema/>}/>
              {/* 회원가입 */}
              <Route path="/register" element={<Register/>}/>
              
              </Routes>



              
                {/* 수현 */}

                 {/* 예매 유저 페이지 */}

                <Routes>
                    <Route path="/bookingHome" element={<BookingHome/>} />
                    <Route path="/booking" element={<Booking/>} />
                    <Route path="/seatform" element={<SeatForm/>} />
                    <Route path="/basket" element={<Basket/>} />
                    <Route path="/payment" element={<PaymentForm/>} />
                </Routes>


                {/* 카톡로그인 유저 페이지*/}
                <Routes>
                  <Route path="/auth/kakao/callback" element={<Auth />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>

                 {/* 번개모임 유저 페이지*/}
                <Routes>
                  <Route path="/user/thunder" element={<Thunder/>}/>
                  <Route path="/user/thunder/:id" element={<ThunderDetail/>}/>
                  <Route path="/user/thunderInsert" element={<ThunderInsert/>}/>
                  <Route path="/user/thunderMap" element={<ThunderMap/>}/>
                </Routes>

                {/* 번개모임 관리자 페이지*/}
                <Routes>
                  <Route path="/admin/thunder" element={<ThunderAdmin/>}/>
                </Routes>

                {/* 서현 */}
                <Routes>
                <Route path="/board" element={<Board/>}/>
                <Route path="/admin/board" element={<Board/>}/>
                <Route path="/board/:id" element={<BoardDetails/>}/>
                <Route path="/boardInsert" element={<BoardForm/>}/>
                <Route path="/boardUpdate/:id" element={<BoardUpdateForm/>}/>
                <Route path="/commentInsert/:id" element={<CommentForm/>}/>
                <Route path="/commentUpdate/:id" element={<CommentUpdateForm/>}/>
                <Route path="/admin/board/:id" element={<BoardDetails_A/>}/>
                <Route path="/board/movePage/:id" element={<MovePage/>}/>
                <Route path="/reviewBoard" element={<ReviewBoard/>}/>
                <Route path="/reviewBoard/:id" element={<ReviewDetails/>}/>
                <Route path="/chooseReviewBoard" element={<Review_MoveImage/>}/>
                </Routes>

      
    </div>
  );
}

export default App;
