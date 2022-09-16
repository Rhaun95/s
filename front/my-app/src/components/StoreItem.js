import React, {useState} from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../projectCSS/movie.css'
import axios from 'axios';

function StoreItem(props) { 
    const navigate = useNavigate();
  
    //수현[
    const {id,price,amount,name,type,image} = props.item
    const[basketItem, setBasketItem] = useState({
      user_id:"Jang",
      item_name: name,
      total_amount: amount,
      total_price: price,
      item_image: image,
  })

    function addToBasket(e){
      e.preventDefault();
      setBasketItem(props.item);
      console.log(basketItem);
      axios.post("http://localhost:8080/itembasket/insert",
          basketItem)
          .then(res=>console.log("아이템 장바구니 추가 성공",res.data))
          .catch(err=>console.log("아이템 장바구니 추가 실패", err));
  }
 //]수현    



    return (
        <Card  style={{ width: '20rem',display: 'inline-block',margin : '1em', padding : '1em'}} bg="dark" >
        <Card.Img variant="top" src={image} className='cardImage' />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text className='sht'>            
          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush" >
          <ListGroup.Item className='cardText'>가격 : {price}</ListGroup.Item>
          <ListGroup.Item className='cardText'>상품 타입 : {type}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
           <Link className='btn btn-secondary' to={"/store/" + id}>상세보기</Link> 
           &nbsp;
           <Button className='btn btn-primary' onClick={addToBasket}>장바구니 추가</Button>  
        </Card.Body>
      </Card>
   
    )
}
export default StoreItem