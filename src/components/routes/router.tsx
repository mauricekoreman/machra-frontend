import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DrawerNavigation } from "../navigation/drawer-navigation/drawer-navigation.component";
import { NotFound } from "./not-found/not-found.component";
import { Regels } from "./regels/regels.component";
import { Verhalen } from "./verhalen/verhalen.component";
import { EditVerhaal } from "./edit-verhaal/edit-verhaal.component";
import { TestPage } from "./test/test";
import { Spelen } from "./spelen";
import { Verhaal } from "./verhaal/verhaal.component";
import { Root } from "./root/root.component";
import { Login } from "./auth/login/login.component";
import { AuthRoot } from "./auth/root";
import { ProtectedRoute } from "./protected-route/protected-route";
import { useAuthState } from "../state/auth/auth.provider";
import { AdminPage, NewUserPage } from "./admin";
import { accessTokenKey } from "../../contants";

export const Router = () => {
  const { user } = useAuthState();
  const isAuthenticated = sessionStorage.getItem(accessTokenKey) ? true : false;
  const isAdmin = user.roles.includes("admin");

  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute isAllowed={isAuthenticated}>
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
            // {
            //   path: "test",
            //   element: <TestPage />,
            // },
            {
              path: "admin",
              element: <ProtectedRoute isAllowed={isAdmin} />,
              children: [
                {
                  index: true,
                  element: <AdminPage />,
                },
                {
                  path: "create-user",
                  element: <NewUserPage />,
                },
              ],
            },
          ],
        },
        {
          path: "verhalen/:verhaalId",
          element: <ProtectedRoute isAllowed={isAuthenticated} />,
          children: [
            {
              index: true,
              element: <Verhaal />,
            },
            {
              path: "edit",
              element: <EditVerhaal />,
            },
          ],
        },
        {
          path: "nieuw-verhaal",
          element: (
            <ProtectedRoute isAllowed={isAuthenticated}>
              <EditVerhaal />
            </ProtectedRoute>
          ),
          errorElement: <NotFound />,
        },
        {
          path: "/auth",
          element: (
            <ProtectedRoute isAllowed={!isAuthenticated} redirectPath='/'>
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






























































