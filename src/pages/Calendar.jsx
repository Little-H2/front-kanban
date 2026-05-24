import Sidebar from '../components/Sidebar';
import CalendarHeader from '../components/CalendarHeader';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Calendar() {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Array gerando os 35 dias visíveis na grade (28 a 31 do mês anterior + 1 a 31 do mês atual)
  const calendarDays = [
    ...Array.from({ length: 3 }, (_, i) => ({ day: 28 + i, currentMonth: false })), // 28, 29, 30
    ...Array.from({ length: 31 }, (_, i) => ({ day: i + 1, currentMonth: true })),  // 1 to 31
    { day: 1, currentMonth: false } // 1
  ];

  // Mock dos eventos baseados no seu design
  const events = {
    8: { title: 'Implementar quadro...', priority: 'High Priority', color: '#c53030', bg: '#fed7d7' },
    15: { title: 'Definir regras de negócio', priority: 'Medium Priority', color: '#c05621', bg: '#feebc8' },
    24: { title: 'Testar filtros do dashboard', priority: 'Low Priority', color: '#2b6cb0', bg: '#ebf8ff' }
  };

  return (
    <div style={{ display: 'flex', background: '#f7fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      
      <main style={{ marginLeft: '260px', padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <CalendarHeader />

        {/* Controles do Calendário (Mês, Navegação e Views) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', background: 'white', padding: '16px 24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#2d3748', fontWeight: 'bold' }}>May 2024</h2>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{ background: '#edf2f7', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronLeft size={16} color="#4a5568" /></button>
              <button style={{ background: '#edf2f7', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}><ChevronRight size={16} color="#4a5568" /></button>
            </div>
            <button style={{ background: 'transparent', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: '#4a5568', cursor: 'pointer' }}>Today</button>
          </div>

          <div style={{ display: 'flex', background: '#edf2f7', borderRadius: '8px', padding: '4px' }}>
            {['Month', 'Week', 'Day'].map(view => (
              <button key={view} style={{ background: view === 'Month' ? 'white' : 'transparent', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: view === 'Month' ? 'bold' : '500', color: view === 'Month' ? '#2d3748' : '#718096', boxShadow: view === 'Month' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer' }}>
                {view}
              </button>
            ))}
          </div>
        </div>

        {/* Grade do Calendário */}
        <div style={{ flex: 1, background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* Cabeçalho dos Dias da Semana */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            {daysOfWeek.map(day => (
              <div key={day} style={{ padding: '12px', textAlign: 'center', fontSize: '12px', fontWeight: 'bold', color: '#718096', textTransform: 'uppercase' }}>
                {day}
              </div>
            ))}
          </div>

          {/* Células dos Dias */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridAutoRows: 'minmax(100px, 1fr)', flex: 1, background: '#e2e8f0', gap: '1px' }}>
            {calendarDays.map((dateObj, index) => {
              const event = dateObj.currentMonth ? events[dateObj.day] : null;

              return (
                <div key={index} style={{ background: 'white', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '500', color: dateObj.currentMonth ? '#2d3748' : '#a0aec0', display: 'flex', justifyContent: 'flex-end' }}>
                    {dateObj.day}
                  </span>
                  
                  {/* Renderização do Evento se existir naquele dia */}
                  {event && (
                    <div style={{ background: event.bg, padding: '6px 8px', borderRadius: '4px', borderLeft: `3px solid ${event.color}` }}>
                      <span style={{ display: 'block', fontSize: '9px', fontWeight: '800', color: event.color, textTransform: 'uppercase', marginBottom: '2px' }}>
                        {event.priority}
                      </span>
                      <p style={{ margin: 0, fontSize: '11px', color: '#2d3748', fontWeight: '600', lineHeight: '1.3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {event.title}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}