import { Routes, Route } from "react-router-dom";
import { useReducer } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";



// układ i strony
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Lab01 from "./pages/lab01";
import Lab02 from "./pages/Lab02";
import Lab03 from "./pages/lab03";
import Lab04 from "./pages/lab04";
import NotFound from "./pages/NotFound";

// komponenty laboratorium 4
import MyContainer from "./components/MyContainer";
import AddForm from "./components/forms/AddForm";
import EditForm from "./components/forms/EditForm";

// kontekst i reducer
import AppContext from "./data/AppContext";
import AppReducer from "./data/AppReducer";
import { people } from "./module-data"; // przykładowe dane początkowe

function App() {
  // stan globalny aplikacji z useReducer
  const [state, appDispatch] = useReducer(AppReducer, people);

  return (
    <AppContext.Provider value={{ items: state, dispatch: appDispatch }}>
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

          {/* Strona błędu */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
