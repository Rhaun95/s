import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';

function InsertCinema() {
    const navigate = useNavigate();

    const [item,setItem] = useState({
        cinema_name : '',
        total_seat :'',
        lat :'',
        lng :'',
        star :''
    })

    function ChangeValue(e) {
        setItem({
            ...item,
            [e.target.name] : e.target.value,
        });
    }
    function submitItem(e){
        e.preventDefault();

        fetch('http://localhost:8080/cinema/insert', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
            body: JSON.stringify(item), //JS Object를 JSON으로 변경해서 던진다
              
        })
        .then((res) => res.json())
        .then((res) => {
          if (res !== null) {
            setItem(item);
            navigate('/cinema');
          } else {
            alert('글 등록에 실패하였습니다');
          }
        });
    }
    return (
        <div>
           
          <Container className='noScrollPage'>
          <Header/>
          <h1>영화관 추가 페이지</h1>
            <Form onSubmit={submitItem}>
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>영화관 이름</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter cinema_name"
                  onChange={ChangeValue}
                  name="cinema_name"
                />
              </Form.Group>
    
               <Form.Group className="mb-3" controlId="form">
                <Form.Label>총 좌석수</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter total_seat"
                  onChange={ChangeValue}
                  name="total_seat"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>위도</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter lat"
                  onChange={ChangeValue}
                  name="lat"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>경도</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter lng"
                  onChange={ChangeValue}
                  name="lng"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>영화관 평점</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter 0~5 default 5"
                  onChange={ChangeValue}
                  name="star"
                />
              </Form.Group> 
              <Button variant="danger" type="submit">영화관 추가</Button>
            </Form>
          </Container>
        </div>
      )

}

export default InsertCinema