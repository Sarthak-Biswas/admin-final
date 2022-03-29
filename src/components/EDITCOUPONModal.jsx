import React, { useState, useEffect } from "react";
import "./Modal.css";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const EDITCOUPONModal = ({ closeeditmodal, editcoupon,category }) => {

  const navigate = useNavigate();
  const [coupon, setCoupon] = useState(editcoupon.coupon);
  const [discount, setDiscount] = useState(editcoupon.discount);
  
  const [valid_till, setValid_till] = useState(editcoupon.valid_till.slice(0,11));
  const [pricelimit, setPricelimit] = useState(editcoupon.pricelimit);
  const [quantity, setQuantity] = useState(editcoupon.quantity);
  const [description, setDescription] = useState(editcoupon.description);
 
  const [loading, setLoading] = useState(true);
  
  const [categories, setCategories] = useState(editcoupon.categories);
  console.log(categories);
  const [isactive, setIsactive] = useState(editcoupon.is_active);

  const editCoupon = async (e) => {
    e.preventDefault();
  
    const newcoupon = {
      id: editcoupon.id,
      coupon,
      discount: Number(discount),
      valid_till:valid_till.split("-").reverse().join("-"),
      pricelimit: Number(pricelimit),
      quantity: Number(quantity),
      categories,
     
      is_active: isactive,
     
discount,
      description,
    };

    try {
      const authToken = localStorage.getItem("authToken");
      const { data } = await axios.post(
        "https://79sitsd1nb.execute-api.ap-south-1.amazonaws.com/Prod/admin/editCoupon",
        newcoupon,
        { headers: { authToken } }
      );

      message.success("Coupon edited Successfully");
      closeeditmodal(false);
      window.location.reload();
    } catch (err) {
 
      message.error("Coupon not edited");
    }
  };
 
  return (
    <div className="modal">
      <div className="modal__container">
        <div className="modalTitle">
          <h2>Edit Coupon</h2>
          <CancelIcon onClick={() => closeeditmodal(false)} />
        </div>
        <div className="editForm" style={{ width: "100%" }}>
          <div className="scroll__container" style={{ height: "100%" }}>
            <div className="editField">
              <p>Coupon Code</p>
              <input
                autoComplete="new-password"
                type="text"
                placeholder="Type Here"
                onChange={(e) => setCoupon(e.target.value)}
                value={coupon}
              />
            </div>

            <div className="editField">
              <p>Discount( in %)</p>
              <input
                autoComplete="new-password"
                type="number"
                placeholder="Discount in percentage"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
              />
            </div>
            <div className="editField">
              <p>Price limit</p>
              <input
                autoComplete="new-password"
                type="number"
                placeholder="Enter a price limit"
                onChange={(e) => setPricelimit(e.target.value)}
                value={pricelimit}
              />
            </div>
            <div className="editField">
              <p>Quantity</p>
              <input
                autoComplete="new-password"
                type="number"
                placeholder="Enter coupon quantity"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </div>

            <div className="editField">
              <p>Valid till</p>
              <input
                autoComplete="new-password"
                type="date"
                placeholder="Date till which the coupon is valid"
                onChange={(e) => setValid_till(e.target.value)}
                value={valid_till}
              />
            </div>

            <div className="editField">
              <p>Category</p>
              <select
                name="cat"
                className="dropdown"
                onChange={(e) => setCategories(e.target.value)}
                defaultValue={categories}
              >
                {category.map((cat) => (
                  <option key={cat.id} value={cat.category_name}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="editField">
                <p>Is Active</p>
                <select
                  name="cat"
                  className="dropdown"
                  onChange={(e) =>  setIsactive(e.target.value)}
                  defaultValue={isactive === "1" ? "1" : "0"}
                >
                  <option value="1">Activate</option>
                  <option value="0">Deactivate</option>
                </select>
              </div>

            <div className="editField">
              <p>Description</p>
              <textarea
                autoComplete="new-password"
                name="coupon__desc"
                placeholder="Add a short description (optional)"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
          </div>
        </div>
        <div className="modalBottom">
          <button className="button__type4" onClick={(e) => editCoupon(e)}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default EDITCOUPONModal