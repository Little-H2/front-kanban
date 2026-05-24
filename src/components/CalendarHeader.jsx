import { Search } from 'lucide-react';

export default function CalendarHeader() {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      <h1 style={{ margin: 0, fontSize: '24px', color: '#1a202c', fontWeight: 'bold' }}>Academic Calendar</h1>
      
      <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '280px' }}>
        <Search size={16} color="#a0aec0" style={{ marginRight: '8px' }} />
        <input 
          type="text" 
          placeholder="Search calendar..." 
          style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '13px' }} 
        />
      </div>
    </header>
  );
}