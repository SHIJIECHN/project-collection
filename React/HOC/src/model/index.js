import axios from "axios";

export function fetchListData(field) {
    let url = '';

    switch (field) {
        case 'student':
            url = 'http://localhost:8888/getStudents';
            break;
        case 'teacher':
            url = 'http://localhost:8888/getTeachers';
            break;
        default:
            break;
    }

    return axios(url);
}