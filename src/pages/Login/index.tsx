import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import { handleUserLogin } from "../../lib/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IUserLogin } from "../../lib/types";

const schema = yup.object({
  login: yup
    .string()
    .required("Login is required")
    .min(5, "Login must be at least 5 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const [userLogin, setUserLogin] = useState<IUserLogin>({
    login: "",
    password: "",
  });

  const onSubmit = () => {
    handleUserLogin(userLogin).then((response) => {
      if (response.status === "error" && response.message) {
        setError("login", {
          type: "server",
          message: response.message || "Login error occurred",
        });
      } else {
        reset({
          login: "",
          password: "",
        });
        navigate("/profile");
      }
    });
  };
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="8">
          <MDBCard className="my-5 rounded-3" style={{ maxWidth: "600px" }}>
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img3.webp"
              className="w-100 rounded-top"
              alt="Sample photo"
            />
            <MDBCardBody className="px-5">
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login Info</h3>
              <p>
                Don't you have an account? <Link to={"/"}>Signup Now</Link>
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                {errors.login && (
                  <p className="text-danger">{errors.login.message}</p>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Enter your login"
                  type="text"
                  value={userLogin.login}
                  {...register("login")}
                  onChange={(e) =>
                    setUserLogin({ ...userLogin, login: e.target.value })
                  }
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  type="password"
                  placeholder="Enter your password"
                  value={userLogin.password}
                  {...register("password")}
                  onChange={(e) =>
                    setUserLogin({ ...userLogin, password: e.target.value })
                  }
                />
                <button type="submit" className="btn btn-outline-info">
                  Submit
                </button>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
