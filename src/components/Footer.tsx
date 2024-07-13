import { Stack, Typography } from '@mui/material';
import React from 'react';

const CustomStack = () => {
  return (
    <Stack
      sx={{
        background: "#1976D2",
        color: "white",
        textAlign: "center",
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        height: "70px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000, // Đảm bảo footer hiển thị trên các phần còn lại của trang
      }}
    >
      <Typography variant="body1">
        Triệu Đình Khánh Duy - PH33973
      </Typography>
    </Stack>
  );
}

export default CustomStack;
