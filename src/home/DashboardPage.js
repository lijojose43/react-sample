import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StarRatingView from "../components/StarRatingView";
import { useAppContext } from "../context/AppContext";
import { useCartContext } from "../context/CartContext";
import ProductDetails from "../products/ProductDetails";
import { makeApiCall, truncateString } from "../utils/utils";
import PageLoader from "./PageLoader";

function DashboardPage() {
  const {
    productDetails,
    isDetailsLoading,
    showOffProductDetails,
    setShowOffProductDetails,
    handleProductDetailsShow,
  } = useCartContext();

  const { isDarkMode } = useAppContext();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const { addToCart } = useCartContext();
  const itemsPerPage = 8;

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

  return (
    <>
      {isLoading ? (
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <PageLoader
                isDarkMode={isDarkMode}
                rows="8"
                viewport="0 0 382 200"
              />
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
              {data.map((product, index) => (
                <div key={index} className="col-12 col-md-4 col-lg-3 mb-3">
                  <div
                    className="card"
                    style={{
                      borderRadius: "10px",
                      borderColor: "none",
                      padding: "6px",
                      backgroundColor: isDarkMode ? "#222" : "#FFF",
                    }}
                  >
                    <div
                      className="card-body"
                      style={{
                        backgroundColor: isDarkMode ? "#222" : "#FFF",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                      onClick={() => handleProductDetailsShow(product.id)}
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
                            {truncateString(product.title, 13)}
                          </span>
                        </span>
                        <strong>₹{product.price}</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span style={{ textAlign: "left" }}>
                          <StarRatingView rating={product.rating} />
                        </span>
                        <strong>
                          <small className="text-success">{`${product.discountPercentage}%OFF`}</small>
                        </strong>
                      </div>
                      <div className="row">
                        <div className="col-md-6  mt-2">
                          <button
                            className="btn btn-warning w-100"
                            style={{ borderRadius: "5px", fontSize: "13px" }}
                            onClick={() => {
                              toast.warning("Coming soon");
                            }}
                          >
                            Buy
                          </button>
                        </div>
                        <div className="col-md-6 mt-2">
                          <button
                            className="btn btn-success w-100"
                            style={{ borderRadius: "5px", fontSize: "13px" }}
                            onClick={() => addToCart(product)}
                          >
                            <FontAwesomeIcon icon={faCartPlus} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {activePage < totalPages ? (
                <PageLoader
                  isDarkMode={isDarkMode}
                  rows="1"
                  viewport="0 0 382 50"
                />
              ) : (
                ""
              )}
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
