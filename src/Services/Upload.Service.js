import axios from "axios";


export const uploadFile = async  (formData) => {
    return await axios.post("http://localhost:8802/teacher/studentAdd",
formData,
{}
    )
}