import React, { useEffect,useContext, useState } from 'react'
import RequestCard from './HorizontalCard'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { APIURL } from '../../utils/globalData';



const Requests = () => {
  const  {userinfo:{sid,usertype}}  = useContext(AuthContext);
  const [requestData, setReqtData] = useState([]);
  const [contentData, setContenttData] = useState([]);

useEffect(()=>{
  axios.get(`${APIURL}/requests&usertype=${usertype}`)
  .then(response => {
    console.log('Response:', response.data.results.data);
  
    if(response.data.results.errorCode == "0"){
      setReqtData(response.data.results.data.userData)
      setContenttData(response.data.results.data.contentData)
    }else{
       alert("something went wrong");
       
    }
  })
  .catch(error => {
  
    console.error('Error:', error);
   
  });

},[])
console.log("requestData",requestData)
  return (
    <>
    {requestData?.length > 0 &&
    <div className='request-list'>
      <div>User Request</div>
      {requestData?.map((val,key)=>{
        return <RequestCard data={val} cardtype="request" setReqtData={setReqtData}/>
      })}
    </div>
    }
     {contentData?.length > 0 &&
    <div className='request-list'>
      <div>Content Request</div>
      {contentData?.map((val,key)=>{
        return <RequestCard data={val} cardtype="request" setReqtData={setContenttData}/>
      })}
    </div>
    }
    </>
  )
}

export default Requests