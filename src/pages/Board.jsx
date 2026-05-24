import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

export default function Board() {
  const [tasks, setTasks] = useState([
    { id: 'DEM-010', title: 'Implementar quadro Kanban', category: 'FRONT-END', priority: 'ALTA', status: 'Desenvolvimento' },
    { id: 'DEM-011', title: 'Diagrama ER', category: 'BACK-END', priority: 'MÉDIA', status: 'Modelagem' }
  ]);
  const [selectedTask, setSelectedTask] = useState(null);
  const columns = ['Backlog', 'Planejamento', 'Modelagem', 'Desenvolvimento', 'Testes', 'Concluído'];

  return (
    <div style={{ display: 'flex', background: '#f7fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <main style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <Header onOpenModal={() => setSelectedTask({ title: 'Nova Tarefa', status: 'Backlog' })} title="Kanban Board" />
        
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', alignItems: 'flex-start' }}>
          {columns.map(col => (
            <div key={col} style={{ minWidth: '260px', background: '#edf2f7', borderRadius: '12px', padding: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <h3 style={{ fontSize: '14px', margin: 0, fontWeight: '700', color: '#4a5568' }}>{col}</h3>
                <span style={{ background: '#cbd5e0', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>
                  {tasks.filter(t => t.status === col).length}
                </span>
              </div>
              
              {tasks.filter(t => t.status === col).map(task => (
                <div key={task.id} onClick={() => setSelectedTask(task)}> 
                  <TaskCard task={task} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>

      {selectedTask && <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </div>
  );
}