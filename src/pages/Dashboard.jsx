import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', background: '#f7fafc', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Sidebar />
      <main style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <Header title="Dashboard Analítico" />
        <p>Aqui entrarão os gráficos do seu TCC.</p>
      </main>
    </div>
  );
}