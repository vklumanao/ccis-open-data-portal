import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout.jsx";

import Home from "./pages/Home.jsx";
import Search from "./pages/Search.jsx";
import DatasetDetail from "./pages/DatasetDetail.jsx";
import Orgs from "./pages/Orgs.jsx";
import OrgDetail from "./pages/OrgDetail.jsx";
import Groups from "./pages/Groups.jsx";
import GroupDetail from "./pages/GroupDetail.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/datasets" element={<Search />} />
        <Route path="/dataset/:id" element={<DatasetDetail />} />
        <Route path="/orgs" element={<Orgs />} />
        <Route path="/orgs/:id" element={<OrgDetail />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/groups/:id" element={<GroupDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
