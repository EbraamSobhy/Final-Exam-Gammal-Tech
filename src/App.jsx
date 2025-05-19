import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Phase1 from './Phase1/Phase1';
import Phase2 from './Phase2/Phase2';
import Phase3 from './Phase3/Phase3';
import Phase4 from './Phase4/Phase4';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Phase1 />} />
        <Route path="/phase2" element={<Phase2 />} />
        <Route path="/phase3" element={<Phase3 />} />
        <Route path="/phase4" element={<Phase4 />} />
      </Routes>
    </div>
  )
}

export default App
