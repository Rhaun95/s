
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form} from 'react-bootstrap';
import { useEffect } from 'react';


function LoginForm() {
    const [check,setCheck] = useState(false)

    const [login,setLogin] = useState({
      username : '',
      password : ''
  })
  
  const [userInfo, setUserInfo] = useState({
    userId : '',
    username :'',
    password : '',
    nickname : '',      
    activated : '',
    authorities : '',
  })

  
  useEffect(() => {
    fetch('http://localhost:8080/api/' + login.username, {
      method : 'GET',
      headers : {
        Authorization : localStorage.getItem("access_token")
      }
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res)
        setUserInfo(res);
        // console.log(login)
        
        console.log(userInfo);
     
        // console.log("로그인 정보")
        // console.log(res);
        // console.log(userInfo);
      })
    },[check]);
  
  
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
        if (res.token !== undefined) {
        
          localStorage.setItem('access-token', res.token)        
          console.log(res)
          setCheck(true)
        
          console.log(userInfo)
          
        } else {
          alert('로그인에 실패하였습니다');
        }
      });
  }
  
  function Logout(){
    // console.log("chkeck:" + check);
    if(check == true){
      // console.log("로그아웃");
      fetch('http://localhost:8080/api/user', {
        method : 'GET',
        headers : {
          Authorization : localStorage.clear()
        }
      })
        .then((res) => res.json())
        .then((res) => {
          setUserInfo(  
          {userId : '',
          username :'',
          password : '',
          nickname : '',      
          activated : '',
          authorities : ''})
         
          // console.log("로그인 정보")
          // console.log(res);
          // console.log(userInfo);
        })
      setCheck(!check);    
    }      
  }

  
  return (
    <>
    {check == false ? 

        <div style={{position : 'fixed' ,right : 1, zIndex : -1}}>          
          
          <Form className="form-inline"  onSubmit={submitLogin}>
              <Form.Group className="mb-3" controlId="form">
                {/* <Form.Label style={{float : "left"}}>아이디</Form.Label> */}
                <div className="mt-1" style={{float : "left"}}>아이디 : </div>
                  <div className='mx-3' style={{float : "right"}}>
                    <Form.Control type="text"  placeholder="Enter ID"
                      onChange={ChangeValue} name="username"/>
                  </div>
              </Form.Group >

              <Form.Group className="mb-3" controlId="form">
                {/* <Form.Label>비밀번호</Form.Label> */}
                <div className="mt-1" style={{float : "left"}}>패스워드 : </div>
                <Form.Control className="mx-3" type="text"  placeholder="Enter PASSWORD"
                  onChange={ChangeValue} name="password"/>
              </Form.Group>
               
              <Button className="mr-1 mb-3" variant="danger" type="submit">로그인</Button>              
              {/* <a className='btn btn-danger mx-1 mb-3' type='submit'>로그인</a> */}
              <a className='btn btn-primary mx-3 mb-3' href='/register'>회원가입</a>
          {/* <Link to='/' className=''>회원가입</Link>           */}
          </Form>   
          </div>  
          : 
          <div className="mx-3" style={{position : 'fixed' ,right : 1, zIndex : -1}}>          
              <div className='my-2 mx-3' style={{float : "left"}}>nickname: {userInfo.nickname}</div>
            <button onClick={Logout} type="submit" className="btn btn-primary">로그아웃</button>
          </div>         
         
        }
    </>
  )
}

export default LoginForm;