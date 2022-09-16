import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';

function InsertStore(props) {
    const navigate = useNavigate();

    const [item,setItem] = useState({
        name : '',
        price :'',
        amount :'',
        name :'',
        type :'',
        image : ''
    })

    function ChangeValue(e) {
        setItem({
            ...item,
            [e.target.name] : e.target.value,
        });
    }
    function submitItem(e){
        e.preventDefault();

        fetch('http://localhost:8080/store/insert', {
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
            navigate('/store');
          } else {
            alert('글 등록에 실패하였습니다');
          }
        });
    }
    return (
        <div>
           
          <Container className='noScrollPage'>
          <Header/>
          <h1>영화 추가 페이지</h1>
            <Form onSubmit={submitItem}>
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>상품명</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={ChangeValue}
                  name="name"
                />
              </Form.Group>
    
               <Form.Group className="mb-3" controlId="form">
                <Form.Label>상품 가격</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter price"
                  onChange={ChangeValue}
                  name="price"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>상품 재고</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter amount"
                  onChange={ChangeValue}
                  name="amount"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>세트 or 단품</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter type"
                  onChange={ChangeValue}
                  name="type"
                />
              </Form.Group> 
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>image url</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter image"
                  onChange={ChangeValue}
                  name="image"
                />
              </Form.Group>
                
              <Button variant="danger" type="submit">상품 추가</Button>
            </Form>
          </Container>
        </div>
      )

}

export default InsertStore