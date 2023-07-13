import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DrawerNavigation } from "../navigation/drawer-navigation/drawer-navigation.component";
import { NotFound } from "./not-found/not-found.component";
import { Regels } from "./regels/regels.component";
import { Verhalen } from "./verhalen/verhalen.component";
import { NieuwVerhaal } from "./nieuw-verhaal/nieuw-verhaal.component";
import { TestPage } from "./test/test";
import { Spelen } from "./spelen";
import { Verhaal } from "./verhaal/verhaal.component";
import { Root } from "./root/root.component";
import { Login } from "./auth/login/login.component";
import { AuthRoot } from "./auth/root";
import { ProtectedRoute } from "./protected-route/protected-route";
import { useAuthState } from "../state/auth/auth.provider";

export const Router = () => {
  const { user } = useAuthState();

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute isAllowed={Boolean(user)}>
              <DrawerNavigation />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
              element: <Verhalen />,
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
          path: "/auth",
          element: (
            <ProtectedRoute isAllowed={Boolean(!user)} redirectPath='/'>
              <AuthRoot />
            </ProtectedRoute>
          ),
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
















