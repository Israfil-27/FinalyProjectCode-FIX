import { FormEvent, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../../components/FormContainer/FormContainer";
import Loader from "../../components/Loader/Loader.tsx";
import { useRegisterMutation } from "../../slices/userApiSlices.tsx";
import { setCredentials } from "../../slices/authSlices.tsx";
import { toast } from "react-toastify";
import "./register.scss";
const RegisterScreen = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
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
    if (password !== confirmPassword) {
      toast.error("Sifreler Eyni Deyil");
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (error) {
        toast.error("Error");
      }
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
          <h2>Qeydiyyatdan keç</h2>
          <div className="form-group">
            <label htmlFor="text">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              name="name"
              placeholder="Adinizi daxil edin"
              required
            />
          </div>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Şifre:</label>
            <input
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Şifrenizi Tekrar Daxil edin"
              required
            />
          </div>
          <div className="buttons">
            <button type="submit" disabled={isLoading}>
              Qeydiyyatdan keç
            </button>
            {isLoading && <Loader />}
          </div>
        </form>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
