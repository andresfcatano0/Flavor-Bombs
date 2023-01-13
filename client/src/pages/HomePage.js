import React, { useContext } from 'react'
import SearchBar from '../components/SearchBar';
import Image from "react-bootstrap/Image";
import UserContext from '../context/AuthContext';

export default function HomePage() {
  const user = useContext(UserContext)
  
  return (
    <>
      {!user ? (
        <div
          style={{
            overflowX: "hidden",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            position: "relative",
            zIndex: "-1",
            display: "block",
            position: "absolute",
            top: "0",
            left: "0",
          }}
        >
          <Image
            src="page_images/front_page_image.jpg"
            // width={"100vw"}
            style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          />
        </div>
      ) : (
        <div
          style={{
            overflowX: "hidden",
            width: "100%",
            height: "100%",
            overflow:"hidden",
            position: "relative",
            zIndex: "-1",
            display: "block",
            position: "absolute",
            top: "0",
            left: "0",
          }}
          className="mt-3"
        >
          <Image
          className="mt-3"
            src="page_images/front_page_image.jpg"
            // width={"100vw"}
            style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
          />
        </div>
      )}
    </>
  );
}
