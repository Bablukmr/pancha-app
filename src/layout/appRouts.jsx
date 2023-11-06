import { Route, Routes } from "react-router-dom";
import NotFound from "../notFound";
import Search from "../App/search";
import LibraryPage from "../App/libraryPage";
import WordPage from "../App/wordPage";
import DictionaryPage from "../App/dictionaryPage";
import SettingPage from "../App/settingPage";
import FlashcardMode from "../App/flashcardMode";
import ViewEditPage from "../App/viewEditPage";
import ProvideFeedbackPage from "../App/provideFeedbackPage";
import UserFolderPage from "../App/userFolderPage";

function AppRouts() {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/word/:name/:wordId" element={<WordPage />} />
      <Route path="/add-to-folder/:wordId" element={<UserFolderPage />} />
      <Route path="/dictionary" element={<DictionaryPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/view-edit/:id/:name" element={<ViewEditPage />} />
      <Route path="/flashcard/:name/:id" element={<FlashcardMode />} />
      <Route path="/settings" element={<SettingPage />} />
      <Route path="/settings/feedback" element={<ProvideFeedbackPage />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}
export default AppRouts;
