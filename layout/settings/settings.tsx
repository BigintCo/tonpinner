'use client';
import { useUser } from "@/hooks/user-hook";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";


type TypeOptions = 'info' | 'success' | 'warning' | 'error' | 'default';

interface CloseButtonProps {
    closeToast: (e: React.MouseEvent<HTMLElement>) => void;
    type: TypeOptions;
    ariaLabel?: string;

}
export default function Settings() {
    const { authLogin, getUser } = useUser({});
    // useEffect(() => {
    //     if (!!localStorage.getItem('token')) {
    //         localStorage.setItem('token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmVkMmZmODcyOWViZWJmMGU4YTY3MjQiLCJpYXQiOjE3MjY4MjAzNjAsImV4cCI6MTcyNzQyNTE2MH0.Do5j2pAdvDZCBOV19ELLwXxzF7-A5ic_1F3HOnlnIRI")
    //     }
    // }, []);
    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram) {
            const Telegram = window.Telegram.WebApp;
            if (typeof Telegram !== 'undefined' && Telegram.WebApp) {
                Telegram.WebApp.expand();
            }
        }
    }, []);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getUser();
        }
    }, []);

    const CloseButton: React.FC<CloseButtonProps> = ({ closeToast, ariaLabel, type }) => {
        return (
            <button
                className={`app-btn-squared h-5 absolute -top-1 -left-1 text-white !p-0 ${type === 'success' ? 'app-btn-success' : type === 'error' ? 'app-btn-danger' : type === 'warning' ? 'app-btn-warning' : type === 'info' ? 'app-btn-info' : 'app-btn-info'}`}
                onClick={closeToast}
                aria-label={ariaLabel || "Close"}>
            </button>
        );
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                stacked
                bodyStyle={{ fontFamily: 'var(--popins), sans-serif', fontWeight: 600, position: 'relative' }}
                // toastStyle={{borderRadius: '1.2rem' overflow: 'visible'}}
                toastClassName={(context) => `${context?.defaultClassName} text-white bg-pinner overflow-visible border border-blue-500/30 rounded-xl app-shadow-xs`}
                closeButton={CloseButton}
            />

            {/* {
                client &&
                <div className="fixed bottom-14 left-0 z-40 w-full">
                    <div className="container flex justify-end">
                        <button
                            onClick={() => window && window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className={`app-btn-primary app-btn-squared h-8 !bg-opacity-100 hover:-translate-y-[3px] ${!viewport?.name && scroll > 100 ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                            <GetSvg iconName={'animation/loader-5'} className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            } */}
            {/* <GetPageLoading /> */}
        </>
    )
}