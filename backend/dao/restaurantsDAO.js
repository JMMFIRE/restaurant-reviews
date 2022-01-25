import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

// reference to database
let restaurants

export default class RestaurantsDAO {

	// how to connect to the database. Gets called as soon as the server starts to get a reference to the restaurants databse
	static async injectDB(conn) {
		// // if the reference is already filled return
		if (restaurants) {
			return
		}
		try {
			// get reference to database with the collection name "restaurants"
			restaurants = await conn.db(process.env.RESTREVIEWS_NS).collection("restaurants")
		} catch (e) {
			console.error(
				'Unable to establish a collection handle in restaurantsDAO: ' + e,
			)
		}
	}

	// what's called when we want to get list of all restaurants in database
	static async getRestaurants({
		// set default options for pages 
		filters = null,
		page = 0,
		restaurantsPerPage = 20,
	} = {}) {
		let query
		// if filters != null
		if (filters) {
			if ("name" in filters) {
				// query sent to mongoDB 
				query = { $text: { $search: filters["name"] } }
			} else if ("cuisine" in filters) {
				query = { "cuisine": { $eq: filters["cuisine"] } }
			} else if ("zipcode" in filters) {
				query = { "address.zipcode": { $eq: filters["zipcode"] } }
			}
		}

		//get a cursor
		let cursor

		try {
			// finds all restaurants in database that match the query
			// if query = null will return all restaurants
			cursor = await restaurants.find(query)
		} catch (e) {
			console.error('Unable to issue find command, ' + e)
			return { restaurantsList: [], totalNumRestaurants: 0 }
		}

		// if no error limit results to restaurantsPerPage and skip to the page number 
		const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)
		console.log(`Page number: ${page}`)

		try {
			const restaurantsList = await displayCursor.toArray()
			//get total number of restaurants 
			const totalNumRestaurants = await restaurants.countDocuments(query)

			return { restaurantsList, totalNumRestaurants }
		} catch (e) {
			console.error(
				'Unable to convert cursor to array or problem counting documents, ' + e
			)
			return { restaurantsList: [], totalNumRestaurants: 0 }
		}
	}

	static async getRestaurantByID(id) {
		try {
		  const pipeline = [
			{
				$match: {
					_id: new ObjectId(id),
				},
			},
				  {
					  $lookup: {
						  from: "reviews",
						  let: {
							  id: "$_id",
						  },
						  pipeline: [
							  {
								  $match: {
									  $expr: {
										  $eq: ["$restaurant_id", "$$id"],
									  },
								  },
							  },
							  {
								  $sort: {
									  date: -1,
								  },
							  },
						  ],
						  as: "reviews",
					  },
				  },
				  {
					  $addFields: {
						  reviews: "$reviews",
					  },
				  },
			  ]
		  return await restaurants.aggregate(pipeline).next()
		} catch (e) {
		  console.error(`Something went wrong in getRestaurantByID: ${e}`)
		  throw e
		}
	  }

	static async getCuisines() {
		let cuisines = []
		try {
			cuisines = await restaurants.distinct("cuisine")
			return cuisines 
		} catch (e) {
			console.error(`Unable to get cuisines. ${e}`)
			return cuisines 
		}
	}
}