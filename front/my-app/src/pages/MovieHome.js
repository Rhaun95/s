import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import MovieItem from '../components/MovieItem';

function MovieHome() {
   
    const navigate = useNavigate();    

    const [items, setItems] = useState([])
    

     useEffect(() => {
        fetch('http://localhost:8080/movie', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((res) => {
            setItems(res);
            // console.log(res)

            // console.log(items);
          }); //비동기 함수
          
       }, []);

       function InsertPage() {
          navigate('/insertmovie')
       }
       

    return (
        <div>
            <Container className='temp' >
            <Header/>
            <h1>메인페이지</h1>
            {items.map((item) => (
                <MovieItem item={item} key={item.movieId}/>                
            ))}
            <hr/>
            <Button variant='primary' onClick={()=> navigate('/movieapi')}>실시간 영화 정보</Button>
            <Button variant='danger' onClick={InsertPage} style={{margin : '1em'}}>새로 추가(관리자)</Button>
            
            </Container>
        </div>
    )
}

export default MovieHome;
