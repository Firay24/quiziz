import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";

// pages
import { Login } from "@/features/login";
import Checkauth from "@/middleware/auth";
import Questions from "@/features/question";

const AppRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromChildren(
      <>
        <Route path="/" element={<Questions />} />
        {/* <Route path="/" element={<Checkauth />}>
          // <Route index element={<Questions />} />
          //{" "}
        </Route> */}
        <Route path="/login" element={<Login />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRouter;
