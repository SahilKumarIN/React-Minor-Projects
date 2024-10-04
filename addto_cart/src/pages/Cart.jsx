import React from "react";

function Cart({ cartItems, dispatch }) {
  return (
    <>
      <div className="h-full flex justify-center bg-slate-200">
        <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-5">
          {cartItems.map((item) => (
            <div key={item.id} className="card bg-base-100 w-96 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src={item.productImage}
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{item.name}</h2>
                <p>{item.price} {"$"}</p>
                <p>{item.desc}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">Buy Now</button>
                  <button
                    className="btn bg-lime-600"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total $:</div>
            <div className="stat-value">{cartItems.reduce((total, item) => total + item.price, 0)}</div>
          </div>
        </div>
    </>
  );
}

export default Cart;
