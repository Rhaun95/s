import React, {useEffect, useState} from 'react';
// import axios from 'axios';
import Header from "../../Header/Header";
import {useNavigate} from "react-router-dom";
import Pagination_RV from "./Pagination_RV";
import '../../projectCSS/reviewBoard.css'

function ReviewBoard(props) {

    const navigate = useNavigate();

    const [reviews, setReviews] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(15);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = reviews.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetch("http://localhost:8080/RB/reviewBoard", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((res) => {
                setReviews(res)
                console.log(setReviews)
            });
    }, []);

    const moveToInsert = () => {
        navigate('/ReviewInsert')
    }


    return (<>
            <Header/>
            <div>
                <div className="board_wrap">
                    <div className="board_title">
                        <strong>자유게시판</strong>
                        <p>당신의 후기를 남겨주세요! </p>
                    </div>
                    <select className="btn_rv">
                        <option value="none"> ===선택===</option>
                        <option value="">영화관 후기</option>
                        <option value="">영화후기</option>
                        <option value="">번개모임</option>
                        <option value="">인기글 모아보기</option>
                    </select>
                    <div className="board_list">
                        <div className="top">
                            <div className="type">유형</div>
                            <div className="title">제목</div>
                            <div className="user_id">작성자</div>
                            <div className="regDate">작성일</div>
                            <div className="hit">조회</div>
                        </div>
                        <div>
                            {currentPosts.map(reviews => (<div className="map" key={reviews.id}>
                                {/* <td>{post.id}</td>*/}
                                <div className="type">{reviews.type}</div>
                                <div className="title"
                                    /*    onClick={
                                            (e) => {
                                                axios.put("http://localhost:8080/Bo/board/addHit/" + reviews.id,
                                                    reviews)
                                                    .then(response => console.log(response.data))

                                                navigate('/board/' + reviews.id)
                                            }
                                        }*/>{reviews.title}</div>
                                <div className="user_id">{reviews.user_id}</div>
                                <div className="regDate">{reviews.regDate}</div>
                                <div className="hit">{reviews.hit} </div>
                            </div>))}

                        </div>
                    </div>
                    <br/>
                    <button className="btn" onClick={moveToInsert}>글쓰기</button>


                </div>
                <Pagination_RV postsPerPage={postsPerPage} totalPosts={reviews.length} currentPage={currentPage}
                               paginate={paginate}></Pagination_RV>
            </div>
        </>

    );
}

export default ReviewBoard;