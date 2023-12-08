import React from 'react'
import RequestCard from './HorizontalCard'

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
const UserInfo = () => {
  return (
    <>
    <h1>User List</h1>
    <div className='request-list'>
      {Object.keys(requestObj).map((key)=>{
        return <RequestCard data={requestObj[key]} cardtype={"info"}/>
      })}
    </div>
    </>
  )
}

export default UserInfo