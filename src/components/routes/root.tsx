import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../navigation/components/navbar/navbar.component";
import { NotFound } from "./not-found/not-found.component";
import { Regels } from "./regels/regels.component";
import { Verhalen } from "./verhalen/verhalen.component";
import verhalen from "../../fake-db.json";
import { TestPage } from "./test/test";

export const Root = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: <Verhalen />,
          loader: async () => {
            return verhalen.data;
          },
        },
        {
          path: "/regels",
          element: <Regels />,
        },
        {
          path: "/test",
          element: <TestPage />,
        },
      ],
    },
    {
      path: "/signin",
      element: (
        <div>
          <h1>Sign in</h1>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

