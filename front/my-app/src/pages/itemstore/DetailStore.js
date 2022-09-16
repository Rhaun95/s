import { useEffect,useState } from "react";
import {Container, Card, Form} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {Button} from 'react-bootstrap'
import Header from "../../Header/Header";
import '../../projectcss/movie.css'
import axios from "axios";



function DetailStore(props) {
   
    let {id} = useParams()
    const navigate = useNavigate()

    const [item, setItem] = useState([]);
    const [price, setPrice] = useState(0);

    //상품명, 수량, 총가격, 이미지
    const[basketItem, setBasketItem] = useState({
        user_id:"Jang",
        item_name: item.name,
        total_amount: 0,
        total_price: 0,
        item_image: item.image,
    })

    let num = 0 ;

    // 아이템 상세
    useEffect(()=> {
        fetch('http://localhost:8080/store/' + id)
        .then((res) => res.json())
        .then((res) => setItem(res))
    },[])

    //아이템 지우기
    function deleteBook(){
        fetch('http://localhost:8080/store/' + id,{
            method : 'DELETE',
        })
        .then((res)=> res.text())
        .then((res) =>{
            navigate('/')
        }).catch((error) => {
            alert('아이디가 없음 삭제 실패' + error)
        })
    }   
        function updateItem() {
            navigate('/updatestore/' + id );
        }


    //수량에 따라 변한 값들 제 입력
    function ChangeNum(e){
        e.preventDefault();

        num = e.target.value
        setPrice(item.price * num)
        //총가격 add
        updateBasketItem(num, price);
      

    }
    console.log(basketItem);
    function updateBasketItem(num, price){
        setBasketItem({
            ...basketItem,
            user_id: "Jang",
            item_name: item.name,
            item_image: item.image,
            total_price: price,
            total_amount: num,
        })
    }

    function addToBasket(e){
        e.preventDefault();

        axios.post("http://localhost:8080/itembasket/insert",
            basketItem)
            .then(res=>console.log("아이템 장바구니 추가 성공",res.data))
            .catch(err=>console.log("아이템 장바구니 추가 실패", err));
    }


        

    return (
            <Container className='noScrollPage'>
            <Header/>


                <h1>스토어 상세 페이지</h1>
                <Button variant="danger" onClick={updateItem}>수정(관리자만보이게)</Button>
                &nbsp;
                <Button variant="danger"onClick={deleteBook}>삭제(관리자만보이게)</Button>
                <hr/>

                <Form onSubmit={addToBasket}>
                <img className='posterBox' src={item.image} align={'left'}/>
                <h1>상품명 : {item.name}</h1><br/>
                <h1>상품 타입 : {item.type}</h1><br/>
                <h1>가격 : {item.price}</h1><br/>

                <h4> 구매 수량 : <input type={'number'} min={1} placeholder="0" onChange={ChangeNum}/></h4>
                <h3>총 가격 : <input value={price}/></h3>

                <div>
                <Button type="submit" variant="danger" onClick={addToBasket}>장바구니에 넣기</Button>&nbsp;
                <Button variant="danger">구매하기?</Button>
                </div>
                </Form>
            </Container>            
        
        )
    }

export default DetailStore