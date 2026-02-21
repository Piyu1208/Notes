import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewNote from "./pages/NewNote";
import NoteEditor from "./pages/NoteEditor";
import AdminPanel from "./pages/AdminPanel";
import UserInfo from "./pages/UserInfo";



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/newnote" element={<NewNote />} />
          <Route path="/notes/:id" element={<NoteEditor />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/users/:id" element={<UserInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
