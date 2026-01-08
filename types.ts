
export enum UserRole {
  ADMIN = 'Admin',
  DOCTOR = 'Doctor',
  NURSE = 'Nurse',
  RECEPTIONIST = 'Receptionist'
}

export enum AppStatus {
  SPLASH = 'splash',
  ONBOARDING = 'onboarding',
  LOGIN = 'login',
  DASHBOARD = 'dashboard'
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  lastVisit: string;
  status: 'Checked In' | 'Scheduled' | 'In Progress' | 'Completed';
  vitals?: {
    bp: string;
    hr: number;
    temp: number;
    spo2: number;
  };
}

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: 'In-Clinic' | 'Telehealth';
  doctor: string;
  status: Patient['status'];
}
