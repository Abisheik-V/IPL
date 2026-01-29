import { HashRouter, Routes, Route } from 'react-router-dom';
import Index from './components/Index';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Index />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
