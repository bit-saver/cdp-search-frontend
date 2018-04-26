import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import './Footer.css';
import flagImage from '../../assets/images/US-Flag-Color-735b69.png';

const Footer = () => (
  <footer>
    <Container text>
      <p>
        This site is managed by the Bureau of International Information Programs within the U.S. Department of State.
        External links to other Internet sites should not be construed as an endorsement of the views or privacy
        policies contained therein. IIP © 2018.
      </p>
      <Link name="privacy" to="privacy">Privacy Policy</Link>
      <Link name="contact us" to="mailto:design@america.gov">Contact Us</Link>
    </Container>
    <img src={ flagImage } alt="United States Flag" />
  </footer>
);

export default Footer;
