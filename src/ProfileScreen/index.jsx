import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { socialLinks } from '../constants/SocialIcons';
// import Instagram from '../assets/Images/instagram.png'
// import Whatsapp from '../assets/Images/whatsapp.png'
// import Facebook from '../assets/Images/facebook.png'
// import Twitter from '../assets/Images/twitter.png'
// import Website from '../assets/Images/website.png'

// const labelToImage = {
//   Instagram: Instagram,
//   Whatsapp: Whatsapp,
//   Facebook: Facebook,
//   Twitter: Twitter,
//   Website: Website,
// };

import {labelToImage} from '../constants/icons';

const ProfileScreen = () => {
  const { id } = useParams(); // Get the id from the URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://app.tapconnect.in/api/user/${id}`);
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Unable to fetch data');
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  // console.log(`url(https://app.tapconnect.in/${userData.background_image})`);

  // console.log(socialLinks[0].name)

  const handleDownloadVCard = (name, number) => {
    const vCardData = `BEGIN:VCARD
      VERSION:3.0
      FN:${name}
      TEL;TYPE=CELL:${number}
      END:VCARD`;
  
    // Create a Blob from the vCard data
    const blob = new Blob([vCardData], { type: 'text/vcard' });
  
    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contact.vcf';
  
    // Append link to the body and trigger click
    document.body.appendChild(link);
    link.click();
  
    // Cleanup the link
    document.body.removeChild(link);
  };
  

  // const imageSource = labelToImage[link.label];

  return (
    <div style={{height: '100%'}}>
      {/* Background Image */}
      <div style={{height: 200, width: "100%" }}>
        <img
          src={`https://app.tapconnect.in/${userData.background_image}`}
          alt={`${userData.name}'s profile`}
          width={"100%"}
          height={200}
        />
      </div>

      <div style={{marginTop: -70 }}>
          <img
            src={`https://app.tapconnect.in/${userData.self_photo}`}
            alt={`${userData.name}'s profile`}
            width={200}
            height={200}
            style={{
              width: "35%",
              maxWidth: "140px",
              height: 140,
              marginLeft: 20,
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

      <div style={{ marginLeft: 20 }}>
        <h1 style={{ margin: 0 }}>{userData.name}</h1>
        <p style={{ margin: 0 }}>
          {userData.designation} at {userData.company}
        </p>
        <p>{userData.bio}</p>
      </div>

      {/* Connect Button */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          style={{
            width: "70%",
            height: 50,
            backgroundColor: "#000",
            padding: 10,
            borderRadius: 25,
            color: "white",
            border: "none",
            marginTop: 20,
            // fontFamily: 'robot-medium'
          }}
          onClick={handleDownloadVCard(userData.name, userData.mobile)} // Call the function to download vCard
        >
          + Connect
        </button>
      </div>

      {/* Social Links */}
      <div style={{width: '100%', height: 500, display: 'flex', justifyContent: 'center', marginTop: 20}}>
        <div style={{ width: '80%',marginTop: 20, borderRadius: 30, height: 500, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)', padding: 20}}>
        <div style={{
          display: 'grid',
          gap: 35,
          height: 'max-content',
          gridTemplateColumns: 'repeat(3, 1fr)', // 3 equal columns
          justifyItems: 'center',  // Center each grid item
          alignItems: 'center',    // Vertically center each item
        }}>

          {userData.links.map((link) => (
            link.isEnabled ? (
              <a key={link._id} href={link.url} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                textDecoration: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',  // Take full width of the column
              }}>
                {/* <i className={`fab fa-${link.label.toLowerCase()} fa-4x`}
                  style={{
                    borderRadius: 15,
                    backgroundColor: socialLinks.find(social => social.name.toLowerCase() === link.label.toLowerCase())?.color || '#000',
                    display: 'flex',
                    justifyContent: 'center',
                    padding: 10,
                    color: '#fff'
                  }}
                ></i> */}
                <img src={labelToImage[link.label]} alt={link.label} width={70} height={70} />
                <p style={{fontSize: 12, color: '#aaa'}}>
                  {link.label}
                </p>
              </a>
            ) : null
          ))}
        </div>

        </div>
      </div>

      {/* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */}


      {/* Additional Info */}
      {/* <div className="additional-info">
        <p>Mobile: {userData.mobile}</p>
        <p>Email: {userData.email}</p>
        <p>Gender: {userData.gender}</p>
      </div> */}
    </div>
  );
};

export default ProfileScreen;
