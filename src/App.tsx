import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import Layout from "./Layout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { useState, useEffect } from "react";
import { authRepository } from "./modules/auth/auth.repository";
import { useCurrentUserStore } from "./modules/auth/current-user.state";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();

  const serSession = async () => {
    const currentUser = await authRepository.getCurrentUser();
    currentUserStore.set(currentUser);
    setIsLoading(false);
  };

  useEffect(() => {
    serSession();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path={`/notes/:id`} element={<NoteDetail />}></Route>
        </Route>
        <Route path={`/signin`} element={<Signin />}></Route>
        <Route path={`/signup`} element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
