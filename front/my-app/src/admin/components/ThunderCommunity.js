import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Pagination_RV from "./Pagination_RV";
import '../css/ThunderCommunity.css';

function ThunderCommunity() {

  const navigate = useNavigate();

  const [thunders, setThunders]  = useState([]);
  const[category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [username, setUsername] = useState("");


  {/* 페이지 네이션 */}
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = thunders.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(()=>{
    getThunders();
  
  },[])



  // useEffect(()=>{

  //   getByAll();

  // },[category,location, username])

  // const getByAll= async()=>{
  //       try{
  //         const temp = await axios.get("http://localhost:8080/thunder/"+category+location+username)
  //         setThunders(temp.data);
    
  //       }catch(error){
  //         console.log("번개 이미지 호출 에러: ",error);
  //       }
  //     }


  useEffect(()=>{

    getByCategory();

  },[category])


  /**
   * * Thunder 데이터
   */
     const getThunders= async()=>{
      try{
        const temp = await axios.get("http://localhost:8080/thunder/")
        setThunders(temp.data) ;
  
      }catch(error){
        console.log("번개 이미지 호출 에러: ",error);
      }
    }

  /**
  //  * * 카테고리별 호출
  //  */
  const getByCategory= async()=>{
    try{
       if(category == "none"){
            getThunders()
        }else{
            axios.get("http://localhost:8080/thunder/selectcategory/"+ category)
            .then((res)=>{
                setThunders(res.data)
             })
         }
    }catch(error){
      console.log("번개 이미지 호출 에러: ",error);
    }
  }
  /**
   * * 영화관별 호출
   */
  useEffect(()=>{
    if(location == "none"){
        getThunders()
    }else{
      axios.get("http://localhost:8080/thunder/selectlocation/"+ location)
    .then((res)=>{
        setThunders(res.data)
    })
  }},[location])

   /**
   * * 유저네임별 호출
   */
  const searchUser=(()=>{
    if(username == ""){
        getThunders()
    }else{
    axios.get("http://localhost:8080/thunder/select/"+ username)
    .then((res)=>{
        setThunders(res.data)
    })
  }})
      
  const changeCategory = (e)=>{
    setCategory(e.target.value)
  }   
  const changeCinema = (e)=>{
    setLocation(e.target.value)
  }   
  const changeUsername = (e)=>{
    setUsername(e.target.value)
  }   



  return (
    <>

    
      <section>
        <div className='container-fluid'>

              <div className='row align-items-center'>
                  <h4 className='text-muted text-center mb-3'>영화관 매출 리스트</h4>
                  
                  <div>
                    유저 검색 <input type="text" onChange={changeUsername} name="username" placeholder='검색할 유저 아이디' value={username}/>
                    <button onClick={searchUser}>검색</button>
                  </div>
                  <select name="category" onChange={changeCategory} value={category}>
                    <option value="">카테고리</option>
                    <option value="같이보기">같이보기</option>
                    <option value="이벤트 투어">이벤트 투어</option>
                  </select>

                  <select name="location" onChange={changeCinema}>
                        <option value="">영화관 </option>
                        <option value ="장승배기" name="location">장승배기</option>
                        <option value ="남양주" name="location">남양주</option>
                        <option value ="건대" name="location">건대</option>
                        <option value ="부천" name="location">부천</option>
                        <option value ="가산" name="location">가산</option>
                        <option value ="한강" name="location">한강</option>
                    </select>

                  <table className='table bg-light text-center '>                    
                    {/* 테이블별 헤더 */}
                    <thead >
                      <tr className='text-muted'>
                        <th> #</th>
                        <th>등록자</th>
                        <th> 제목</th>
                        <th> 카테고리</th>
                        <th> 영화관</th>
                        <th> 등록 날짜</th>   
                        <th> 상세보기</th>                     
                      </tr>
                    </thead>
                    {/* 내용 */}
                    <tbody>
                      {currentPosts.map((thunder)=>(
                        <>
                        <tr>
                          <th>{thunder.id}</th>
                          <th>{thunder.username}</th>
                          <th>{thunder.title}</th>
                          <th>{thunder.category}</th>
                          <th>{thunder.location}</th>
                          <th>{thunder.regdate.substring(0,10)}</th>
                          <th><button type="button" className="btn btn-info btn-sm" onClick={(e)=>{
                            navigate("/user/thunder/"+thunder.id, {state: thunder})
                        }}>클릭</button></th>
                        </tr>
                        </>
                      ))}
                      
                    </tbody>
                  </table>
                 
                </div>

        </div>
        <Pagination_RV postsPerPage={postsPerPage} totalPosts={thunders.length} currentPage={currentPage}
                               paginate={paginate}></Pagination_RV>
      </section>
    </>
  );
}

export default ThunderCommunity;