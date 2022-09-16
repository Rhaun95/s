import { useEffect,useState } from "react";
import { Container,Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {Button} from 'react-bootstrap'
import Header from "../Header/Header";
import '../projectCSS/movie.css'
import MapItem from "../components/MapItem";
import MovieItem from "../components/MovieItem";
import { Map, MapMarker } from "react-kakao-maps-sdk";



function DetailCinema(props) {

    let {id} = useParams()
    const navigate = useNavigate()
    const [item, setItem] = useState([]);
    
    
    let reallat = item.lat
    const reallng = item.lng 
    console.log(item.lat)
    console.log(item.lng)
    console.log(reallat)
    console.log(reallng)


    useEffect(()=> {
        fetch('http://localhost:8080/cinema/' + id)
        .then((res) => res.json())
        .then((res) => setItem(res))
   
    },[])


    function deleteCinema(){
        fetch('http://localhost:8080/cinema/' + id,{
            method : 'DELETE',
        })
        .then((res)=> res.text())
        .then((res) =>{
            navigate('/cinema')
        }).catch((error) => {
            alert('아이디가 없음 삭제 실패' + error)
        })
    }   
        function updateCinema() {
            navigate('/updatecinema/' + id );
        }

        return (
                <Container className='noScrollPage'>
                <Header/>
                    <h1>영화관 상세 페이지</h1>
                    <Button variant="danger" onClick={updateCinema}>수정(관리자만보이게)</Button>
                    &nbsp;
                    <Button variant="danger"onClick={deleteCinema}>삭제(관리자만보이게)</Button>
                    <hr/>
                    
                    <h3>상품명 : {item.cinema_name}</h3><br/>
                    <h3>총 좌석수 : {item.total_seat}</h3><br/>
                    <h3>영화관 상세 평점 : {item.star}</h3><br/>
                    <MapItem item={item} key={item.id}/>
                    <Button variant="danger">해당 영화관 예매하기</Button>&nbsp;
                    <Button variant="danger">해당 영화관 상영페이지</Button>    
                
                </Container>                
            
        )
        }

export default DetailCinema