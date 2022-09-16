import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import StoreItem from '../components/StoreItem';

function StoreHome() {
   
    const navigate = useNavigate();    

    const [items, setItems] = useState([])
    

     useEffect(() => {
        fetch('http://localhost:8080/store', {
          method: 'GET',
        })
          .then((res) => res.json())
          .then((res) => {
            setItems(res);

            // console.log(items);
          }); //비동기 함수
          
       }, []);

       function InsertPage() {
          navigate('/insertstore')
       }


    return (
        <div>
            <Container className='temp'>
            <Header/>
            <h1>스토어 홈페이지</h1>
            {items.map((item) => (
                <StoreItem item={item} key={item.id}/>                
            ))}
             <hr/>
            <Button variant='danger' onClick={InsertPage}>새로 추가(관리자)</Button>
            </Container>
        </div>
    )
}

export default StoreHome;