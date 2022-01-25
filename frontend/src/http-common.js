import axios from "axios"

export default axios.create({
    //URL of backend server
    baseURL: "http://localhost:5000/api/v1/restaurants",
    headers: {
        "Content-type": "application/json"
    }
});
//