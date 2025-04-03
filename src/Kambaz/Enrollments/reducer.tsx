import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    enrolledCourses: [],
};

const enrollmentsSlice = createSlice({
    name: "enrollments",
    initialState,
    reducers: {
        setEnrolledCourses: (state, action) => {
            state.enrolledCourses = action.payload;
        },
        addEnrolledCourse: (state, action) => {
            state.enrolledCourses = [...state.enrolledCourses, action.payload] as any;
        },
        removeEnrolledCourse: (state, action) => {
            state.enrolledCourses = state.enrolledCourses.filter(
                (course: any) => course._id !== action.payload
            );
        },
    },
});

export const { setEnrolledCourses, addEnrolledCourse, removeEnrolledCourse } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
