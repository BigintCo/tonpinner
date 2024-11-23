"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { IReturn } from "../types/loading";
import { IAppState } from "../types/app/context-type";
import ApiService from "@/utils/api-service";
import { toast } from "react-toastify";
import axios from "axios";
import { IFriends } from "@/types/user";

type AppContextType = IAppState;

export const AppContext = createContext<AppContextType>({} as AppContextType);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        console.log("useAppContext must be used within an AppContextProvider");
    }
    return context;
};

export default function AppProvider({ children }: { children: React.ReactNode }) {

    const [loading, setLoading] = useState<{ [key: string]: IReturn }>({} as { [key: string]: IReturn });
    const handleLoading = (value: IReturn | null) => {
        setTimeout(() => {
            setLoading(prev => value ? ({ ...prev, [value.key]: value }) : {});
        }, value?.status === 'success' ? 2000 : 0);
    }

    const [pagination, setPagination] = useState<{ [key: string]: number }>({});
    const handlePagination = (key: string | null) => {
        if (key === 'refetch') {
            setPagination({ refetch: 1 });
            return;
        }
        const getPage = key && pagination.hasOwnProperty(key) ? pagination[key] : 1;
        setPagination(prev => (key ? { ...prev, [key]: getPage + 1 } : {}));
    }

    const [userToken, setUserToken] = useState<string | null>(null);
    const handleUserToken = (val: string) => setUserToken(val);

    const [user, setUser] = useState<any>({} as any)
    const handleUser = (val: any) => setUser(val)

    const [referrals, setReferrals] = useState<IFriends>({} as IFriends)
    const handleReferrals = (val: IFriends) => setReferrals(val)

   

  

    const values = {
        // App
        loading,
        handleLoading,
        pagination,
        handlePagination,
        // User
        userToken,
        handleUserToken,
        user,
        referrals,
        handleReferrals,
        handleUser,
       
    };

    return <AppContext.Provider value={values}>{children}</AppContext.Provider>
};