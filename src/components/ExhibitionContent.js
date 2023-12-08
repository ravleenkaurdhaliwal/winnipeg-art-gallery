import Home_section from './Home_section'
import axios from 'axios';
import React, { useEffect,useContext, useState } from 'react'

import { APIURL } from '../utils/globalData';

const ExhibitionContent = () => {

  const [contentData, setContenttData] = useState([]);

useEffect(()=>{
  axios.get(`${APIURL}/getContents&type=event`)
  .then(response => {
    console.log('Response:', response.data.results.data);
  
    if(response.data.results.errorCode == "0"){
      if(response.data.results.data != ""){
        setContenttData(response.data.results.data)
        }
    }else{
       alert("something went wrong");
       
    }
  })
  .catch(error => {
  
    console.error('Error:', error);
   
  });

},[])
  return (
    <div>
       {contentData.length >= 1 &&
       <Home_section data={contentData} type="event" limit={false}/>
      }
      {contentData.length <= 0 &&
     <div>Add data from Admin Dashboard</div>
     }
    </div>
  )
}

export default ExhibitionContent