const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  deleteRestaurantGroup,
  getReviews,
  createReview
} = require('../controller/Restaurants');

const router = require('express').Router();

router
  .route('/')
  .get(getRestaurants)
  .post(createRestaurant)
  .delete(deleteRestaurantGroup);
router
  .route('/:id')
  .get(getRestaurant)
  .put(updateRestaurant)
  .delete(deleteRestaurant);

router.route('/:id/reviews').get(getReviews).post(createReview);

module.exports = router;
