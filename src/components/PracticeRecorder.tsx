import { useEffect, useRef, useState } from 'react';
import { Mic, Square, Trash2 } from 'lucide-react';

/** Áudio temporário de treino pessoal, exclusivamente na memória do browser. Nunca é enviado. */
export function PracticeRecorder() {
  const [supported] = useState(() => typeof navigator !== 'undefined'
    && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined');
  const [busy, setBusy] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const urlRef = useRef<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      const recorder = recorderRef.current;
      if (recorder && recorder.state !== 'inactive') recorder.stop();
      streamRef.current?.getTracks().forEach(track => track.stop());
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  function clearRecording() {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    setAudioUrl(null);
    setMessage('Gravação de treino apagada deste ecrã.');
  }

  async function startRecording() {
    if (!supported || busy || recording) return;
    clearRecording();
    setMessage('');
    setBusy(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      if (!mounted.current) { stream.getTracks().forEach(track => track.stop()); return; }
      streamRef.current = stream;
      const mime = ['audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find(type => MediaRecorder.isTypeSupported(type));
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      recorderRef.current = recorder;
      const chunks: BlobPart[] = [];
      recorder.ondataavailable = event => { if (event.data.size) chunks.push(event.data); };
      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        if (streamRef.current === stream) streamRef.current = null;
        if (!mounted.current) return;
        setRecording(false);
        if (chunks.length) {
          const url = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || 'audio/mp4' }));
          if (urlRef.current) URL.revokeObjectURL(urlRef.current);
          urlRef.current = url;
          setAudioUrl(url);
          setMessage('Treino gravado apenas neste dispositivo. Ouve e apaga quando terminares.');
        } else setMessage('Não foi captado áudio. Tenta novamente.');
      };
      recorder.onerror = () => setMessage('Ocorreu um erro na gravação. Tenta novamente.');
      recorder.start();
      setRecording(true);
    } catch {
      streamRef.current?.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setMessage('Não foi possível utilizar o microfone. Verifica as permissões do browser e a ligação HTTPS.');
    } finally {
      if (mounted.current) setBusy(false);
    }
  }

  function stopRecording() {
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop();
    setRecording(false);
  }

  return <section className="practice-recorder" aria-label="Treino individual de voz">
    <strong><Mic size={17}/> Memorizar com a minha voz</strong>
    <p>Treino individual. Grava apenas a tua voz, nunca uma chamada, a voz do cliente ou dados pessoais. O áudio fica temporariamente neste ecrã.</p>
    {!supported ? <p role="status">A gravação de voz não está disponível neste browser ou contexto. Podes utilizar a leitura por voz.</p> : <>
      <div className="practice-recorder-controls">
        <button type="button" className={`outline-button ${recording ? 'recording-live' : ''}`} disabled={busy} onClick={recording ? stopRecording : startRecording}>
          {recording ? <Square size={17}/> : <Mic size={17}/>} {busy ? 'A pedir permissão...' : recording ? 'Parar gravação' : 'Gravar a minha voz'}
        </button>
        {audioUrl && <button type="button" className="outline-button" onClick={clearRecording}><Trash2 size={16}/> Apagar áudio</button>}
      </div>
      {audioUrl && <audio controls preload="metadata" src={audioUrl} aria-label="Ouvir a minha gravação de treino"/>}
    </>}
    {message && <p role="status" className="practice-recorder-message">{message}</p>}
  </section>;
}
