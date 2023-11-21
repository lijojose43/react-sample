import React from "react";
import ContentLoader from "react-content-loader";

const CartLoader = (isDarkMode) => {
  return (
    <ContentLoader
      style={{ paddingLeft: "10px", paddingRight: "10px" }}
      viewBox="0 0 380 500"
      foregroundColor={isDarkMode ? "#42424200" : "#eee"}
      backgroundColor={isDarkMode ? "#6c6c6c" : "#f5f6f7"}
    >
      {/* Product Image Placeholder */}
      <rect x="0" y="0" rx="5" ry="5" width="380" height="200" />
      <rect x="0" y="230" rx="5" ry="5" width="380" height="20" />
      <rect x="0" y="280" rx="5" ry="5" width="380" height="20" />
      <rect x="0" y="320" rx="5" ry="5" width="380" height="20" />
    </ContentLoader>
  );
};

export default CartLoader;
