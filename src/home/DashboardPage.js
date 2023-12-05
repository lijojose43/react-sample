import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Cart from "../cart/Cart";
import StarRatingView from "../components/StarRatingView";
import { useAppContext } from "../context/AppContext";
import ProductDetails from "../products/ProductDetails";
import { makeApiCall, truncateString } from "../utils/utils";
import PageLoader from "./PageLoader";

function DashboardPage() {
  const { isDarkMode } = useAppContext();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 12;
  const [showOffProductDetails, setShowOffProductDetails] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const [isDetailsLoading, setDetailsLoader] = useState(false);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const skip = (activePage - 1) * itemsPerPage;
    if (totalPages !== activePage) {
      const response = await makeApiCall(
        `/products?limit=${itemsPerPage}&skip=${skip}`
      );
      setTotalPages(Math.ceil(response.total / itemsPerPage));
      setData([...data, ...response.products]);
      setIsLoading(false);

      // Update activePage only if there are more pages to fetch
      if (activePage < totalPages) {
        setActivePage(activePage + 1);
      }
    }

    setLoading(false);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      fetchData();
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      fetchData(); // Fetch initial data
      setActivePage(activePage + 1);
    }

    window.addEventListener("scroll", handleScroll);

    // Clean up the scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]); // Add 'data' as a dependency to run the effect when 'data' changes

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
                      backgroundColor: isDarkMode ? "#222" : "#FFF",
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
                    <div
                      className="card-footer"
                      style={{
                        color: isDarkMode ? "#fff" : "#333",
                        backgroundColor: isDarkMode ? "#222" : "#FFF",
                      }}
                    >
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
            {/* <CustomPagination
              totalPages={totalPages}
              activePage={activePage}
              onPageChange={handlePageChange}
            /> */}
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
