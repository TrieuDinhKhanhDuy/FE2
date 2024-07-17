import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Homepage from "./Layouts/Website/HomePage";
import Login from "./components/Login";
import ProductDetail from "./Layouts/Website/ProductDetail";
import Register from "./components/Register";
import Admin from "./Layouts/Admin/admin";
import { Product } from "./interface";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import { Alert } from "@mui/material";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false); //state để xác định có phải trang admin không
  const [isHomePage, setIsHomePage] = useState(false);

  //Hàm getAllProduct
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    // Kiểm tra xem có đang ở trang admin không
    setIsAdminPage(location.pathname.startsWith("/admin"));
    setIsHomePage(location.pathname === "/");
  }, [location.pathname]);

  //Hàm delete
  const handleDelete = async (id: string) => {
    try {
      // Close the dialog first
      setOpenDialog(false);

      // Perform deletion
      await axios.delete(`http://localhost:3000/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setProductIdToDelete(null); // Close dialog on success or error
    }
  };

  const handleConfirmDelete = () => {
    if (productIdToDelete) {
      handleDelete(productIdToDelete);
    }
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
    setProductIdToDelete(null);
  };

  const openDeleteDialog = (id: string) => {
    setProductIdToDelete(id);
    setOpenDialog(true);
  };

  // hàm thêm
  const [showAlert, setShowAlert] = useState(false);
  const handleAddProduct = async (product: any) => {
    try {
      const { data } = await axios.post(
        `http://localhost:3000/products`,
        product
      );
      fetchProducts();

      // Hiển thị thông báo thành công
      setShowAlert(true);

      // Sau 3 giây, ẩn thông báo và chuyển hướng
      setTimeout(() => {
        setShowAlert(false);
        navigate("/admin");
      }, 3000);
    } catch (error) {
      console.error("Error adding product:", error);
      // Xử lý lỗi nếu cần
    }
  };
  //hàm sửa
  const handleUpdateProduct = async (product: Product) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/products/${product.id}`,
        product
      );
      fetchProducts();

      // Hiển thị thông báo thành công
      setShowAlert(true);

      // Sau 3 giây, ẩn thông báo và chuyển hướng
      setTimeout(() => {
        setShowAlert(false);
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
      // Xử lý lỗi nếu cần
    }
  };

  return (
    <>
      {!isAdminPage && <Header />}
      {showAlert && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Thực hiện thành công
        </Alert>
      )}
      {/* Website */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      {/* Admin */}
      <Routes>
        <Route
          path="/admin"
          element={<Admin product={products} onDelete={openDeleteDialog} />}
        />
        <Route
          path="/admin/add"
          element={<AddProduct onAdd={handleAddProduct} />}
        />
        <Route
          path="/admin/edit/:id"
          element={<EditProduct onEdit={handleUpdateProduct} />}
        />
      </Routes>

      {/* Confirm Dialog */}
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Xóa sản phẩm</DialogTitle>
        <DialogContent>
          <DialogContentText>Bạn chắc chắn muốn xóa không?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} className="text-danger">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} className="text-primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* aloalo */}

      {!isAdminPage && <Footer />}
    </>
  );
}

export default App;
