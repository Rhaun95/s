import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../../Header/Header';

function UpdateForm(props) {
    const navigate = useNavigate();
    let { id } = useParams();

    const [item,setItem] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/La/' + id)
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

        fetch('http://localhost:8080/La/' + id, {
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
                return navigate('/language/' + id);
              }
            })
            .then((res) => {
              if (res !== null) {
                setItem(item);
                navigate('/language/' + id);
              } else {
                alert('업데이트 실패!');
              }
            });
        };
        return (
            <div>
             
              <Container className='temp'>
              <Header></Header>
                <Form onSubmit={submitItem}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>name</Form.Label>
                    <Form.Control
                      type="text"
                      value={item.name}
                      onChange={ChangeValue}
                      name="name"
                    />
                  </Form.Group>
        
                  {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                      type="text"
                      value={book.author}
                      onChange={ChangeValue}
                      name="author"
                    />
                  </Form.Group> */}
        
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Container>
            </div>
          );
        };
        
        export default UpdateForm;
        