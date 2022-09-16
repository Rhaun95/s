import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import '../../projectCSS/comment.css'
// import axios from "axios";

function Comment(props) {
    const id = props.id;

    // let {id} = useParams()
    const [comments, setComments] = useState([])
    /*    const [switchOn, switchChange] = useState(false)*/
/*    let switchOn = false;*/

    useEffect(() => {
        fetch('http://localhost:8080/Co/comment/' + id)

            .then((res) => res.json())
            .then((res) => {
                setComments(res)
                console.log(setComments)
            });
    }, []);

    /*   const change =(e) =>{
           if(!comments){
               console.log(comments)
               switchOn = false; //수정
               if(switchOn === false){
                   navigate('/commentInsert/' + id)
               }
           }
           else{
               console.log(comments)
               switchOn = true;
               if(switchOn === true) {

                   navigate('/commentUpdate/' +id)

               }}}*/

    /*
        const update = (e) => {
            navigate('/commentUpdate/' + id)
        }
    */
/*
    const insert = (e) => {
        navigate('/commentInsert/' + id)
    }*/


    const navigate = useNavigate()


    return (
        <>
            <div className="container_comment">
                {/*{comments.id}
            {comments.user_id}*/}
                <span> {comments.title}</span>
                <span>{comments.content}</span>
                <span> {comments.regDate}</span>
                <span>{comments.posting_num}</span>
            </div>


            <div>
                {comments.title != null ?
                    <button onClick={() =>
                    navigate('/commentUpdate/' + id, {state : {id : id }})}>수정</button> :
                    <button onClick={()=>
                    navigate('/commentInsert/' + id, {state : {id : id }})}>등록</button>}
            </div>
        </>
    );


}

export default Comment;