import React from 'react'

const Blog_card = () => {
  return (
    <div className="card-container">
    <div className="card-image">
      <img src="https://images.unsplash.com/photo-1506422748879-887454f9cdff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="a city full of buildings" />
    </div>
    <div className="card-body">
      <span className="card-badge card-badge-pink">Engineering</span>
      <h1>
        Living in downtown in the biggest cities
      </h1>
      <p className="card-subtitle">
        Citizens of the biggest cities in the world talk about their lives
      </p>
      <div className="card-author">
        <img src="https://images.unsplash.com/photo-1506422748879-887454f9cdff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="author avatar" />
        <div className="author-info">
          <p>John Doe</p>
          <p>2h ago</p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Blog_card