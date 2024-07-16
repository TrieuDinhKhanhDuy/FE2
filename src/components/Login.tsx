import { joiResolver } from "@hookform/resolvers/joi";
import { Button, Container, FormControl, FormHelperText, Input, InputLabel, Typography, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from "axios";
import Joi from "joi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Schema = Joi.object({
 
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
 
});
 

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(Schema),
  });

  const onSubmit = (data: any) => {
    (async () => {
      try {
        const res = await axios.post("http://localhost:3000/login", data)
        localStorage.setItem("user", JSON.stringify(res.data.user))
      localStorage.setItem("token", res.data.accessToken);
     
       alert("đăng nhập thành công")
        navigate("/");
      } catch (error: any) {
        alert(error.response.message || "Đăng nhập thất bại");
      }
    })();
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom className="text-primary ">
        Đăng nhập tài khoản
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            placeholder="Nhập email của bạn"
            type="email"
            {...register("email", { required: "Vui lòng nhập email" })}
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
            {...register("password", { required: "Vui lòng nhập mật khẩu" })}
          />
          {errors.password && typeof errors.password.message === 'string' && (
            <FormHelperText error>{errors.password.message}</FormHelperText>
          )}
        </FormControl>

        <Button variant="contained" type="submit" fullWidth sx={{ mt: 2, mb: 2 }}>
          Đăng nhập 
        </Button>
      </form>
    </Container>
  );
};

export default Login;
