import { useState } from 'react';
import { Search, Plus, MoreHorizontal, CheckCircle2, AlertCircle, ListTodo, Sliders, Bell, Shield } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TaskCreationForm from '../components/TaskCreationForm';

export default function Board() {
  // Estados dos Modais
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Parâmetros de Configuração
  const [wipLimit, setWipLimit] = useState(5);
  const [slaDays, setSlaDays] = useState(3);

  // Colunas do Kanban
  const columns = [
    { id: 'Backlog', title: 'Backlog', color: '#64748b' },
    { id: 'A Fazer', title: 'A Fazer', color: '#6366f1' },
    { id: 'Em Andamento', title: 'Em Andamento', color: '#a855f7' },
    { id: 'Em Revisão', title: 'Em Revisão', color: '#f59e0b' },
    { id: 'Concluído', title: 'Concluído', color: '#10b981' }
  ];

  // As 24 Tarefas distribuídas conforme a matemática do seu Dashboard
  const [tasks, setTasks] = useState([
    // --- COLUNA: CONCLUÍDO (12 Tarefas) ---
    { id: 1, col: 'Concluído', title: 'Levantar requisitos do sistema IoT', tag: 'DOCUMENTAÇÃO', progress: '100%', delayed: false },
    { id: 2, col: 'Concluído', title: 'Configurar ambiente React/Vite', tag: 'FRONT-END', progress: '100%', delayed: false },
    { id: 3, col: 'Concluído', title: 'Estruturar banco (SQLAlchemy)', tag: 'BACK-END', progress: '100%', delayed: false },
    { id: 4, col: 'Concluído', title: 'Modelar Diagrama de Classes e ER', tag: 'ARQUITETURA', progress: '100%', delayed: false },
    { id: 5, col: 'Concluído', title: 'Desenvolver back-end base com FastAPI', priority: 'ALTA PRIORIDADE', tag: 'BACK-END', progress: '100%', delayed: false },
    { id: 6, col: 'Concluído', title: 'Escrever Introdução e Justificativa', tag: 'ESCRITA', progress: '100%', delayed: false },
    { id: 7, col: 'Concluído', title: 'Simulação de circuitos no Tinkercad', tag: 'HARDWARE', progress: '100%', delayed: false },
    { id: 8, col: 'Concluído', title: 'Desenvolver Header e Sidebar em React', tag: 'FRONT-END', progress: '100%', delayed: false },
    { id: 9, col: 'Concluído', title: 'Configurar ambiente virtual Python (venv)', tag: 'BACK-END', progress: '100%', delayed: false },
    { id: 10, col: 'Concluído', title: 'Análise exploratória com Pandas/Plotly', tag: 'DADOS', progress: '100%', delayed: false },
    { id: 11, col: 'Concluído', title: 'Criar repositório no GitHub', tag: 'DEVOPS', progress: '100%', delayed: false },
    { id: 12, col: 'Concluído', title: 'Aprovação de interface (UI/UX)', tag: 'DESIGN', progress: '100%', delayed: false },

    // --- COLUNA: EM REVISÃO (3 Tarefas) ---
    { id: 13, col: 'Em Revisão', title: 'Dashboard Analítico de monitoramento', priority: 'ALTA PRIORIDADE', tag: 'FRONT-END', progress: '95%', delayed: false },
    { id: 14, col: 'Em Revisão', title: 'Autenticação de usuários na API', tag: 'SEGURANÇA', progress: '90%', delayed: false },
    { id: 15, col: 'Em Revisão', title: 'Fundamentação Teórica: IoT e Energia Solar', tag: 'ESCRITA', progress: '85%', delayed: true }, // Atrasada 1

    // --- COLUNA: EM ANDAMENTO (5 Tarefas) ---
    { id: 16, col: 'Em Andamento', title: 'Endpoint para telemetria de energia', priority: 'ALTA PRIORIDADE', tag: 'BACK-END', progress: '60%', delayed: true }, // Atrasada 2
    { id: 17, col: 'Em Andamento', title: 'Rotas protegidas de navegação', tag: 'FRONT-END', progress: '50%', delayed: false },
    { id: 18, col: 'Em Andamento', title: 'Lógica drag-and-drop no Kanban', tag: 'FRONT-END', progress: '40%', delayed: false },
    { id: 19, col: 'Em Andamento', title: 'Script de análise de dados', priority: 'ALTA PRIORIDADE', tag: 'DADOS', progress: '25%', delayed: true }, // Atrasada 3
    { id: 20, col: 'Em Andamento', title: 'Testes unitários do sistema', tag: 'TESTES', progress: '10%', delayed: false },

    // --- COLUNA: A FAZER (2 Tarefas) ---
    { id: 21, col: 'A Fazer', title: 'Escrever Metodologia do TCC', tag: 'ESCRITA', progress: '0%', delayed: false },
    { id: 22, col: 'A Fazer', title: 'Integrar painel de alertas de SLA', priority: 'MÉDIA PRIORIDADE', tag: 'BACK-END', progress: '0%', delayed: true }, // Atrasada 4

    // --- COLUNA: BACKLOG (2 Tarefas) ---
    { id: 23, col: 'Backlog', title: 'Preparar slides para a defesa', tag: 'DOCUMENTAÇÃO', progress: '0%', delayed: false },
    { id: 24, col: 'Backlog', title: 'Revisão ABNT e formatação final', tag: 'DOCUMENTAÇÃO', progress: '0%', delayed: false }
  ]);

  // Equipe Online
  const teamOnline = [
    { id: 1, name: 'Miguel Neto', role: 'Desenvolvedor', avatar: 'https://ui-avatars.com/api/?name=Miguel+Neto&background=1e40af&color=fff' },
    { id: 2, name: 'Heitor Alves', role: 'Desenvolvedor', avatar: 'https://ui-avatars.com/api/?name=Heitor+Alves&background=047857&color=fff' },
    { id: 3, name: 'Prof. Silva', role: 'Orientador', avatar: 'https://ui-avatars.com/api/?name=Prof+Silva&background=374151&color=fff' },
    { id: 4, name: 'Ana Costa', role: 'Design UI/UX', avatar: 'https://ui-avatars.com/api/?name=Ana+Costa&background=9333ea&color=fff' },
  ];

  // =========================================================================
  // CÁLCULOS DINÂMICOS (O React faz a matemática sozinho baseado nas tarefas)
  // =========================================================================
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.col === 'Concluído').length;
  const inProgressTasks = tasks.filter(t => t.col === 'Em Andamento' || t.col === 'Em Revisão').length;
  const delayedTasks = tasks.filter(t => t.delayed).length;

  return (
    <div style={{ display: 'flex', background: '#ffffff', height: '100vh', overflow: 'hidden', fontFamily: 'Inter, sans-serif' }}>
      
      <Sidebar onOpenSettings={() => setIsSettingsOpen(true)} />

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: '260px', overflowY: 'auto' }}>
        
        {/* HEADER */}
        <header style={{ padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', background: 'white', position: 'sticky', top: 0, zIndex: 10 }}>
          <h1 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>Sistema Kanban para TCC</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '10px', top: '9px', color: '#94a3b8' }} size={14} />
              <input type="text" placeholder="Pesquisar..." style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px 10px 8px 30px', width: '200px', outline: 'none', fontSize: '13px' }} />
            </div>
            <button onClick={() => setIsModalOpen(true)} style={{ background: '#6366f1', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 15px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
              <Plus size={16} /> Nova Tarefa
            </button>
          </div>
        </header>

        {/* DASHBOARD ANALÍTICO (Agora com variáveis em vez de números fixos) */}
        <div style={{ padding: '15px 25px 5px 25px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          <div style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ color: '#64748b', fontSize: '10px', fontWeight: '800', margin: '0 0 2px 0' }}>TOTAL DE TAREFAS</p><h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{totalTasks}</h2></div>
            <div style={{ background: '#e0e7ff', padding: '10px', borderRadius: '50%', display: 'flex' }}><ListTodo size={20} color="#6366f1" /></div>
          </div>
          <div style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ color: '#64748b', fontSize: '10px', fontWeight: '800', margin: '0 0 2px 0' }}>EM ANDAMENTO</p><h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{inProgressTasks}</h2></div>
            <div style={{ background: '#f1f5f9', padding: '10px', borderRadius: '50%', display: 'flex' }}><MoreHorizontal size={20} color="#475569" /></div>
          </div>
          <div style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ color: '#64748b', fontSize: '10px', fontWeight: '800', margin: '0 0 2px 0' }}>CONCLUÍDO</p><h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{completedTasks}</h2></div>
            <div style={{ background: '#d1fae5', padding: '10px', borderRadius: '50%', display: 'flex' }}><CheckCircle2 size={20} color="#10b981" /></div>
          </div>
          <div style={{ border: '1px solid #e2e8f0', padding: '15px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><p style={{ color: '#64748b', fontSize: '10px', fontWeight: '800', margin: '0 0 2px 0' }}>ATRASADO</p><h2 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{delayedTasks}</h2></div>
            <div style={{ background: '#fee2e2', padding: '10px', borderRadius: '50%', display: 'flex' }}><AlertCircle size={20} color="#ef4444" /></div>
          </div>
        </div>

        {/* QUADRO KANBAN */}
        <div style={{ padding: '15px 25px', display: 'flex', gap: '15px', flex: 1, minHeight: '500px', overflowX: 'auto', paddingBottom: '40px' }}>
          {columns.map(col => {
            const colTasks = tasks.filter(t => t.col === col.id);
            return (
              <div key={col.id} style={{ flex: '0 0 260px', display: 'flex', flexDirection: 'column', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: col.color }}></div>
                    <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b', margin: 0 }}>{col.title}</h3>
                  </div>
                  <span style={{ background: '#e2e8f0', color: '#64748b', fontSize: '11px', fontWeight: '700', padding: '2px 6px', borderRadius: '10px' }}>{colTasks.length}</span>
                </div>

                <div style={{ padding: '0 10px 10px 10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {colTasks.map(task => (
                    <div key={task.id} style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.03)' }}>
                      
                      {/* Tags da Tarefa reincorporadas para melhor visual */}
                      <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', flexWrap: 'wrap' }}>
                        {task.priority && (
                          <span style={{ color: task.priority.includes('ALTA') ? '#ef4444' : '#f59e0b', fontSize: '9px', fontWeight: '800', background: task.priority.includes('ALTA') ? '#fef2f2' : '#fef3c7', padding: '3px 6px', borderRadius: '4px' }}>
                            {task.priority}
                          </span>
                        )}
                        {task.tag && (
                          <span style={{ color: '#64748b', fontSize: '9px', fontWeight: '800', background: '#f1f5f9', padding: '3px 6px', borderRadius: '4px' }}>
                            {task.tag}
                          </span>
                        )}
                      </div>

                      <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: '0 0 10px 0', lineHeight: '1.4' }}>{task.title}</h4>
                      <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: task.progress, background: col.color }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* BARRA LATERAL DIREITA */}
      <aside style={{ width: '250px', background: 'white', borderLeft: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Equipe Online <span style={{ background: '#dcfce7', color: '#10b981', padding: '2px 8px', borderRadius: '12px', fontSize: '11px' }}>{teamOnline.length}</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {teamOnline.map(user => (
            <div key={user.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ position: 'relative' }}>
                <img src={user.avatar} alt={user.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '0', right: '0', width: '12px', height: '12px', background: '#10b981', border: '2px solid white', borderRadius: '50%' }}></div>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{user.name}</p>
                <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#64748b' }}>{user.role}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* MODAL DE CONFIGURAÇÕES */}
      {isSettingsOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '16px', width: '500px', position: 'relative', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <button onClick={() => setIsSettingsOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', width: '30px', height: '30px', borderRadius: '50%', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', color: '#475569', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>✕</button>
            <h2 style={{ margin: '0 0 25px 0', color: '#1e293b', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #e2e8f0', paddingBottom: '15px' }}>⚙️ Configurações do Sistema</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}><Sliders size={16} color="#6366f1" /> Parâmetros do Fluxo (WIP)</h4>
                <input type="number" value={wipLimit} onChange={(e) => setWipLimit(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}><Bell size={16} color="#f59e0b" /> Governança e Alertas</h4>
                <select value={slaDays} onChange={(e) => setSlaDays(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', background: 'white' }}>
                  <option value="1">24 horas de atraso</option>
                  <option value="3">3 dias de atraso (Padrão)</option>
                  <option value="5">5 dias de atraso</option>
                </select>
              </div>
              <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '6px' }}><Shield size={14} color="#10b981" /> Segurança de Dados</h4>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748b', lineHeight: '1.4' }}>Senhas criptografadas via algoritmo <strong>BCrypt</strong> no PostgreSQL em conformidade com as diretrizes do TCC.</p>
              </div>
              <button onClick={() => { setIsSettingsOpen(false); }} style={{ background: '#6366f1', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', marginTop: '10px', fontSize: '14px' }}>Salvar Parâmetros</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL NOVA TAREFA */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.6)', zIndex: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '15px', right: '20px', background: '#f1f5f9', border: 'none', width: '30px', height: '30px', borderRadius: '50%', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', zIndex: 101, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#475569' }}>✕</button>
            <TaskCreationForm />
          </div>
        </div>
      )}
    </div>
  );
}