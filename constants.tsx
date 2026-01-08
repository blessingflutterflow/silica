
import React from 'react';
import { LayoutDashboard, Users, Calendar, ClipboardList, Settings, Video, Activity, FileText } from 'lucide-react';
import { Patient, Appointment } from './types';

export const MOCK_PATIENTS: Patient[] = [
  { id: '1', name: 'Alexander Wright', age: 42, gender: 'Male', lastVisit: '2024-03-15', status: 'In Progress', vitals: { bp: '120/80', hr: 72, temp: 98.6, spo2: 99 } },
  { id: '2', name: 'Elena Rodriguez', age: 31, gender: 'Female', lastVisit: '2024-03-10', status: 'Checked In' },
  { id: '3', name: 'Marcus Chen', age: 58, gender: 'Male', lastVisit: '2024-03-12', status: 'Scheduled' },
  { id: '4', name: 'Sarah Jenkins', age: 25, gender: 'Female', lastVisit: '2024-03-18', status: 'Completed' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', patientName: 'Elena Rodriguez', time: '10:30 AM', type: 'In-Clinic', doctor: 'Dr. Smith', status: 'Checked In' },
  { id: 'a2', patientName: 'Marcus Chen', time: '11:15 AM', type: 'Telehealth', doctor: 'Dr. Smith', status: 'Scheduled' },
  { id: 'a3', patientName: 'Benjamin Thorne', time: '01:00 PM', type: 'In-Clinic', doctor: 'Dr. Smith', status: 'Scheduled' },
];

export const NAV_ITEMS = [
  { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { id: 'patients', label: 'Patients', icon: <Users size={20} /> },
  { id: 'appointments', label: 'Schedule', icon: <Calendar size={20} /> },
  { id: 'notes', label: 'Clinical Notes', icon: <FileText size={20} /> },
  { id: 'telehealth', label: 'Telehealth', icon: <Video size={20} /> },
  { id: 'vitals', label: 'Vitals', icon: <Activity size={20} /> },
  { id: 'reports', label: 'Reports', icon: <ClipboardList size={20} /> },
  { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
];
