import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewsCtrl from "./reviews.controller.js"

// get access to express router 
const router = express.Router()

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)

router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router.route("/id/:id").get(RestaurantsCtrl.apiGetRestaurantById)
router.route("/cuisines").get(RestaurantsCtrl.apiGetRestaurantCuisines)

// post = create new review
// put = edit a review
// delete = delete a review

router
    .route("/review")
    .post(ReviewsCtrl.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router