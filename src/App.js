import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate, Switch} from 'react-router-dom'

import './App.scss'
import Table from './pages/page-table'
import Transfer from './pages/page-transfer'

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading...</div>}>
        <Router>
          <Routes>
            <Route path="/table" element={<Table />} />
            <Route path="/transfer" element={<Transfer />}/>
            <Route path="/" element={<Navigate to="/transfer" replace/>} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  )
}

export default App
