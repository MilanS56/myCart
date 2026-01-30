import axios from 'axios'

export const api=axios.create({
    baseURL:'https://fakestoreapi.com',
    timeout:5000
})
api.interceptors.request.use(
    config=>{
        console.log('Request:', config.url)
        return config;
},
error=>Promise.reject(error));

api.interceptors.response.use(
    response=>response,
    error=>{
        console.log("API Error: ", error.message);
        if(!error){
            alert("Server Unreachable! Check Internet Connection or API URL");
        }
        else if(error.response.status>=500){
            alert("Server Error. Try Again Later.")
        }
        return Promise.reject(error);
    }
)