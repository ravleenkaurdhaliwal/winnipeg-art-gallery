import React from 'react'
import Image_card from './Image_card'
import Blog_card from './Blog_card'


const Home_List = ({data,type}) => {
    //console.log(props)
  return (
    <div className='home-list'>
        {data && data.map((value,key)=>{
            return (
                <>
                {/* {type === 'art' && */}
                <Image_card data={value} type={type}/>
                {/* } */}
                 {/* {type === 'blog' &&
                <Blog_card/>
                } */}

                </>
            )
        })

        }

    </div>
  )
}

export default Home_List