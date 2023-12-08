import React, { useEffect,useContext, useState } from 'react'
import RequestCard from './HorizontalCard'
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { APIURL } from '../../utils/globalData';

let requestObj = {
  "content1":{
    name:"abc",
    desc:"Web Development broadly refers to the tasks associated with developing functional websites and applications for the Internet. The web development process includes web design, web content development, client-side/server-side scripting and network security configuration, among other tasks.",
    date:"23/12/2023"
  },
  "content2":{
    name:"abc",
    desc:"Web Development broadly refers to the tasks associated with developing functional websites and applications for the Internet. The web development process includes web design, web content development, client-side/server-side scripting and network security configuration, among other tasks.",
    date:"23/12/2023"
  },
  "content3":{
    name:"abc",
    desc:"Web Development broadly refers to the tasks associated with developing functional websites and applications for the Internet. The web development process includes web design, web content development, client-side/server-side scripting and network security configuration, among other tasks.",
    date:"23/12/2023"
  }
}
const ContentsInfo = () => {
const  {userinfo:{sid,usertype}}  = useContext(AuthContext);
  const [contentData, setContenttData] = useState([]);


  useEffect(()=>{
    axios.get(`${APIURL}/requests&usertype=edit`)
    .then(response => {
      console.log('Response:', response.data.results.data);
    
      if(response.data.results.errorCode == "0"){
        setContenttData(response.data.results.data.contentData)
      }else{
         alert("something went wrong");
         
      }
    })
    .catch(error => {
    
      console.error('Error:', error);
     
    });
  
  },[])
  return (
    <>
    <h1>Content List</h1>
    {/* <div className='request-list'>
      {Object.keys(requestObj).map((key)=>{
        return <RequestCard data={requestObj[key]} cardtype={"edit"}/>
      })}
</div> */}
    {contentData?.length > 0 &&
    <div className='request-list'>
      <div>Edit/Delete Content</div>
      {contentData?.map((val,key)=>{
        return <RequestCard data={val} cardtype="edit" setReqtData={setContenttData}/>
      })}
    </div>
}
    </>
  )
}

export default ContentsInfo