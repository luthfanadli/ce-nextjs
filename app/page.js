"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Container,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const checkAuth = () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      router.push("/product");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "2em 0",
      }}
    >
      <Box textAlign="center" marginBottom="2em">
        <Typography variant="h3">Welcome to E-Commerce Store</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Explore a wide range of products at great prices.
        </Typography>
      </Box>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ height: "100%" }}>
            <CardMedia
              component="img"
              height="200"
              image="https://cdn.eraspace.com/media/catalog/product/a/p/apple_iphone_15_blue_1_5.jpg"
              alt="Iphone 15"
              style={{ objectFit: "contain", height: 200 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Iphone 15
              </Typography>
              <Typography variant="body2" color="textSecondary">
                New Iphone 15 with dynamic island, main camera 48mp and usb-C.
                All in one solid Aluminium design.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ height: "100%" }}>
            <CardMedia
              component="img"
              height="200"
              image="https://id.canon/media/image/2020/07/04/862a1f43feed4fab85897aee45b6324c_R5_Front_BODY.png"
              alt="Canon EOS R5 Mirrorless Camera"
              style={{ objectFit: "contain", height: 200 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Canon EOS R5 Mirrorless Camera
              </Typography>
              <Typography variant="body2" color="textSecondary">
                The Canon EOS R5 is a high-performance mirrorless camera
                designed for professional photographers and advanced
                enthusiasts.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card style={{ height: "100%" }}>
            <CardMedia
              component="img"
              height="200"
              image="https://blog.playstation.com/tachyon/2023/10/cd56722db7b991b3d7a33f1bafd55f80d0ac553d.png?resize=1088%2C612&crop_strategy=smart"
              alt="Sony PlayStation 5"
              style={{ objectFit: "contain", height: 200 }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Sony PlayStation 5
              </Typography>
              <Typography variant="body2" color="textSecondary">
                The Sony PlayStation 5 is a next-generation gaming console that
                offers cutting-edge graphics, ultra-fast load times, and
                immersive 3D audio.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box marginTop="2em">
        <Typography variant="subtitle1" style={{ marginLeft: "1rem" }}>
          Ready to start shopping?
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Link href="/login" passHref>
              <Button variant="contained" color="primary">
                Login
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" passHref>
              <Button variant="contained" color="secondary">
                Register
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
