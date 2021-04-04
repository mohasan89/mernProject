import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Carousel, Image } from "react-bootstrap";
import { topItems } from "../store/actions/productsActions";

const CarouselReview = () => {
  const { products } = useSelector((state) => state.topProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      dispatch(topItems());
    } else if (products.length === 0) {
      dispatch(topItems());
    }
  }, [dispatch, products]);

  return (
    <React.Fragment>
      {products ? (
        products.length > 0 ? (
          <Carousel pause="hover" className="bg-dark py-2">
            {products.map((item) => (
              <Carousel.Item className="text-center">
                <LinkContainer to={`/product/${item._id}`}>
                  <Image fluid className="text-center m-auto" src={item.image} alt={item.name} />
                </LinkContainer>
                <Carousel.Caption>
                  <LinkContainer to={`/product/${item._id}`}>
                    <h2 className="my-3 text-center text-white">
                      {item.name} (${item.Price})
                    </h2>
                  </LinkContainer>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        ) : null
      ) : null}
    </React.Fragment>
  );
};

export default CarouselReview;
