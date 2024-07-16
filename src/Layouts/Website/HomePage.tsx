import { Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "src/interface";
import Loading from "../../components/loading";
import ProductCard from "./ProductCart";

function Homepage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  
  return (
    <>
      <Loading isShow={loading} />
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        gap={2}
        alignItems={"center"}
        justifyContent={"center"}
        marginTop={"50px"}
        
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Stack>
    </>
  )
}

export default Homepage;
