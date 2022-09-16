import React, {useState} from 'react';
import Header from "../../Header/Header";
import {Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../../projectCSS/boardForm.css'
import moment from "moment";

function BoardForm(props) {

    const navigate = useNavigate();
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    const [val, setVal] = useState({


        regDate: nowTime.toString()

    })


    const ChangeValue = (e) => {
        console.log(e.target.name, e.target.value);
        setVal({
            ...val,
            [e.target.name]: e.target.value,

        });
    }


    const addBoard = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/Bo/board", {
            method: "POST", headers: {
                "Content-Type": "application/json", charset: "utf-8"
            }, body: JSON.stringify(val),

        })
            .then((res) => res.json())
            .then((res) => {
                if (res == 1) {
                    console.log('추가 성공');
                    console.log(res);
                    navigate('/board');
                } else {
                    alert("문의글 등록에 실패하셨습니다. 빈칸 없이 작성해주시기 바랍니다.");
                    console.log('추가 실패');
                }
            });
    }


    const returnBoard = (e) => {
        navigate("/board");
    }


    return (
        <>
            <Header/>
            <div className="board_wrap">
                <div className="board_title">
                    <strong>문의게시판</strong>
                    <p>문의사항을 적어주시면 최대 3일내에 답변드리겠습니다.</p>
                </div>
                <Form className="board_write" onSubmit={addBoard}>
                    <div className="board_write_wrap">
                        <div className="title">
                            <dl>
                                <dt>제목</dt>
                                <dd><input type="text" placeholder="제목 입력" name="title" onChange={ChangeValue}
                                           value={val.title}/>
                                </dd>
                            </dl>
                        </div>
                        <div className="info">
                            <dl>
                                <dt>아이디</dt>
                                <dd><input type="text" placeholder="아이디 입력" name="user_id" onChange={ChangeValue}
                                           value={val.user_id}/></dd>
                            </dl>
                            <dl>
                                <dt> 문의글 유형 </dt>
                                <dd>
                                    <select name="type" onChange={ChangeValue}>
                                        <option value="none">=== 선택 ===</option>
                                       <option value ={val.type}>예매취소</option>
                                       <option value ={val.type}>매점문의</option>
                                       <option value ={val.type}>기타문의</option>
                                       <option value ={val.type}>이벤트문의</option>
                                    </select>
                                </dd>
                            </dl>
                        </div>
                        <div className="cont">
                            <textarea cols="70" rows="30" placeholder="내용 입력" name="content" onChange={ChangeValue}
                                      value={val.content}></textarea>
                        </div>

                    </div>

                    <div className="bt_wrap">
                        <button type="submit" className="on">등록</button>
                        <button onClick={returnBoard}>취소</button>
                    </div>
                </Form>
            </div>
        </>);
}

export default BoardForm;