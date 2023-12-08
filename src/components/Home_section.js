import React from 'react'
import Home_List from './Home_List'

const Home_section = ({data,limit,type}) => {

    let headingtype = {
        art : 'Art Collection',
        blog : 'Educational Content',
        event : 'Exhibitions & Events'
    }
  return (
    <div className='home-section'>
         <h2>{headingtype[type]}</h2>
         <Home_List data={data} type={type}/>
         {limit &&
         <button class="view-more-btn">View More</button>
        }

    </div>
  )
}

export default Home_section