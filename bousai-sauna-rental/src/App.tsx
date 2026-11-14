import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { PageViewTracker } from "@/components/PageViewTracker";
import { Toaster } from "@/components/ui/toaster";
import Contact from "@/pages/Contact";
import Download from "@/pages/Download";
import DownloadThanks from "@/pages/DownloadThanks";
import Home from "@/pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/download" element={<Download />} />
          <Route path="/download/thanks" element={<DownloadThanks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}
