import React,{useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import {Button,Form} from 'react-bootstrap';
import "./css/booking.css";


import {Container} from "react-bootstrap";
import Header from "../../Header/Header";
import BookingMovie from '../../components/BookingMovie';

import { getMonth, getDate, getDay } from "date-fns";
import axios from "axios";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

import {useSelector, useDispatch} from 'react-redux';
import {movieBasketActions} from '../../store/basketReducer';

import {Alert1s} from '../../moving/Alert1s';


const Booking = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Redux : 
    // const movieList = useSelector((state)=> state.basket.movieList);

    const movieBasket = useSelector((state)=> state.basket.movieBasket);

    const [startDate, setStartDate] = useState(new Date());
    const [movieItems,setMovieItems] = useState([]);
    


    // toast 알림창의 상태를 저장해 둘 state
    let [toastState, setToastState] = useState(false);

    //예매 영화 포스터(default: 헌트)
    const [selectedMovie, setSelectedMovie] = useState(
        'https://movie-phinf.pstatic.net/20220805_227/1659685387586PIORG_JPEG/movie_image.jpg'
        );

//
    const [cinemaList, setCinemaList] = useState([]);

    const [selectedCinema, setSelectedCinema] = useState("");

    const [timeList, setTimeList] = useState(["9:30","11:30","13:30","15:30","17:30","19:30","21:30","23:30"]);
    const [selectedTime, setSelectedTime] = useState("");


    //임시 장바구니(user_id 받아와야됨)
    const [totalBooking, setTotalBooking] = useState({
        user_id:"kim",
        title : "",
        posterUrl: "",
        movie_time: "",
        reserveDate: "",
        cinema_name: "",
        cinema_id: 0,
        seat_num: "",
        total_amount: 0,
        total_price: 0,
        mbti: "",
    })

    //영화DB, 영화관DB 받아오기
    useEffect( () => {
         axios.all([ axios.get("http://localhost:8080/movie"),
                    axios.get("http://localhost:8080/cinema")])
            .then(axios.spread((...res)=>{

                // dispatch(movieBasketActions.getAllMovies(res[0].data)) 
                setMovieItems(res[0].data)
                setCinemaList(res[1].data)
                console.log(res[1].data[0].id)
            })).catch(error =>{
                console.log(error)
            })     
    },[]);

    useEffect(()=>{
        // console.log("totalBooking",totalBooking)
        dispatch(movieBasketActions.getMovieBasket({totalBooking}))
        console.log("totalBooking",totalBooking)
        // console.log("영화 장바구니: ", movieBasket)
    },[totalBooking])

    // useEffect(()=>{
       
    // },[movieBasket])



    //영화 선택
   function selectMovies(movieTitle, url){
    setTotalBooking({
       ...totalBooking,
       title:movieTitle,
       posterUrl: url,
   });
   setSelectedMovie(url);
   console.log("영화 선택");
}

    //영화관 선택
    const selectCinema=(e,key)=>{
        e.preventDefault();
        setTotalBooking({
            ...totalBooking,
            cinema_name: e.target.value,
        })
        console.log("영화관 지정", totalBooking);
    }

    //캘린더
    const Calender = () => {
    return (
        <>
        <DatePicker
            selected={startDate}
            dateFormat="yyyy-MM-dd (eee)"
            closeOnScroll={true}
            locale={ko}
            onChange={changeDate}
            minDate={new Date()}  
        
    
            customInput={		      // 날짜 뜨는 인풋 커스텀
                <Form.Control  as="textarea" rows={1} style={{margin:"20px 10px",textAlign: 'center', width:"380px", heigth:"90px"}}/>
          }
        />

        </>
        );
    };

    //날짜 선택
    const changeDate=(selectDate)=>{
        let selectedDates="";
        let Days = ['일', '월', '화', '수', '목', '금', '토'];
        let Month = getMonth(selectDate) + 1;
        let Date = getDate(selectDate);
        let Day = Days[getDay(selectDate)];
        setStartDate(selectDate)

        // 오브젝트는 전달 안돼서 string으로 변환
        selectedDates = String(Month) + "월 " + String(Date) + "일 [" + String(Day) + "]"
        // setSelectedTime(String(Month) + "월 " + String(Date) + "일 [" + String(Day) + "]")
        console.log("날짜 지정 : ", selectedDates)
        setTotalBooking({
            ...totalBooking,
            reserveDate: selectedDates,
        })
      
    }

    //시간 선택
    const selectTime = (e)=>{
        setTotalBooking({
            ...totalBooking,
            movie_time: e.target.value,
            // reserveDate: selectedTime,
        })
        console.log("시간 선택 : ",  e.target.value)
    }

    //좌석 선택페이지로 이동
    const selectSeat = ()=>{
    
      
        dispatch(movieBasketActions.getMovieBasket({totalBooking}))
        console.log("영화 장바구니",movieBasket)
       
        navigate("/seatform");
        // alert("좌석 선택 페이지로 이동합니다...")
    }


    //체크용 팝업창
    function getTotal(){
        // dispatch(movieBasketActions.getMovieBasket({totalBooking}))
        setToastState(true)
        console.log("영화 장바구니",movieBasket)
    }

    return (
        <>
            <Container className='temp'>
              
            <Header/>
           
                <h3>예약 페이지 입니다.</h3>
              
            <div className="all">
                <div className='alert_box'>
                        {toastState === true ? 
                        <Alert1s setToastState={setToastState} />: null} 
                    </div>
                <div className="class_container">
        
                    <div className="booking_container">
                        <div className="content_list">
                            <div className="content_title">영화 선택</div>

                            <div className='movie_item_box'>
                                <div className="movie_item_list">
                                    {movieItems.map((mItem, i) => (
                                        <BookingMovie mItem={mItem} key={mItem.id} selectMovies={selectMovies}/>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
              
                    <div className="booking_poster">
                        <img src={selectedMovie} alt="" width="280px" height="380px" />
                       
                    </div>

                    <div className="booking_container">
                        <div className="content_list">
                            <div className="content_title">영화관</div>

                            <div className='movie_item_box'>
                                {cinemaList.map((cinema,i) => (
                                    // <MovieItem mItem={mItem} key={mItem.movieCd}/>
                                    <div>
                                        <Button key={cinema.id} className="cinema_item" variant="primary" onClick={selectCinema} value={cinema.cinema_name}>{cinema.cinema_name}</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                  

                </div>
                <div className="class_container">
                    <div className="booking_container">
                    <div className="content_title">날짜선택</div>
                        <div className="calender">
                            <Calender />
                        </div>
                    </div>
                    <div className="booking_container">
                        <div className="time_list">
                            {timeList.map((time, i)=>(
                                <div>
                                    <Button  key={i} className="time_btn" variant="outline-primary" onClick={selectTime} value={time}>{time}</Button>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>                
      
            <button onClick={getTotal} style={{marginTop: "60px", padding: "10px"}}>현재 정보조회</button>
                <button onClick={selectSeat} style={{marginTop: "60px", padding: "10px"}}>좌석선택</button>

        </div>

            </Container>

        </>
    );

};

export default Booking;