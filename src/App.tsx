import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import ViewLists from "./components/ViewLists";
import CreateListForm from "./components/CreateListForm";
import routes from "tempo-routes";

export default function App() {
  return (
    <Suspense fallback={<p className="p-4">Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/create-list" element={<CreateListForm />} />
          <Route path="/view-lists" element={<ViewLists />} />
          <Route
            path="/list/:id"
            element={<p className="p-4">List Details Page (Coming Soon)</p>}
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}
