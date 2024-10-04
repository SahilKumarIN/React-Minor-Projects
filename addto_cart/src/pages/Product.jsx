import React from "react";
import products from "../Data/Products";

function Product({ dispatch }) {
  return (
    <>
      <div className="h-full flex justify-center bg-slate-200">
        <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
          {products.map((product) => (
            <div key={product.id} className="card bg-base-100 w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={product.productImage}
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{product.name}</h2>
                <p>{product.price} {"$"}</p>
                <p>{product.desc}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                  <button
                    className="btn bg-lime-600"
                    onClick={() =>
                      dispatch({ type: "ADD_TO_CART", payload: product })
                    }
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Product;
