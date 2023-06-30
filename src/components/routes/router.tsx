import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "../navigation/navbar/navbar.component";
import { NotFound } from "./not-found/not-found.component";
import { Regels } from "./regels/regels.component";
import { Verhalen } from "./verhalen/verhalen.component";
import { NieuwVerhaal } from "./nieuw-verhaal/nieuw-verhaal.component";
import verhalen from "../../fake-db.json";
import { TestPage } from "./test/test";
import { Spelen } from "./spelen/spelen.component";
import { Verhaal } from "./verhaal/verhaal.component";
import { Root } from "./root/root.component";

export const Router = () => {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/",
          element: <Navbar />,
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
          path: "/verhalen/:verhaalId",
          element: <Verhaal />,
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
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
};

