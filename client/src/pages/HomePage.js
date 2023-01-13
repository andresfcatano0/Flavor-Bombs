import React from 'react'
import SearchBar from '../components/SearchBar';
import Image from "react-bootstrap/Image";

export default function HomePage() {
  return (
    <div style={{overflowX:"hidden", position:"relative", zIndex: "-1",
    display:"block",
    position: "absolute",
    top: "0",
    left: "0"}}>
      <Image 
        
        src="page_images/front_page_image.jpg" 
        // width={"100vw"}
        style={{width:"100vw", height:"100vh", objectFit:"cover"}}
      />
      {/* <SearchBar style={{position: "absolute", right: "50%",
  left: "50%", bottom:"50%"}}/> */}
    </div>
  );
}
