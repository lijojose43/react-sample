import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import PageLoader from "./PageLoader";
import Product from "./Product";
import StarRatingView from "./StarRatingView";
import { makeApiCall } from "./utils";

function DashboardPage({ isDarkMode }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await makeApiCall("/products");
      setData(response.products);
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
            <h4>All Products</h4>
            <Product />
            <div className="row">
              {data.map((product, index) => (
                <div key={index} className="col-md-3 mb-3">
                  <div
                    className="card bg-secondary"
                    style={{ borderRadius: "10px", borderColor: "none" }}
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
                        <strong>{product.title}</strong>
                        <strong>₹{product.price}</strong>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <StarRatingView rating={product.rating} />
                        <button className="btn btn-warning">Add to cart</button>
                      </div>

                      <strong></strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashboardPage;
