import React, { useEffect, useState } from 'react';
import Header from "../Header/Header";
import {Container} from "react-bootstrap";
import axios from "axios";
import {useCookies} from "react-cookie";

const Profile = () => {
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const[sessionValue, setSessionValue] = useState();

  const[cookies, setCookie] = useCookies(['user']);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: '/v2/user/me',
      });

      console.log(data);
      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);


      console.log("여기서부터" + typeof data.id)
      let id=String(data.id)
      console.log(typeof id + id)

        axios.get("http://localhost:8080/La/login/" + id)
            .then(res => {
          if (res !== null) {
            console.log("DB까지 감")
            console.log(res.data)

           //############
            window.sessionStorage.setItem("user", sessionValue);
            setCookie('user', res.data);
          } else {
            console.log("DB까지는 가는데 문제있음")
          }
        }).catch((err)=>{
          console.log("로그인 오류남")
        })
    }catch (err){
      console.log("아예 실패")
    }
  }


  //세션으로 로그인 형태만
  console.log(sessionValue)
      
  return (
    <div>
      <Container className='temp'>
        <Header/>
        <h2>{user_id}</h2>
        <h2>닉네임 : {nickName}</h2>
        <img src={profileImage} style={{ width: '200px', height: '200px' }}></img>
      </Container>
    </div>
  );
};

export default Profile;
