import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGooglePlus, FaRss, FaPinterestP, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneSquareAlt } from 'react-icons/fa';
import './Footer.scss'
const Footer = () => {
  return (
      <div className='footer' id='footer'>
        <div className='top'>
          <div className='section'>
            <div className='content'>
              <h3>Special Time</h3>
              <ul>
                <li>Monday - Friday: 11.00am to 11.10am</li>
                <li>Saturday: 10.00am to 10.05pm</li>
                <li>Sunday: <span>10.00pm</span></li>
              </ul>
            </div>
          </div>

          <div className='section'>
            <div className='content'>
              <h3>Newsletter</h3>
              <form>
                <div className='inputDiv'>
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email Address*"
                    />
                    <FaEnvelope size={20} /> {/* You can adjust the size as needed */}
                </div>
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>

          <div className='section'>
            <div className='content'>
              <h3>Social Media</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <ul className='icons'>
                <li><a href="#"><FaFacebook size={20} /></a></li>
                <li><a href="#"><FaTwitter size={20} /></a></li>
                <li><a href="#"><FaLinkedin size={20} /></a></li>
                <li><a href="#"><FaGooglePlus size={20} /></a></li>
                <li><a href="#"><FaRss size={20} /></a></li>
                <li><a href="#"><FaPinterestP size={20} /></a></li>
                <li><a href="#"><FaWhatsapp size={20} /></a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr />

        <div className='bottom'>
          <div className='section'>
            <div className='content'>
              <h4>About Vendora</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </div>

          <div className='section'>
            <div className='content'>
              <h4>Information</h4>
              <ul>
                <li><a href="#footer">About Us</a></li>
                <li><a href="#">Customer Service</a></li>
                <li><a href="#">Our Sitemap</a></li>
                <li><a href="#">Terms &amp; Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Delivery Information</a></li>
              </ul>
            </div>
          </div>

          <div className='section'>
            <div className='content' id='contactus'>
              <h4>Contact Us</h4>
              <ul>
                <li>
                    <p><FaMapMarkerAlt /> Address: Michael I. Days 3756 <br />Preston Street Wichita, <br />KS 67213</p>
                </li>
                <li>
                    <p><FaPhoneSquareAlt /> Phone: <a href="tel:+1-888705770">+1-888 705 770</a></p>
                </li>
                <li>
                    <p><FaEnvelope /> Email: <a href="mailto:contactinfo@gmail.com">info@vendora.com</a></p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Footer;
