import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p className="p-4">Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route
            path="/create-list"
            element={<p className="p-4">Create List Page (Coming Soon)</p>}
          />
          <Route
            path="/view-lists"
            element={<p className="p-4">View Lists Page (Coming Soon)</p>}
          />
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

export default App;
