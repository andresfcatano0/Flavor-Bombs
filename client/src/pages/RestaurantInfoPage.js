import React from 'react';

export default function RestaurantInfoPage() {
  return (
    // <div className="mt-4 flex-column text-center">
    <div className="mt-4">
      <div className="text-center">
        <img
          className="rounded"
          height={"350px"}
          src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
        />
      </div>
      <div>
        <h3 className="mt-2">Restaurant Name</h3>
      </div>
      <div>
        <p className="text-muted">Restaurant Name</p>
      </div>
      <hr />
      <div>
        <h4>Menu</h4>
      </div>
      <div style={{ backgroundColor: "lightGrey", width: "350px" }}>
        <img
          width={"150px"}
          className="p-2"
          src="https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg"
        />
      </div>
    </div>
  );
}
