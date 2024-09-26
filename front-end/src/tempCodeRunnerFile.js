import { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutUs.css';


const AboutUs = props => {
  const [aboutData, setAboutData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  
  const fetchAboutData = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAboutData(response.data); 
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2); 
        setError(errMsg);
      })
      .finally(() => {
        setLoaded(true);
      });
  };

  
  useEffect(() => {
    fetchAboutData(); 
  }, []); 

  if (error) {
    return <p>Failed to load About Us page: {error}</p>;
  }

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="AboutUs">
      <h1>About Us</h1>
      {aboutData && (
        <>
          <p>{aboutData.aboutMe}</p>
          <img src={aboutData.imageUrl} alt="About Us" className="AboutUs-image" />
        </>
      )}
    </div>
  );
};


export default AboutUs;
