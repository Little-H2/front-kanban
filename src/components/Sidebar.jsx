import { LayoutDashboard, Kanban, Calendar as CalendarIcon, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Importações com os caminhos das subpastas corretas
import logoSistema from '../assets/Logos/background.png';
import profSilva from '../assets/Avatars/professor-silva.png';

export default function Sidebar() {
  const location = useLocation();
  
  const linkStyle = (path) => ({
    color: location.pathname === path ? 'white' : '#a0aec0',
    background: location.pathname === path ? '#2d3748' : 'transparent',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    transition: '0.2s'
  });

  return (
    <aside style={{ width: '260px', background: '#171b2b', color: '#a0aec0', display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 100 }}>
      {/* Topo da Sidebar com a sua Logo */}
      <div style={{ padding: '24px', borderBottom: '1px solid #2d3748', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img 
          src={logoSistema} 
          alt="TCC System Logo" 
          style={{ width: '36px', height: '36px', borderRadius: '8px', objectFit: 'cover' }} 
        />
        <div>
          <h2 style={{ color: 'white', margin: 0, fontSize: '16px', fontWeight: 'bold', letterSpacing: '0.5px' }}>TCC SYSTEM</h2>
          <span style={{ fontSize: '11px', color: '#718096', textTransform: 'uppercase' }}>Academic Precision</span>
        </div>
      </div>
      
      {/* Links de Navegação */}
      <nav style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Link to="/dashboard" style={linkStyle('/dashboard')}><LayoutDashboard size={18} /> Dashboard</Link>
        {/* Ícone atualizado para Kanban aqui: */}
        <Link to="/" style={linkStyle('/')}><Kanban size={18} /> Kanban Board</Link>
        <Link to="/calendar" style={linkStyle('/calendar')}><CalendarIcon size={18} /> Calendar</Link>
      </nav>

      {/* Rodapé da Sidebar com o Orientador */}
      <div style={{ padding: '20px 12px', borderTop: '1px solid #2d3748', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Link to="/settings" style={linkStyle('/settings')}><Settings size={18} /> Settings</Link>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#2d3748', borderRadius: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src={profSilva} 
              alt="Professor Silva" 
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #4a5568' }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: 'white', fontSize: '13px', fontWeight: '500' }}>Prof. Silva</span>
              <span style={{ color: '#718096', fontSize: '10px' }}>Orientador</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}