"use client";

import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const OrderPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const product_id = searchParams.get("product_id");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProductData = async (productId) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/product/${productId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (product_id) {
      fetchProductData(product_id);
    } else {
      setLoading(false);
    }
  }, [product_id]);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;
    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    const data = {
      id: product.product_id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    const response = await fetch("/api/midtrans", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const requestData = await response.json();
    window.snap.pay(requestData.token);
  };

  if (loading) {
    return (
      <Container
        style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          onClick={() => router.push("/product")}
          style={{ alignSelf: "flex-start", marginBottom: "16px" }}
        >
          Back to Product Page
        </Button>
        {product ? (
          <Card style={{ width: "100%" }}>
            <CardMedia
              component="img"
              image={product.imageUrl}
              alt={product.name}
              style={{ height: "300px", objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="h4" align="center">
                {product.name}
              </Typography>
              <Typography variant="h6" align="center">
                {formatRupiah(product.price)}
              </Typography>
              <Typography
                variant="body1"
                style={{ marginTop: "16px", textAlign: "center" }}
              >
                {product.description}
              </Typography>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "24px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="h6" align="center">
            Product not found.
          </Typography>
        )}
      </Container>
    </div>
  );
};

const formatRupiah = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export default OrderPage;
