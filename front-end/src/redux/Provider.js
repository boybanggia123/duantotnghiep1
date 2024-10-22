<<<<<<< HEAD
"use client"; 
// nhúng provider từ redux
import { Provider } from "react-redux";
// nhúng store 
import { store } from "./store";


function Providers({ children }) {
    // Truyền cho các component con props đó là store
  return <Provider store={store}>{children}</Provider>;
=======
'use client'
import { Provider } from "react-redux";
import { store } from "./store";

function Providers({ children }) {
    return <Provider store={store}>{children}</Provider>;
>>>>>>> 74a2490f947d33cd6e9b34f7af8061fa4aad63e3
}

export default Providers;