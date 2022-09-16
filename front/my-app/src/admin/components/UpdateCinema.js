import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../../Header/Header';

function UpdateCinema() {
    const navigate = useNavigate();
    let { id } = useParams();

    const [item,setItem] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost:8080/cinema/' + id)
          .then((res) => res.json())
          .then((res) => setItem(res));
      }, []);

//input value 변할때마다 반응
    function ChangeValue(e){
        setItem({
            ...item,
            [e.target.name] : e.target.value,
        })
      
    }
    
    function submitItem(e) {
        e.preventDefault();

        fetch('http://localhost:8080/cinema/' + id, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(item), //JS Object를 JSON으로 변경해서 던진다
          })
            .then((res) => {
              if (res.status === 200) {
                res.json();
                return "수정되었습니다!"
              } else {
                return navigate('/cinema/' + id);
              }
            })
            .then((res) => {
              if (res !== null) {
                setItem(item);
                navigate('/cinema/' + id);
              } else {
                alert('업데이트 실패!');
              }
            });
        };
        return (
            <div>
             
              <Container className='noScrollPage'>
              <Header></Header>
              <h1><strong>Kosmo box {item.cinema_name}점</strong></h1>
              <h1>영화관 수정 페이지</h1>
                <Form onSubmit={submitItem}>
                <Form.Group className="mb-3" controlId="form">
                <Form.Label>영화관 이름 변경</Form.Label>
                <Form.Control
                  type="text"
                  value={item.cinema_name}
                  onChange={ChangeValue}
                  name="cinema_name"
                />
              </Form.Group>
    
               <Form.Group className="mb-3" controlId="form">
                <Form.Label>총 좌석수 변경</Form.Label>
                <Form.Control
                  type="text"
                  value={item.total_seat}
                  onChange={ChangeValue}
                  name="total_seat"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>위도 변경</Form.Label>
                <Form.Control
                  type="text"
                  value={item.lat}
                  onChange={ChangeValue}
                  name="lat"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>경도 변경</Form.Label>
                <Form.Control
                  type="text"
                  value={item.lng}
                  onChange={ChangeValue}
                  name="lng"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                
              <Form.Label>평점 변경</Form.Label>
                <Form.Control
                  type="text"
                  value={item.star}
                  onChange={ChangeValue}
                  name="star"
                />
              </Form.Group> 
                  

                  <Button variant="danger" type="submit">
                    수정
                  </Button>
                </Form>
              </Container>
            </div>
          );
        };
        
        export default UpdateCinema;
        