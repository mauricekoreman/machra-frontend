import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DrawerNavigation } from "../navigation/drawer-navigation/drawer-navigation.component";
import { NotFound } from "./not-found/not-found.component";
import { Regels } from "./regels/regels.component";
import { Verhalen } from "./verhalen/verhalen.component";
import { NieuwVerhaal } from "./nieuw-verhaal/nieuw-verhaal.component";
import verhalen from "../../fake-db.json";
import { TestPage } from "./test/test";
import { Spelen } from "./spelen";
import { Verhaal } from "./verhaal/verhaal.component";
import { Root } from "./root/root.component";
import { Login } from "./auth/login/login.component";
import { AuthRoot } from "./auth/root";

export const Router = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <DrawerNavigation />,
          children: [
            {
              index: true,
              element: <Verhalen />,
              loader: async () => {
                return verhalen.data;
              },
            },
            {
              path: "spelen",
              element: <Spelen />,
            },
            {
              path: "regels",
              element: <Regels />,
            },
            {
              path: "test",
              element: <TestPage />,
            },
          ],
        },
        {
          path: "verhalen/:verhaalId",
          element: <Verhaal />,
        },
        {
          path: "nieuw-verhaal",
          element: <NieuwVerhaal />,
          errorElement: <NotFound />,
        },
        {
          path: "signin",
          element: (
            <div>
              <h1>Sign in</h1>
            </div>
          ),
          errorElement: <NotFound />,
        },
        {
          path: "/auth",
          element: <AuthRoot />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
};







