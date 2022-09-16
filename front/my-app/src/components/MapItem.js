import React, { useEffect ,useState} from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../projectCSS/movie.css'
import { Map, MapMarker } from "react-kakao-maps-sdk";

function MapItem(props) {
   

    const navigate = useNavigate();
    const {id,lng,lat,cinema_name,star,total_seat} = props.item
    // console.log(lng,lat)
    let reallat = lat
    let reallng = lng
    
    console.log(lat)
    console.log(lng)
    console.log(reallat)
    console.log(reallng)






    return(
        <div>
        <h1>찾아오시는 길!</h1>
                      <></>  
        <Card  style={{ width: '28rem',display: 'inline-block',margin : '1em', padding : '1em'}} bg="dark">
        <Card.Body>
        <></>
        <Map
        center={{  lat : reallat, lng: reallng }}
        style={{ width: "100%", height: "300px"}}
        >
        <MapMarker position={{ lat : reallat, lng: reallng }}>
        <div style={{color:"#000"}}>KosmoBox {cinema_name}점</div>
        </MapMarker>
        </Map>
    
        </Card.Body>
        </Card>
        </div>
        )

}

export default MapItem