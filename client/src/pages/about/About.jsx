import React from "react";
import "../about/About.css";

const About = () => {
  return (
    <div className="about container-fluid">
      <div className="row">
        <h1>About Us</h1>
        <div className="aboutUs">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            aliquid illo est, dolore iure provident! Beatae optio cum
            cupiditate! Optio quisquam dolore rem minima dicta quibusdam quaerat
            inventore voluptate aliquam eligendi placeat impedit officia
            expedita, est nulla, modi excepturi animi exercitationem quidem ex
            mollitia. Et optio ducimus iusto explicabo, earum consectetur quia
            quasi distinctio ipsa aperiam, vel sed excepturi, harum neque unde.
            Molestias accusamus, aspernatur at illo quidem mollitia odio ullam
            pariatur aliquid odit libero, asperiores reprehenderit, non laborum
            esse nisi laudantium architecto iusto. Repellat provident nam est
            facere consectetur repellendus odit cupiditate aspernatur tempora
            earum obcaecati, ratione, beatae eligendi?
          </p>
        </div>
          <p className="followUs">follow us on:</p>
        <div className="socialMediaIcons">
          <a className="socialIcon">
            <i class="fa-brands fa-facebook"></i>
          </a>
          <a className="socialIcon">
            <i class="fa-brands fa-square-instagram"></i>
          </a>
          <a className="socialIcon">
            <i class="fa-brands fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
