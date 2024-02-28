import axios from "axios";

const BASE_API_URL ="http://localhost:8080";

export const registerUsers = (user) =>{
    return axios.post(BASE_API_URL+'/register', user);
}

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

export const loginUser = (usernameOrEmail, password) => {
    const payload = {
        usernameOrEmail: usernameOrEmail,
        password: password
    };
    return axios.post(BASE_API_URL + '/login', payload, config);
};

export const storeToken = (token)=>{
    return localStorage.setItem("token",token);
}

export const getToken = ()=>{
    return localStorage.getItem("token");
}

export const isAdminUser = ()=>{
    let role=sessionStorage.getItem("role"); 
    if(role!=null && role=== 'ROLE_ADMIN')
    {
        return true; 
    }
    else{
        return false;
    }
}

export const saveLoggedInUser = (usernameOrEmail,role) =>{
    sessionStorage.setItem("authenticatedUser",usernameOrEmail);
    sessionStorage.setItem("role",role);

}

export const isUserLoggedIn = () =>{
    const usernameOrEmail=sessionStorage.getItem("authenticatedUser");
    if(usernameOrEmail==null)
    {
        return false;
    }
    else{
        return true;
    }
}


export const getLoggedInUser = () =>{
    const usernameOrEmail=sessionStorage.getItem("authenticatedUser");
    return usernameOrEmail;
}

export const logoutUser=()=>{
    localStorage.clear();
    sessionStorage.clear();
}

//Request Interceptor
axios.interceptors.request.use(function (config){
     config.headers['Authorization'] =getToken();
     return config;
    },function (error){ 
        return Promise.reject(error);
    });

export const addStudents = (student) =>{
    return axios.post(BASE_API_URL+'/students', student);
}

export const getStudents = () =>{
    return axios.get(BASE_API_URL+'/students');
}

export const getStudentById = (studentId) =>{
    return axios.get(BASE_API_URL+ '/students/' + studentId);
}

export const updateStudent = (studentId, student) =>{
    return axios.put(BASE_API_URL + '/students/' + studentId,student);
}

export const deleteStudent = (studentId) => {
    return axios.delete(BASE_API_URL + '/students/' + studentId);
}

export const addDepartments = (department) =>{
    return axios.post(BASE_API_URL+'/department', department);
}

export const getDepartments = () =>{
    return axios.get(BASE_API_URL+'/department');
}

export const getDepartmentById = (departmentId) =>{
    return axios.get(BASE_API_URL+ '/department/' + departmentId);
}

export const updateDepartments = (departmentId,department) =>{
    return axios.put(BASE_API_URL+'/department/'+departmentId,department);
}

export const deleteDepartment = (departmentId) =>{
    return axios.delete(BASE_API_URL+'/department/'+departmentId);
}

const paymentconfig = {
    headers: {
        'token': 'token-id',
        'amount':500
    }
};

export const payment =()=>{
    return axios.post(BASE_API_URL+'/students/charge'+paymentconfig);
}




