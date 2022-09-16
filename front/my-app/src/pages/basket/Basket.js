import React, { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "./css/basket.css"
import MovieBasket from "../../components/MovieBasket";
import ItemBasket from "../../components/ItemBasket";
import Header from "../../Header/Header";
import {Container} from "react-bootstrap";

import {useSelector} from "react-redux";

const Basket = () => {

    /**
     * * DB 데이터 담는 곳
     */
    const [movieItems,setMovieItems] = useState([]);
    const [storeItems, setStoreItems] = useState([]);

    const navigate = useNavigate();

    /**
     * * 결제 내역
     */
    const [paymentItems, setPaymentItems]= useState([
        [],
        []
    ]);


    /**
     * * 전 페이지에서 선택한 좌석들
     */
    const seatBasket = useSelector((state)=>state.basket.seatBasket)

    /**
     * *가격
     */
    const [mPrice, setMPrice] = useState(0);
    const [iPrice, setIPrice] = useState(0);
    const tPrice =  mPrice + iPrice;

    const moviePrice = 13000;
    let seatLength=0;


   /**
     * * DB data 호출
     */
    useEffect(()=>{
        axios.all([axios.get("http://localhost:8080/basket/"),
                   axios.get("http://localhost:8080/itembasket/"),
                ])
                .then(axios.spread((...res)=> {
                    setMovieItems(res[0].data);
                    setStoreItems(res[1].data);
         }))
    },[])

    useEffect(()=>{
        console.log(paymentItems)
    },[tPrice])

    /**
     * * 영화 가격 계산
     */
    function payMovie(movie, isSelected){
        if(isSelected === true){
            paymentItems[0].push(movie);
            seatLength = movie.seat_num.split(",").length;
            setMPrice(mPrice + seatLength*moviePrice);

        //장바구니에 갈곳에서 삭제
        }else{
            paymentItems[0].splice(paymentItems[0].indexOf(movie), 1)
            seatLength = movie.seat_num.split(",").length;
            setMPrice(mPrice - seatLength*moviePrice);
        }
    }
  
    /**
     * * 매점 가격 계산
     */
    function payStore(item, isSelected){
        
        if(isSelected === true){
            paymentItems[1].push(item);
            setIPrice(iPrice+ item.total_amount*item.total_price );

        //장바구니에 갈곳에서 삭제
        }else{
            paymentItems[1].splice(paymentItems[1].indexOf(item), 1)
            setIPrice(iPrice- item.total_amount*item.total_price);
        }
    } 
   


    /**
     * * 결제 후 좌석 업데이트
     */
    function updateSeat(seatBasket){
        for(let i=0; i<seatBasket.length;i++){
            axios.put("http://localhost:8080/seat/"+seatBasket[i])
            .then(res=>console.log(res.data))
        }
    }
   
   /**
     * * 결제하기
     * ? 결제한 해당 항목들만 장바구니에서 삭제
     */
    const paymentForm=()=>{
        
        axios.all([
            axios.delete("http://localhost:8080/basket/"), 
            axios.delete("http://localhost:8080/itembasket/")])
            .then(axios.spread((...res)=>{
                if(res[0]===1 && res[1]===1){
                    console.log("basket 초기화 성공")
                }})
            ).catch(error=>{
                console.log("basket 초기화 오류", error);
            });
        updateSeat(seatBasket);
        navigate('/payment')
    }
    
    const checkSeatBasket=(e)=>{
        console.log("seatBasket: " + seatBasket)
    }

    return (
        <>
            <Container className='temp'>
                <Header/>
                <div >
                    <h3>영화 장바구니</h3>
                    <div className="basket_container">
                        {movieItems.map((mb) => (
                            <MovieBasket mb={mb} payMovie={payMovie}/>
                        ))}
                    </div>
                    <div className="price">
                        <h3>가격 :  {mPrice} 원</h3>
                    </div>
                </div>

                <div >
                    <h3>매점 장바구니</h3>
                    <div className="basket_container">
                        {storeItems.map((bi) => (
                            <ItemBasket bi={bi} payStore={payStore}/>
                        ))}
                    </div>
                    <div className="price">
                        <h3>가격 : {iPrice} 원</h3>
                    </div>
                </div>

                <div className='bottom_box'>
                    <div className="bottom">
                            <button className="btn_payment" onClick={checkSeatBasket}>seatBasket 확인</button>
                            <button className="btn_payment" onClick={paymentForm}>결제하기</button>
                    </div>
                    <div className="bottom">
                        <div className="total" style={{color:"black"}}>총액 : {tPrice} 원</div>
                    </div>
                </div>
               
            </Container>
        </>
    );
};

export default Basket;