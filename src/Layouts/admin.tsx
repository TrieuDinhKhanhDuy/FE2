import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from 'src/interface'; // Assuming Product interface is correctly imported

type Props = {
  product: Product[];
};

const Admin: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate()
  let accessToken = null;
  try {
    accessToken = JSON.parse(localStorage.getItem("accessToken") || "null");
  } catch (error) {
    console.error("Error parsing access token from localStorage:", error);
  }
  if (!accessToken) {
  return (
  <>
  <div className='d-flex flex-column align-items-center mt-5'>
  <h3 className='text-danger mb-4'>Bạn không có quyền truy cập vui lòng đăng nhập để được vào Admin</h3>
  <button onClick={() => navigate('/login')} className='btn btn-primary' style={{ width: '200px' }}>
    Đăng nhập
  </button>
  </div>

  </>
  )
  }

  const onDel = (id: number) => {
    // Handle delete functionality here
  };

  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead className="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map((product) => (
            <tr key={product.id}>
              <td className="text-center">{product.id}</td>
              <td className="text-center">{product.title}</td>
              <td className="text-center">${product.price}</td>
              <td className="text-center">
                <img src={product.image} width={80} alt="" />
              </td>
              <td className="text-center">{product.category}</td>
              <td className="text-center">
                <Link to={`product/${product.id}`} className="btn btn-primary mr-2">
                  Sửa
                </Link>
                <button className="btn btn-danger" onClick={() => onDel(Number(product.id))}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
