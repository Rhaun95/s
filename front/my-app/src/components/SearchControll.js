import '../projectCSS/movie.css'
import { Form, Button } from 'react-bootstrap';
import { useState  } from 'react';
import MovieItem from './MovieItem'
import CinemaItem from './CinemaItem';
import StoreItem from './StoreItem';
import { useNavigate } from 'react-router-dom';

function SearchControll() { 
    
    //검색 결과창 hidden controller
    const [searchResult, setSearchResult] = useState(true);

    //검색 이후 폼 value값 초기화 위해서
    const [search,setSearch] = useState('');
    
    //res.json 결과 담을 배열
    const [item, setItem] = useState([])

    // 검색 필터 1-영화 / 2-스토어/ 3-시네마
    const [num,setNum] = useState(1); //default 영화

    const navigate = useNavigate();


    function ChangeValue(e) {
      setSearch(e.target.value);
      setSearchResult(true)// 입력값 바뀔때 결과창 사라지게
    }

    function submitItem(e){
    
        if(num==1){
        if(search==''){
          alert('검색할 내용을 입력하세요!!')         
          navigate('/');          
        }
        else{
        e.preventDefault();
        
        fetch('http://localhost:8080/movie/search', {
            method:'POST',
            headers: {
                'Content-Type': 'text/plain; charset=utf-8',
              },            
              body: search, //text 타입(Spring- String type setting)
        })
        .then((res) => res.json())//response값 movie map형태로 json타입
        .then((res) => {
          if(Array.isArray(res) && res.length===0){
             alert('검색결과가 없습니다.')
             setSearchResult(true)
             
          }
          else{
            setItem(res);
            setSearchResult(false)
            
          }
        
        });
       }
     }
        if(num==2){
          if(search==''){
            alert('검색할 내용을 입력하세요!!')         
            navigate('/');          
          }
          else{
          e.preventDefault();
          
          fetch('http://localhost:8080/store/search', {
              method:'POST',
              headers: {
                  'Content-Type': 'text/plain; charset=utf-8',
                },            
                body: search, //JS Object를 JSON으로 변경해서 던진다
          })
          .then((res) => res.json())
          .then((res) => {
            if(Array.isArray(res) && res.length===0){
              alert('검색결과가 없습니다.')
              setSearchResult(true)
              
            }
            else{
              setItem(res);
              setSearchResult(false)
              
            }
          
          });
      }
    }
        if(num==3){
          if(search==''){
            alert('검색할 내용을 입력하세요!!')         
            navigate('/');          
          }
          else{
          e.preventDefault();
          
          fetch('http://localhost:8080/cinema/search', {
              method:'POST',
              headers: {
                  'Content-Type': 'text/plain; charset=utf-8',
                },            
                body: search, //JS Object를 JSON으로 변경해서 던진다
          })
          .then((res) => res.json())
          .then((res) => {
            if(Array.isArray(res) && res.length===0){
              alert('검색결과가 없습니다.')
              setSearchResult(true)
              
            }
            else{
              setItem(res);
              setSearchResult(false)
              
            }
          
          });
        }
    }
}

    function searchState(e){
        setSearch('')//필터 선택시 검색값 초기화
        setItem([])//반환했던 json 데이터 초기화
        setSearchResult(true)//결과창 hidden 숨기기
        setNum(e.target.value)//select 바뀔때마다 num값 변경
    }

    function searchInput(){
          return (
          <>
          <div style={{display : 'inline-block'}}>
          <Form.Control 
          value={search}
          type="text"
          placeholder="검색할 내용을 입력하세요"
          onChange={ChangeValue}
          name="search"
          />    
          </div>
          <div style={{display : 'inline-block'}}>
            &nbsp;
            <Button variant="danger" type="submit">검색</Button>
          </div> 
          </>                 
          )
    }

    function result(){
        if(num==1){              
          return(                  
          item.map((item) => (                                               
              <MovieItem item={item} key={item.movieId} />))
        )
      }              
        else if(num==2){
            return(
                item.map((item) => (
                  <StoreItem item={item} key={item.movieId}/>))
        )
      }                                                
        else if(num==3){
            return(
                item.map((item) => (
                  <CinemaItem item={item} key={item.movieId}/>))                
        )
      }            
    }

    
    return (
    <>
          <div style={{zIndex : 2}}>
            <Form onSubmit={submitItem} >              
            <div style={{display : 'inline-block'}}>
            <Form.Select onChange={searchState} >
              <option value={1}>영화</option>
              <option value={2}>스토어</option>
              <option value={3}>상영관</option>
             </Form.Select>    
            </div>
            {searchInput()}
            </Form>     
          </div>
       
          <div
            style={{backdropFilter : 'blur(5px)',
            border : 'solid #282c34 5px',
            position : 'fixed', left : 1,right : 1, overflow:'auto', height :'90vh', zIndex : -1}}                       
            hidden={searchResult}>
            <h3 style={{backgroundColor : '#282c34'}}>'{search}' 의 검색 결과입니다!</h3>            
            {result()}          
            <br/>
            <Button 
            variant="danger" 
            type="button" 
            onClick={()=> {setSearchResult(true)}}>검색창 닫기</Button>
          </div>
          
          
    </>
    )
}

export default SearchControll;