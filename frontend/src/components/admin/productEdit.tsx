import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useGetProductsDetailsQuery,
  useUploadProductImageMutation,
} from "../../slices/ProductApiSlice";

import "./ProductEdit.scss";
import { toast } from "react-toastify";

interface ProductEditProps {}

const ProductEdit: React.FC<ProductEditProps> = () => {
  const { id: productId } = useParams<{ id: string }>();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [countInStock, setCountInStock] = useState<number>(0);
  const [description, setDescription] = useState<string>("");

  const { data: product } = useGetProductsDetailsQuery(productId);
  const [updateProduct] = useUpdateProductMutation();

  const [uploadProductImage] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    const result = await updateProduct(updatedProduct);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Məhsul yeniləndi");
      navigate("/admin/productlist");
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const res = await uploadProductImage(formData).unwrap();
        toast.success(res.message);
        setImage(res.image);
      } catch (err) {
        toast.error("Error");
        console.log(err);
      }
    }
  };

  return (
    <div className="product-edit-container">
      <div className="product-edit-header">
        <a href="/admin/productlist" className="go-back-button">
          Geri Qayıt
        </a>
        <h1>Məhsulu Redaktə Et</h1>
      </div>
      <form className="product-edit-form" onSubmit={submitHandler} action="#">
        <div className="form-item">
          <label htmlFor="name">Ad</label>
          <input
            value={name}
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="form-item">
          <label htmlFor="price">Qiymət</label>
          <input
            value={price}
            type="number"
            id="price"
            name="price"
            onChange={(e) => setPrice(Number(e.target.value))}
          ></input>
        </div>

        <div className="form-item">
          <label htmlFor="image">Şəkil</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={uploadFileHandler}
          ></input>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="form-item">
          <label htmlFor="brand">Brend</label>
          <input
            value={brand}
            type="text"
            id="brand"
            name="brand"
            onChange={(e) => setBrand(e.target.value)}
          ></input>
        </div>

        <div className="form-item">
          <label htmlFor="category">Kateqoriya</label>
          <input
            value={category}
            type="text"
            id="category"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          ></input>
        </div>

        <div className="form-item">
          <label htmlFor="countInStock">Stokda Say</label>
          <input
            value={countInStock}
            type="number"
            id="countInStock"
            name="countInStock"
            onChange={(e) => setCountInStock(Number(e.target.value))}
          ></input>
        </div>

        <div className="form-item">
          <label htmlFor="description">Açıqlama</label>
          <textarea
            value={description}
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-item">
          <button type="submit">Məhsulu Yenilə</button>
        </div>
      </form>
    </div>
  );
};

export default ProductEdit;
