import Signup from "../Pages/Signup/Signup";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import PostQuestion from "../Pages/postQuestion/PostQuestion";
import QuestionDetail from "../Pages/QuestionDetial/QuestionDetial";
import NotFound from "../Pages/NotFound/NoteFound";
import { AuthenticatedRoute } from "../auth/ProtectedRoutes";

const routes = [
  {
    element: <Login />,
    exact: true,
    path: "/login",
  },
  {
    element: <Signup />,
    exact: true,
    path: "/signup",
  },
  {
    element: (
      <AuthenticatedRoute>
        <Home />
      </AuthenticatedRoute>
    ),
    exact: true,
    path: "/",
    isAuthenticated: true,
  },
  {
    element: (
      <AuthenticatedRoute>
        <PostQuestion />
      </AuthenticatedRoute>
    ),
    exact: true,
    path: "/ask",
    isAuthenticated: true,
  },
  {
    element: (
      <AuthenticatedRoute>
        <QuestionDetail />
      </AuthenticatedRoute>
    ),
    exact: true,
    path: "/questions/:id",
    isAuthenticated: true,
  },
  {
    element: <NotFound />,
    exact: true,
    path: "*",
  },
];

export default routes;
