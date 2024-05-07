import { FormEvent, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer/FormContainer";
import Loader from "../../components/Loader/Loader.tsx";
import { useLoginMutation } from "../../slices/userApiSlices.tsx";
import { setCredentials } from "../../slices/authSlices.tsx";
import { toast } from "react-toastify";
import "./login.scss";

const LoginScreens = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state: any) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error("Error");
    }
  };

  return (
    <FormContainer>
      <div className="container-login">
        <form
          action="#"
          onSubmit={submitHandle}
          method="POST"
          className="sign-in-form"
        >
          <h2>Giriş Yap</h2>
          <div className="form-group">
            <label htmlFor="email">E-posta:</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              name="email"
              placeholder="E-posta adresinizi girin"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Şifre:</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              id="password"
              name="password"
              placeholder="Şifrenizi girin"
              required
            />
          </div>
          <div className="buttons">
            <button type="submit" disabled={isLoading}>
              Giriş Yap
            </button>
            {isLoading && <Loader />}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/redirect"}
            >
              Qeydiyyatdan keç
            </Link>
          </div>
        </form>
      </div>
    </FormContainer>
  );
};

export default LoginScreens;
