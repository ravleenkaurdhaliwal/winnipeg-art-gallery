import React from 'react'

const Footer = () => {
  return (
    <footer>
        <div className="footer-content">
        
          <ul className="social-icons">
            <li><a href="#"><img src="social-icon1.png" alt="Social Icon 1"/></a></li>
            <li><a href="#"><img src="social-icon2.png" alt="Social Icon 2"/></a></li>
           
          </ul>
        
          <div className="contact-info">
            <p>Email: example@example.com</p>
            <p>Phone: 123-456-7890</p>
          
          </div>
        </div>
      </footer>
  )
}

export default Footer