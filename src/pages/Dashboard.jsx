import { useState } from 'react';
import { Search, Bell, HelpCircle, Plus, ListTodo, Play, CheckCircle, AlertTriangle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TaskCreationForm from '../components/TaskCreationForm'; // IMPORTAÇÃO DO FORMULÁRIO

export default function Dashboard() {
  // 1. ESTADO PARA CONTROLAR A ABERTURA DO MODAL (Aqui estava a faltar!)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dados simulados para o Dashboard
  const stats = [
    { label: 'TOTAL TASKS', value: 24, icon: <ListTodo size={24} />, color: '#1e3a8a', bg: '#eff6ff' },
    { label: 'IN PROGRESS', value: 8, icon: <Play size={24} />, color: '#475569', bg: '#f1f5f9' },
    { label: 'COMPLETED', value: 12, icon: <CheckCircle size={24} />, color: '#10b981', bg: '#ecfdf5' },
    { label: 'DELAYED', value: 4, icon: <AlertTriangle size={24} />, color: '#ef4444', bg: '#fef2f2' },
  ];

  return (
    <div style={{ display: 'flex', background: '#f8fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />

      <main style={{ marginLeft: '260px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER SUPERIOR */}
        <header style={{ background: 'white', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', margin: 0 }}>Sistema Kanban para TCC</h1>
            <nav style={{ display: 'flex', gap: '25px', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>
              <span style={{ color: '#1e3a8a', borderBottom: '2px solid #1e3a8a', paddingBottom: '22px', marginBottom: '-23px' }}>Research</span>
              <span>Writing</span>
              <span>Defense</span>
            </nav>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '10px', color: '#94a3b8' }} size={18} />
              <input type="text" placeholder="Search tasks..." style={{ background: '#f1f5f9', border: 'none', borderRadius: '20px', padding: '10px 15px 10px 40px', width: '250px', outline: 'none' }} />
            </div>
            <Bell size={20} color="#64748b" />
            <HelpCircle size={20} color="#64748b" />
            
            {/* 2. BOTÃO COM A FUNÇÃO DE CLIQUE ATIVADA */}
            <button 
              onClick={() => setIsModalOpen(true)} 
              style={{ background: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
            >
              <Plus size={18} /> New Task
            </button>
            <img src="https://ui-avatars.com/api/?name=Heitor+Cavalcante&background=1e3a8a&color=fff" style={{ width: '35px', borderRadius: '50%' }} alt="User" />
          </div>
        </header>

        {/* ÁREA DO DASHBOARD ANALÍTICO */}
        <div style={{ padding: '30px 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '25px' }}>
            {stats.map((item, index) => (
              <div key={index} style={{ background: 'white', padding: '24px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '12px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '0.5px' }}>{item.label}</p>
                  <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{item.value}</h2>
                </div>
                <div style={{ background: item.bg, color: item.color, padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
             <div style={{ background: '#edf2f7', height: '400px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed #cbd5e0' }}>
                <p style={{ color: '#718096', fontWeight: '600' }}>Área do Quadro Kanban</p>
             </div>
          </div>
        </div>
      </main>

      {/* 3. JANELA MODAL (POP-UP) DE CRIAÇÃO DE TAREFA */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ position: 'relative' }}>
            {/* Botão de Fechar o Modal (X) */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              style={{ position: 'absolute', top: '15px', right: '20px', background: '#f1f5f9', border: 'none', width: '30px', height: '30px', borderRadius: '50%', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', zIndex: 1001, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#475569' }}
            >
              ✕
            </button>
            
            {/* O Componente Formulário */}
            <TaskCreationForm />
          </div>
        </div>
      )}

    </div>
  );
}