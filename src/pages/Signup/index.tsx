import { useState } from "react";
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
import { InputUser } from "../../lib/types";
import { handleSignup } from "../../lib/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Must be more than three letters")
    .max(60, "Must be less than sixty letters"),
  surname: yup
    .string()
    .required("Surname is required")
    .matches(/^[A-Za-z]+$/i, "invalid surname"),
  login: yup
    .string()
    .required("Login is required")
    .min(5, "Login must be at least 5 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

export function Signup() {
  const navigate = useNavigate();

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  const [user, setUser] = useState<InputUser>({
    name: "",
    surname: "",
    login: "",
    password: "",
  });

  const onSubmit = () => {
    handleSignup(user).then((response) => {
      if (response.status === "error" && response.message) {
        setError("login", {
          type: "server",
          message: response.message || "Login error occurred",
        });
      } else {
        reset({
          name: "",
          surname: "",
          login: "",
          password: "",
        });
        navigate("/login");
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
              <h3 className="mb-2 pb-2 pb-md-0 mb-md-4 px-md-2">
                Registration Info
              </h3>
              <p>
                Already have an account? <Link to={"/login"}>Login Now</Link>
              </p>

              <form onSubmit={handleSubmit(onSubmit)}>
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Enter your name"
                  type="text"
                  value={user.name}
                  {...register("name")}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                {errors.surname && (
                  <p className="text-danger">{errors.surname.message}</p>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Enter your surname"
                  type="text"
                  value={user.surname}
                  {...register("surname")}
                  onChange={(e) =>
                    setUser({ ...user, surname: e.target.value })
                  }
                />
                {errors.login && (
                  <p className="text-danger">{errors.login.message}</p>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Enter your login"
                  type="text"
                  value={user.login}
                  {...register("login")}
                  onChange={(e) => setUser({ ...user, login: e.target.value })}
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Enter your password"
                  type="password"
                  value={user.password}
                  {...register("password")}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
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
