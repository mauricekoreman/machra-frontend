import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../navigation/components/navbar/navbar.component";
import { NotFound } from "./not-found/not-found.component";
import { Regels } from "./regels/regels.component";
import { Verhalen } from "./verhalen/verhalen.component";
import { NieuwVerhaal } from "./nieuw-verhaal/nieuw-verhaal.component";
import verhalen from "../../fake-db.json";
import { TestPage } from "./test/test";
import { Spelen } from "./spelen/spelen.component";

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
          path: "/spelen",
          element: <Spelen />,
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
      path: "/nieuw-verhaal",
      element: <NieuwVerhaal />,
      errorElement: <NotFound />,
    },
    {
      path: "/signin",
      element: (
        <div>
          <h1>Sign in</h1>
        </div>
      ),
      errorElement: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};



