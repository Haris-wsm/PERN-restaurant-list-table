CREATE TABLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    restaurant_id BIGINT NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating > 0 AND rating <= 5),
    CONSTRAINT fk_restaurant
      FOREIGN KEY(restaurant_id) 
	  REFERENCES restaurants(id)
);


CREATE TABLE restaurants(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT NOT NULL CHECK(price_range > 0 AND price_range <= 5)

);