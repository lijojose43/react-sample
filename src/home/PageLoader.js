import React from "react";
import ContentLoader from "react-content-loader";

const PageLoader = (props) => {
  const cardLoaders = [];
  for (let i = 0; i < props.rows; i++) {
    for (let j = 0; j < 8; j++) {
      cardLoaders.push(
        <rect x={j * 97} y={i * 105} rx="5" ry="5" width="90" height="97" />
      );
    }
  }

  return (
    <ContentLoader
      viewBox={props.rows == 1 ? "0 0 382 95" : "0 0 382 185"}
      foregroundColor={props.isDarkMode ? "#42424200" : "#eee"}
      backgroundColor={props.isDarkMode ? "#6c6c6c" : "#f5f6f7"}
    >
      {cardLoaders}
    </ContentLoader>
  );
};

export default PageLoader;
