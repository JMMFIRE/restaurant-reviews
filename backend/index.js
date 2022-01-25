import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient

var date = new Date()

const port = process.env.PORT || 8000

// connect to database
MongoClient.connect(
	// pass db URI
	process.env.RESTREVIEWS_DB_URI,
	{
		// poolsize: number of people who can acces server. Not supported by Mongo anymore 
		//poolSize: 50,
		wtimeoutMS: 2500,
		// userNewUrlParse not supported by Mongo anymore 
		//useNewUrlParse: true 
	}
)
	// catch any errors
	.catch(err => {
		// send errors to console and exit process
		console.log("time: " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
		console.error(err.stack)
		process.exit(1)
	})
	.then(async client => {
		// how we get initial referenc to restaurnats collection 
		await RestaurantsDAO.injectDB(client)
		await ReviewsDAO.injectDB(client)
		// how we start webserver
		app.listen(port, () => {
			console.log('listening on port ' + port)
		})
	})

