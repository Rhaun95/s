import React, { useEffect } from 'react';
import { useNavigate , Redirect } from "react-router-dom";
import Sidebar from "../components/admin/sidbar/Sidebar";
import '../projectCSS/adminHome.css';



import AdminHeader from '../Header/AdminHeader';

function AdminHomePage() {
  const navigate = useNavigate();

  // const {state} = useLocation();
  useEffect(()=>{ 

  },[])

  return (    
    <>
    {localStorage.getItem("id") == 'admin' ?

    <div>      
      <AdminHeader/>

      <h1> 
        {/* <Link to="/adminHome">관리자 페이지</Link> */}
        <a href="/adminHome">관리자 페이지</a>     
      </h1>

      {/* <nav>Id : {state.login.username}</nav> */}

      <Sidebar/>    
    </div> :   
        
    <div>
      {alert("돌아가")}
      {navigate('/')}     
      관리자페이지입니다.
    </div>
 
    }
 </>  );
};

export default AdminHomePage;