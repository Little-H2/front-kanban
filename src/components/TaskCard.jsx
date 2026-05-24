export default function TaskCard({ task }) {
  const getPriorityStyle = (priority) => {
    if (priority === 'ALTA') return { bg: '#fed7d7', color: '#c53030' };
    return { bg: '#e2e8f0', color: '#4a5568' };
  };

  return (
    <div style={{ background: 'white', padding: '16px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '12px', cursor: 'grab' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '10px' }}>
        {task.priority && (
          <span style={{ fontSize: '9px', fontWeight: '800', padding: '3px 6px', borderRadius: '4px', background: getPriorityStyle(task.priority).bg, color: getPriorityStyle(task.priority).color }}>
            {task.priority} PRIORIDADE
          </span>
        )}
        <span style={{ fontSize: '9px', fontWeight: '800', padding: '3px 6px', borderRadius: '4px', background: '#ebf8ff', color: '#3182ce' }}>
          {task.category}
        </span>
      </div>
      <h4 style={{ margin: 0, fontSize: '14px', color: '#2d3748', lineHeight: '1.4' }}>{task.title}</h4>
    </div>
  );
}