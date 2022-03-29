import React, { useState, useEffect } from "react";
import "./AllCouponsScreen.css";
import Coupons from "../apis/Coupons.json";
import CreateCouponModal from "../components/CreateCouponModal";
import axios from "axios";
import { message } from "antd";
import "antd/dist/antd.css";
import Loading from "../components/Loading";
import EDITCOUPONModal from "../components/EDITCOUPONModal";

const AllCouponsScreen = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editcoupon, setEditcoupon] = useState({});
  const [editmodal, setEditmodal] = useState(false);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    const getAllCoupons = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://fcfquqn69e.execute-api.ap-south-1.amazonaws.com/Prod/admin/viewallCoupons",
          {},
          { headers: { authToken } }
        );

        setCoupons(data);
        setLoading(false);
      } catch (err) {
        message.error("There is some error");
      }
    };
    getAllCoupons();
  }, []);
  const Editcoupon = async(coupon) => {
    
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://chnbq3osxj.execute-api.ap-south-1.amazonaws.com/Prod/user/getCategory",
          {},
          { headers: { authToken } }
        );
       
 setCategory(data);
 setEditcoupon(coupon);
        setEditmodal(true);
  

      
      } catch (err) {
        message.error("There is some error");
      }
    
    
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {modalOpen && <CreateCouponModal closeModal={setModalOpen} />}
          {editmodal && (
            <EDITCOUPONModal
              closeeditmodal={setEditmodal}
              editcoupon={editcoupon}
              category={category}
            />
          )}
          <div className="pageContainer">
            <div className="pageContainerTop">
              <p className="pageHeading">All Coupons</p>
              <button className="btn_type3" onClick={() => setModalOpen(true)}>
                Add a Coupon
              </button>
            </div>
            <div className="line" />
            <table>
              <thead>
                <tr>
                  <td   style={{
                      width: "20%",

                      textAlign: "center",
                    }}>Coupon Code</td>
                  <td  style={{
                      width: "20%",

                      textAlign: "center",
                    }}>Discount(in %)</td>
                  <td  style={{
                      width: "20%",

                      textAlign: "center",
                    }}>Created On</td>
                  <td  style={{
                      width: "20%",

                      textAlign: "center",
                    }}>Valid Till</td>
                  <td />
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => (
                  <tr
                    key={coupon.id}
                    className="list"
                    style={{ padding: "10px" }}
                  >
                    <td   style={{
                        textAlign: "center",
                        padding: "5px",
                      }}>{coupon.coupon}</td>
                    <td  style={{
                        textAlign: "center",
                        padding: "5px",
                      }}>{coupon.discount}</td>
                    <td  style={{
                        textAlign: "center",
                        padding: "5px",
                      }}>{coupon.create_date}</td>
                    <td  style={{
                        textAlign: "center",
                        padding: "5px",
                      }}>{coupon.valid_till}</td>
                    <td  style={{
                        textAlign: "center",
                        padding: "5px",
                      }}>
                    <button
                        className="btn__type1"
                        style={{
                          padding: "3px 10px 3px 10px",
                          borderColor:
                            coupon.is_active === "0" ? "#F33535" : "#00ff00",
                          backgroundColor:
                            coupon.is_active === "0" ? "#F33535" : "#00ff00",
                          color: "white",
                        }}
                        onClick={() => Editcoupon(coupon)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div id="screen__bottom">
              <div></div>
              <div className="bottom__left"></div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllCouponsScreen;
