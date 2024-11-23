import React from "react";
import { Main } from "@/layout/main/Main";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <Main>{children}</Main>;
};

export { Layout};
