
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ApplicationPage from './pages/application';

function App() {

  const Layout = () => {
    return (
      <div className="app">
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ApplicationPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App