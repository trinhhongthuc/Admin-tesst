import firebase, { auth, db } from "firebase/config";
import React from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "Context/AuthProvider";
import { ReactComponent as IconLoading } from "assets/img/three-dots.svg";
const Login = () => {
  //provider
  const { setUser } = React.useContext(AuthContext);

  const history = useHistory();
  const [errEmail, setErrEmail] = React.useState(true);
  const [errPassword, setErrPassword] = React.useState(true);
  const [messageErrEmail, setMessageErrEmail] = React.useState(
    "Vui lòng nhập email hợp lệ"
  );
  const [messageErrPass, setMessageErrPass] = React.useState(
    "Vui lòng  nhập PassWord"
  );
  const [valueRegister, setValueRegister] = React.useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleValidateEmail = (email, setErrEmail) => {
    if (email === "") {
      setErrEmail(false);
      setLoading(false);

      return false;
    } else {
      setErrEmail(true);
      return true;
    }
  };
  const handleValidatePassword = (password, setErrPassword) => {
    if (password === "") {
      setErrPassword(false);
      setLoading(false);
      return false;
    } else {
      setErrPassword(true);
      return true;
    }
  };

  const handleLoginEmailAndPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const resultPass = handleValidatePassword(
      valueRegister.password,
      setErrPassword
    );
    const resultEmail = handleValidateEmail(valueRegister.email, setErrEmail);
    if (resultPass && resultEmail) {
      firebase
        .auth()
        .signInWithEmailAndPassword(valueRegister.email, valueRegister.password)
        .then((res) => {
          history.push("/");
        })
        .catch((err) => {
          console.log("err", err);
          if (err.code == "auth/invalid-email") {
            setMessageErrEmail(err.message);
            setErrEmail(false);
          } else if (err.code == "auth/user-not-found") {
            setMessageErrEmail(err.message);
            setErrEmail(false);
          } else if (err.code == "auth/wrong-password") {
            setMessageErrPass(err.message);
            setErrPassword(false);
          }
          setLoading(false);
        });
    }
  };

  return (
    <div id="app-admin-login">
      {loading ? (
        <div className="loading">
          <IconLoading style={{ width: "60px" }} />
        </div>
      ) : (
        ""
      )}

      <div className="container-login-admin">
        <div className="header-headings sign-in">
          <span>Đăng nhập admin</span>
        </div>

        <form
          className="account-form"
          onSubmit={(e) => handleLoginEmailAndPassword(e)}
        >
          <div className="account-form-fields sign-in">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              required
              value={valueRegister.email}
              onChange={(e) => {
                setValueRegister({
                  ...valueRegister,
                  email: e.target.value,
                });
              }}
            />
            {!errEmail ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  margin: "0",
                }}
              >
                {messageErrEmail}
              </p>
            ) : (
              ""
            )}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              required
              value={valueRegister.password}
              onChange={(e) => {
                setValueRegister({
                  ...valueRegister,
                  password: e.target.value,
                });
              }}
            />
            {!errPassword ? (
              <p
                style={{
                  color: "red",
                  fontSize: "14px",
                  margin: "0",
                }}
              >
                {messageErrPass}
              </p>
            ) : (
              ""
            )}
          </div>
          <button
            className="btn-submit-form"
            onClick={(e) => handleLoginEmailAndPassword(e)}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
