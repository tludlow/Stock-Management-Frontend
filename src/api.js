import axios from "axios";

//The URL for the API which is the standard part, all endpoints are additions to this API
//const LOCAL_TESTING = "http://localhost:6789"
const API_BASE_URL = " https://group23.dcs.warwick.ac.uk/api/"

//Request/response default settings
let config = {
    baseURL: API_BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
};

//Create a new instance of the axios library using these settings configured.
let instance = axios.create(config)
export default instance;