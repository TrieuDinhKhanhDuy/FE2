import { joiResolver } from "@hookform/resolvers/joi";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import axios from "axios";
import Joi from "joi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "src/Layouts/Admin/Navbar";
import { Product } from "src/interface";

type Props = {
  onEdit: (product: Product) => void;
};

const Schema = Joi.object({
  title: Joi.string()
    .required()
    .min(6)
    .max(100)
    .messages({
      "string.min": "Title phải lớn hơn 6 ký tự",
      "string.max": "Title không được dài hơn 100 ký tự",
      "any.required": "Vui lòng nhập Title",
    }),
  price: Joi.number()
    .required()
    .min(0)
    .messages({
      "number.min": "Price phải lớn hơn 0",
      "any.required": "Vui lòng nhập Price",
    }),
  image: Joi.string().allow(null),
  description: Joi.string().allow(null),
  category: Joi.string().allow(null),
});

const EditProduct = ({ onEdit }: Props) => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(Schema),
  });

  const onSubmit = (product: Product) => {
    onEdit({...product, id});
  };

  if (!product) {
    return <Typography variant="body1">Đang tải sản phẩm...</Typography>;
  }

  return (
    <>
    <div style={{ display: "flex" }}>
      <Navbar />

    <Container maxWidth="md" sx={{ marginTop: "20px", height: "683px", marginLeft: "30px", marginRight: "350px" }}>
      <Typography
      variant="h4"
      sx={{ 
        marginBottom: "10px",
        fontSize: "28px"
      }}
      className="text-danger mt-3 mb-4"
      >
        Xin chào Admin, chào mừng bạn quay trở lại!!
      </Typography>
      <Typography
        variant="h4"
        sx={{ fontSize: "24px"}}
        align="center"
        gutterBottom
        className="text-primary"
      >
        Sửa sản phẩm
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="username">Title</InputLabel>
          <Input
            id="username"
            placeholder="Tên sản phẩm"
            type="text"
            {...register("title")}
            defaultValue={product?.title || ""}
          />
          {errors.title && (
            <FormHelperText error>{errors.title.message as string}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="email">Price</InputLabel>
          <Input
            id="email"
            placeholder="Giá sản phẩm"
            type="number"
            {...register("price")}
            defaultValue={product?.price || ""}
          />
          {errors.price && (
            <FormHelperText error>{errors.price.message as string}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="password">Description</InputLabel>
          <Input
            id="password"
            placeholder="Mô tả sản phẩm"
            type="text"
            {...register("description")}
            defaultValue={product?.description || ""}
          />
          {errors.description && (
            <FormHelperText error>{errors.description.message as string}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="image">Image</InputLabel>
          <Input
            id="image"
            placeholder="Ảnh sản phẩm"
            type="text"
            {...register("image")}
            defaultValue={product?.image || ""}
          />
          {errors.image && (
            <FormHelperText error>{errors.image.message as string}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="category">Category</InputLabel>
          <Input
            id="category"
            placeholder="Danh mục sản phẩm"
            type="text"
            {...register("category")}
            defaultValue={product?.category || ""}
          />
          {errors.category && (
            <FormHelperText error>{errors.category.message as string}</FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 2,
            mb: 2,
            py: 2,
            px: 4,
            borderRadius: "15px",
            background: "#D44158",
          }}
        >
          Sửa sản phẩm
        </Button>
      </form>
    </Container>
    </div>
    </>
  );
};

export default EditProduct;
