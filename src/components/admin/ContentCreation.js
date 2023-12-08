import React, { useEffect } from "react";
import { useState } from "react";
import {APIURL} from '../../utils/globalData'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link ,useNavigate,useSearchParams} from 'react-router-dom'
import axios from 'axios';


let initialState = {
  contenttype: "art",
  contentname: "",
  description: "",
  date: "",
content_id:"",
  //image:[],
};


const ContentCreation = () => {
  const  {userinfo:{uid}}  = useContext(AuthContext);
const [searchParams] = useSearchParams();
  let content_id = searchParams.get('content_id');
  let content_type =  searchParams.get('content_type');
  const [inputs, setInputs] = useState(initialState);
  const [createObjectURL, setCreateObjectURL] = useState(
    initialState.profile_image
  );
  const [base64Img,setbase64Img] = useState("");
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');

  useEffect(()=>{
    if(content_id != undefined && content_id != ""){
    axios.get(`${APIURL}/getContentbyid&id=${content_id}&type=${content_type}`)
    .then(response => {
      console.log('Response:', response.data.results.data);
      // "content_id": "31142799",
      //       "title": "event",
      //       "type": "event",
      //       "author_id": "9",
      //       "description": "hello",
      //       "status": "0",
      //       "event_id": "2",
      //       "event_name": "IMG-20171223-WA0011.jpg",
      //       "event_date": "2023-12-06",
      //       "related_content_id": "31142799",
      //       "event_image":
    
      if(response.data.results.errorCode == "0"){
        if(response.data.results.data != ""){
          let imageurl = "";
          let event_date="";
          if(response.data.results.data.type == "event"){

           imageurl =  response.data.results.data.event_image;
           event_date = response.data.results.data.event_date
          }else if(response.data.results.data.type == "art"){
            imageurl =  response.data.results.data.art_image;
          }else if(response.data.results.data.type == "education"){
            imageurl =  response.data.results.data.education_image;
          }
          //let {type,title,description,event_date,event_image} =  response.data.results.data;
          // contenttype: "",
          // contentname: "",
          // description: "",
          // date: "",
          setInputs((prevState) => ({ ...prevState, "contenttype": response.data.results.data.type, "contentname": response.data.results.data.title, "description": response.data.results.data.description, "date": event_date,"content_id":response.data.results.data.content_id }));
          setbase64Img(imageurl);
          }
      }else{
         alert("something went wrong");
         
      }
    })
    .catch(error => {
    
      console.error('Error:', error);
     
    });
  }
  
  },[])

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
      const i = e.target.files[0];
      let imgUrl = URL.createObjectURL(i);
      setCreateObjectURL(imgUrl);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        formData.append(key, inputs[key]);
      }
    }
    formData.append('image', file);
    formData.append('uid', uid);

    try {
      const response = await fetch(`${APIURL}/addContent`, {
        method: 'POST',
        body: formData,
      });

      if(response.data.results.errorCode == "0"){
        setInputs(initialState);
        setFile(null)
        setCreateObjectURL(null)
       alert("Content created successfully");
      }else{
         alert("something went wrong");
         
      }
    } catch (error) {
      alert("Content created successfully");
      console.error('Error:', error);
    }
  };
  const handleOnchange = (event) => {
    const { name, value } = event.target;
    // let imgarr = [];
    // if(name === "image"){
    //     imgarr = [...inputs.image]
    //     imgarr.push(value)
    //     setInputs((prevState) => ({ ...prevState, [name]: imgarr }));
    //}else{
        setInputs((prevState) => ({ ...prevState, [name]: value }));
    //}
    
  };
  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      let imgUrl = URL.createObjectURL(i);
      setCreateObjectURL(imgUrl);
    //  handleOnchange({target:{value:imgUrl, name:"image"}});
    }
  };

  useEffect(()=>{
    console.log("input",inputs)
  },inputs,setInputs)

  return (
    <div>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="formbold-mb-5">
              <label className="formbold-form-label">Select Content Type</label>
              <select
                name="contenttype"
                className="formbold-form-input"
                value={inputs.contenttype}
                onChange={handleOnchange}
              >
                <option value={"art"}>Art</option>
                <option value={"event"}>Event/Exhibition</option>
                <option value={"education"}>Education</option>
              </select>
            </div>
            <div className="formbold-mb-5">
              <label className="formbold-form-label">Content Name</label>
              <input
                type="text"
                name="contentname"
                id="contentname"
                placeholder="Enter your content name"
                className="formbold-form-input"
                value={inputs.contentname}
                onChange={handleOnchange}
              />
            </div>
            <div className="formbold-mb-5">
              <label className="formbold-form-label">Description</label>
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Enter description about content"
                className="formbold-form-input"
                value={inputs.description}
                onChange={handleOnchange}
              />
            </div>

            <div className="formbold-mb-5">
              <label className="formbold-form-label">
                Event/Exhibition Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                // value="2018-07-22" min="2018-01-01" max="2018-12-31"
                placeholder="Enter event date"
                className="formbold-form-input"
                value={inputs.date}
                onChange={handleOnchange}
              />
            </div>

            <div className="mb-6 pt-4">
              <label className="formbold-form-label formbold-form-label-2">
                Upload File
              </label>

              <div className="formbold-mb-5 formbold-file-input">
                {/* <input type="file" name="file" id="file" onChange={uploadToClient}/> */}
                <label>
                  <div>
                    <span className="formbold-drop-file">
                      {" "}
                      Drop files here{" "}
                    </span>
                    <span className="formbold-or"> Or </span>
                    <div className="formbold-browse"> Browse
                    <input type="file" name="file" id="file" onChange={handleFileChange} />  </div>
                  </div>
                </label>
              </div>

              {/* {inputs.image?.length > 0 && (
                <div className="uploadedimgdiv">
                {inputs.image.map((imgval)=>{
                    return  <img src={imgval} className="uploadedimg" />
                })
               
                }
                </div>
              )} */}
              {createObjectURL && base64Img == "" && 
                 <div className="uploadedimgdiv">
                   <img src={createObjectURL} className="uploadedimg" />
</div>
              }
              {base64Img != "" &&
                 <div className='uploadedimgdiv'>
                 <img src={`data:image/jpeg;base64,${base64Img}`} className="uploadedimg"/>
                   </div>
              }
            </div>

            <div>
              <button className="formbold-btn w-full" type="submit">
                Send File
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentCreation;
