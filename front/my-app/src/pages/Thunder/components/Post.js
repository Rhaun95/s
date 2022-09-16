import React from 'react';
import {Card} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Tag from './Tag';


const Post = (props) => {

    const{id, username, title, image, category, content, regdate, tags} = props.thunder;

   
    const tagdata = tags.split(",");

    const date = regdate.substring(0,10);
    console.log(tagdata)
    console.log(tagdata[0])


    return (
        <>
            <Card className='post_box'>
            <div className="post_front">
                <Card.Img variant="top" src= {image} />
                <Card.Body className="post_body">
                    <div className="title">{title}</div>
                
                <div>
                    {tagdata.map((tag)=>(
                        <>
                        {
                        tag =="#20대"?<Tag twenty>{tag}</Tag>:
                         (tag =="#30대"?<Tag thirdty>{tag}</Tag>:
                          (tag =="#조조"?<Tag early>{tag}</Tag>:
                           (tag=="#코미디"?<Tag comedy>{tag}</Tag>:
                            (tag=="#로맨스"?<Tag romance>{tag}</Tag>:<Tag twenty>{tag}</Tag>)
                           ))
                          )
                        } 
                        </>
                    ))}  
                </div>
                    {/* <Card.Text  className="inhalt">
                        {date}
                    </Card.Text> */}
                </Card.Body>
                
            </div>
       
            <div className="post_back">
                <div>
                    <p>{title}</p>
                    <p>주최자 : {username}</p>
                    <p>카테고리: {category}</p>
                    <p>제한 : 20세 이상</p>
                </div>
            </div>  
            </Card>
        </>
    );
};

export default Post;