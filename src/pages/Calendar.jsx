import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon } from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function CalendarPage() {
  // 1. ESTADO PARA O MODAL
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. ESTADOS DO CALENDÁRIO E ATIVIDADES
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 1)); // Junho 2026
  const [activities, setActivities] = useState([
    { id: 1, title: 'Entrega do Relatório', date: '2026-06-18', priority: 'ALTA', sector: 'Financeiro' },
    { id: 2, title: 'Reunião de Alinhamento', date: '2026-06-22', priority: 'MÉDIA', sector: 'TI' }
  ]);

  const [formData, setFormData] = useState({
    title: '', description: '', date: '', priority: 'MÉDIA', sector: 'Administrativo'
  });

  // 3. LÓGICA DO CALENDÁRIO
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const daysArray = Array(firstDayIndex).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // 4. LÓGICA DO FORMULÁRIO
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return alert('Preencha o título e a data!');

    const newActivity = { ...formData, id: Date.now() };
    setActivities([...activities, newActivity]);
    
    // Limpa o formulário e FECHA O MODAL
    setFormData({ title: '', description: '', date: '', priority: 'MÉDIA', sector: 'Administrativo' });
    setIsModalOpen(false); 
  };

  const getPriorityColor = (p) => {
    if (p === 'ALTA') return { bg: '#fee2e2', text: '#ef4444' };
    if (p === 'MÉDIA') return { bg: '#fef3c7', text: '#f59e0b' };
    return { bg: '#dcfce7', text: '#10b981' };
  };

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />

      <main style={{ marginLeft: '260px', flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        
        {/* CABEÇALHO DO CALENDÁRIO */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: 'white', padding: '20px 30px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ background: '#e0e7ff', padding: '10px', borderRadius: '10px', color: '#6366f1' }}>
              <CalendarIcon size={24} />
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Calendário de Atividades</h1>
              <p style={{ color: '#64748b', fontSize: '13px', margin: '2px 0 0 0', fontWeight: '600' }}>{months[month]} de {year}</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            {/* NAVEGAÇÃO DOS MESES */}
            <div style={{ display: 'flex', gap: '8px', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
              <button onClick={prevMonth} style={{ padding: '6px 12px', background: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#475569', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}><ChevronLeft size={18} /></button>
              <button onClick={nextMonth} style={{ padding: '6px 12px', background: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#475569', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}><ChevronRight size={18} /></button>
            </div>
            
            {/* BOTÃO QUE ABRE O MODAL */}
            <button onClick={() => setIsModalOpen(true)} style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', boxShadow: '0 2px 4px rgba(99,102,241,0.3)' }}>
              <Plus size={18} /> Nova Atividade
            </button>
          </div>
        </header>

        {/* GRADE DO CALENDÁRIO (Agora ocupa 100% da largura) */}
        <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          
          {/* DIAS DA SEMANA */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', fontWeight: '700', color: '#64748b', fontSize: '12px', padding: '15px 0', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
            <div>DOM</div><div>SEG</div><div>TER</div><div>QUA</div><div>QUI</div><div>SEX</div><div>SÁB</div>
          </div>

          {/* DIAS DO MÊS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', flexGrow: 1, overflowY: 'auto' }}>
            {daysArray.map((day, index) => {
              if (day === null) return <div key={`empty-${index}`} style={{ background: '#f8fafc', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}></div>;

              const currentDayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayActivities = activities.filter(act => act.date === currentDayString);

              return (
                <div key={`day-${day}`} style={{ borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9', padding: '10px', display: 'flex', flexDirection: 'column', gap: '6px', minHeight: '120px' }}>
                  <span style={{ fontWeight: '700', fontSize: '13px', color: '#475569', alignSelf: 'flex-end' }}>{day}</span>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {dayActivities.map(act => {
                      const colors = getPriorityColor(act.priority);
                      return (
                        <div key={act.id} style={{ backgroundColor: colors.bg, color: colors.text, padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={act.title}>
                          {act.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* JANELA MODAL (POP-UP) DO FORMULÁRIO */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', width: '450px', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            
            {/* Botão Fechar */}
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', width: '30px', height: '30px', borderRadius: '50%', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', color: '#475569', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✕</button>
            
            <h2 style={{ margin: '0 0 25px 0', color: '#1e293b', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#e0e7ff', padding: '8px', borderRadius: '8px', color: '#6366f1' }}><Plus size={20} /></div>
              Agendar Atividade
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>Título da Atividade</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>Data</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} required style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }} />
                </div>
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '6px', display: 'block', textTransform: 'uppercase' }}>Prioridade</label>
                  <select name="priority" value={formData.priority} onChange={handleInputChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px' }}>
                    <option value="BAIXA">Baixa</option>
                    <option value="MÉDIA">Média</option>
                    <option value="ALTA">Alta</option>
                  </select>
                </div>
              </div>

              <button type="submit" style={{ background: '#6366f1', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', marginTop: '10px', fontSize: '14px' }}>
                Confirmar no Calendário
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}