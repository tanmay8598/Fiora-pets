import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import apiClient from "./../api/client";
import swal from "sweetalert";
import useAuth from "../auth/useAuth";
import PropagateLoader from "react-spinners/PropagateLoader";
import styled from "styled-components";
import Footer from "./../components/Footer";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [uploadVisible, setUploadVisible] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();

  function handleChange(event) {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (e) => {
    setUploadVisible(true);
    e.preventDefault();
    const result = await apiClient.post("/users/login", {
      email: state.email,
      password: state.password,
    });
    if (result.ok) {
      setUploadVisible(false);
      // console.log(result.data.token);
      logIn(result.data.token);
      // swal("Login Success");
      navigate("/");
    } else {
      setUploadVisible(false);
      swal("Login Error Retry");
    }
  };

  return (
    <>
      <Container>
        <Navbar />
        {uploadVisible ? (
          <PropagateLoader color="rgba(54, 215, 183, 1)" size={30} />
        ) : (
          <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
              <Input
                placeholder="Email Address"
                name="email"
                type="email"
                onChange={handleChange}
              />
              <Input
                placeholder="Password"
                name="password"
                type="password"
                onChange={handleChange}
              />
              <Button onClick={handleSubmit}>LOGIN</Button>
              {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
              <Link onClick={() => navigate("/register")}>
                CREATE A NEW ACCOUNT
              </Link>
            </Form>
          </Wrapper>
        )}
      </Container>
    </>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const Wrapper = styled.div`
  width: 26%;
  min-height: 50vh;
  padding: 20px;
  background-color: #fcfcfc;
  box-shadow: 0 1px 0 0 #ccc;
  border: 1px solid #eee;
  border-radius: 10px;
  ${mobile({ width: "70%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: #ef6c00;
  color: white;
  cursor: pointer;
  border-radius: 15px;
  margin: 0 auto;
  margin-top: 20px;
  font-weight: 700;
`;

const Link = styled.a`
  /* margin: 25px 0px; */
  font-size: 17px;
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
  margin-top: 40px;
  color: black;
`;

export default Login;
