import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/ProductDetails.css";
import "../components/Products.css";

function Products() {
  const [content, setContent] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5); 
  const navigateToProductDetails = useNavigate();

  const getData = async () => {
    try {
      let { data } = await axios.get("https://fakestoreapi.com/products");
      console.log(data);
      setContent(data);
      setAllProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const goto = (id) => {
    navigateToProductDetails(`/${id}`);
  };

  const categoryFilter = ({ target: { value } }) => {
    let selectedCategory = allProducts?.filter(({ category }) => {
      if (value === category) {
        return value === category;
      } else if (value === "All Category" || value === "") {
        return true;
      }
      return false;
    });
    console.log(selectedCategory);
    setContent(selectedCategory);
    setCurrentPage(1); 
  };

  const searchRef = useRef();
  const searchProduct = () => {
    let selectedProduct = allProducts?.filter(({ title }) => {
      return title.toLowerCase().includes(searchRef.current.value.toLowerCase());
    });
    setContent(selectedProduct);
    setCurrentPage(1);
  };
  const pricesorting = ({target:{value}})=>{
    let sortedprice = [...allProducts]?.sort((a,b)=>{
        if(value=="0-1000"){
            console.log(a.price);
            return a.price-b.price;
        }else if(value == "1000-0"){
            return b.price-a.price;
        }else{
            return allProducts;
        }
    })
    console.log(sortedprice);
    setContent(sortedprice)
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = content.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(content.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


useEffect(() => {
  const updateProductsPerPage = () => {
    if (window.innerWidth <= 768) { 
      setProductsPerPage(1); 
    } else {
      setProductsPerPage(5);
    }
  };

  window.addEventListener("resize", updateProductsPerPage);
  updateProductsPerPage();

  return () => window.removeEventListener("resize", updateProductsPerPage);
}, []);


  return (
    <div className="productsdiv">
      <div className="searchdiv">
        <input
          type="text"
          className="productsearch"
          placeholder="Product Search"
          ref={searchRef}
        />
        <button onClick={searchProduct}>Search</button>
      </div>
      <table border={3} cellSpacing={"0px"} cellPadding={"10px"}>
        <thead>
          <tr>
            <th>SI NO</th>
            <th>
              <select name="category" id="" onChange={categoryFilter}>
                <option value="">Select Category</option>
                <option value="men's clothing">men's clothing</option>
                <option value="jewelery">jewelery</option>
                <option value="electronics">electronics</option>
                <option value="women's clothing">women's clothing</option>
                <option value="All Category">All Category</option>
              </select>
            </th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Image</th>
            <th><select name="category" id="" onChange={pricesorting}>
                <option value="price">Price</option>
                <option value="0-1000">Price(0 - 1000)</option>
                <option value="1000-0">Price(1000 - 0)</option>
              </select></th>
            <th>Product Details</th>
          </tr>
        </thead>
        {currentProducts?.map(({ id, title, description, image, price, category }) => {
          return (
            <tbody align="center" key={id}>
              <tr>
                <td>{id}</td>
                <td>{category}</td>
                <td>{title}</td>
                <td>{description}</td>
                <td>
                  <img src={image} alt="Products" />
                </td>
                <td>{price}</td>
                <td>
                  <button onClick={() => goto(id)}>View</button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      <div className="pagination">
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? "active" : ""}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Products;

