import { Header } from "@/layout/header/Header";
import { Footer } from "@/layout/footer";
// import { useEffect } from 'react';
// import { useDemo1Layout } from "@/layout/layout-provider";
// import { Sidebar } from "@/layout/sidebar";
// import { useResponsive } from "@/hooks/useResponsive";
// import { Toolbar, ToolbarHeading } from "@/layout/toolbar";
// import { HeaderTopbar } from "@/layout/header/HeaderTopbar";

const Main = ({ children }: { children: React.ReactNode }) => {
    // const { layout } = useDemo1Layout();
    // const mobileMode = useResponsive('down', 'lg');

    // useEffect(() => {
    //     const bodyClass = document.body.classList;

    //     // Add a class to the body element
    //     bodyClass.add('demo1');

    //     if (layout.options.sidebar.fixed) bodyClass.add('sidebar-fixed');
    //     if (layout.options.sidebar.collapse) bodyClass.add('sidebar-collapse');
    //     if (layout.options.header.fixed) bodyClass.add('header-fixed');

    //     // Remove the class when the component is unmounted
    //     return () => {
    //         bodyClass.remove('demo1');
    //         bodyClass.remove('sidebar-fixed');
    //         bodyClass.remove('sidebar-collapse');
    //         bodyClass.remove('header-fixed');
    //     };
    // }, [layout]);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         document.body.classList.add('layout-initialized');
    //     }, 1000); // 1000 milliseconds

    //     // Remove the class when the component is unmounted
    //     return () => {
    //         document.body.classList.remove('layout-initialized');
    //         clearTimeout(timer);
    //     };
    // }, []);

    return (
        <div className="w-full flex flex-col h-full">
            <Header />
            <main className="grow" role="content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export { Main };
