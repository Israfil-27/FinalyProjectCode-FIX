import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../slices/cardSlices";
import "./shpping.scss";
import CheckoutSetps from "../../components/checkoutSteps/CheckoutSetps";

interface ShippingFormData {
  address: string;
  city: string;
  postCode: string;
  country: string;
}

const ShippingScreen: React.FC = () => {
  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress } = cart;

  const [formData, setFormData] = useState<ShippingFormData>({
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postCode: shippingAddress?.postCode || "",
    country: shippingAddress?.country || "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    navigate("/payment");
  };

  return (
    <div className="shipping-container">
      <CheckoutSetps step1 step2 step3 step4 />
      <form onSubmit={handleSubmit} className="shipping-form">
        <div className="form-item">
          <label htmlFor="address">Ünvan:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-item">
          <label htmlFor="city">Şəhər:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-item">
          <label htmlFor="postCode">Poçt Kodu:</label>
          <input
            type="text"
            id="postCode"
            name="postCode"
            value={formData.postCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-item">
          <label htmlFor="country">Ölkə:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Yadda Saxla və Davam Et
        </button>
      </form>
    </div>
  );
};

export default ShippingScreen;
