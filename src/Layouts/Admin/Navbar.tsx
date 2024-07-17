import "./nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    alert('Đăng xuất thành công')
    navigate('/')
}
  return (
    <div className="container">
      <div className="sidebar">
        <div className="sidebar-header">
          <FontAwesomeIcon icon={faUserTie} className="icon-admin" />
          <h2>Trang Admin</h2>
        </div>
        <div className="sidebar-content">
          <ul className="nav-list">
            <li>
            <Link to={'/admin'} ><a href="">Danh sách sản phẩm</a></Link>
            </li>
            <li>
               <Link to={'/admin/add'} ><a href="">Thêm sản phẩm</a></Link>
            </li>
            <li>
            <Link to={''} ><a href="">Quản lý khách hàng</a></Link>
            </li>
            <li>
            <Link to={''} ><a href="">Quản lý bình luận</a></Link>
            </li>
            <li>
            <Link to={''} ><a href="">Quản lí liên hệ</a></Link>
            </li>
            <li>
            <Link to={''} ><a href="">Quản lý đơn hàng</a></Link>
            </li>
            <li>
            <Link to={''} ><a href="">Thống kê sản phẩm</a></Link>
            </li>
          </ul>
          <div style={{position: "relative"}}>
           
          <button type="submit" className="bg-success-subtle" onClick={()=>{handleLogout()}}> <FontAwesomeIcon className="icon-logout" icon={faRightFromBracket} flip="horizontal" style={{color: "#000000",}} />Đăng xuất</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
