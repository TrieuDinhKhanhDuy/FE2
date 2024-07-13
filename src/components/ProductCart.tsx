import { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "src/interface";
import { Link } from "react-router-dom";

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <Card sx={{ maxWidth: 345 , height : 400 , position : 'relative'}}>
      <Link to={`product/${product.id}`}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={product.image}
        sx={{ objectFit: "contain" ,} }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{fontSize : 20}}>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions sx={{position:'absolute' , bottom :0 , left : 5}}>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
        <Link to={`edit/${product.id!}`}>Update</Link>
      </CardActions>
      </Link>
    </Card>
  );
};

export default ProductCard;
