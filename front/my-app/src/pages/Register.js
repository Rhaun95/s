import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import '../projectCSS/register.css'
// import 'bootstrap/dist/css/bootstrap.css';
// import '../projectCSS/movie.css'


const Register = () => {
  const navigate = useNavigate();      

  const dateNow = new Date();
  const today = dateNow.toISOString().slice(0, 10);
  const pw_check =  /^[a-z]+[a-z0-9]{5,19}$/g;
  
  // const [login,setLogin] = useState({
  //   username : '',
  //   password : '',
  //   nickname : '',
  //   email : '',
  //   birth : '',
  //   phone : '',    
 
  // },[])
  
   
  const [login,setLogin] = useState({
    username : '',
    password : '',
    nickname : '',
    email : '',
    birth : '',
    phone : '',
    date : today, 
  })

  function ChangeValue(e) {
    setLogin({
      ...login,
      [e.target.name] : e.target.value,
    });
  }    
  
  const [pw,setPw] = useState('')
  
 function IdCheck(e){
  e.preventDefault();

  fetch('http://localhost:8080/sign/check/' + login.username, {
        })
        .then((res) => res.json())         
        .then((res) => {
            if(res === 200){
              console.log()
              console.log(res)
              alert("사용가능한 아이디입니다"); //백앤드 보낸 데이터 200일때 true           
            } else if(res === 400){
              alert("이미 사용중인 아이디입니다.")
            }
          })
        
      
 }

  function PwCheck(e){
    setPw(
      e.target.value,
    )
  }
  
 
  function submitItem(e){
      e.preventDefault();
        
      fetch('http://localhost:8080/api/signup', {
          method:'POST',
          headers: {
              'Content-Type': 'application/json; charset=utf-8',             
          },
          body: JSON.stringify(login), //JS Object를 JSON으로 변경해서 던진다
        })
          .then((res) => res.json())
          .then((res) => {    
              if (login.username.length === 0 || login.username.length < 3) {
                alert("아이디는 최소 2글자 이상 입력해야 합니다")
                
              } else if(!pw_check.test(login.password)) {
                alert("비밀번호눈 영문자로 시작하는 6~20자입니다")  
                         
              } else if(login.password !== pw) {
                alert("비밀번호와 비밀번호 확인이 일치하지 않습니다")  
                console.log(login.password)
                console.log(pw)
                         
              } else if(login.nickname === "") {
                alert("닉네임을 입력하세요")           

              } else if(login.email === "") {
                alert("이메일을 입력하세요")           

              }  else if(login.birth === "") {
                alert("생일을 입력하세요")           
                
              }  else if(isNaN(Number(login.birth))) {
                alert("생일은 숫자만 입력할 수 있습니다")           
                
              }  else if(login.phone === "") {
                alert("핸드폰 번호를 입력하세요")           
                
              } else if(isNaN(Number(login.phone))) {
                alert("핸드폰 번호는 숫자만 입력할 수 있습니다")           
                
              } else {
                alert("회원가입 성공");

                console.log(login.username + " " + login.password + " " + login.nickname + " " + login.email+ " " + login.birth + " " + login.phone + " " + login.signDate)
                  // navigate("/");
              }
          });
  }
  return (
    <div  className="text-center">      
      <main className="form-signin w-100 m-auto">

        <form action='/login' onSubmit={submitItem} >          
          <h1 className="h3 mb-3 fw-normal">
            <a className="btn nav-link " id="navbarDropdownMenuLink" >              
                  회원가입
            </a>             
          </h1>

          <div className="form-floating textAlignLeft">
            <input type="text" className="form-control" id="floatingInput" placeholder="id" onChange={ChangeValue} name="username" />            
            <button className="btn btn-primary" onClick={IdCheck}>중복확인</button>
            <label className='ml-1'>Id </label>
          </div>

          <div className="form-floating textAlignLeft">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"  onChange={ChangeValue} name="password"/>            
            <label className='ml-1' >Password</label>
          </div>          

          <div className="form-floating textAlignLeft">
            <input type="password" className="form-control" id="floatingPasswordCheck" placeholder="Password"  onChange={PwCheck} name="password_Check"/>            
            <label className='ml-1' >Password_Check</label>
          </div>   
         
          <div className="form-floating textAlignLeft">
            <input type="nickname" className="form-control" id="floatingNickname" placeholder="Nickname"  onChange={ChangeValue} name="nickname"/>            
            <label className='ml-1'>Nickname</label>
          </div>        

          <div className="form-floating textAlignLeft">
            <input type="nickname" className="form-control" id="floatingEmail" placeholder="Email"  onChange={ChangeValue} name="email"/>            
            <label className='ml-1'>Email</label>
          </div>                  
          

          <div className="form-floating textAlignLeft">
            <input type="nickname" className="form-control" id="floatingBirth" placeholder="Birth"  onChange={ChangeValue} name="birth"/>            
            <label className='ml-1'>Birth</label>
          </div>        

          <div className="form-floating textAlignLeft">
            <input type="nickname" className="form-control" id="floatingPhone" placeholder="Phone"  onChange={ChangeValue} name="phone"/>            
            <label className='ml-1'>Phone</label>
          </div>  

          {/* <div className="form-floating textAlignLeft" style={{display: 'none',}} >
            <input type="nickname" className="form-control" id="floatingPhone" placeholder="Phone"  onChange={ChangeValue} name="signDate" defaultValue={today}/>                        
            <label className='ml-1'>signDate</label>
          </div>               */}




          <button className="w-100 btn btn-lg btn-primary" type="submit">회원가입</button>          
        </form>          
           
      </main>
    </div>
  );
};

export default Register;