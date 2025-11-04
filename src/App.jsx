import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// układ i strony
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Lab01 from "./pages/lab01";
import Lab02 from "./pages/Lab02";
import Lab03 from "./pages/lab03";
import Lab04 from "./pages/lab04";
import Lab05 from "./pages/lab05";
import NotFound from "./pages/NotFound";

// komponenty laboratorium 4
import MyContainer from "./components/MyContainer";
import AddForm from "./components/forms/AddForm";
import EditForm from "./components/forms/EditForm";

// AppProvider
import AppProvider from "./data/AppProvider.jsx";
import UserDetails from "./pages/lab05/UserDetails";
import PostComments from "./pages/lab05/PostComments";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="lab01" element={<Lab01 />} />
          <Route path="lab02/:id" element={<Lab02 />} />
          <Route path="lab03" element={<Lab03 />} />

          {/* --- LAB 4 --- */}
          <Route path="lab04" element={<Lab04 />} />
          <Route path="lab04/add" element={<AddForm />} />
          <Route path="lab04/edit/:id" element={<EditForm />} />
          <Route path="lab05" element={<Lab05 />} />
          <Route path="lab05/users/:id" element={<UserDetails />} />
          <Route path="lab05/posts/:id/comments" element={<PostComments />} />

          {/* Strona błędu */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppProvider>
  );
}

export default App;
