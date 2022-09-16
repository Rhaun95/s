import React, {useEffect, useState} from "react";
import Header from '../../Header/Header';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import '../../projectCSS/board.css';
import Pagination_B from "./Pagination_B";


function Board() {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);



    //페이지네이션//
    const [currentPage, setCurrentPage] = useState(1);
    //한페이지에 보이는 게시글 수
    const [postsPerPage] = useState(15);
    //마지막 게시물 번호 = 현재 페이지 넘버 * 15
    const indexOfLastPost = currentPage * postsPerPage;
    //첫 번째 게시물 번호 = 마지막 게시물 번호 -
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    //해당 페이지에서 보여질 포스트들을 맵 써서 보여줌
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [totalPage, setTotalPage] = useState(1);
    /*const blockCount = totalPages/5;*/

    useEffect (() => {
        const lastPage = Math.ceil(posts.length / postsPerPage);
        setTotalPage(lastPage? lastPage: 1);
    },[posts]);



    useEffect(() => {
        fetch("http://localhost:8080/Bo/board", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                setPosts(res)
                console.log(setPosts)
            });

    }, []);

    const moveToInsert = () => {
        navigate('/boardInsert')
    }


    return (
        <>
            <Header/>
            <div className="container">
            <div className="board_wrap">
                <div className="board_title">
                    <strong>공지사항 및 문의게시판</strong>
                    <p>공지사항을 숙지해주시기 바랍니다. 문의글은 3일내에 답변드립니다.</p>
                </div>
                <div className="board_list">
                    <div className="top">
                        <div className="type">유형</div>
                        <div className="title">제목</div>
                        <div className="user_id">작성자</div>
                        <div className="regDate">작성일</div>
                        <div className="hit">조회</div>
                    </div>
                    <div>
                        {currentPosts.map(post => (
                            <div className="map" key={post.id}>
                                 {/*<td>{post.id}</td>*/}
                                <div className="type">{post.type}</div>
                                <div className="title"
                                     onClick={
                                         (e) => {
                                             axios.put("http://localhost:8080/Bo/board/addHit/" + post.id,
                                                 post)
                                                 .then(response => console.log(response.data))

                                             navigate('/board/' + post.id)
                                         }
                                     }>{post.title}</div>
                                <div className="user_id">{post.user_id}</div>
                                <div className="regDate">{post.regDate}</div>
                                <div className="hit">{post.hit} </div>
                            </div>
                        ))}

                    </div>
                </div>
                <br/>
                <button className="btn" onClick={moveToInsert}>글쓰기</button>


            </div>
                <Pagination_B postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} setCurrentPage={setCurrentPage} totalPage={totalPage}
                              paginate={paginate}></Pagination_B>
            </div>
        </>
    )

}

export default Board;