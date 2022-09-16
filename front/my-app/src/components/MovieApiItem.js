import { Card,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MovieApiItem(props){ 
      let navigate = useNavigate();
    const {rank, movieNm, openDt, audiAcc} = props.mItem
  
        
    const [items, setItems] = useState([])
    useEffect(() => {
        fetch('http://localhost:8080/movie', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((res) => {
            setItems(res);

            // console.log(items);
          }); //비동기 함수
          
       }, []);



      function Poster(){ 
        for(let i=0; i<items.length; i++){
            if(items[i].title == movieNm){
                return items[i].posterUrl
            }
        }
      }

      function Moving(){ 
        for(let i=0; i<items.length; i++){
            if(items[i].title == movieNm){
                navigate('../movie/'+ items[i].movieId)
            }
        }
      }
      
      function RankPosterBg() {
        for(let i=1; i<=rank.length; i++) {
            if(rank >= 4 )
                return 'dark'            
            
            else if(rank ==3)
              return 'info'
            
            else if(rank ==2)
              return 'secondary'
            
            else if(rank ==1)
              return 'warning'
        }
      }


    return (
        <Card bg={RankPosterBg()} style={{ width: '18rem',display: 'inline-block',margin : '1em', padding : '1em' }}>
            <Card.Body> 
            <div style={{display : 'inline-flex'}}>
            <img src={Poster()} className='posterApiBox'></img>
            </div>
            <div style={{display : 'inline-block'}}>
            <h3 style={{border : 'silver solid 0.2em', }}> {rank} 위</h3>
            <Card.Title>{movieNm}</Card.Title>
            <p>개봉일자 : {openDt}</p>
            <p>누적 관객 수  : {audiAcc}</p>
            </div>                
        </Card.Body>
        <Card.Body>
        <Button variant='danger' onClick={Moving} style={{margin : '1em'}}>페이지 이동</Button>
        </Card.Body>
        </Card>
    )
}

export default MovieApiItem