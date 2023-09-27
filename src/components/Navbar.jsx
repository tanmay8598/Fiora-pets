import {
  Search,
  ShoppingCartOutlined,
  Person,
  LocationOn,
  Share,
} from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect } from "react";
import styled from "styled-components";
import Badge from "@mui/material/Badge";
import { mobile } from "./../responsive";
import "./nav.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useAuth from "./../auth/useAuth";
import NavDropdown from "react-bootstrap/NavDropdown";
import apiClient from "./../api/client";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeIcon from "@mui/icons-material/Home";
import SetMealIcon from "@mui/icons-material/SetMeal";
import logo from "../assets/WebLogo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState();
  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [mobileHeading, setMobileHeading] = useState();
  const [list, setList] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [subcategory, setSubcategory] = useState();
  const [specialcategory, setSpecialcategory] = useState();
  const [subcatList, setSubCatList] = useState();
  const [specialcatList, setSpecialCatList] = useState();

  const [back, setback] = useState(false);

  const { user, logOut } = useAuth();

  const items = useSelector((state) => state.cart.cart);

  const handleSearch = async () => {
    navigate("/products", { state: { data, search } });
    setSearch("");
  };

  useEffect(() => {
    setAnimate(false);
    setMobileHeading("Shop");
    fetchCategories();
    getAllSubCategories();
    getAllSpecialCategories();
  }, [back, modal]);

  const fetchCategories = async () => {
    const { data } = await apiClient.get("/variations/get-categories");
    let sortedData = data.sort((p1, p2) =>
      p1._id > p2._id ? 1 : p1._id < p2._id ? -1 : 0
    );
    setData(sortedData);
    setList(sortedData);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const fetchSubcategoryByCategoryId = async (id) => {
    const { data } = await apiClient.get("/variations/get-sub-bycat", {
      catId: id,
    });
    setList(data);
    setAnimate(false);
  };
  const fetchSpecialcategoryBySubcategoryId = async (id) => {
    const { data } = await apiClient.get("/variations/get-special-bysub", {
      catId: id,
    });
    setList(data);
  };

  const getAllSubCategories = async () => {
    const { data } = await apiClient.get("/variations/get-sub-categories");
    setSubcategory(data);
  };
  const getAllSpecialCategories = async () => {
    const { data } = await apiClient.get("/variations/get-special-categories");
    setSpecialcategory(data);
  };

  const handleItemDesktop = (item) => {
    setModal3(true);
    setMobileHeading(item.name);
    const newarray = subcategory.filter((subcat) => {
      return item._id === subcat.category;
    });
    setSubCatList(newarray);
    newarray.map((subcategory, index) => {
      const newarray1 = specialcategory.filter((subcat) => {
        return subcategory._id === subcat.subcategory;
      });
      setSpecialCatList(newarray1);
    });
  };

  const handleItemMobile = (item) => {
    setAnimate(false);
    if (item.category && !item.subcategory) {
      const newarray = specialcategory.filter((subcat) => {
        return item._id === subcat.subcategory;
      });
      setAnimate(true);
      setList(newarray);
    } else if (item.subcategory && item.category) {
      //navigate to special category page
      setModal(!modal);
      setModal2(!modal2);
      navigate(`/specialcategory/${item._id}`, {
        state: item,
      });
    } else {
      const newarray = subcategory.filter((subcat) => {
        return item._id === subcat.category;
      });
      setAnimate(true);
      setList(newarray);
    }
    setMobileHeading(item.name);
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const handleAqua = () => {
    setModal(!modal);
    navigate("/aquarium");
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo onClick={() => navigate("/")}>
            <img src={logo} style={{ height: "100px" }} />
          </Logo>
        </Left>

        <Center>
          <LogoMobile onClick={() => navigate("/")}>Fiora Pets</LogoMobile>
        </Center>

        <Right>
          <SearchContainer>
            <Input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => handleKey(e)}
            />
            <Search
              style={{ color: "gray", fontSize: 26, marginRight: "10px" }}
              onClick={handleSearch}
            />
          </SearchContainer>

          <MenuItem2 onClick={() => navigate("/contactus")}>
            <LocationOn style={{ color: "white" }} />
          </MenuItem2>

          {!user && (
            <>
              <MenuItem2 onClick={() => navigate("/login")}>
                <Person style={{ color: "white" }} />
              </MenuItem2>
            </>
          )}
          {user && (
            <NavDropdown
              title={user.name.split(" ")[0]}
              id="basic-nav-dropdown"
              style={{ color: "white" }}
            >
              <NavDropdown.Item href="/profile">Account</NavDropdown.Item>
              <NavDropdown.Item href="/myrewards">Rewards</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => logOut()}>
                <LogoutIcon />
              </NavDropdown.Item>
            </NavDropdown>
          )}
          <MenuItem2 onClick={() => navigate("/cart")}>
            <Badge color="primary" badgeContent={items?.length}>
              <ShoppingCartOutlined style={{ color: "white" }} />
            </Badge>
          </MenuItem2>
        </Right>
      </Wrapper>

      {/* desktop */}

      <div class="desktop-nav">
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            position: "absolute",
            top: "22px",
            left: "250px",
            // right: 0,
          }}
        >
          <div
            class="desktop-menu-btn"
            onMouseOver={() => setModal2(true)}
            onMouseOut={() => {
              setModal2(false);
              setModal3(false);
            }}
          >
            <h5 style={{ color: "white" }}>Shop</h5>
            <KeyboardArrowDownIcon style={{ color: "white" }} />
          </div>
          <div class="desktop-menu-btn" onClick={() => navigate("/aquarium")}>
            <SetMealIcon style={{ color: "white", marginLeft: "10px" }} />
            <h5 style={{ color: "white" }}>Custom Aquariums</h5>
          </div>
          <div class="desktop-menu-btn" onClick={() => navigate("/brands")}>
            <h5 style={{ color: "white" }}>Brands</h5>
          </div>

          <div
            class="desktop-menu-btn"
            onClick={() => navigate("/best-sellers")}
          >
            <h5 style={{ color: "white", marginLeft: "10px" }}>Best Sellers</h5>
          </div>

          <div
            class="desktop-menu-btn"
            onClick={() => navigate("/best-sellers")}
          >
            <h5 style={{ color: "white" }}>Discover by Fiora</h5>
          </div>
          <div class="desktop-menu-btn" onClick={() => navigate("/salelist")}>
            <h5 style={{ color: "white", marginLeft: "10px" }}>Sales Offer</h5>
          </div>
        </div>

        {modal2 && (
          <div
            // class="desktop-wrapper"
            class={animate ? "desktop-wrapper-animate" : "desktop-wrapper"}
            onMouseOver={() => setModal2(true)}
            onMouseOut={() => setModal2(false)}
          >
            <div class="heading">
              <h5 style={{ marginBottom: "20px" }}>Shop 🛒</h5>
            </div>

            {list?.map((item, index) => {
              return (
                <div>
                  <div
                    class="desktop-wrapper-item"
                    onMouseOver={() => handleItemDesktop(item)}
                    onClick={() => {
                      navigate(`/category`, { state: item });
                      setModal2(false);
                      setModal3(false);
                    }}
                  >
                    <p>{item.name}</p>
                    <KeyboardArrowRightIcon />
                  </div>
                </div>
              );
            })}
            {modal3 && (
              <div className="desktop-wrapper-right">
                <div className="desktop-wrapper-right-heading">
                  <h2>{mobileHeading}</h2>
                </div>
                <div className="dekstop-wrapper-right-content">
                  {subcatList?.map((subcategory, index) => {
                    return (
                      <div className="sub-item">
                        <p
                          onClick={() => {
                            navigate(`/subcategory/${subcategory._id}`, {
                              state: subcategory,
                            });
                            setModal2(false);
                            setModal3(false);
                          }}
                        >
                          {subcategory.name}
                        </p>
                        {specialcategory?.map((specialcat) => {
                          if (subcategory._id === specialcat.subcategory) {
                            return (
                              <div className="special-item">
                                <p
                                  onClick={() => {
                                    navigate(
                                      `/specialcategory/${specialcat._id}`,
                                      {
                                        state: specialcat,
                                      }
                                    );
                                    setModal2(false);
                                    setModal3(false);
                                  }}
                                >
                                  {specialcat.name}
                                </p>
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* mobile */}
      <div class="mobile-nav">
        <div class="menu-btn" onClick={() => handleModal()}>
          {modal ? (
            <i class="fas fa-times" style={{ color: "white" }} />
          ) : (
            <i class="fas fa-bars" style={{ color: "white" }} />
          )}
        </div>

        {modal && (
          <div class={animate ? "animate-mobile" : "mobile-wrapper"}>
            <div class="heading">
              <div
                style={{ marginBottom: "20px" }}
                onClick={() => {
                  handleModal();
                  navigate("/");
                }}
              >
                <h5 style={{ color: "black" }}>
                  Home
                  <HomeIcon />
                </h5>
              </div>
              {mobileHeading === "Shop" ? (
                <h5 style={{ marginBottom: "20px" }}>{mobileHeading} 🛒</h5>
              ) : (
                <h4 onClick={() => setback(!back)}>
                  <KeyboardArrowLeftIcon />
                  {mobileHeading}
                </h4>
              )}
            </div>

            {list?.map((item, index) => {
              return (
                <div
                  class="wrapper-item"
                  onClick={() => handleItemMobile(item)}
                >
                  <p>{item.name}</p>
                  <KeyboardArrowRightIcon />
                </div>
              );
            })}
            {list[0]?.category ? (
              <></>
            ) : (
              <div class="wrapper-item" onClick={() => handleAqua()}>
                <p>Custom Aquariums</p>
                <KeyboardArrowRightIcon />
              </div>
            )}
          </div>
        )}
      </div>

      <SearchContainer2>
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search
          style={{
            color: "black",
            fontSize: 22,
          }}
          onClick={handleSearch}
        />
      </SearchContainer2>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  height: 130px;
  z-index: 99;
  width: 100%;
  background-color: #0039a6;
  transition: 0.4s;
  top: 0;
  ${mobile({ height: "120px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  /* ${mobile({ display: "none" })} */
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  width: 100%;
  height: 6vh;
  border-radius: 40px;
  background-color: #fff;
  ${mobile({ display: "none" })}
`;
const SearchContainer2 = styled.div`
  display: none;
  ${mobile({
    position: "relative",
    top: "10px",
    width: "90%",
    display: "flex",
    padding: "0 15px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    margin: "0 auto",
    alignItems: "center",
  })}
  &:hover {
    cursor: pointer;
    transition: 0.4s;
    transform: translateY(1vmax);
  }
`;

const Input = styled.input`
  outline: none;
  border: none;
  width: 100%;
  height: 5vh;
  border-radius: 40px;
  margin-left: 10px;
  ${mobile({ width: "100%", height: "6vh" })}
`;

const Center = styled.div`
  display: none;
  flex: 1;
  text-align: center;
  ${mobile({ display: "flex" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  color: white;
  position: absolute;
  margin-top: 75px;
  margin-left: 2px;
  ${mobile({ display: "none" })}
  &:hover {
    cursor: pointer;
  }
`;
const LogoMobile = styled.h1`
  font-weight: bold;
  color: white;
  ${mobile({ fontSize: "19px" })}
  &:hover {
    cursor: pointer;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 1, justifyContent: "center", marginRight: "12px" })}
`;

const MenuItem2 = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

export default Navbar;
