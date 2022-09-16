import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react"
import '../../projectCSS/boardDetails.css'
import Comment from "../Comment/Comment";
import Header from "../../Header/Header";



//상세보기 (details)
function BoardDetails(props) {
    let {id} = useParams()
    const navigate = useNavigate();
    const [title, setTitle] = useState([]);

    const [item, setItem] = useState([]);


    useEffect(() => {

        fetch('http://localhost:8080/Bo/board/' + id)
            .then((res) => res.json())
            .then((res) => setItem(res))
    }, []);
    console.log(item)


    const deleteList = (e) => {
        e.preventDefault();
        axios.delete("http://localhost:8080/Bo/board/ " + id)
            .then((res) => {

                console.log(typeof res, res);
                navigate("/board");
            })
    }

    const movetoUpdateForm = (e) => {

        navigate("/boardUpdate/" + id);
    }

    const home = (e) => {
        navigate("/board");
    }


    // 이전글, 다음글


    const prevPage = (e) => {
       /* navigate("/board/" + item.prev)*/
        if (item.prev != 9999) {
            navigate('/board/movePage/' + item.prev, {state: {id: item.prev}})
        }
        else{
            setTitle('이전 글이 없습니다.')
        }


    }

    const nextPage = (e) => {
        if (item.next != 9999) {
            navigate('/board/movePage/' + item.next, {state: {id: item.next}})
        }
    }


    return (
        <>
            <Header/>
            <div className="board_wrap">
                <div className="board_title">
                    <strong>문의게시판</strong>
                    {/*<p>공지사항을 빠르고 정확하게 안내해드립니다.</p>*/}
                </div>
                <div className="board_view_wrap">
                    <div className="board_view">
                        <div className="title">
                            {item.title}
                        </div>
                        <div className="info">
                            <dl>
                                <dt>번호</dt>
                                <dd>{item.id}</dd>
                            </dl>
                            <dl>
                                <dt>글쓴이</dt>
                                <dd> {item.user_id}</dd>
                            </dl>
                            <dl>
                                <dt>작성일</dt>
                                <dd>{item.regDate}</dd>
                            </dl>
                            <dl>
                                <dt>조회</dt>
                                <dd>{item.hit}</dd>
                            </dl>
                        </div>
                        <div className="cont">
                            {item.content}
                        </div>
                    </div>
                    <div className="bt_wrap">

                        <button onClick={deleteList}>삭제</button>
                        <button onClick={movetoUpdateForm}>수정</button>
                        <button onClick={home}>홈</button>
                    </div>

                    <br/>
                    <div>
                        <div className="move_page">
                            <p>&#x25b2;</p>
                            <span onClick={prevPage}>{item.prevTitle }</span>
                        </div>

                        <div className="move_page">
                            <p>    &#9660;</p>
                            <span onClick={nextPage}>{item.nextTitle}</span>
                        </div>

                    </div>

                </div>
                <br/>
                <br/>
                <br/>

                <Comment id={id}/>
            </div>

        </>


    );
}


export default BoardDetails;