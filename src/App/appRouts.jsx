import { Route, Routes } from "react-router-dom";
import NotFound from "../notFound";
import Search from "./search";
import LibraryPage from "./libraryPage";
import WordPage from "./wordPage";
import DictionaryPage from "./dictionaryPage";
import SettingPage from "./settingPage";
import FlashcardMode from "./flashcardMode";
import ViewEditPage from "./viewEditPage";
import ProvideFeedbackPage from "./provideFeedbackPage";
import UserFolderPage from "./userFolderPage";

function AppRouts() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/word/:name" element={<WordPage />} />
      <Route path="/add-to-folder/:wordId" element={<UserFolderPage />} />
      <Route path="/dictionary" element={<DictionaryPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/view-edit/:name" element={<ViewEditPage />} />
      <Route path="/library/:name" element={<FlashcardMode />} />
      <Route path="/settings" element={<SettingPage />} />
      <Route path="/settings/feedback" element={<ProvideFeedbackPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
export default AppRouts;
