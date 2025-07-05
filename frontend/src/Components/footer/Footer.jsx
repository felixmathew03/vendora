import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Footer.scss';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically make an API call to subscribe the user
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="footer" id="footer">
      <motion.div 
        className="top"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className="section" variants={itemVariants}>
          <div className="content">
            <h3>Business Hours</h3>
            <ul>
              <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
              <li>Saturday: 10:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </motion.div>

        <motion.div className="section" variants={itemVariants}>
          <div className="content">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for updates and exclusive offers.</p>
            <form onSubmit={handleSubscribe}>
              <div className="inputDiv">
                <FaEnvelope />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
              >
                Subscribe
              </motion.button>
            </form>
            {isSubscribed && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                style={{ color: '#4CAF50' }}
              >
                Thank you for subscribing!
              </motion.p>
            )}
            <ul className="icons">
              <li>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebook />
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTwitter />
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram />
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  >
                  <FaLinkedin />
                </motion.a>
              </li>
            </ul>
          </div>
        </motion.div>

        <motion.div className="section" variants={itemVariants}>
          <div className="content" id='contactus'>
            <h3>Contact Us</h3>
            <ul>
              <li>
                <FaPhone />
                <p>+1 (555) 123-4567</p>
              </li>
              <li>
                <FaEnvelope />
                <p>info@vendora.com</p>
              </li>
              <li>
                <FaMapMarkerAlt />
                <p>123 Business Street, Suite 100<br />New York, NY 10001</p>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <hr />

      <motion.div 
        className="bottom"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div className="section" variants={itemVariants}>
          <div className="content">
            <h4>About Us</h4>
            <p>Vendora is your trusted partner in business solutions, providing innovative services to help your business grow and succeed in the digital age.</p>
          </div>
        </motion.div>

        <motion.div className="section" variants={itemVariants}>
          <div className="content">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </motion.div>

        <motion.div className="section" variants={itemVariants}>
          <div className="content">
            <h4>Support</h4>
            <ul>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/help">Help Center</a></li>
              <li><a href="/support">Technical Support</a></li>
              <li><a href="/feedback">Feedback</a></li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;