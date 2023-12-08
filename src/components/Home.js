import React from 'react'
import Home_section from './Home_section'

const Home = () => {
  return (
    <div>
        <Home_section data={[1,2,3]} type="art" limit={true}/>
        <Home_section data={[1,2,3]} type="blog" limit={true}/>
       
    </div>
  )
}

export default Home