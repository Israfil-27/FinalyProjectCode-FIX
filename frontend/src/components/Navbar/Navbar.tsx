import { Badge, Dropdown, Layout, Menu } from "antd";
import { FaShoppingBasket, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlices";
import { useLogoutMutation } from "../../slices/userApiSlices";
import Search from "../search/Search";
import "./navbar.scss";

const { Header } = Layout;

const Navbar = () => {
  const { cartItems } = useSelector((state: any) => state.cart);
  const { state } = useSelector((state: any) => state);
  const { userInfo } = useSelector((state: any) => state.auth);

  const totalItems = cartItems.reduce(
    (total: number, item: any) => total + item.qty,
    0
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const logoutHandle = async () => {
    try {
      await logoutApiCall("").unwrap();
      dispatch(logout(state));
      navigate("/login");
    } catch (error) {}
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile" className="nav-link-dropdown">
          Profil
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/logout" onClick={logoutHandle} className="nav-link-dropdown">
          Çıxış
        </Link>
      </Menu.Item>
      {userInfo && userInfo.isAdmin && (
        <>
          <Menu.Item key="3">
            <Link to="/admin/productlist" className="nav-link-dropdown">
              Məhsullar
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/admin/userlist" className="nav-link-dropdown">
              İstifadəçilər
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/admin/orderlist" className="nav-link-dropdown">
              Sifarişlər
            </Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );

  return (
    <Header className="navbar">
      <Link className="logo" to="/">
        TEXNO I
      </Link>
      <Menu theme="dark" mode="horizontal" className="nav-menu">
        <Search />
        <Menu.Item key="2" className="menu-item">
          <Link to="/cart" className="nav-link">
            <FaShoppingBasket className="svg" />
            Alış-veriş
            {totalItems > 0 && (
              <Badge
                className="badge"
                count={totalItems}
                showZero
                color="#faad14"
              />
            )}
          </Link>
        </Menu.Item>
        <Menu.Item key="3" className="menu-item">
          {userInfo ? (
            <Dropdown overlay={menu} placement="bottomRight">
              <span className="nav-link">
                <FaUser className="svg" />
                {userInfo?.name}
              </span>
            </Dropdown>
          ) : (
            <Link to="/login" className="nav-link">
              <FaUser className="svg" />
              Giriş
            </Link>
          )}
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default Navbar;
