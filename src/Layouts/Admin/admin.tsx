import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Product } from "src/interface"; // Assuming Product interface is correctly imported

type Props = {
  product: Product[];
  onDelete(id:string) : void;
};

const Admin: React.FC<Props> = ({ product , onDelete}) => {
  const token = localStorage.getItem("token");
  return (
    <>
      {token ? (
        <div>
         <h3 className="text-danger text-uppercase text-size-100 text-center mt-3 mb-4">Xin chào Admin</h3>
         <Link to={'/admin/add'} className="bg-warning text-black p-2 ps-3 pe-3 ms-4 rounded-4 fs-5">Thêm sản phẩm</Link>
          <table className="table table-bordered table-striped mt-4">
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
                    <Link
                      to={`/admin/edit/${product.id}`}
                      className="btn btn-primary mr-2"
                    >
                      Sửa
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(String(product.id))}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
            <Navigate to={'/login'} />
        </div>
      )}
    </>
  );
};

export default Admin;
