import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import apiClient from "./../api/client";

import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      swal("Password dont match");
    } else {
      const result = await apiClient.post("/users/", {
        name,
        email,
        password,
        phone: Number(phone),
      });
      if (!result.ok) {
        swal("Error Retry!");
      } else {
        logIn(result.data.token);
        swal("Registered Successfully");
        navigate("/");
      }
    }
  };
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="Name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Email Address"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Phone No."
            name="phone"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            placeholder="Password"
            name="password"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            name="confirm_password"
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE</Button>{" "}
          <Link onClick={() => navigate("/login")}>
            Already have a account? Login
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ marginTop: "50px" })}
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #fcfcfc;
  box-shadow: 0 1px 0 0 #ccc;
  border: 1px solid #eee;
  border-radius: 10px;
  min-height: 60vh;
  margin-top: 100px;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
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
  font-weight: 700;
  ${mobile({ width: "50%", marginBottom: "20px" })}
`;

const Link = styled.a`
  font-size: 17px;
  text-decoration: underline;
  cursor: pointer;
  width: 90%;
  margin: 0 auto;
  color: black;
  text-align: center;
  margin-top: 12px;
  ${mobile({ margin: "10px auto" })}
`;

export default Register;
