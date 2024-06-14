"use client";

import React, { useState } from "react";
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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add login logic here
  };

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
              >
                Login
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
    </Container>
  );
};

export default LoginForm;
