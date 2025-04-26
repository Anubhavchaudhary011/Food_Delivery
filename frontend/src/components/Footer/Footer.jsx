import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
        <img src={assets.logo} alt="" />
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, alias sunt at, explicabo vero corrupti ea delectus autem ullam similique natus minima, incidunt illo numquam veritatis quos quidem doloremque iusto!</p>
        <div className="footer-social-icons">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon}alt="" />
          <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div className="footer-content-center">
        <h2>Company</h2>
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Delivery</li>
          <li>privacy policy</li>

        </ul>
      </div>
      <div className="footer-content-right">
        <h2>GET IN TOUCH</h2>
          <ul>
            <li>+1-122-254</li>
            <li>constact@tomato.com</li>
            
          </ul>
      </div>
      </div>
      
      
      <hr />
     <p className='footer-copyright'>copyright 2025 @tomato.com -All right reserved.</p>
    </div>
  )
}

export default Footer
