import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${userId}/${courseId}`);
    return response.data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
    const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
    return response.data;
};
