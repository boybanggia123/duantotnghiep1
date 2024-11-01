import axios from "axios";
import { useSelector } from "react-redux";

const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.user);

  const handleCheckout = () => {
    axios
      .post(`http://localhost:3000/stripe/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <>
      <button
        className="btn btn-dark w-100 mt-3"
        onClick={() => handleCheckout()}
      >
        {" "}
        Checkout
      </button>
    </>
  );
};

export default PayButton;
