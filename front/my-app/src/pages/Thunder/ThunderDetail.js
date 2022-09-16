import React from 'react';
import {useLocation } from 'react-router-dom';
import Header from '../../Header/Header'
import './css/ThunderDetail.css'
import {Map, MapMarker} from "react-kakao-maps-sdk";
import axios from "axios";
import {Form} from "react-bootstrap";

import Tag from './components/Tag';
import { useEffect } from 'react';

const ThunderDetail=()=>{

  const {state} = useLocation();

  useEffect(()=>{
    console.log(state)
  },[])


  function set(e){
    console.log(e.target.getAttribute('data-msg'))
  }

  return(
    <>
      <Header/>
      <div className='thunderDetail_all'>

        <div className='thunderDetail_top'>

          <div className='thunderDetail_top1'>
            <div>{state.title}</div>
          </div>
         <div className='thunderDetail_top2'>
            <img src={state.image} width="200px"/>
          </div>

        </div>
        
        <div className='thunderDetail'>
        <div>
            <p>등록일: {state.regdate.substring(0,10)}</p>
            <p>등록자: {state.username}</p>
          </div>
          <div>
          <p>카테고리: {state.category}</p>

          <div>
            <div>내용: {state.content}</div>
          </div>

          <p>장소: </p>
          <p>영화관: {state.location}</p>
          <p>{state.tags}</p>
          </div>

        </div>  

        <div className='thunderDetail_bottom'>

          <button className='thunderDetail_bottom_btn'>참여하기</button>
          <button className='thunderDetail_bottom_btn'>돌아가기</button>

        </div>
      </div> 
      
    </>
  )
}


export default ThunderDetail;