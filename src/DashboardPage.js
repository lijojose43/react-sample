import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import CustomPagination from "./CustomPagination";
import PageLoader from "./PageLoader";
import ProductDetails from "./ProductDetails";
import StarRatingView from "./StarRatingView";
import { makeApiCall, truncateString } from "./utils";

function DashboardPage({ isDarkMode }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 12;
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

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
    const response = await makeApiCall(`/products/${productId}`);
    setProductDetails(response);
  };

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const handleShow = (productId) => {
    fetchProductData(productId);
    setShowOffCanvas(true);
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
                  showOffCanvas={showOffCanvas}
                  setShowOffCanvas={setShowOffCanvas}
                />
              )}
              {data.map((product, index) => (
                <div key={index} className="col-md-3 mb-3">
                  <div
                    className="card bg-secondary"
                    style={{ borderRadius: "10px", borderColor: "none" }}
                    onClick={() => handleShow(product.id)}
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
                    <div
                      className="card-footer bg-secondary text-white"
                      style={{
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    >
                      <div className="d-flex justify-content-between">
                        <strong title={product.title}>
                          {truncateString(product.title, 20)}
                        </strong>
                        <strong>₹{product.price}</strong>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <StarRatingView rating={product.rating} />
                        <button
                          className="btn btn-sm btn-primary"
                          style={{ borderRadius: "10px" }}
                        >
                          Add to cart
                        </button>
                      </div>

                      <strong></strong>
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
