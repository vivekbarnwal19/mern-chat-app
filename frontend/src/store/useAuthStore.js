/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { data } from "react-router-dom";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigninUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isChekingAuth: true,
    onlineUsers: [],

    checkAuth: async()=>{
        try {
            const res = await axiosInstance.get("http://localhost:5050/api/auth/check");
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        }finally{
            set({ isChekingAuth: false});
        }
    },
    

    signup: async (data) =>{
        set({ isSigninUp: true});
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    login: async(data) => {
        set ({isLoggingIn : true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set ({isLoggingIn: false})
        }
    },
    
    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    updateProfile: async(data) =>{
        set({isUpdatingProfile: true});
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data});
            toast.success("Profile Updated Successfully");
        } catch (error) {
            console.log("error in update profile", error);
            toast.error(error.response.data.message)
        }finally{
            set({ isUpdatingProfile: false })
        }
    }
}));