import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./searchPage";
import LibraryPage from "./libraryPage";
import DictionaryPage from "./dictionaryPage";
import WordDetails from "./wordDetails";
import SettingPage from "./settingPage";

function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/setting" element={<SettingPage />} />
      <Route path="/dictionary" element={<DictionaryPage />} />
      <Route path="/:name/:id" element={<WordDetails />} />
    </Routes>
  );
}

export default AppRoute;
