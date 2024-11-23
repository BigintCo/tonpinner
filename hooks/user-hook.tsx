import { useAppContext } from "@/providers/app-provider";
import { useState } from "react";
import { toast } from "react-toastify";
import crypto from 'crypto'; // Import the 'crypto' module
import ApiService from "@/utils/api-service";
;
export function useUser({ address }: { address?: string }) {
    const {
        handleUser,
        handleUserToken,
    } = useAppContext();

    const [loading, setLoading] = useState<boolean>(false);

    async function authLogin(telegramInitData: any) {
        console.log(telegramInitData);
        try {
            const { data } = await ApiService.post(`/users/login`, {
                initdata: telegramInitData
            });
            if (data) {
                // handleUserToken(data.token)
                // localStorage.setItem('token', data.token);
                toast('You are logged in', { type: 'success' });
            }
        } catch (e: any) {
            toast(e?.response?.data?.error, { type: 'error' })
        }
    }
    async function getUser() {
        setLoading(true);
        try {
            if (localStorage.getItem('token')) {
                const { data } = await ApiService.get(`/users/profile`);
                if (data) {
                    handleUser(data)
                }
                else {
                    localStorage.removeItem('token');
                }
            }
        } catch (e: any) {
            localStorage.removeItem('token');
            toast(e?.response?.data?.error, { type: 'error' })
        }
        setLoading(false);
    }

    return {
        loading,
        getUser,
        authLogin,
    }
}
