import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../projectCSS/movie.css'

function MovieItem(props) { 
    const navigate = useNavigate();
    const {movieId,title,directorNm,actorNm,genre,runtime,repRlsDate,rating,posterUrl,plot,star,audiAcc,stillUrl,country,audioUrl} = props.item
    
    return (
        <Card style={{ width: '18rem',display: 'inline-block',margin : '1em', padding : '1em'}} bg="dark" >
        <Card.Img variant="top" src={ posterUrl } />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className='sht'>
            {plot}
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush" >
          <ListGroup.Item className='cardText'>평점 : {star}</ListGroup.Item>
          <ListGroup.Item className='cardText'>장르 : {genre}</ListGroup.Item>
          <ListGroup.Item className='cardText'>상영시간 : {runtime}분</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Link className='btn btn-secondary' to={"/movie/" + movieId}>상세보기</Link>
        </Card.Body>
      </Card>
   
    )
}
export default MovieItem