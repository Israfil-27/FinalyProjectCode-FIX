import { Link } from "react-router-dom";
import "./scss.scss"; // Stil dosyasını import edin

const Paginatio = ({ pages, isAdmin = false, keyword = "" }: any) => {
  return (
    <ul className="paginationContainer">
      {[...Array(pages).keys()].map((x) => (
        <Link
          className="link"
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/productlist/${x + 1}`
          }
        >
          <li className={`pagination ${x + 1 === 0 ? "active" : ""}`}>
            {x + 1}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default Paginatio;
