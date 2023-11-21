import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Cart from "../cart/Cart";
import CustomPagination from "../components/CustomPagination";
import StarRatingView from "../components/StarRatingView";
import ProductDetails from "../products/ProductDetails";
import { makeApiCall, truncateString } from "../utils/utils";
import PageLoader from "./PageLoader";

function DashboardPage({ isDarkMode }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 12;
  const [showOffProductDetails, setShowOffProductDetails] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isDetailsLoading, setDetailsLoader] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const skip = (activePage - 1) * itemsPerPage;
      const response = await makeApiCall(
        `/products?limit=${itemsPerPage}&skip=${skip}`
      );
      setTotalPages(Math.ceil(response.total / itemsPerPage));
      setData(response.products);
      setIsLoading(false);
    };
    fetchData();
  }, [activePage]);

  const fetchProductData = async (productId) => {
    setDetailsLoader(true);
    const response = await makeApiCall(`/products/${productId}`);
    setProductDetails(response);
    setDetailsLoader(false);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleProductDetailsShow = (productId) => {
    fetchProductData(productId);
    setShowOffProductDetails(true);
  };

  return (
    <>
      {isLoading ? (
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <PageLoader isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              {productDetails && (
                <ProductDetails
                  productDetails={productDetails}
                  showOffProductDetails={showOffProductDetails}
                  setShowOffProductDetails={setShowOffProductDetails}
                  isDarkMode={isDarkMode}
                  isDetailsLoading={isDetailsLoading}
                />
              )}
              <Cart
                isDarkMode={isDarkMode}
                handleProductDetailsShow={handleProductDetailsShow}
              />
              {data.map((product, index) => (
                <div key={index} className="col-md-3 mb-3">
                  <div
                    className="card"
                    style={{
                      borderRadius: "10px",
                      borderColor: "none",
                      padding: "6px",
                    }}
                    onClick={() => handleProductDetailsShow(product.id)}
                  >
                    <div
                      className="card-body"
                      style={{
                        backgroundColor: isDarkMode ? "#222" : "#FFF",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    >
                      <img
                        src={product.images[0]}
                        alt="Symbol"
                        style={{ height: "130px", width: "160px" }}
                      />
                    </div>
                    <div className="card-footer text-dark">
                      <div className="d-flex justify-content-between">
                        <span style={{ textAlign: "left" }}>
                          <span title={product.title}>
                            {truncateString(product.title, 18)}
                          </span>
                        </span>
                        <strong>₹{product.price}</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span style={{ textAlign: "left" }}>
                          <StarRatingView rating={product.rating} />
                        </span>
                        <strong className="text-success">
                          {product.discountPercentage}% OFF
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <CustomPagination
              totalPages={totalPages}
              activePage={activePage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
