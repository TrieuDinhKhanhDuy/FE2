import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Container, Input, Stack, Typography } from "@mui/material";

import { Product } from "src/interface";
import Loading from "./loading";

function ProductDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>();
  const[quality, setQuality]  = useState<number>(0)

  const getProduct = async (id: string) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);
  const decreaseQuality = () => {
    if (quality > 0) {
      setQuality(quality - 1);
    }
  };

  const increaseQuality = () => {
    setQuality(quality + 1);
  };
  return (
    <>
      <Loading isShow={loading} />
      <Stack>
        {product && (
          <Stack
            direction={"row"}
            gap={3}
            marginTop={"30px"}
            padding={"0 50px"}
          >
            <img src={product.image} alt="" width={"500px"} />
            <Stack gap={3}>
              <Typography component="h1" fontSize={"26px"}>
                {product.title}
              </Typography>
              <Typography fontWeight={"bold"} color={"Highlight"}>
                ${product.price}
              </Typography>
              <Typography fontSize={"20px"}>
                Rate: {product.rating.count}
              </Typography>
              <Typography>{product.description}</Typography>
              <Typography
                sx={{
                  width: "40%",
                  p: 1,
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button
                    sx={{ minWidth: 0, width: 32, height: 32, borderRadius: 0 , background:"#1976D2" , color:"white" ,fontSize:"30px"}}
                    onClick={() => decreaseQuality()}
                  >
                    −
                  </Button>
                  <Input
                    disableUnderline
                    sx={{
                      flex: 1,
                      border: "1px solid black",
                      borderRadius: 0,
                      textAlign: "center",
                      "& input": {
                        textAlign: "center",
                        padding: "8px 12px",
                      },
                    }}
                    value={quality}
                  />
                  <Button
                    sx={{ minWidth: 0, width: 32, height: 32, borderRadius: 0  , background:"#1976D2",color:"white" ,  fontSize:"30px"}}
                    onClick={() => increaseQuality()}
                  >
                    +
                  </Button>
                </Stack>
              </Typography>
              <Button variant="outlined">Add to cart</Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default ProductDetail;
