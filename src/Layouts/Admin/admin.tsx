import React from "react";
import { Link, Navigate } from "react-router-dom";
import { Product } from "src/interface"; // Assuming Product interface is correctly imported
import "./admin.css";
import Navbar from "./Navbar";

type Props = {
  product: Product[];
  onDelete(id: string): void;
};

const Admin: React.FC<Props> = ({ product, onDelete }) => {
  const token = localStorage.getItem("token");
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ flex: "0 0 80%", padding: "20px"}}>
        {token ? (
          <div>
            <h3 className="text-danger text-size-100 mt-3 mb-4">
              Xin chào Admin, chào mừng bạn quay trở lại!!
            </h3>
            <h4>Danh sách sản phẩm</h4>
            <table className="product-table table table-bordered table-striped mt-4">
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
                      <img src={product.image} width={80} height={90} alt="" />
                    </td>
                    <td className="text-center">{product.category}</td>
                    <td className="text-center">
                      <Link
                        to={`/admin/edit/${product.id}`}
                        className="btn btn-warning mr-2"
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
            <Navigate to={"/login"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
