"use client"; 
// nhúng provider từ redux
import { Provider } from "react-redux";
// nhúng store 
import { store } from "./store";


function Providers({ children }) {
    // Truyền cho các component con props đó là store
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;