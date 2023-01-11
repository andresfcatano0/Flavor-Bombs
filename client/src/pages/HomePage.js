import React from 'react'
import SearchBar from '../components/SearchBar';
import Image from "react-bootstrap/Image";

export default function HomePage() {
  return (
    <div style={{overflowX:"hidden", position:"relative"}}>
      <Image 
        
        src="page_images/front_page_image.jpg" 
        // width={"100vw"}
        style={{width:"100vw", height:"90vh", objectFit:"cover"}}
      />
      <SearchBar style={{position: "absolute", right: "50%",
  left: "50%", bottom:"50%"}}/>
    </div>
  );
}
