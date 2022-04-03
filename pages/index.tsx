import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { fetchPosts } from "../lib/client";

const Home: NextPage = () => {
  useEffect(() => {
    fetchPosts();
  }, []);
  return <div></div>;
};

export default Home;
