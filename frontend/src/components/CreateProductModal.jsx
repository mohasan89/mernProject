import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

import Loader from "../components/Loader";

const CreateProdcutModal = (props) => {
  const product = props.product;

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [upload, setUpload] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setBrand(product.brand);
      setCategory(product.categroy);
      setPrice(product.Price);
      setDescription(product.description);
      setCountInStock(product.countInStock);
      setImage(product.image);
    }
  }, [product]);

  const uploadingHandler = async (e) => {
    setUpload(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/upload", formData, config);
      setImage(data);
    } catch (error) {
      console.log(error);
    }
    setUpload(false);
  };

  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Create New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Product Data:</h4>
          <Form.Group controlId="name">
            <Form.Label>name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="product name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>product description:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="describe your product"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="brand">
            <Form.Label>brand:</Form.Label>
            <Form.Control
              type="text"
              placeholder="product brand"
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Categeory:</Form.Label>
            <Form.Control
              type="text"
              placeholder="product category"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image:</Form.Label>
            <Form.Control
              type="text"
              placeholder="product image"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <Form.File id="image-file" label="Choose file" custom onChange={uploadingHandler} />
            {upload && <Loader />}
          </Form.Group>

          <Form.Group controlId="countInStock">
            <Form.Label>Count in Stock:</Form.Label>
            <Form.Control
              type="number"
              placeholder="items in stock"
              required
              value={countInStock}
              onChange={(e) =>
                setCountInStock(Math.round(e.target.value) < 0 ? 0 : Math.round(e.target.value))
              }
            />
          </Form.Group>
          <Form.Group controlId="Price">
            <Form.Label>Price: </Form.Label>
            <Form.Control
              type="number"
              placeholder="product price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value < 0 ? 0 : e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Form.Group>
            <Button
              type="submit"
              className="bg-dark border-dark"
              onClick={(e) => {
                e.preventDefault();
                if (name && price && description && image && countInStock && category && brand) {
                  product
                    ? props.onSubmit(product._id, {
                        name,
                        Price: price,
                        description,
                        image,
                        countInStock,
                        category,
                        brand,
                      })
                    : props.onSubmit({
                        name,
                        Price: price,
                        description,
                        image,
                        countInStock,
                        category,
                        brand,
                      });
                }
              }}
            >
              Submit
            </Button>
          </Form.Group>
          <Button onClick={props.onHide} className="bg-danger border-danger">
            Close
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateProdcutModal;
