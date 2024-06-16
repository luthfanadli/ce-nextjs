"use client";

import { useEffect, useState } from "react";
import { ArrowBack, ExitToApp } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent, Typography } from "@mui/material";

function UserPage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("user_id");

  const fetchUserData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/users/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const userData = await response.json();
      setUserData(userData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("access_token");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    router.push("/login");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: 16,
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          onClick={() => router.push("/product")}
          style={{ marginLeft: "2rem" }}
        >
          Back to Product Page
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ExitToApp />}
          style={{ marginRight: "2rem" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <Card style={{ maxWidth: 600, width: "100%", marginTop: 20 }}>
        <CardContent>
          <Typography variant="h5" style={{ marginBottom: 8 }}>
            User Profile
          </Typography>
          {loading ? (
            <p>Loading user data...</p>
          ) : (
            userData && (
              <div>
                <p style={{ marginBottom: 5 }}>Name: {userData.name}</p>
                <p style={{ marginBottom: 5 }}>Email: {userData.email}</p>
                <p style={{ marginBottom: 5 }}>
                  Longitude: {userData.home_longitude}
                </p>
                <p>Latitude: {userData.home_latitude}</p>
              </div>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default UserPage;
