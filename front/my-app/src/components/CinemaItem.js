import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useNavigate,Link  } from 'react-router-dom';
import { useState, useEffect} from 'react';
import '../projectCSS/movie.css'
import DetailCinema from '../pages/DetailCinema';

function CinemaItem(props) { 
    const navigate = useNavigate();
    const {id,lng,lat,cinema_name,star,total_seat} = props.item
    // console.log(lng,lat)
    let reallat = lat
    let reallng = lng

    function starRender() { 
       if(star  == 5){
        return "⭐⭐⭐⭐⭐";
       }
       else if(star  >= 4.3){
        return "⭐⭐⭐⭐☆";
       }
       else if(star  >= 4){
        return "⭐⭐⭐⭐";
       }
       else if(star  >= 3.3){
        return "⭐⭐⭐☆";
       }
       else if(star  >= 3){
        return "⭐⭐⭐";
       }
       else if(star  >= 2.3){
        return "⭐⭐☆";
       }
       else if(star  >= 2){
        return "⭐⭐";
       }
       else if(star  >= 1.3){
        return "⭐☆";
       }
       else if(star  >= 1.0){
        return "⭐";
       }
       else if(star  >= 0.3){
        return "☆";
       }
       else if(star == 0 ){
        return "최근 후기가 없습니다!"
       }
    }
    return (
    <Card  style={{ width: '25rem',display: 'inline-block',margin : '1em', padding : '1em'}} bg="dark">
         <Card.Body>
        <Card.Title>KosmoBox {cinema_name}점</Card.Title>
        
        <Map
        center={{ lat: reallat, lng: reallng }}
        style={{ width: "100%", height: "300px"}}
      >
        <MapMarker position={{ lat: reallat, lng: reallng }}>
          <div style={{color:"#101"}}>KosmoBox {cinema_name}점</div>
        </MapMarker>
      </Map>
      <ListGroup className="list-group-flush" >
        <ListGroup.Item className='cardText'>총 좌석수 : {total_seat}</ListGroup.Item>  
        <ListGroup.Item className='cardText'>영화관 평점 : {starRender()}</ListGroup.Item>
        </ListGroup>
        <Link className='btn btn-secondary' to={'/cinema/' + id}>상세보기</Link>
        
      </Card.Body>
    
    </Card>
    
    )
}

export default CinemaItem