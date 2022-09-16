import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import CinemaItem from "../components/CinemaItem";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import Header from "../Header/Header";
import { Button, Container } from "react-bootstrap";


function CinemaHome(){

     let navigate = useNavigate();
     let [cinema,setCinema] = useState([]);

     useEffect(() => {
        fetch('http://localhost:8080/cinema', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((res) => {
            setCinema(res);
          }); 
       }, []);

       function InsertPage() {
        navigate('/insertcinema')
      }  

  return (
    <Container className="temp">
    <Header/>
    {cinema.map((item) => (
        <CinemaItem item={item} key={item.id}/>                
    ))}
    <br/>
    <Button variant='danger' onClick={InsertPage} style={{margin : '1em'}}>새로 추가(관리자)</Button>
    </Container>
  )
}

export default CinemaHome;