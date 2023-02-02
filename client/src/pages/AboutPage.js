import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ReactComponent as LogoSvg } from "../assets/avatar_placeholders/stacy_avatar.svg";

export default function AboutPage() {
  return (
    <div className="text-center">
      <div>
        <h1>About Us</h1>
        <hr width="60%" className="mx-auto" />
        <h2 className="mb-5">Learn Our Story</h2>
      </div>
      <Container className="">
        <Row>
          <Col>
            <img
              style={{
                width: "150px",
                // border: "2px solid black",
                borderRadius: "1rem",
              }}
              className="p-3"
              src={require("../assets/avatar_placeholders/andres_placeholder.jpg")}
              alt="andres avatar - guy with glasses"
            />
          </Col>
          <Col>
            <img
              style={{
                width: "165px",
                // border: "2px solid black",
                borderRadius: "50%",
              }}
              className="p-3"
              src={require("../assets/avatar_placeholders/christina_placeholder.png")}
              alt="christina avatar - woman with curly hair"
            />
          </Col>
          <Col>
            <LogoSvg
              style={{
                width: "170px",
                height: "165px",
                // backgroundColor: "#65c9ff",
                // border: "2px solid black",
                borderRadius: "1rem",
              }}
              className="p-3"
              alt="stacy avatar - woman with glasses"
            />
          </Col>
        </Row>
        <hr width="95%" className="mx-auto" />
        <div className="mb-3 mx-auto" style={{ width: "70vw" }}>
          <Row>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Donec
            adipiscing tristique risus nec. Tempor nec feugiat nisl pretium
            fusce id velit. Sit amet volutpat consequat mauris. Et malesuada
            fames ac turpis egestas sed tempus. Id semper risus in hendrerit
            gravida rutrum quisque non tellus. Malesuada proin libero nunc
            consequat. Leo integer malesuada nunc vel risus commodo viverra.
          </Row>
          <Row >
            Libero enim sed faucibus turpis in eu mi. Dolor sed viverra ipsum
            nunc. Tellus molestie nunc non blandit massa enim nec dui nunc.
            Velit euismod in pellentesque massa placerat. Bibendum at varius vel
            pharetra vel turpis nunc eget. Dui id ornare arcu odio ut sem nulla
            pharetra diam. Augue ut lectus arcu bibendum at varius. Leo vel
            fringilla est ullamcorper eget nulla facilisi etiam dignissim. Morbi
            tristique senectus et netus.
          </Row>
          <Row>
            Quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus
            urna. Scelerisque eleifend donec pretium vulputate sapien. Eget
            velit aliquet sagittis id consectetur purus ut faucibus pulvinar.
            Mauris nunc congue nisi vitae suscipit tellus mauris a. Ultrices
            gravida dictum fusce ut placerat orci. Fusce ut placerat orci nulla
            pellentesque dignissim enim. Mollis nunc sed id semper risus in
            hendrerit. Facilisis mauris sit amet massa. Donec adipiscing
            tristique risus nec feugiat in fermentum posuere.
          </Row>
        </div>
      </Container>
    </div>
  );
}
