import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Form} from "react-bootstrap";
import '../../projectCSS/boardUpdateForm.css'
import moment from "moment";
import 'moment/locale/ko';



function BoardUpdateForm() {

    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    let {id} = useParams()
    const navigate = useNavigate()
    const [val, setVal] = useState({
        /*      id: '',*/
        user_id: '',
        title: '',
        content: '',
        regDate: ''

    })


    const ChangeValue = (e) => {
        console.log(e.target.name, e.target.value);
        setVal({
            ...val,
            regDate: nowTime.toString(),
            [e.target.name]: e.target.value
        });
    }


    useEffect(() => {
        fetch('http://localhost:8080/Bo/board/' + id, {
            method: 'GET'
        })

            .then((res) => res.json())
            .then((res) => setVal(res));
        console.log(val)

    }, [])

    const returnBoard =(e) => {
        navigate("/board/" + id)
    }

    const updateBoard = (e) => {
        e.preventDefault()
        fetch("http://localhost:8080/Bo/board/" +id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json", charset: "utf-8"
            },
            body: JSON.stringify(val),

        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res)
                if (res != null) {
                    console.log('추가 성공');
                    console.log(res);
                    navigate('/board');
                } else {
                    navigate('/board/'+id);
                    console.log('추가 실패');
                }
            });
    }



    return (
        <div className="update_Container">
            <Form onSubmit={updateBoard} >
            <div className="write">
                아이디: <input type="text" name="user_id" placeholder="아이디" value={val.user_id} onChange={ChangeValue}/>
                제목: <input type="text" name="title" placeholder="제목" onChange={ChangeValue} value={val.title}/>
                내용: <textarea cols="70" rows="30" placeholder="내용" name="content" onChange={ChangeValue}
                              value={val.content}></textarea>
          {/*      작성일:<input type="text" name="regDate" onChange={ChangeValue} value={val.regDate}/>*/}
            </div>
            <div>
                <button type="submit">등록</button>
                <button onClick={returnBoard}>취소</button>
            </div>
        </Form>
        </div>



    );
};

export default BoardUpdateForm;