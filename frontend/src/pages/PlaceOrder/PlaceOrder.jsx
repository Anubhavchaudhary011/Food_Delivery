import React, { useContext, useEffect, useState } from 'react';
import './placeorder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    Street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  });

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id]) {
        const itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
      userId: localStorage.getItem("userId") // optional if required
    };

    try {
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token }
      });

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error placing order.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount===0){
      navigate('/cart');
    }
  })
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className='palce-order-left'>
        <p className='title'>Delivery Information</p>

        <div className="multi-fields">
          <input name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder='First Name' required />
          <input name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' required />
        </div>

        <input type="email" name="email" placeholder='Email Address' required />
        <input type="text" name="Street" value={data.Street} onChange={onChangeHandler} placeholder='Street' required />

        <div className="multi-fields">
          <input type="text" name="city" value={data.city} onChange={onChangeHandler} placeholder='City' required />
          <input type="text" name="state" value={data.state} onChange={onChangeHandler} placeholder='State' required />
        </div>

        <div className="multi-fields">
          <input type="text" name="zipcode" value={data.zipcode} onChange={onChangeHandler} placeholder='Zip Code' required />
          <input type="text" name="country" value={data.country} onChange={onChangeHandler} placeholder='Country' required />
        </div>

        <input type="text" name="phone" value={data.phone} onChange={onChangeHandler} placeholder='Phone' required />
      </div>

      <div className='place-order-right'>
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
          </div>
          <button type="submit">Proceed to payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
