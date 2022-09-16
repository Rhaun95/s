import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../../Header/Header';

function UpdateStore(props) {
    const navigate = useNavigate();
    let { id } = useParams();

    const [item,setItem] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost:8080/store/' + id)
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

        fetch('http://localhost:8080/store/' + id, {
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
                return navigate('/store/' + id);
              }
            })
            .then((res) => {
              if (res !== null) {
                setItem(item);
                navigate('/store/' + id);
              } else {
                alert('업데이트 실패!');
              }
            });
        };
        return (
            <div>
             
              <Container className='noScrollPage'>
              <Header></Header>
              <h1><strong>{item.name}</strong></h1>
              <h1>스토어 수정 페이지</h1>
                <Form onSubmit={submitItem}>
                <Form.Group className="mb-3" controlId="form">
                <Form.Label>이름 변경</Form.Label>
                <Form.Control
                  type="text"
                  value={item.name}
                  onChange={ChangeValue}
                  name="name"
                />
              </Form.Group>
    
               <Form.Group className="mb-3" controlId="form">
                <Form.Label>가격 변경</Form.Label>
                <Form.Control
                  type="text"
                  value={item.price}
                  onChange={ChangeValue}
                  name="price"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>type 변경</Form.Label>
                <Form.Control
                  type="text"
                  value={item.type}
                  onChange={ChangeValue}
                  name="type"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>이미지 url 변경</Form.Label>
                <Form.Control
                  type="text"
                  value={item.image}
                  onChange={ChangeValue}
                  name="image"
                />
              </Form.Group> 
                  

                  <Button variant="primary" type="submit">
                    수정
                  </Button>
                </Form>
              </Container>
            </div>
          );
        };
        
        export default UpdateStore;
        