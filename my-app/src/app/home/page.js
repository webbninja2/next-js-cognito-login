"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function HomePage() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, [router]);
  return <div>HomePage</div>;
}

export default HomePage;
