import { useEffect,useState } from "react";
import { Container,Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {Button} from 'react-bootstrap'
import Header from "../Header/Header";
import '../projectCSS/movie.css'



function DetailStore(props) {
   
    let {id} = useParams()
    const navigate = useNavigate()

    const [item, setItem] = useState([]);
    const [price, setPrice] = useState(0);
    let num = 0 ;

    useEffect(()=> {
        fetch('http://localhost:8080/store/' + id)
        .then((res) => res.json())
        .then((res) => setItem(res))
        
    },[])


    function deleteBook(){
        fetch('http://localhost:8080/store/' + id,{
            method : 'DELETE',
        })
        .then((res)=> res.text())
        .then((res) =>{
            navigate('/store')
        }).catch((error) => {
            alert('아이디가 없음 삭제 실패' + error)
        })
    }   
        function updateItem() {
            navigate('/updatestore/' + id );
        }

        function ChangeNum(e){
            num = e.target.value
            setPrice(item.price * num)
            // console.log(price,num)
        }

        

        return (
                <Container className='noScrollPage'>
                <Header/>
                    <h1>스토어 상세 페이지</h1>
                    <Button variant="danger" onClick={updateItem}>수정(관리자만보이게)</Button>
                    &nbsp;
                    <Button variant="danger"onClick={deleteBook}>삭제(관리자만보이게)</Button>
                    <hr/>
                    <img className='posterBox' src={item.image} align={'left'}/>
                    <h1>상품명 : {item.name}</h1><br/>
                    <h1>상품 타입 : {item.type}</h1><br/>
                    <h1>가격 : {item.price}</h1><br/>
                    <h4> 구매 수량 : <input type={'number'} min={1} onChange={ChangeNum}></input></h4>
                    <h3>총 가격 : <input value={price}></input></h3>                    
                    <div>
                    <Button variant="danger">장바구니?</Button>&nbsp;
                    <Button variant="danger">구매하기?</Button>
                    </div>    
                </Container>            
            
        )
    }

export default DetailStore