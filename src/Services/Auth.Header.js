export const getTeacherInfo = () => {
    let teacher = localStorage.getItem("teacher");
    teacher = (JSON.parse(teacher));
   return teacher;
}