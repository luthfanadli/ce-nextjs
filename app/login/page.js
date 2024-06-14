"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const checkAuth = () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      router.push("/product");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://51.79.254.247:8123/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/product");
      }, 1000);
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Container
      maxWidth="xs"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper elevation={3} style={{ padding: "2em", borderRadius: "8px" }}>
        <Box textAlign="center" marginBottom="1em">
          <Typography variant="h4">Login</Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </Grid>
            <Grid item textAlign="center">
              <Typography variant="body2">
                Need to create an account?{" "}
                <Link href="/register" passHref>
                  Create Account
                </Link>
              </Typography>
            </Grid>
            <Grid item textAlign="center">
              <Link href="/" passHref>
                <Button variant="text">Back to Home</Button>
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer />
    </Container>
  );
};

export default LoginForm;
