import axios from "axios";

function getUserInfo(){
axios 
    .get(BASE_URL + "user/65353b9a86310f9393052963").then((response)=>{

        console.log(response);
    }) 
}
export default getUserInfo;