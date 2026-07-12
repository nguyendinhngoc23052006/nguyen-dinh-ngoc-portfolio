export interface DemoRequestRow {
  id: string;
  request_key: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
}

export interface DemoRequestInput {
  request_key: string;
  name: string;
  email: string;
  company?: string;
  message: string;
}
