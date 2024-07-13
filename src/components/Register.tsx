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
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";

const Schema = Joi.object({
  username: Joi.string().min(3).max(100).required().messages({
    "string.min": "Username phải lớn hơn 3 ký tự",
    "string.max": "Username không được dài hơn 100 ký tự",
    "any.required": "Vui lòng nhập username",
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Email không đúng định dạng",
      "any.required": "Vui lòng nhập email",
    }),
  password: Joi.string().min(6).max(100).required().messages({
    "string.min": "Mật khẩu không được ít hơn 6 ký tự",
    "string.max": "Mật khẩu không được nhiều hơn 100 ký tự",
    "any.required": "Vui lòng nhập mật khẩu",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Mật khẩu xác nhận không khớp",
    "any.required": "Vui lòng nhập lại mật khẩu",
  }),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(Schema),
  });

  const onSubmit = async (data:any) => {
    try {
      await axios.post("http://localhost:3000/register", data);
      alert("Đăng ký thành công");
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Đăng ký thất bại");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: "50px" }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className="text-primary"
      >
        Đăng ký tài khoản
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="username">Tên đăng nhập</InputLabel>
          <Input
            id="username"
            placeholder="Nhập tên đăng nhập"
            type="text"
            {...register("username")}
          />
          {errors.username && typeof errors.username.message === 'string' && (
            <FormHelperText error>{errors.username.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            placeholder="Nhập email của bạn"
            type="email"
            {...register("email")}
          />
          {errors.email && typeof errors.email.message === 'string' && (
            <FormHelperText error>{errors.email.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="password">Mật khẩu</InputLabel>
          <Input
            id="password"
            placeholder="Nhập mật khẩu của bạn"
            type="password"
            {...register("password")}
          />
          {errors.password && typeof errors.password.message === 'string' && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="confirmPassword">Xác nhận mật khẩu</InputLabel>
          <Input
            id="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && typeof errors.confirmPassword.message === 'string' && (
            <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
        >
          Đăng ký
        </Button>
      </form>
    </Container>
  );
};

export default Register;
