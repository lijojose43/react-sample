import React from "react";
import ContentLoader from "react-content-loader";

const PageLoader = (props) => {
  const cardLoaders = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 8; j++) {
      cardLoaders.push(
        <rect x={j * 97} y={i * 74} rx="5" ry="5" width="90" height="70" />
      );
    }
  }

  return (
    <ContentLoader
      viewBox="0 0 380 180"
      foregroundColor={props.isDarkMode ? "#42424200" : "#eee"}
      backgroundColor={props.isDarkMode ? "#6c6c6c" : "#f5f6f7"}
    >
      {cardLoaders}
    </ContentLoader>
  );
};

export default PageLoader;
