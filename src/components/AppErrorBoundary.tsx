import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

/** Mantém uma mensagem utilizável se um erro inesperado impedir a interface de arrancar. */
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) {
    // Sem recolha nem transmissão de dados: registo apenas na consola local.
    console.error('Erro na interface Call Center Pro', error, info.componentStack);
  }
  render() {
    if (this.state.hasError) return <main style={{maxWidth: 520, margin: '10vh auto', padding: 24, background: '#fff', color:'#132846', borderRadius: 16, fontFamily: 'system-ui'}}>
      <h1>Não foi possível apresentar o Call Center Pro</h1>
      <p>Ocorreu um erro inesperado. Atualiza a página. Se persistir, verifica o estado da publicação no GitHub.</p>
      <button type="button" onClick={() => window.location.reload()} style={{background:'#226ada',color:'#fff',border:0,borderRadius:9,padding:'13px 20px',fontWeight:700}}>Atualizar aplicação</button>
      <p style={{fontSize:12}}>Esta aplicação não guarda dados de chamadas nem informação pessoal de clientes.</p>
    </main>;
    return this.props.children;
  }
}
