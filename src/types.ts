export type ViewState = 'dashboard' | 'detail' | 'settings';

export interface Transcription {
  id: string;
  title: string;
  source: 'YouTube' | 'GMetrix' | 'Upload';
  date: string;
  language: string;
  duration?: string;
  status: 'completed' | 'processing' | 'failed';
}
