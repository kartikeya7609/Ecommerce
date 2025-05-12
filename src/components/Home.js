import React from 'react'
import Products from './Products'
import Carousel from './Carousel'
export default function Home() {
  return (
    <>
      <Carousel />
      <div className="container">
        <h1 className="text-center my-4">Welcome to ShopSphere</h1>
        <p className="text-center">Your one-stop shop for all your needs!</p>
        </div>
        <Products />
      
    </>
  );
}
