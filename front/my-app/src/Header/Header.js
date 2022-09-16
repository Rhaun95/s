import '../projectCSS/movie.css'
import { Link, useNavigate } from 'react-router-dom';
import SearchControll from '../components/SearchControll';
import LoginForm from '../components/LoginForm';



function Header() {

    return(
      <div className='header'>
        <nav  className="navbar navbar-dark bg-dark navbar-expand-lg header" style={{height : '8vh'}}>
          
          <Link to='/' className=''><img  src='https://i.esdrop.com/d/f/8AgqMbQApP/Mb1e0AVBWY.png' style={{height:'8vh'}}></img></Link>          
           <ul className="navbar-nav ">
             
           <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                test
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link to='/' className='dropdown-item'>영화 페이지</Link>
              <Link to='/store' className='dropdown-item'>스토어 페이지</Link>
              <Link to='/movieapi' className='dropdown-item'>실시간 영화 정보</Link>
              <Link to='/bookinghome' className='dropdown-item'>예매?</Link>
              <Link to='/booking' className='dropdown-item'>예매 페이지</Link>
              <Link to='/seatform' className='dropdown-item'>좌석 정보</Link>
              <Link to='/basket' className='dropdown-item'>장바구니 정보</Link>
              <Link to='/payment' className='dropdown-item'>결제? 정보</Link>

              </div>
            </li>
           <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                영화
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <Link to='/' className='dropdown-item'>영화 페이지</Link>
                <Link to='/movieapi' className='dropdown-item'>실시간 영화 정보</Link>
                <a className="dropdown-item" href="/c">영화3</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                예매
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/a">예매1</a>
                <a className="dropdown-item" href="/b">예매2</a>
                <a className="dropdown-item" href="/c">예매3</a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                극장
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
               <Link to='/cinema' className='dropdown-item'>상영관 정보</Link>
                <a className="dropdown-item" href="/b">극장2</a>
                <a className="dropdown-item" href="/c">극장3</a>
              </div>
            </li>
            
  
        
          <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                이벤트
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a className="dropdown-item" href="/a">이벤트1</a>
                <a className="dropdown-item" href="/b">이벤트2</a>
                <a className="dropdown-item" href="/c">이벤트3</a>
              </div>
            </li>
            <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        고객센터
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="http://localhost:3000/board">문의게시판</a>
                        <a className="dropdown-item" href="/b">1:1 문의</a>
                    </div>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        커뮤니티
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="http://localhost:3000/chooseReviewBoard">전체보기</a>
                        <a className="dropdown-item" href="http://localhost:3000/reviewBoard">자유게시판</a>
                        <a className="dropdown-item" href="http://localhost:3000/user/thunder">번개모임</a>
                        <a className="dropdown-item" href="/b">영화관 후기</a>
                        <a className="dropdown-item" href="/b">영화 후기</a>

                    </div>
                </li>  
           
          <li>
            <div style={{position : 'fixed', left : 1, right : 1, zIndex : -1}}>
            <SearchControll/>         
            </div>
          </li> 
            
            
            </ul>    
          </nav>
          </div>

          
             
                            
      
    )
          }

export default Header;