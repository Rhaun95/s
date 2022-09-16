import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Header from '../../Header/Header'
import './css/ThunderMap.css';
import { useNavigate } from 'react-router-dom';

import { Map, MapMarker,CustomOverlayMap,MarkerClusterer, useMap } from "react-kakao-maps-sdk";
import ThunderBoardItem from './components/ThunderBoardItem';

import {useSelector, useDispatch} from 'react-redux';

//Map과(Marker) 계시글 형식
const ThunderMap = () => {
    const navigate = useNavigate();

    //임시
    const postList = useSelector((state)=> state.basket.movieList);
    const dispatch = useDispatch();


    const [thunders, setThunders]  = useState([]);
    const [location, setLocation] = useState("모두보기");


    useEffect(()=>{
        getThunders()
    },[])

    useEffect(()=>{
        console.log("location",location)
        if(location == "none" || location =="모두보기"){
            getThunders()
        }else{
        axios.get("http://localhost:8080/thunder/selectlocation/"+ location)
        .then((res)=>{
            setThunders(res.data)
        })
    }

    },[location])


    const getThunders= async()=>{
        
        try{
          const temp = await axios.get("http://localhost:8080/thunder/")
          setThunders(temp.data) ;
    
        }catch(error){
          console.log("번개 이미지 호출 에러: ",error);
        }
    }

    const changeLocation = (e)=>{
        setLocation(e.target.value)
     }
       
     function toInsert(e){
        navigate("/user/thunderInsert");
    } 
    function toCard(e){
        e.preventDefault();
        navigate("/user/thunder");
    }


    const EventMarkerContainer = ({thunder}) => {
        const map = useMap()
        const [isVisible, setIsVisible] = useState(false)
  
    
        return (

          <MapMarker
            position={{ lat:thunder.lat, lng:thunder.lng }} // 마커를 표시할 위치
            onClick={(marker) => {
                map.panTo(marker.getPosition())
                
            }}
            onMouseOver={() => setIsVisible(true)}
            onMouseOut={() => setIsVisible(false)}
          >
           
                {isVisible && <div  className='marker_content' >
                                <div>
                                    <img src={thunder.image} alt="" width="80px" height="100px"/>
                                </div>
                                <div style={{display:"flex", flexDirection:"column", alignItems:"baseline"}}>
                                    <div>제목 : {thunder.title}</div>
                                    <div>카테고리 : {thunder.category}</div>
                                </div>
                                    
                              </div>}
          </MapMarker>
        )
      }
    
    return (
        <>
        <Header/> 
        <h1 style={{marginTop:"100px"}}>ThunderMap 임</h1>

        <div className="thunderMap_container">
            <div className="thunderMapBoard_container">
                <div className="thunderMapBoard_container_title">모임 리스트</div>
                
                {thunders.map((thunder)=>(
                    <>
                     <ThunderBoardItem thunder={thunder} onMouseOver={()=>{}}/>
                    </>
                ))}
            </div>

            <div className="map_container">
            <button type="button" className="toMap" onClick={toCard}>카드로 보기</button>
                <select name="location" onChange={changeLocation} value={location}>
                    <option value="none">모두 보기</option>
                    <option value="건대" >건대</option>
                    <option value="남양주">남양주</option>
                    <option value="장승배기" >장승배기</option>
                    <option value="가산" >가산</option>
                    <option value="부천">부천</option>
                    <option value="한강" >한강</option>
                </select>
                <button onClick={toInsert}>번개 등록</button>
                <Map className='map_item'
                    center={{ lat: 37.5973028, lng: 127.0291826 }}
                    level={9}>
                
                    {thunders.map((thunder)=>(
                        <>
                        
                            <EventMarkerContainer
                                key={`EventMarkerContainer-${thunder.lat}-${thunder.lng}`}
                                thunder={thunder}
                            />
                        </>
                    ))}

                </Map>
            </div>
        </div>

        </>
    );
};

export default ThunderMap;