import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './routes/Welcome';
import Bio from './routes/Bio';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/bio" element={<Bio />} />
              <Route path="*" element={<Welcome />} />
          </Routes>
      </Router>
  );
}

export default App;
