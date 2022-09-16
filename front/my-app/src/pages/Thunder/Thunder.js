import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Header/Header'
import {useSelector, useDispatch} from 'react-redux';


import Post from "./components/Post";
import './css/Thunder.css';
import { useNavigate } from "react-router-dom";

//Card 형식
const Thunder = () => {
    
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [thunders, setThunders]  = useState([]);
    const[category, setCategory] = useState("모두보기");

    useEffect(()=>{
        getThunders()
    },[])


    useEffect(()=>{
        console.log("category", category)
 
        if(category == "none" || category === null){
            getThunders()
        }else{
            axios.get("http://localhost:8080/thunder/selectcategory/"+ category)
            .then((res)=>{
                setThunders(res.data)
            })
    }
    },[category])

    const getThunders= async()=>{
        try{
          const temp = await axios.get("http://localhost:8080/thunder/")
          setThunders(temp.data) ;
    
        }catch(error){
          console.log("번개 이미지 호출 에러: ",error);
        }
      }
      
    const changeCategory = (e)=>{
        setCategory(e.target.value)
    }
       

    function toMap(e){
        e.preventDefault();
        navigate("/user/thunderMap");
    }

    function toInsert(e){
        navigate("/user/thunderInsert");
    }
    

    return (

        <>
        <Header/>
        <div className="thunder">
            <header className="thunder_header">
                <div className="thunder_header1" style={{margin:"0"}}>번개 모임</div>

                <div className="thunder_header2">지겨운 일상 속에 번개같은 반짝임!</div>
                <div className="thunder_header2">  새로운 만남을 가져보세요 : )</div>
                
            </header>
            <div>
                <button type="button" className="toMap" onClick={toMap}>지도로 보기</button>
                <select name="category" onChange={changeCategory} value={category}>
                    <option value="none">모두 보기</option>
                    <option value="같이보기">같이보기</option>
                    <option value="이벤트 투어">이벤트 투어</option>
                </select>
            </div>
            <div>
                <button onClick={toInsert}>번개 등록</button>
            </div>

            <div className="post_container">
                
                {thunders.map((thunder)=>(
                <>
                <div className='temmpp'>
                    <div className="post">
                        <Post thunder={thunder}/>
                    </div>
                    <button className='join_btn' onClick={(e)=>{
                            navigate("/user/thunder/"+thunder.id, {state: thunder})
                        }}>참여하기</button>
                </div>
                </>
                ))}
            </div>
        </div>
        </>
    );
};

export default Thunder;