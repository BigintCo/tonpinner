'use client'
import React, { ReactNode, useEffect } from "react";
import Settings from "@/layout/settings/settings";

type ILayoutWrapper = {
    children: ReactNode;
}

export default function LayoutWrapper({ children }: ILayoutWrapper) {
    return (
        // <div className={`min-h-screen flex flex-col scroll-hidden ${viewport?.name && 'overflow-hidden'}`}>
        <>
            <>{children}</>
            <Settings />
        </>
        // </div>
    )
}