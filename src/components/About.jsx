import React from "react";
import styles from "../assets/css/About.module.css";
import image from "../assets/images/Priyesh.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const About = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <img
            src={image}
            alt="user"
            width="100"
          />
          <h4>Priyesh Gangrade</h4>
          <p className={styles.domain}>Full Stack Developer</p>
          <p className={styles.location}>Chennai, India</p>
          <p className={styles.skills}>
            Skills : HTML, CSS, JavaScript, React.js, Vue.js, Node.js, Express,
            MongoDB, TypeScript, Jenkins, Redux, Next.js
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.info}>
            <h3>Information</h3>
            <div className={styles.info_data}>
              <div className={styles.data}>
                <h4>Email</h4>
                <p>
                  <a
                    href="mailto:priyeshgangrade786@gmail.com"
                    className={styles.linkColor}>
                    priyeshgangrade786@gmail.com
                  </a>
                </p>
              </div>
              <div className={styles.data}>
                <h4>Phone</h4>
                <p>
                  <a
                    href="tel:8959500854"
                    className={styles.linkColor}>
                    8959500854
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className={styles.projects}>
            <h3>Projects</h3>
            <div className={styles.projects_data}>
              <div className={styles.data}>
                <h4 className={styles.projectData}>
                  TALENT HIRE – JOB PORTAL
                  <span className={styles.websiteLink}>
                    <a
                      href="https://talent-hire-5an4.onrender.com/"
                      className={styles.linkColor}
                      target="_blank">
                      • Website
                    </a>
                  </span>
                </h4>
                <p>• Implemented user authentication with Auth0.</p>
                <p>• Developed a job portal using the MEVN stack.</p>
                <p>
                  • Created a back-end API with Node.js, Express.js, and
                  MongoDB.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.projects}>
            <h3>Resume</h3>
            <div className={styles.projects_data}>
              <div className={styles.data}>
                <h4>
                  <span>
                    <a
                      href="https://drive.google.com/file/d/1gRL-sxhs-3PO1Auw-DBBHeU3Q_kD5OQp/view?usp=share_link"
                      target="_blank"
                      className={`${styles.projectData} ${styles.linkColor}`}>
                      • Resume
                    </a>
                  </span>
                </h4>
              </div>
            </div>
          </div>

          <div className={styles.social_media}>
            <ul>
              <li>
                <a
                  href="https://github.com/PriyeshGangrade26"
                  target="_blank">
                  <FontAwesomeIcon
                    icon={faGithub}
                    color="#fff"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/priyeshgangrade/"
                  target="_blank">
                  <FontAwesomeIcon
                    icon={faLinkedinIn}
                    color="#fff"
                  />
                </a>
              </li>
              <li>
                <a
                  href="https://youtu.be/noISaCYUI4I"
                  target="_blank">
                  <FontAwesomeIcon
                    icon={faYoutube}
                    color="#fff"
                  />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export { About };
