import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


function LoginForm() {
    let navigate = useNavigate(); 
     // 로그인 폼에 입력값 담는 곳
    const [login,setLogin] = useState({
      username : '',
      password : ''
  }) 
    //회원정보 담을 곳
    const [userInfo, setUserInfo] = useState({
      username : '',
      password : '',
      nickname : '',
      email : '',
      birth : '',
      phone : '',      
    })



  useEffect(() => {
    fetch('http://localhost:8080/api/' + sessionStorage.getItem("id") , {
      method : 'GET', 
      headers : {
        Authorization : sessionStorage.getItem("access_token")
      }
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setUserInfo(res);
        console.log('유저정보')
        console.log(userInfo);          
      })
    },[]);
  
    function ChangeValue(e) {
      setLogin({
          ...login,
          [e.target.name] : e.target.value,
      });
    }
  
    function submitLogin(e){
      e.preventDefault();  
      fetch('http://localhost:8080/api/authenticate', {
          method:'POST',
          headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          body: JSON.stringify(login), //JS Object를 JSON으로 변경해서 던진다            
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(userInfo)
        if (res.token !== undefined) {        
          sessionStorage.setItem('access-token', res.token)        
          sessionStorage.setItem('id', login.username)  
          sessionStorage.setItem('email', userInfo.email)  
                    
        } else {
          alert('로그인에 실패하였습니다');
        }
       });
      }
  
      function Logout(){        
        if(sessionStorage.getItem("id") !== null ){      
          fetch('http://localhost:8080/api/user', {
            method : 'GET',
            headers : {
              Authorization : sessionStorage.clear()
            }
          })
            .then((res) => res.json())
            .then((res) => {
              setUserInfo(  
              {
                username : '',
                password : '',
                nickname : '',
                email : '',
                birth : '',
                phone : '',    
            })
            
            sessionStorage.clear();  
            })                     
          navigate('/')                      
          }      
        }

        
  
  return (
    <>
    {        
    sessionStorage.getItem("id") === true ?             
        <div className='loginForm'>
        <Form onSubmit={submitLogin}>
          <Form.Group className="mb-3" controlId="form">
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter ID"
              onChange={ChangeValue}
              name="username"
            />
          </Form.Group>
           <Form.Group className="mb-3" controlId="form">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter PASSWORD"
              onChange={ChangeValue}
              name="password"
            />
          </Form.Group> 
          <Button variant="danger" type="submit">로그인</Button>
          <Button variant="primary" type="button" onClick={()=> navigate('/register')}>회원가입</Button>
          </Form>   
          </div>       
          : 
          <div>
          {sessionStorage.getItem("id")}
          <p>닉네임 : {userInfo.nickname}</p>
          <Button onClick={Logout} type="submit" variant="primary">로그아웃</Button>
          {sessionStorage.getItem('id')=='admin' ?
          <>
          <Button onClick={()=> navigate('/admin')} type="button" variant="danger">관리자</Button>
          </> : <></>}
          </div>                  
        }              
      </>
  )
}

export default LoginForm;