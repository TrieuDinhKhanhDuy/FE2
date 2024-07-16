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
import Joi from "joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Product } from "src/interface";

type Props = {
  onAdd : (product:Product) => void
}
const Schema = Joi.object({
  title:Joi.string().required().min(6).max(100).messages({
    "string.min": "Title phải lớn hơn 6 ký tự",
    "string.max": "Title không được dài hơn 100 ký tự",
    "any.required": "Vui lòng nhập Title",
  }),
  price: Joi.number().required().min(0).messages({
    "number.min": "Price phải lớn hơn 0",
    "any.required": "Vui lòng nhập Price",
  }),
  image:Joi.string().allow(null),
  description:Joi.string().allow(null),
  category:Joi.string().allow(null),
});

const AddProduct = ({onAdd} : Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(Schema),
  });

  const onSubmit = (product:Product) => {
    onAdd(product)
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className="text-primary"
      >
       Thêm sản phẩm
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="username">Title</InputLabel>
          <Input
            id="username"
            placeholder="Tên sản phẩm"
            type="text"
            {...register("title")}
          />
          {errors.title && typeof errors.title.message === 'string' && (
            <FormHelperText error>{errors.title.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="email">Price</InputLabel>
          <Input
            id="email"
            placeholder="Giá sản phẩm"
            type="number"
            {...register("price")}
          />
          {errors.price && typeof errors.price.message === 'number' && (
            <FormHelperText error>{errors.price.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="password">Description</InputLabel>
          <Input
            id="password"
            placeholder="Mô tả sản phẩm"
            type="text"
            {...register("description")}
          />
          {errors.description && typeof errors.description.message === 'string' && (
            <FormHelperText error>{errors.description.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="confirmPassword">Image</InputLabel>
          <Input
            id="confirmPassword"
            placeholder="Ảnh sản phẩm"
            type="text"
            {...register("image")}
          />
          {errors.image && typeof errors.image.message === 'string' && (
            <FormHelperText error>{errors.image.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="confirmPassword">Category</InputLabel>
          <Input
            id="confirmPassword"
            placeholder="Danh mục sản phẩm"
            type="text"
            {...register("category")}
          />
          {errors.category && typeof errors.category.message === 'string' && (
            <FormHelperText error>{errors.category.message}</FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          sx={{ mt: 2, mb: 2 ,py:2, px :4 , borderRadius: '15px' , background : '#D44158'}}
        >
         Thêm sản phẩm
        </Button>
      </form>
    </Container>
  );
};

export default AddProduct;
