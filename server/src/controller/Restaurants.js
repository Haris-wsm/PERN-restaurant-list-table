const db = require('../db');
const Service = require('../services/Restaurants');

// GET
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Service.getAllRestaurants();
    res.status(200).json({
      status: 'success',
      length: restaurants.length,
      data: {
        restaurants: restaurants
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

// GET @params {id: number}
exports.getRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurants = await Service.getRestaurant(id);

    res.status(200).json({
      status: 'success',
      data: {
        restaurant: restaurants
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Service.getReviewRestaurants(id, req.query);
    res.status(200).json({ status: 'success', data: { reviews } });
  } catch (error) {
    res.status(500).json({ message: 'fail', message: error.message });
    console.log(error);
  }
};

// POST
// path /
// @body {
//  name: string, location: string, price_range: string
//     }

exports.createRestaurant = async (req, res) => {
  try {
    const restaurants = await Service.createRestaurant(req.body);
    res.status(200).json({
      status: 'success',
      length: restaurants.length,
      data: {
        restaurant: restaurants
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const review = await Service.createReview(req.body, req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        review: review
      }
    });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });

    res.status(500).console.log(error);
  }
};

// PUT
// path /:id
//

exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Service.updateRestaurant(req.body, id);
    res.status(200).json({ status: 'success', data: { restaurant } });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurants = await Service.deleteRestaurant(id);
    res.status(204).json({ status: 'success', data: { restaurants } });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};

exports.deleteRestaurantGroup = async (req, res) => {
  try {
    const { items } = req.body;
    console.log(items);
    const restaurants = await Service.deleteRestaurantByGroup(items);
    res.status(204).json({ status: 'success', data: { restaurants } });
  } catch (error) {
    res.status(500).json({ status: 'fail', message: error.message });
  }
};
