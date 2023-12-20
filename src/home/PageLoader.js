import React from "react";
import ContentLoader from "react-content-loader";

const PageLoader = (props) => {
  const cardLoaders = [];
  const isMobile = window.innerWidth <= 768; // Check for mobile device width

  if (isMobile) {
    cardLoaders.push(<rect x="0" y="0" rx="5" ry="5" width="90" height="97" />);
  } else {
    for (let i = 0; i < props.rows; i++) {
      for (let j = 0; j < 8; j++) {
        cardLoaders.push(
          <rect x={j * 97} y={i * 105} rx="5" ry="5" width="90" height="97" />
        );
      }
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <ContentLoader
            viewBox={isMobile ? "0 0 90 97" : "0 0 382 185"}
            foregroundColor={props.isDarkMode ? "#42424200" : "#eee"}
            backgroundColor={props.isDarkMode ? "#6c6c6c" : "#f5f6f7"}
          >
            {cardLoaders}
          </ContentLoader>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
