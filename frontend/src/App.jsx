import "./App.css";
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Inbox from "./components/Inbox";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import Mail from "./components/Mail";
import SendEmail from "./components/SendEmail";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { resetState } from "./redux/appSlice";

// const appRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <Body />,
//     children: [
//       {
//         path: "/",
//         element: <Inbox />,
//       },
//       {
//         path: "/mail/:id",
//         element: <Mail />,
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <Login />,
//   },
//   {
//     path: "/signup",
//     element: <Signup />,
//   },
// ]);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleIsSidebarOpen  = (value) => {
    setIsSidebarOpen(value);
  }

  useEffect(() => {
    console.log('w')
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <div className="bg-[#F6F8FC] h-screen">
      <Navbar isSidebarOpen={isSidebarOpen} handleIsSidebarOpen={handleIsSidebarOpen}/>
      {/* <RouterProvider router={appRouter} /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body isSidebarOpen={isSidebarOpen} />}>
            <Route index element={<Inbox />} />
            <Route path="mail/:id" element={<Mail />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <div className="absolute bottom-0 right-20 z-10 max-sm:right-8 max-sm:w-64 max-xs:w-48">
        <SendEmail />
      </div>
      <Toaster />
    </div>
  );
}

export default App;