import { useState } from 'react';
import { Plus, AlertCircle, Calendar as CalendarIcon } from 'lucide-react';

export default function TaskCreationForm() {
  // Estado para armazenar os dados da nova atividade
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'MÉDIA', // Padrão seguro
    sector: 'FRONT-END'
  });

  // Função que define as cores da prioridade (A regra visual de negócio)
  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'ALTA': 
        return { bg: '#fee2e2', text: '#ef4444', border: '#f87171' }; // Vermelho
      case 'MÉDIA': 
        return { bg: '#fef3c7', text: '#f59e0b', border: '#fbbf24' }; // Amarelo
      case 'BAIXA': 
        return { bg: '#dcfce7', text: '#10b981', border: '#34d399' }; // Verde
      default: 
        return { bg: '#f1f5f9', text: '#64748b', border: '#cbd5e1' }; // Cinza
    }
  };

  const currentPriorityStyle = getPriorityStyle(taskForm.priority);

  const handleInputChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    console.log("Atividade Criada para o Back-end:", taskForm);
    alert(`Tarefa "${taskForm.title}" criada com prioridade ${taskForm.priority}!`);
    // Aqui entraria a chamada para a sua API Spring Boot: axios.post('/api/tasks', taskForm)
  };

  return (
    <div style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'flex-start' }}>
      
      {/* COLUNA 1: FORMULÁRIO DE CRIAÇÃO */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', width: '450px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#1e293b', fontSize: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={22} color="#4f46e5" /> Criar Nova Atividade
        </h2>

        <form onSubmit={handleCreateTask} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Título da Atividade</label>
            <input type="text" name="title" value={taskForm.title} onChange={handleInputChange} placeholder="Ex: Desenvolver API de Login" required
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Descrição</label>
            <textarea name="description" value={taskForm.description} onChange={handleInputChange} placeholder="Detalhes do que precisa ser feito..." rows="3"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', resize: 'none' }} />
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Prazo Final</label>
              <input type="date" name="dueDate" value={taskForm.dueDate} onChange={handleInputChange} required
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
            </div>

            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '6px', display: 'block' }}>Setor</label>
              <select name="sector" value={taskForm.sector} onChange={handleInputChange}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }}>
                <option value="FRONT-END">Front-End</option>
                <option value="BACK-END">Back-End</option>
                <option value="DESIGN">Design UI/UX</option>
              </select>
            </div>
          </div>

          {/* O CAMPO CHAVE: PRIORIZAÇÃO */}
          <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={16} /> Nível de Prioridade
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['BAIXA', 'MÉDIA', 'ALTA'].map(nivel => (
                <button key={nivel} type="button" onClick={() => setTaskForm({ ...taskForm, priority: nivel })}
                  style={{ 
                    flex: 1, padding: '8px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer',
                    background: taskForm.priority === nivel ? getPriorityStyle(nivel).bg : 'white',
                    color: taskForm.priority === nivel ? getPriorityStyle(nivel).text : '#64748b',
                    border: `1px solid ${taskForm.priority === nivel ? getPriorityStyle(nivel).border : '#e2e8f0'}`,
                    transition: 'all 0.2s'
                  }}>
                  {nivel}
                </button>
              ))}
            </div>
          </div>

          <button type="submit" style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            Salvar Atividade
          </button>
        </form>
      </div>

      {/* COLUNA 2: PREVIEW DO CARTÃO (Como a prioridade afeta o visual) */}
      <div style={{ width: '300px' }}>
        <h3 style={{ fontSize: '14px', color: '#64748b', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Preview no Kanban</h3>
        
        <div style={{ background: 'white', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            {/* AQUI A PRIORIDADE APARECE DESTACADA NO CARTÃO */}
            <span style={{ 
              background: currentPriorityStyle.bg, 
              color: currentPriorityStyle.text, 
              padding: '4px 10px', 
              borderRadius: '12px', 
              fontSize: '11px', 
              fontWeight: '800',
              border: `1px solid ${currentPriorityStyle.bg}`
            }}>
              {taskForm.priority}
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 'bold' }}>{taskForm.sector}</span>
          </div>
          
          <h4 style={{ fontSize: '15px', fontWeight: 'bold', color: '#1e293b', margin: '0 0 10px 0', wordBreak: 'break-word' }}>
            {taskForm.title || 'Título da Atividade...'}
          </h4>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '12px', background: '#f1f5f9', padding: '6px', borderRadius: '6px' }}>
            <CalendarIcon size={14} />
            <span>{taskForm.dueDate ? taskForm.dueDate.split('-').reverse().join('/') : 'Sem data definida'}</span>
          </div>

        </div>
      </div>

    </div>
  );
}