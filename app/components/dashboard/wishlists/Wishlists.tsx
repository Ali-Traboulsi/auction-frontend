import React from "react";
import dynamic from "next/dynamic";
import TitleBoxTwo from "../../TitleBoxTwo";
import WishlistsTable from "./WishlistsTable";



const Wishlists = () => {
  const tableHead = [
    "S.N.",
    "Product Name",
    "Product Price",
    "Highest Bid",
    "Time Left",
    "View",
  ];
  const tableData = [
    {
      id: 1,
      productName: "Vintage Typewriters",
      productPrice: "5,000.00",
      highestBid: "5,600.00",
      timeLeft: "27-12-2023  07:04 AM",
    },
    {
      id: 2,
      productName: "Vintage Typewriters",
      productPrice: "5,000.00",
      highestBid: "5,600.00",
      timeLeft: "27-12-2023  07:04 AM",
    },
    {
      id: 3,
      productName: "Vintage Typewriters",
      productPrice: "5,000.00",
      highestBid: "5,600.00",
      timeLeft: "27-12-2023  07:04 AM",
    },
    {
      id: 4,
      productName: "Vintage Typewriters",
      productPrice: "5,000.00",
      highestBid: "5,600.00",
      timeLeft: "27-12-2023  07:04 AM",
    },
    {
      id: 5,
      productName: "Vintage Typewriters",
      productPrice: "5,000.00",
      highestBid: "5,600.00",
      timeLeft: "27-12-2023  07:04 AM",
    },
    {
      id: 6,
      productName: "Vintage Typewriters",
      productPrice: "5,000.00",
      highestBid: "5,600.00",
      timeLeft: "27-12-2023  07:04 AM",
    },
    {
      id: 7,
      productName: "Vintage Typewriters",
      productPrice: "5,000.00",
      highestBid: "5,600.00",
      timeLeft: "27-12-2023  07:04 AM",
    },
    {
      id: 8,
      productName: "Vintage Typewriters",
      productPrice: "5,000.00",
      highestBid: "5,600.00",
      timeLeft: "27-12-2023  07:04 AM",
    },
    {
      id: 9,
      productName: "Vintage Typewriters",
      productPrice: "5,000.00",
      highestBid: "5,600.00",
      timeLeft: "27-12-2023  07:04 AM",
    },
    {
      id: 10,
      productName: "Vintage Typewriters",
      productPrice: "5,000.00",
      highestBid: "5,600.00",
      timeLeft: "27-12-2023  07:04 AM",
    },
  ];

  return (
    <>
      <TitleBoxTwo cls="auc-primary-heading" delay="0.1s" title="Wishlist's" />
      <WishlistsTable tableHead={tableHead} tableData={tableData} />
    </>
  );
};

export default Wishlists;
