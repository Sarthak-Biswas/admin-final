import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import Loading from "../components/Loading";
import ADDCATEGORYModal from "../components/ADDCATEGORYModal";
import EDITCATEGORYModal from "../components/EDITCATEGORYModal";
import { faJediOrder } from "@fortawesome/free-brands-svg-icons";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editmodal, setEditmodal] = useState(false);
  const [editcat, setEditcat] = useState({});

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const { data } = await axios.post(
          "https://chnbq3osxj.execute-api.ap-south-1.amazonaws.com/Prod/user/getCategory",
          {},
          { headers: { authToken } }
        );

        setCategory(data);
        setLoading(false);
      } catch (err) {
        message.error("Server error");
      }
    };
    getAllCategory();
  }, []);

  const editcategory = (cat) => {
    setEditmodal(true);
    setEditcat(cat);
  };

  const deleteCategory = async (id) => {
    try {
      const authToken = localStorage.getItem("authToken");

      await axios.post(
        "https://lacg6gprn1.execute-api.ap-south-1.amazonaws.com/Prod/admin/deleteCategory",
        { id },
        { headers: { authToken } }
      );

      window.location.reload();
      message.success("Category deleted successfully");
    } catch (err) {
      message.error("Category not deleted");
    }
  };

  const deletepopup = (id) => {
    const confirmdelete = window.confirm(
      "Are you sure you want to delete this category ?"
    );
    if (confirmdelete) {
      deleteCategory(id);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
          {modalOpen && <ADDCATEGORYModal closemodal={setModalOpen} />}
          {editmodal && (
            <EDITCATEGORYModal
              closeeditmodal={setEditmodal}
              editcat={editcat}
            />
          )}
          <div className="pageContainer">
            <div className="pageContainerTop">
              <p className="pageHeading">All Category</p>

              <button className="btn__type6" onClick={() => setModalOpen(true)}>
                Add Category
              </button>
            </div>
            <div className="line" />
            <table>
              <thead>
                <tr>
                  <td
                    style={{
                      width: "20%",

                      textAlign: "center",
                    }}
                  ></td>
                  <td
                    style={{
                      width: "20%",

                      textAlign: "center",
                    }}
                  >
                    Category Id
                  </td>
                  <td
                    style={{
                      width: "20%",

                      textAlign: "center",
                    }}
                  >
                    Category Name
                  </td>
                  <td
                    style={{
                      width: "20%",

                      textAlign: "center",
                    }}
                  ></td>

                  <td />
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {category.map((cat) => (
                  <tr className="list" key={cat.id}>
                    <div
                      className="imagesize"
                      style={{
                        margin: "auto",
                      }}
                    >
                      {" "}
                      <td>
                        <img
                          style={{
                            width: "100px",
                            height: "70px",
                            borderRadius: "10px",
                          }}
                          src={cat.img}
                          alt=""
                        />
                      </td>
                    </div>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "5px",
                      }}
                    >
                      {cat.id}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "5px",
                      }}
                    >
                      {cat.category_name}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        padding: "5px",
                      }}
                    >
                      <button
                        className="btn__type1"
                        style={{
                          padding: "3px 10px 3px 10px",
                          borderColor:
                            cat.active === "0" ? "#F33535" : "#00ff00",
                          backgroundColor:
                            cat.active === "0" ? "#F33535" : "#00ff00",
                          color: "white",
                        }}
                        onClick={() => editcategory(cat)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn__type1"
                        onClick={() => deletepopup(cat.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Categories;
