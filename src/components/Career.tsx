import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech CS-IT</h4>
                <h5>Sagar Institute of Science & Technology (SISTec)</h5>
              </div>
              <h3>2024 – 2028</h3>
            </div>
            <p>
              Second-year B.Tech CS-IT student with a strong interest in Artificial Intelligence, software development, and full-stack applications.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Class 12</h4>
                <h5>MP Board</h5>
              </div>
              <h3>2023 – 2024</h3>
            </div>
            <p>
              Completed Class 12 with a focus on science and foundational mathematics.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Class 10</h4>
                <h5>MP Board</h5>
              </div>
              <h3>2021 – 2022</h3>
            </div>
            <p>
              Completed Class 10 with strong academic performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
