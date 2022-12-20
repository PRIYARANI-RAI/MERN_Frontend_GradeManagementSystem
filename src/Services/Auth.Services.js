import axios from "axios";
import { getTeacherInfo } from './Auth.Header';
const TOKEN = getTeacherInfo();

const API_URL = "http://localhost:8802/";

let axiosConfig  = {
    headers:{
        'Content-Type' : 'application/json',
        'Authorization' : TOKEN
    }
}

export const login = async ({email,password}) => {
    try{
        const response =  await axios.post (API_URL + "teacher/Login",{
            email,
            password
                },axiosConfig)
                if(response.data.status === 200){
                    localStorage.setItem('teacher',JSON.stringify(response.data));
                    
                    return response   
                }else{
                    return response;
                }
    }catch(e){
            return null;
    }
}

export const getToken =async () => {
    console.log(getTeacherInfo());
    return axios.get(API_URL + "teacher/getteacherbyid",axiosConfig)
}

export const showlist = async () => {
    return axios.get(API_URL + "teacher/getStudentDataList",axiosConfig)
} 

// export const updateStudent = async (data,id,teacherid) => {
//     console.log(data);
//   return await axios.put(API_URL + "teacher/updatestudent", {
//       id,
//       teacherid,
//       fullname:data.fullname,
//       email:data.email,
//       cls:data.cls,
//       image:data.image,
//       english:data.english,
//       maths:data.maths,
//       science:data.science,
//       hindi:data.hindi,
//   }, axiosConfig)
// }



export const updateStudent = async  (formData) => {
    return await axios.put(API_URL +  "teacher/updateStudent",
formData,
{
    'Authorization' : TOKEN
}
    )
}

export const deleteStudent = async (_id) => {
    // console.log("auth",_id)
  return await axios.delete(
      `${API_URL}teacher/getstudentdelete/${_id}`, axiosConfig)
}

export const getStudentDetail = async (_id) => {

    return axios.get(API_URL + `teacher/getStudentDataById?_id=${_id}`, axiosConfig)
}
