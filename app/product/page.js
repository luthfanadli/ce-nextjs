"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Pagination from "@mui/material/Pagination";

const ProductPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const formatRupiah = (angka) => {
    return angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const checkAuth = () => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      router.push("/login");
    }
  };

  const handleLogout = (router) => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    router.push("/login");
  };

  useEffect(() => {
    checkAuth(router);
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, minPrice, maxPrice, sortOrder, products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://51.79.254.247:8123/product");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (minPrice === "" || product.price >= minPrice) &&
        (maxPrice === "" || product.price <= maxPrice)
      );
    });

    if (sortOrder === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price_desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMinPrice = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, marginLeft: "3vw" }}>
            Product Page
          </Typography>
          <Button
            color="inherit"
            onClick={() => router.push("/profile")}
            style={{ marginRight: "2rem" }}
          >
            User Profile
          </Button>
          <Button color="inherit" onClick={() => handleLogout(router)}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" style={{ display: "flex", marginTop: "16px" }}>
        <Grid container spacing={3}>
          <Grid item xs={3} style={{ paddingRight: "0px" }}>
            <div style={{ padding: "16px" }}>
              <Typography variant="h6">Filter Products</Typography>
              <TextField
                label="Search"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Min Price"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={minPrice}
                onChange={handleMinPrice}
              />
              <TextField
                label="Max Price"
                variant="outlined"
                fullWidth
                margin="normal"
                type="number"
                value={maxPrice}
                onChange={handleMaxPrice}
              />
              <FormControl fullWidth variant="outlined" margin="normal">
                <InputLabel>Sort by</InputLabel>
                <Select
                  value={sortOrder}
                  onChange={handleSortOrder}
                  label="Sort by"
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="price_asc">Price: Low to High</MenuItem>
                  <MenuItem value="price_desc">Price: High to Low</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={9}>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
              </div>
            ) : (
              <>
                <Grid container spacing={3}>
                  {currentProducts.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Card
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={product.imageUrl}
                          alt={product.name}
                          style={{ height: "190px", objectFit: "cover" }}
                        />
                        <CardContent
                          style={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            <Typography variant="h6">{product.name}</Typography>
                          </div>

                          <Box
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              marginTop: "auto",
                            }}
                          >
                            <Typography variant="h7">
                              {formatRupiah(product.price)}
                            </Typography>
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginTop: "10px" }}
                              onClick={() =>
                                router.push(
                                  `/order?product_id=${product.product_id}`
                                )
                              }
                            >
                              Order
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Pagination
                  count={Math.ceil(filteredProducts.length / productsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  style={{
                    marginTop: "15px",
                    marginBottom: "25px",
                    justifyContent: "center",
                    display: "flex",
                  }}
                />
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductPage;
