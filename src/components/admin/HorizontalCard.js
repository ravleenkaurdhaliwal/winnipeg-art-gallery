import React, { useState } from 'react'
import axios from 'axios';
import { APIURL } from '../../utils/globalData';
import { Link ,useNavigate,useSearchParams} from 'react-router-dom'

const HorizontalCard = ({data,cardtype,setReqtData}) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const paramValue = searchParams.get('paramName');
  const [refreshPage,setRefresh] = useState(true);
  console.log("data",data)
  const handleAction = (action,mobile,content_id="")=>{
    axios.get(`${APIURL}/requestsAction&type=${action}&mobile=${mobile}&content_id=${content_id}`)
    .then(response => {
      console.log('Response:', response.data.results.data);
    
      if(response.data.results.errorCode == "0"){
       // setReqtData([...response.data.results.data])
      // setRefresh(prevState => !prevState);
      handleForceUpdate()
      }else{
         alert("something went wrong");
         
      }
    })
  }
  const handleForceUpdate = () => {
   // setRefresh(prevState => !prevState);// Toggling the state value to force re-render
   window.location.reload();
  };

  const handleEditDelete = (action,content_id,content_type)=>{
    if(action == "edit"){
      navigate("/admin/add-content?content_id="+content_id+"&content_type="+content_type)
    }else{
      axios.get(`${APIURL}/requestsAction&type=${action}&content_id=${content_id}`)
      .then(response => {
        console.log('Response:', response.data.results.data);
      
        if(response.data.results.errorCode == "0"){
         // setReqtData([...response.data.results.data])
         //setRefresh(prevState => !prevState);
         handleForceUpdate()
        }else{
           //alert("something went wrong");
           
        }
      })
    }

  }
  return (
    <div className='requestcardmain'>
        <div className='request-data'>
          {Object.keys(data).map((key,indx)=>{
            return(
              <>
              {key != "data" &&
               <div className=''>{key} : {data[key]}</div>
              }
               {key == "data" &&
               <>
                {Object.keys(data['data']).map((datakey,indx)=>{
                  return (
                    <>
                    {datakey.indexOf("image") > -1 &&
                    <div className=''>
                      <img src={`data:image/jpeg;base64,${data['data'][datakey]}`} className="uploadedimg"/>
                    </div>

                    }
                    {datakey.indexOf("image") == -1 &&
                      <div className=''>{datakey} : {data['data'][datakey]}</div>
                    }
                    </>
                  )
                })

                }
                </>
               }
              </>
            )
          })

          }
            {/* <div className=''>name : {data.name}</div>
            <div className=''>name : {data.desc}</div>
            <div className=''>name : {data.date}</div> */}

        </div>
        {cardtype === "request" &&
        <div className='request-button'>
            <button className='view-more-btn' onClick={()=>handleAction("accept",data.mobile,data.content_id)}>accept</button>
            <button className='view-more-btn' onClick={()=>handleAction("reject",data.mobile,data.content_id)}>reject</button>
          
        </div>
        }
        {cardtype === "edit" &&
        <div className='request-button'>
            <button className='view-more-btn' onClick={()=>handleEditDelete("edit",data.content_id,data.type)}>edit</button>
            <button className='view-more-btn' onClick={()=>handleEditDelete("delete",data.content_id,data.type)}>delete</button>
        </div>
        }

    </div>
  )
}

export default HorizontalCard