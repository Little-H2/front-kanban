import { useState } from 'react';
import { X, Tag, AlertCircle, ChevronRight, CheckSquare, AlignLeft, CheckCircle2 } from 'lucide-react';

// Importações com os caminhos das subpastas corretas
import avatarAna from '../assets/Avatars/ana-souza.png';
import avatarCarlos from '../assets/Avatars/carlos-eduardo.png';

export default function TaskModal({ task, onClose }) {
  const [activeTab, setActiveTab] = useState('Detalhes');

  if (!task) return null;

  const overlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '20px' };
  const modalStyle = { background: 'white', width: '850px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', borderRadius: '12px', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', overflow: 'hidden' };
  const metaBoxStyle = { display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 };
  const metaLabelStyle = { fontSize: '11px', fontWeight: '700', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.5px' };
  const metaValueStyle = { fontSize: '14px', fontWeight: '600', color: '#2d3748', display: 'flex', alignItems: 'center', gap: '6px' };

  const tabs = ['Detalhes', 'Checklist', 'Comentários', 'Anexos', 'Histórico'];

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        
        {/* CABEÇALHO */}
        <div style={{ padding: '24px 32px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#718096' }}>{task.id || 'DEM-010'}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#a0aec0', fontWeight: '600' }}>
                  <span>To Do</span><ChevronRight size={14} /><span style={{ color: '#3182ce' }}>In Progress</span>
                </div>
              </div>
              <h2 style={{ margin: 0, fontSize: '24px', color: '#1a202c', fontWeight: 'bold' }}>{task.title || 'Implementar quadro Kanban'}</h2>
            </div>
            <button onClick={onClose} style={{ background: '#edf2f7', border: 'none', cursor: 'pointer', color: '#4a5568', padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={20} /></button>
          </div>
        </div>

        {/* METADADOS */}
        <div style={{ padding: '20px 32px', display: 'flex', gap: '24px', borderBottom: '1px solid #e2e8f0', flexWrap: 'wrap' }}>
          <div style={metaBoxStyle}>
            <span style={metaLabelStyle}>Status</span>
            <span style={{ ...metaValueStyle, color: '#3182ce', background: '#ebf8ff', padding: '4px 8px', borderRadius: '6px', width: 'fit-content' }}>Desenvolvimento</span>
          </div>
          
          <div style={metaBoxStyle}>
            <span style={metaLabelStyle}>Responsáveis</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <img 
                src={avatarAna} 
                alt="Ana Souza" 
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #cbd5e0' }} 
              />
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#edf2f7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: '#4a5568' }}>+1</div>
            </div>
          </div>

          <div style={metaBoxStyle}>
            <span style={metaLabelStyle}>Prioridade</span>
            <span style={metaValueStyle}><AlertCircle size={16} color="#e53e3e" /> Alta</span>
          </div>

          <div style={metaBoxStyle}>
            <span style={metaLabelStyle}>Tipo</span>
            <span style={metaValueStyle}><Tag size={16} color="#718096" /> Funcionalidade</span>
          </div>

          <div style={metaBoxStyle}>
            <span style={metaLabelStyle}>Datas</span>
            <div style={{ fontSize: '12px', color: '#4a5568', display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span>Criado: 24 Out, 2023</span>
              <span style={{ fontWeight: 'bold', color: '#c53030' }}>Entrega: 31 Out, 2023</span>
            </div>
          </div>
        </div>

        {/* NAVEGAÇÃO DE ABAS */}
        <div style={{ display: 'flex', gap: '24px', padding: '0 32px', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', padding: '16px 0', fontSize: '14px',
                fontWeight: activeTab === tab ? 'bold' : '600',
                color: activeTab === tab ? '#3182ce' : '#718096',
                borderBottom: activeTab === tab ? '2px solid #3182ce' : '2px solid transparent',
                cursor: 'pointer', transition: '0.2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* CONTEÚDO DAS ABAS */}
        <div style={{ padding: '24px 32px', overflowY: 'auto', flex: 1, minHeight: '300px' }}>
          {activeTab === 'Detalhes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', margin: '0 0 12px 0', color: '#2d3748' }}>
                  <AlignLeft size={18} /> Descrição
                </h4>
                <p style={{ fontSize: '14px', color: '#4a5568', lineHeight: '1.7', margin: 0, background: '#f7fafc', padding: '16px', borderRadius: '8px', border: '1px solid #edf2f7' }}>
                  A implementação do quadro Kanban visa fornecer uma visualização clara e interativa do fluxo de trabalho das tarefas do TCC. O objetivo principal é permitir que a equipe acompanhe o progresso de cada etapa da pesquisa e desenvolvimento em tempo real.
                </p>
              </div>

              <div>
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', margin: '0 0 12px 0', color: '#2d3748' }}>
                  <CheckSquare size={18} /> Critérios de Aceite
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#4a5568' }}>
                    <CheckCircle2 size={18} color="#cbd5e0" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>Os cards de tarefas devem poder ser movidos entre as colunas utilizando drag-and-drop.</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#4a5568' }}>
                    <CheckCircle2 size={18} color="#cbd5e0" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span>As atualizações de status das tarefas devem ser refletidas imediatamente no backend.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Comentários' && (
            <div style={{ display: 'flex', gap: '16px', padding: '12px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <img 
                src={avatarCarlos} 
                alt="Carlos Eduardo" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #cbd5e0' }} 
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#2d3748' }}>Carlos Eduardo</span>
                  <span style={{ fontSize: '11px', color: '#a0aec0' }}>Há 2 horas</span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#4a5568', lineHeight: '1.5' }}>
                  Já preparei a estrutura da base de dados e os mapeamentos das tabelas no SQLAlchemy para receber os novos estados destas demandas. Podem prosseguir com a interface!
                </p>
              </div>
            </div>
          )}

          {activeTab !== 'Detalhes' && activeTab !== 'Comentários' && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px', color: '#a0aec0', fontSize: '14px' }}>
              Nenhum registro encontrado nesta aba.
            </div>
          )}
        </div>

        {/* RODAPÉ */}
        <div style={{ padding: '20px 32px', borderTop: '1px solid #e2e8f0', background: '#f8fafc', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button style={{ padding: '10px 16px', background: 'white', border: '1px solid #e2e8f0', color: '#4a5568', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            Mover para validação
          </button>
          <button style={{ padding: '10px 24px', background: '#3182ce', border: 'none', color: 'white', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>
            Salvar alterações
          </button>
        </div>

      </div>
    </div>
  );
}