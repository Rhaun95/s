import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import MovieApiItem from '../components/MovieApiItem';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Button from 'react-bootstrap/Button';


function MovieApi() {
  
    const navigate = useNavigate();    
    // const KEY = "f5eef3421c602c6cb7ea224104795888"
    const yesterday = new Date();
    
    let years = yesterday.getFullYear()
    let month = yesterday.getMonth()+1
    let day = 0;
    if(yesterday.getDate() == 1 ){
    day = 30
    month = yesterday.getMonth()
    if(month < 10){
        month = '0'.concat(month)
    }
}
    else{
        day = yesterday.getDate()-1
        if(day < 10){
            day = '0'.concat(day)
        }
        if(month < 10){
            month = '0'.concat(month)
        }
    }
    let date = years+""+month+""+day+""

    
    const [movieItems,setMovieItem] = useState([]);

       useEffect(() => {
        fetch('http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt='+ date, {
          method : 'GET',
       })       
          .then((res) => res.json())
          .then((res) => { 
            setMovieItem(res.boxOfficeResult.dailyBoxOfficeList);
            // console.log(date)
          }); //비동기 함수
        //console.log(month,day)  
       }, []);

    return (
        <div>
            <Container>
            <Header/>
            <h1>{date} 영화 정보 </h1>
            {movieItems.map((mItem) => ( //10개 데이터 있는데 그걸 하나씩 뽑으려고 foreach = map 
                <MovieApiItem mItem={mItem} key={mItem.movieCd}/>                
            ))}
            {/* <Button variant='primary' onClick={()=> navigate('/')}>메인으로 이동</Button> */}
            </Container>
        </div>
    )
}

export default MovieApi;