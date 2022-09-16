import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ThunderBoardItem.css';


const BoardItem=(props)=>{
  const{id, title, image}= props.thunder;

  const navigate= useNavigate();

  function view(e){
    e.preventDefault();
    navigate('/user/thunder/'+ id, {state: props.thunder});
  }

  return(
    <>
    
      <div className="thunderBoardItem">
        <div className="boardItem_content">
          <div className='imgbox'>
            <img src={image} width="50px" height="50px" alt=''/>
          </div>
          <div className="sub_content">
            <div>제목: {title} </div> 
            <div> id : {id}</div>
          </div>
        </div>
          <button className="boardItem_btn" onClick={view}>게시글 보기</button>
      </div>

      
    </>
  );
}



export default BoardItem;