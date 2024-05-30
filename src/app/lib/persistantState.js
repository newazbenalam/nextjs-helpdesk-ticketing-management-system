/* 
@ Author:  Newaz Ben Alam
@ Email:  newazbenalam@gmail.com
*/

const setStorage = (key, value) => {
  setCartItemsList(cartData);
  localStorage.setItem(key, value);
};

const getStorage = () => {
  return JSON.parse(localStorage.getItem("cartItems")) || [];
};

//  Exapmle of usage:
//  const [cartItemsList, setCartItemsList] = useState(cartInitialValue);