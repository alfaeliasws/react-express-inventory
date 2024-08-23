import * as React from "react";
import { useState, useEffect } from "react";
import { filterSortLoadProducts, getAllProducts } from "../services/JobListServices";

export default function Products() {
  
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(1)
  const [industry, setIndustry] = useState([])
  const [sort, setSort] = useState("ASC")  

  async function fetchFirstProducts () {
    const products = await getAllProducts()
    return setProducts(products)
  }

  async function handleSort(){
    setSort((prevSort) => prevSort === "ASC" ? "DESC" : "ASC")

    const sort = await filterSortLoadProducts(page, industry, sort)
    return setProducts(sort) 
  }

  async function handleClickLoadMore(){

    setPage((prevPage) => prevPage + 1)

    const products = await filterSortLoadProducts(page, industry, sort)
    return setProducts(products) 
  }

  async function handleFilter(value) {
    setIndustry((prevFilter) => {
      if(prevFilter.includes(value)){
        return prevFilter.filter((item) => item !== value)
      }

      return [...prevFilter, value]
    })

    const filter = await filterSortLoadProducts(page, industry, sort)
    return setProducts(filter) 
  }

  useEffect(() => {
    fetchFirstProducts()
  }, [])

  return (
    <div className="flex overflow-hidden flex-col bg-black bg-opacity-0">

    </div>
  );
}