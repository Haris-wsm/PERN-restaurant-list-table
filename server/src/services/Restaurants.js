const db = require('../db');

const getAllRestaurants = async () => {
  // const restaurants = await db.query(
  //   'SELECT restaurants.id ,restaurants.name, restaurants.location, restaurants.price_range FROM restaurants LEFT JOIN reviews ON restaurants.id = reviews.restaurant_id;'
  // );

  const restaurants = await db.query(
    `select *
    from restaurants
        left join(
            select restaurant_id,
                count(*),
                ROUND(AVG(rating) ,1) as average_rating
            from reviews
            group by restaurant_id
        ) reviews on restaurants.id = reviews.restaurant_id;`
  );

  // const restaurants = await db.query('SELECT * FROM restaurants');

  return restaurants.rows;
};

const getRestaurant = async (id) => {
  const restaurants = await db.query(
    `SELECT * FROM restaurants
      left join(
        select restaurant_id, ROUND(AVG(rating) ,1) as average_rating
        FROM reviews
        group by restaurant_id
      ) reviews on restaurants.id = reviews.restaurant_id AND restaurants.id = $1
    `,
    [id]
  );

  return restaurants.rows;
};

const getReviewRestaurants = async (id, query) => {
  try {
    if (query.avg) {
      const reviews = await db.query(
        'SELECT ROUND(AVG(rating) ,1) as rating FROM reviews WHERE restaurant_id = $1 GROUP BY restaurant_id',
        [id]
      );

      return reviews.rows;
    }

    const reviews = await db.query(
      'SELECT * FROM reviews WHERE restaurant_id = $1',
      [id]
    );
    return reviews.rows;
  } catch (error) {
    console.log(error);
  }
};

const createRestaurant = async (body) => {
  const { name, location, price_range } = body;

  const restaurants = await db.query(
    'INSERT INTO restaurants (name, location, price_range ) VALUES ($1,$2,$3) RETURNING *',
    [name, location, price_range]
  );

  return restaurants.rows;
};

const createReview = async (body, id) => {
  const { name, reviewText, rating } = body;
  try {
    const review = await db.query(
      'INSERT INTO reviews (name, review, rating, restaurant_id ) VALUES ($1,$2,$3,$4) RETURNING *',
      [name, reviewText, rating, id]
    );

    return review.rows;
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurant = async (body, id) => {
  const { name, location, price_range } = body;

  const restaurants = await db.query(
    'UPDATE restaurants SET name=$1, location=$2, price_range=$3  WHERE id=$4  RETURNING *',
    [name, location, price_range, id]
  );

  return restaurants.rows;
};

const deleteRestaurant = async (id) => {
  const restaurants = await db.query(
    'DELETE FROM restaurants WHERE id = $1 RETURNING *',
    [id]
  );

  return restaurants.rows;
};
const deleteRestaurantByGroup = async (items) => {
  const ids = [];

  for (let i = 0; i < items.length; i++) {
    ids.push(`$${i + 1}`);
  }
  console.log(
    `DELETE FROM restaurants WHERE id IN (${ids.join()}) RETURNING *`
  );

  try {
    const restaurants = await db.query(
      `DELETE FROM restaurants WHERE id IN (${ids.join()}) RETURNING *`,
      [...items]
    );
    return restaurants.rows;
  } catch (error) {
    console.log('query error');
  }
};

// exports.create

module.exports = {
  getAllRestaurants,
  getRestaurant,
  getReviewRestaurants,
  createRestaurant,
  createReview,
  deleteRestaurant,
  updateRestaurant,
  deleteRestaurantByGroup
};
