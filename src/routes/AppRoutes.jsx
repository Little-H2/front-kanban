import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Board from '../pages/Board';
import Calendar from '../pages/Calendar';
import Dashboard from '../pages/Dashboard';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}