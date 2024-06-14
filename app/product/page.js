"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductPage = () => {
  const router = useRouter();

  const checkAuth = () => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      router.push("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("name");
    localStorage.removeItem("email");

    router.push("/login");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      <h1> Product Page</h1>

      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
};

export default ProductPage;
