import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const QUIZZES_QUESTIONS_API = `${REMOTE_SERVER}/api/quizQuestions`;

export const deleteQuiz = async (quizId: string) => {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
};

export const findQuizById = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
};

export const findQuestionsForQuiz = async (quizId: string) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
};

export const createQuizQuestion = async (quizId: string, question: any) => {
    const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return response.data;
};


export const deleteQuizQuestion = async (questionId: string) => {
    const response = await axios.delete(`${QUIZZES_QUESTIONS_API}/${questionId}`);
    return response.data;
};

export const updateQuizQuestion = async (questionId: string, questionUpdates: any) => {
    const response = await axios.put(`${QUIZZES_QUESTIONS_API}/${questionId}`, questionUpdates);
    return response.data;
};

