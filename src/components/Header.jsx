import { Search, Plus, ChevronRight } from 'lucide-react';

export default function Header({ onOpenModal, title = "Academic Workflow" }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#1a202c', fontWeight: 'bold' }}>{title}</h1>
      </div>

      <div style={{ display: 'flex', gap: '15px' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', color: '#a0aec0' }} />
          <input type="text" placeholder="Search..." style={{ padding: '10px 15px 10px 35px', borderRadius: '8px', border: '1px solid #e2e8f0', width: '250px', outline: 'none' }} />
        </div>
        <button onClick={onOpenModal} style={{ background: '#3182ce', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> New Task
        </button>
      </div>
    </header>
  );
}