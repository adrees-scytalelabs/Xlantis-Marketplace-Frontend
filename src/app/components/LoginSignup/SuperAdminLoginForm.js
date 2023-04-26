import axios from "axios";
import Cookies from "js-cookie";
import { useSnackbar } from 'notistack';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const SuperAdminLoginForms = () => {

  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSignIn = (e) => {

    e.preventDefault();
    setIsLoading(true);

    let loginData = {
      email: email.toLowerCase(),
      password: password,
    };
    axios.post("/v1-sso/user/auth/super-admin-login", loginData).then(
      (response) => {
        console.log("response", response);
        Cookies.set("Version", "v1-sso", {});
        sessionStorage.setItem("Authorization", response.data.token, {});
        setIsLoading(false);
        let variant = "success";
        enqueueSnackbar('Logged In Successfully', { variant });
        window.location.reload();

      },
      (error) => {
        if (process.env.NODE_ENV === "development") {
          console.log(error);
          console.log(error.response);
        }
        let variant = "error";
        enqueueSnackbar('Unable To Login', { variant });
        setIsLoading(false);
      }
    );

  };


  return (
    <div className="userLoginWrapper">

      <div
        className={
          isActive
            ? "row no-gutters justify-content-center align-items-center userFormWrapper userSignIn formActive"
            : "row no-gutters justify-content-center align-items-center userFormWrapper userSignIn"
        }
        style={{ height: "100%" }}
      >
        <form action="" autoComplete="off" onSubmit={(e) => handleSignIn(e)}>
          <h2>Sign In</h2>
          <div className="userLoginInput-group">
            <div className="form-group">
              <label>Email</label>
              <div className="form-group newNftWrapper">
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="Email"
                  autoComplete="user-email"
                  className="form-control-login  newNftInput"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <label>Password</label>
              <div className="form-group newNftWrapper">
                <input
                  type="password"
                  autoComplete="off"
                  required
                  value={password}
                  placeholder="Password"
                  className="form-control-login  newNftInput"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <button type="submit" >Sign In</button>


          <div className="signUp-link">
          </div>
        </form>
      </div>


    </div>
  );
};

export default SuperAdminLoginForms;
