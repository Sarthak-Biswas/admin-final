import React,{useEffect,useState} from 'react'
import './HomeScreen.css'
import { message } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import OverviewCard from '../components/OverviewCard'
import Loading from "../components/Loading";

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [overviewdata, setOverviewdata] = useState([]);

useEffect(()=>{
  const authToken = localStorage.getItem("authToken");

  let totaluser =
  "https://h8u83gz4p3.execute-api.ap-south-1.amazonaws.com/Prod/admin/totalUser";
let totalsold =
  "https://abmu3d9sgb.execute-api.ap-south-1.amazonaws.com/Prod/admin/totalSold";
let totalstock =
  "https://v6l1lxzz6h.execute-api.ap-south-1.amazonaws.com/Prod/admin/totalStock";
  let totalcoupon="https://iy0cw2zgrk.execute-api.ap-south-1.amazonaws.com/Prod/admin/totalCoupon";
  let totalsales="https://p22umq3fph.execute-api.ap-south-1.amazonaws.com/Prod/admin/totalSales";

const requestOne = axios.post(totaluser, {}, { headers: { authToken } });
const requestTwo = axios.post(totalsold, {}, { headers: { authToken } });
const requestThree = axios.post(totalstock, {}, { headers: { authToken } });
const requestFour = axios.post(totalcoupon, {}, { headers: { authToken } });
const requestFive = axios.post(totalsales, {}, { headers: { authToken } });

axios
  .all([requestOne, requestTwo, requestThree, requestFour, requestFive])
  .then(
    axios.spread((...responses) => {
      const responseOne = responses[0];
      const responseTwo = responses[1];
      const responesThree = responses[2];
      const responseFour = responses[3];
      const responseFive = responses[4];

      // use/access the results
      console.log(responseOne.data, responseTwo.data, responesThree.data,responseFour.data,responseFive.data);
      setOverviewdata( [
        {
            "_id":1,
            
            "title":"Total Registered Users",
            "imgURL":"/images/user.png",
            "value":responseOne.data.total_user
        },
        {
            "_id":2,
            "title":"Total Products in Stock",
            "imgURL":"/images/stock.png",
            "value":responesThree.data.total_stock
        },
        {
            "_id":3,
            "title":"Total Products Sold",
            "imgURL":"/images/sold.png",
            "value":responseTwo.data.total_sold
        },
      
        {
            "_id":4,
           
            "title":"Total Sales",
            "imgURL":"/images/sales.png",
            "value":responseFive.data.total_sold
        },
        {
            "_id":5,
            "title":"Total Coupons",
            "imgURL":"/images/coupon.png",
            "value":responseFour.data.total_coupon
        },
       
      
      
        
    ]);
   
      setLoading(false);
    })
  )
  .catch(errors => {
    // react on errors.
    message.error("Something went wrong");
    
  });



},[])


  return (
    <>
    {loading ? (
      <Loading />
    ) : (
      <>
      <div id="overview" className="pageContainer">
   <p className="pageHeading">Overview</p>
   <div className="line" />
   <div className="scroll__container" id="overview__container" style={{height:"400px"}}>
     {overviewdata.map((overview) => (
       <OverviewCard
         imgURL={overview.imgURL}
         value={overview.value}
         title={overview.title}
       />
     ))}
   </div>
 </div>
      </>
    )}
  </>
  )
}

export default HomeScreen


