import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";


const Auth = () => {
  const REST_API_KEY = '896869f978ea76f2bf8eea3722a7fdce';
  const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback';

  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();
  const[sessionValue, setSessionValue] = useState();
  const[cookies, setCookie] = useCookies(['user']);

  const navigate = useNavigate();

  //calllback으로 받은 인가코드
  const code = new URL(window.location.href).searchParams.get('code');

  //check
  console.log(code);

  useEffect(() => {

    const forToken = {
      grant_type: "authorization_code",
      client_id: REST_API_KEY,
      redirect_uri: REDIRECT_URI,
      code: code,
    };

    const toQueryString = Object.keys(forToken)
      .map((k) => encodeURIComponent(k) + '=' + encodeURI(forToken[k]))
      .join('&');

    try {
      // access token 가져오기
      fetch("https://kauth.kakao.com/oauth/token", {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: toQueryString,
      })
        .then((res) => res.json())
        .then((res) => {
          window.Kakao.Auth.setAccessToken(res.access_token);
          console.log('받아온것 ', res);


          getProfile();

          navigate('/movie');
        });
    } catch (err) {
      console.log(err);
    }
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


      console.log("여기서부터 정보 확인/토큰 설정" + typeof data.id)

      let id=String(data.id)
      console.log(typeof id + id)

      axios.get("http://localhost:8080/La/login/" + id)
          .then(res => {
            if (res !== null) {
              console.log("DB까지 감")
              console.log(res.data)

              //############
              window.sessionStorage.setItem("user", sessionValue);
              setCookie(cookies.user, res.data);
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

};

export default Auth;
