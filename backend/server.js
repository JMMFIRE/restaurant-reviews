import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"

// makes server
const app = express()

app.use(cors())
// allows server to accept JSON in body of request
app.use(express.json())

// initial routes
app.use("/api/v1/restaurants", restaurants)
// if someone tries to go to different route (one that does not exist) returns error
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))


// export app as module
export default app 