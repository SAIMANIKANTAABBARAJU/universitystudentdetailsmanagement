import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard, Users, BookOpen, CalendarCheck, Award, CreditCard,
  Briefcase, GraduationCap, ShieldCheck, FileSpreadsheet, Database,
  Search, Bell, Settings, Moon, Sun, LogOut, Plus, Edit3, Trash2,
  CheckCircle2, AlertTriangle, X, Download, Printer, ChevronRight,
  Home, Bus, Building2, KeyRound, UserCheck, Filter, ArrowUpDown,
  Lock, Unlock, Eye, EyeOff, FileText, Sparkles, Check, Menu
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

// ============================================================================
// 1. INITIAL UNIVERSITY MASTER DATA & SEED RECORDS
// ============================================================================

const INITIAL_BRANCHES = [
  { id: 'CSE', name: 'Computer Science & Engineering', hod: 'Dr. R. Venkateswara Rao', intake: 180 },
  { id: 'ECE', name: 'Electronics & Communication Engineering', hod: 'Dr. K. Padmavathi', intake: 120 },
  { id: 'AIML', name: 'Artificial Intelligence & Machine Learning', hod: 'Dr. S. Narayana Murthy', intake: 120 },
  { id: 'IT', name: 'Information Technology', hod: 'Dr. M. Anuradha', intake: 120 },
  { id: 'EEE', name: 'Electrical & Electronics Engineering', hod: 'Dr. P. Srinivasulu', intake: 60 },
  { id: 'MECH', name: 'Mechanical Engineering', hod: 'Dr. G. Subba Rao', intake: 60 },
  { id: 'CIVIL', name: 'Civil Engineering', hod: 'Dr. T. Madhavi', intake: 60 },
  { id: 'DS', name: 'Data Science', hod: 'Dr. V. Harish Kumar', intake: 60 },
];

const INITIAL_USERS = [
  {
    id: 'USR-ADMIN-01',
    name: 'Dr. K. Suryanarayana (Registrar)',
    email: 'admin@unitrack.edu.in',
    password: 'admin123',
    role: 'Admin',
    department: 'Administration',
    assignedBranches: ['CSE', 'ECE', 'AIML', 'IT', 'EEE', 'MECH', 'CIVIL', 'DS'],
    assignedSections: ['A', 'B', 'C'],
    active: true,
    lastLogin: '2026-11-20 08:30 AM'
  },
  {
    id: 'USR-FAC-01',
    name: 'Prof. A. Ramakrishna',
    email: 'ramakrishna.cse@unitrack.edu.in',
    password: 'faculty123',
    role: 'Faculty',
    department: 'CSE',
    assignedBranches: ['CSE', 'AIML', 'IT'],
    assignedSections: ['A', 'B'],
    active: true,
    lastLogin: '2026-11-20 09:05 AM'
  },
  {
    id: 'USR-FAC-02',
    name: 'Dr. S. Lakshmi Priya',
    email: 'lakshmi.ece@unitrack.edu.in',
    password: 'faculty123',
    role: 'Faculty',
    department: 'ECE',
    assignedBranches: ['ECE', 'EEE'],
    assignedSections: ['A', 'B'],
    active: true,
    lastLogin: '2026-11-19 04:15 PM'
  }
];

const INITIAL_SUBJECTS = [
  // CSE Sem 3
  { id: 'CS301', code: 'CS301', name: 'Data Structures & Algorithms', branch: 'CSE', year: 2, semester: 3, credits: 4, faculty: 'Prof. A. Ramakrishna', maxInternal: 30, maxExternal: 70 },
  { id: 'CS302', code: 'CS302', name: 'Database Management Systems', branch: 'CSE', year: 2, semester: 3, credits: 4, faculty: 'Prof. A. Ramakrishna', maxInternal: 30, maxExternal: 70 },
  { id: 'CS303', code: 'CS303', name: 'Digital Logic & Computer Design', branch: 'CSE', year: 2, semester: 3, credits: 3, faculty: 'Dr. N. Ravi Teja', maxInternal: 30, maxExternal: 70 },
  { id: 'CS304', code: 'CS304', name: 'Object-Oriented Programming (Java)', branch: 'CSE', year: 2, semester: 3, credits: 4, faculty: 'Prof. P. Swathi', maxInternal: 30, maxExternal: 70 },
  { id: 'CS305', code: 'CS305', name: 'Discrete Mathematical Structures', branch: 'CSE', year: 2, semester: 3, credits: 3, faculty: 'Dr. B. Uma Mahesh', maxInternal: 30, maxExternal: 70 },
  { id: 'CS306', code: 'CS306', name: 'Computer Organization & Architecture', branch: 'CSE', year: 2, semester: 3, credits: 3, faculty: 'Prof. K. Vinay', maxInternal: 30, maxExternal: 70 },

  // ECE Sem 3
  { id: 'EC301', code: 'EC301', name: 'Signals & Systems', branch: 'ECE', year: 2, semester: 3, credits: 4, faculty: 'Dr. S. Lakshmi Priya', maxInternal: 30, maxExternal: 70 },
  { id: 'EC302', code: 'EC302', name: 'Electronic Devices & Circuits', branch: 'ECE', year: 2, semester: 3, credits: 4, faculty: 'Dr. S. Lakshmi Priya', maxInternal: 30, maxExternal: 70 },
  { id: 'EC303', code: 'EC303', name: 'Network Analysis & Synthesis', branch: 'ECE', year: 2, semester: 3, credits: 3, faculty: 'Prof. M. Kiran', maxInternal: 30, maxExternal: 70 },
  { id: 'EC304', code: 'EC304', name: 'Switching Theory & Logic Design', branch: 'ECE', year: 2, semester: 3, credits: 3, faculty: 'Prof. G. Divya', maxInternal: 30, maxExternal: 70 },
  { id: 'EC305', code: 'EC305', name: 'Probability Theory & Stochastic Processes', branch: 'ECE', year: 2, semester: 3, credits: 3, faculty: 'Dr. B. Uma Mahesh', maxInternal: 30, maxExternal: 70 },
  { id: 'EC306', code: 'EC306', name: 'Electromagnetic Waves & Transmission Lines', branch: 'ECE', year: 2, semester: 3, credits: 3, faculty: 'Prof. R. Satish', maxInternal: 30, maxExternal: 70 },

  // AIML Sem 5 (3rd Year)
  { id: 'AI501', code: 'AI501', name: 'Machine Learning Algorithms', branch: 'AIML', year: 3, semester: 5, credits: 4, faculty: 'Prof. A. Ramakrishna', maxInternal: 30, maxExternal: 70 },
  { id: 'AI502', code: 'AI502', name: 'Deep Learning & Neural Networks', branch: 'AIML', year: 3, semester: 5, credits: 4, faculty: 'Dr. S. Narayana Murthy', maxInternal: 30, maxExternal: 70 },
  { id: 'AI503', code: 'AI503', name: 'Natural Language Processing', branch: 'AIML', year: 3, semester: 5, credits: 3, faculty: 'Prof. P. Swathi', maxInternal: 30, maxExternal: 70 },
  { id: 'AI504', code: 'AI504', name: 'Design & Analysis of Algorithms', branch: 'AIML', year: 3, semester: 5, credits: 4, faculty: 'Prof. A. Ramakrishna', maxInternal: 30, maxExternal: 70 },

  // CSE Sem 7 (4th Year)
  { id: 'CS701', code: 'CS701', name: 'Cloud Computing & Distributed Systems', branch: 'CSE', year: 4, semester: 7, credits: 4, faculty: 'Prof. A. Ramakrishna', maxInternal: 30, maxExternal: 70 },
  { id: 'CS702', code: 'CS702', name: 'Cryptography & Network Security', branch: 'CSE', year: 4, semester: 7, credits: 3, faculty: 'Dr. N. Ravi Teja', maxInternal: 30, maxExternal: 70 },
  { id: 'CS703', code: 'CS703', name: 'Big Data Analytics', branch: 'CSE', year: 4, semester: 7, credits: 3, faculty: 'Dr. V. Harish Kumar', maxInternal: 30, maxExternal: 70 },
];

const INITIAL_PERIODS = [
  { period: 1, time: '09:00 – 09:50', label: 'Period 1' },
  { period: 2, time: '09:50 – 10:40', label: 'Period 2' },
  { period: 3, time: '10:55 – 11:45', label: 'Period 3' },
  { period: 4, time: '11:45 – 12:35', label: 'Period 4' },
  { period: 5, time: '01:30 – 02:20', label: 'Period 5' },
  { period: 6, time: '02:20 – 03:10', label: 'Period 6' },
];

const INITIAL_STUDENTS = [
  {
    id: 'STU-24-001',
    regNo: '24UT1A0501',
    universityId: 'UNI-2024-8801',
    rollNo: '24CSE-A01',
    name: 'Aarav Sai Reddy',
    dob: '2006-05-14',
    gender: 'Male',
    phone: '+91 98480 11223',
    email: 'aarav.24ut1a0501@unitrack.edu.in',
    address: 'Plot 42, Brodipet 4th Lane, Guntur, AP 522002',
    admissionDate: '2024-08-12',
    admissionYear: 2024,
    course: 'B.Tech',
    branch: 'CSE',
    year: 2,
    semester: 3,
    section: 'A',
    seatType: 'Counselling',
    category: 'OC',
    status: 'Active',
    cgpa: 8.94,
    backlogs: 0,
    commuteType: 'Hostel',
    commuteDetails: 'Kaveri Boys Hostel • Block B, Room 214',
    parent: {
      fatherName: 'K. Prabhakar Reddy',
      fatherPhone: '+91 98481 22334',
      motherName: 'K. Padmaja Reddy',
      motherPhone: '+91 98481 22335',
      guardianName: 'K. Prabhakar Reddy',
      guardianPhone: '+91 98481 22334',
      emergencyContact: '+91 98481 22334',
      parentEmail: 'prabhakar.reddy@gmail.com',
    },
    attendanceSummary: [
      { subjectId: 'CS301', conducted: 48, attended: 44 },
      { subjectId: 'CS302', conducted: 46, attended: 41 },
      { subjectId: 'CS303', conducted: 42, attended: 36 },
      { subjectId: 'CS304', conducted: 45, attended: 42 },
      { subjectId: 'CS305', conducted: 40, attended: 35 },
      { subjectId: 'CS306', conducted: 40, attended: 34 },
    ],
    marks: [
      { subjectId: 'CS301', internal: 27, external: 63, published: true },
      { subjectId: 'CS302', internal: 26, external: 59, published: true },
      { subjectId: 'CS303', internal: 24, external: 55, published: true },
      { subjectId: 'CS304', internal: 28, external: 64, published: true },
      { subjectId: 'CS305', internal: 25, external: 57, published: true },
      { subjectId: 'CS306', internal: 23, external: 54, published: true },
    ],
    fees: {
      tuition: 70000,
      hostel: 85000,
      transport: 0,
      exam: 3500,
      other: 2500,
      scholarship: 15000,
      dueDate: '2026-12-15',
    },
    payments: [
      { id: 'PAY-101', receipt: 'UT-REC-2026-1101', date: '2026-07-18', amount: 100000, method: 'UPI / NetBanking', note: 'Installment 1 (Tuition + Hostel)' },
      { id: 'PAY-102', receipt: 'UT-REC-2026-1489', date: '2026-10-05', amount: 46000, method: 'NEFT', note: 'Final Balance Clearance' },
    ],
    remarks: [
      { id: 'RMK-1', author: 'Prof. A. Ramakrishna', date: '2026-10-12', category: 'Achievement', visibility: 'Public', text: 'Secured 1st Place in University Coding Hackathon (Smart Guntur Track).' }
    ],
    internships: [],
    placementProfile: {
      skills: ['Java', 'Data Structures', 'SQL', 'React', 'Git'],
      certifications: ['NPTEL Elite Silver - Data Structures'],
      github: 'github.com/aarav-reddy-dev',
      aptitudeScore: 86,
      preferredRoles: ['Software Development Engineer'],
      preferredLocations: ['Hyderabad', 'Bengaluru']
    }
  },
  {
    id: 'STU-24-002',
    regNo: '24UT1A0502',
    universityId: 'UNI-2024-8802',
    rollNo: '24CSE-A02',
    name: 'Sneha Chowdary',
    dob: '2006-08-22',
    gender: 'Female',
    phone: '+91 97012 33445',
    email: 'sneha.24ut1a0502@unitrack.edu.in',
    address: 'D.No 14-8, Lakshmipuram Main Road, Guntur, AP 522007',
    admissionDate: '2024-08-14',
    admissionYear: 2024,
    course: 'B.Tech',
    branch: 'CSE',
    year: 2,
    semester: 3,
    section: 'A',
    seatType: 'Management',
    category: 'OC',
    status: 'Active',
    cgpa: 7.82,
    backlogs: 0,
    commuteType: 'Bus',
    commuteDetails: 'Route 04 (Lakshmipuram – Arundelpet – Campus) • Bus #AP07-UT-14',
    parent: {
      fatherName: 'V. Ramesh Chowdary',
      fatherPhone: '+91 97012 44556',
      motherName: 'V. Sunitha',
      motherPhone: '+91 97012 44557',
      guardianName: 'V. Ramesh Chowdary',
      guardianPhone: '+91 97012 44556',
      emergencyContact: '+91 97012 44556',
      parentEmail: 'ramesh.chowdary@yahoo.com',
    },
    attendanceSummary: [
      { subjectId: 'CS301', conducted: 48, attended: 33 },
      { subjectId: 'CS302', conducted: 46, attended: 34 },
      { subjectId: 'CS303', conducted: 42, attended: 30 },
      { subjectId: 'CS304', conducted: 45, attended: 35 },
      { subjectId: 'CS305', conducted: 40, attended: 28 },
      { subjectId: 'CS306', conducted: 40, attended: 31 },
    ],
    marks: [
      { subjectId: 'CS301', internal: 21, external: 51, published: true },
      { subjectId: 'CS302', internal: 23, external: 54, published: true },
      { subjectId: 'CS303', internal: 20, external: 48, published: true },
      { subjectId: 'CS304', internal: 24, external: 56, published: true },
      { subjectId: 'CS305', internal: 19, external: 46, published: true },
      { subjectId: 'CS306', internal: 22, external: 50, published: true },
    ],
    fees: {
      tuition: 200000,
      hostel: 0,
      transport: 28000,
      exam: 3500,
      other: 2500,
      scholarship: 0,
      dueDate: '2026-11-30',
    },
    payments: [
      { id: 'PAY-201', receipt: 'UT-REC-2026-1190', date: '2026-07-25', amount: 150000, method: 'Bank Challan', note: 'Management Quota Installment 1 + Bus Pass' },
    ],
    remarks: [
      { id: 'RMK-2', author: 'Prof. A. Ramakrishna', date: '2026-11-04', category: 'Counselling', visibility: 'Private', text: 'Attendance dropped to 73.1% due to viral fever. Medical certificate verified; needs 6 consecutive classes to cross 75%.' }
    ],
    internships: [],
    placementProfile: {
      skills: ['Python', 'HTML/CSS', 'Java', 'DBMS'],
      certifications: ['AWS Cloud Practitioner Essentials'],
      github: 'github.com/sneha-c02',
      aptitudeScore: 79,
      preferredRoles: ['Full Stack Developer', 'QA Engineer'],
      preferredLocations: ['Hyderabad', 'Chennai']
    }
  },
  {
    id: 'STU-24-003',
    regNo: '24UT1A0408',
    universityId: 'UNI-2024-8912',
    rollNo: '24ECE-A08',
    name: 'Karthikeya Varma',
    dob: '2006-02-10',
    gender: 'Male',
    phone: '+91 94401 55667',
    email: 'karthik.24ut1a0408@unitrack.edu.in',
    address: 'Flat 302, Sai Nilayam, Pattabhipuram, Guntur, AP 522006',
    admissionDate: '2024-08-15',
    admissionYear: 2024,
    course: 'B.Tech',
    branch: 'ECE',
    year: 2,
    semester: 3,
    section: 'A',
    seatType: 'Counselling',
    category: 'BC-B',
    status: 'Active',
    cgpa: 8.45,
    backlogs: 0,
    commuteType: 'Private',
    commuteDetails: 'Day Scholar (Own Two-Wheeler • Gate Pass #DP-412)',
    parent: {
      fatherName: 'P. Satyanarayana Varma',
      fatherPhone: '+91 94401 66778',
      motherName: 'P. Jyothi',
      motherPhone: '+91 94401 66779',
      guardianName: 'P. Satyanarayana Varma',
      guardianPhone: '+91 94401 66778',
      emergencyContact: '+91 94401 66778',
      parentEmail: 'varma.satya@gmail.com',
    },
    attendanceSummary: [
      { subjectId: 'EC301', conducted: 44, attended: 39 },
      { subjectId: 'EC302', conducted: 45, attended: 40 },
      { subjectId: 'EC303', conducted: 40, attended: 34 },
      { subjectId: 'EC304', conducted: 42, attended: 37 },
      { subjectId: 'EC305', conducted: 38, attended: 32 },
      { subjectId: 'EC306', conducted: 40, attended: 35 },
    ],
    marks: [
      { subjectId: 'EC301', internal: 26, external: 60, published: true },
      { subjectId: 'EC302', internal: 25, external: 58, published: true },
      { subjectId: 'EC303', internal: 24, external: 55, published: true },
      { subjectId: 'EC304', internal: 27, external: 61, published: true },
      { subjectId: 'EC305', internal: 22, external: 52, published: true },
      { subjectId: 'EC306', internal: 24, external: 56, published: true },
    ],
    fees: {
      tuition: 70000,
      hostel: 0,
      transport: 0,
      exam: 3500,
      other: 2500,
      scholarship: 35000,
      dueDate: '2026-12-10',
    },
    payments: [
      { id: 'PAY-301', receipt: 'UT-REC-2026-1302', date: '2026-08-02', amount: 41000, method: 'UPI', note: 'Full Fee Cleared (Post Fee-Reimbursement)' },
    ],
    remarks: [
      { id: 'RMK-3', author: 'Dr. S. Lakshmi Priya', date: '2026-09-28', category: 'Academic', visibility: 'Public', text: 'Built working IoT Smart Irrigation prototype for ECE Hardware Expo.' }
    ],
    internships: [],
    placementProfile: {
      skills: ['Embedded C', 'Verilog', 'MATLAB', 'Arduino/ESP32'],
      certifications: ['ARM Cortex-M Embedded Systems'],
      github: 'github.com/karthik-vlsi',
      aptitudeScore: 82,
      preferredRoles: ['Embedded Firmware Engineer', 'VLSI Design Trainee'],
      preferredLocations: ['Bengaluru', 'Hyderabad']
    }
  },
  {
    id: 'STU-23-014',
    regNo: '23UT1A4214',
    universityId: 'UNI-2023-7414',
    rollNo: '23AIML-A14',
    name: 'Divya Srikanth',
    dob: '2005-11-03',
    gender: 'Female',
    phone: '+91 91210 77889',
    email: 'divya.23ut1a4214@unitrack.edu.in',
    address: 'NRI Layout, Mangalagiri Road, Guntur, AP 522503',
    admissionDate: '2023-08-10',
    admissionYear: 2023,
    course: 'B.Tech',
    branch: 'AIML',
    year: 3,
    semester: 5,
    section: 'A',
    seatType: 'Counselling',
    category: 'OC',
    status: 'Active',
    cgpa: 9.18,
    backlogs: 0,
    commuteType: 'Hostel',
    commuteDetails: 'Godavari Girls Hostel • Block A, Room 108',
    parent: {
      fatherName: 'M. Srikanth',
      fatherPhone: '+91 91210 88990',
      motherName: 'M. Bhavani',
      motherPhone: '+91 91210 88991',
      guardianName: 'M. Srikanth',
      guardianPhone: '+91 91210 88990',
      emergencyContact: '+91 91210 88990',
      parentEmail: 'srikanth.m@outlook.com',
    },
    attendanceSummary: [
      { subjectId: 'AI501', conducted: 50, attended: 47 },
      { subjectId: 'AI502', conducted: 48, attended: 45 },
      { subjectId: 'AI503', conducted: 44, attended: 40 },
      { subjectId: 'AI504', conducted: 46, attended: 43 },
    ],
    marks: [
      { subjectId: 'AI501', internal: 29, external: 65, published: true },
      { subjectId: 'AI502', internal: 28, external: 64, published: true },
      { subjectId: 'AI503', internal: 27, external: 61, published: true },
      { subjectId: 'AI504', internal: 28, external: 63, published: true },
    ],
    fees: {
      tuition: 70000,
      hostel: 85000,
      transport: 0,
      exam: 3500,
      other: 2500,
      scholarship: 20000,
      dueDate: '2026-12-15',
    },
    payments: [
      { id: 'PAY-401', receipt: 'UT-REC-2026-1044', date: '2026-07-10', amount: 141000, method: 'NetBanking', note: 'Annual Tuition + Hostel Paid' },
    ],
    remarks: [
      { id: 'RMK-4', author: 'Prof. A. Ramakrishna', date: '2026-10-20', category: 'Mentoring', visibility: 'Public', text: 'Selected for summer research internship in Applied Computer Vision.' }
    ],
    internships: [
      {
        id: 'INT-301',
        company: 'Infosys InStep Labs',
        role: 'AI / Machine Learning Intern',
        domain: 'Computer Vision & GenAI',
        type: 'Hybrid',
        duration: '8 Weeks',
        startDate: '2026-05-15',
        endDate: '2026-07-12',
        stipend: '₹25,000 / month',
        mentor: 'Dr. S. Narayana Murthy',
        status: 'Completed',
        skills: ['PyTorch', 'OpenCV', 'FastAPI', 'Docker'],
        projectDesc: 'Built automated defect detection pipeline for industrial PCB inspection with 96.4% precision.'
      }
    ],
    placementProfile: {
      skills: ['Python', 'PyTorch', 'TensorFlow', 'SQL', 'Scikit-Learn'],
      certifications: ['DeepLearning.AI Specialization', 'Microsoft Azure AI Engineer'],
      github: 'github.com/divya-aiml',
      aptitudeScore: 92,
      preferredRoles: ['Machine Learning Engineer', 'Data Scientist'],
      preferredLocations: ['Bengaluru', 'Hyderabad']
    }
  },
  {
    id: 'STU-22-045',
    regNo: '22UT1A0545',
    universityId: 'UNI-2022-6145',
    rollNo: '22CSE-B45',
    name: 'Rohan Teja Goud',
    dob: '2004-09-19',
    gender: 'Male',
    phone: '+91 98661 99001',
    email: 'rohan.22ut1a0545@unitrack.edu.in',
    address: 'Vidyanagar 2nd Line, Guntur, AP 522007',
    admissionDate: '2022-08-18',
    admissionYear: 2022,
    course: 'B.Tech',
    branch: 'CSE',
    year: 4,
    semester: 7,
    section: 'B',
    seatType: 'Management',
    category: 'BC-B',
    status: 'Active',
    cgpa: 8.68,
    backlogs: 0,
    commuteType: 'Bus',
    commuteDetails: 'Route 09 (Vidyanagar – Lodge Center – Campus) • Bus #AP07-UT-09',
    parent: {
      fatherName: 'G. Srinivas Goud',
      fatherPhone: '+91 98661 99002',
      motherName: 'G. Kavitha',
      motherPhone: '+91 98661 99003',
      guardianName: 'G. Srinivas Goud',
      guardianPhone: '+91 98661 99002',
      emergencyContact: '+91 98661 99002',
      parentEmail: 'srinivas.goud@gmail.com',
    },
    attendanceSummary: [
      { subjectId: 'CS701', conducted: 42, attended: 37 },
      { subjectId: 'CS702', conducted: 40, attended: 35 },
      { subjectId: 'CS703', conducted: 38, attended: 34 },
    ],
    marks: [
      { subjectId: 'CS701', internal: 27, external: 61, published: true },
      { subjectId: 'CS702', internal: 25, external: 58, published: true },
      { subjectId: 'CS703', internal: 26, external: 60, published: true },
    ],
    fees: {
      tuition: 200000,
      hostel: 0,
      transport: 28000,
      exam: 4500,
      other: 3000,
      scholarship: 0,
      dueDate: '2026-12-05',
    },
    payments: [
      { id: 'PAY-501', receipt: 'UT-REC-2026-0988', date: '2026-07-05', amount: 235500, method: 'RTGS', note: 'Final Year Full Fee & Convocation Deposit Cleared' },
    ],
    remarks: [
      { id: 'RMK-5', author: 'Prof. A. Ramakrishna', date: '2026-11-02', category: 'Achievement', visibility: 'Public', text: 'Placed at Accenture (Advanced App Engineering Analyst) during Day-1 Campus Drive.' }
    ],
    internships: [
      {
        id: 'INT-204',
        company: 'TCS Research & Innovation',
        role: 'Cloud Backend Intern',
        domain: 'Cloud Native Microservices',
        type: 'Offline',
        duration: '10 Weeks',
        startDate: '2025-05-10',
        endDate: '2025-07-20',
        stipend: '₹20,000 / month',
        mentor: 'Prof. A. Ramakrishna',
        status: 'Completed',
        skills: ['Node.js', 'Kubernetes', 'PostgreSQL', 'AWS'],
        projectDesc: 'Developed auto-scaling telemetry service for multi-tenant SaaS workloads.'
      }
    ],
    placementProfile: {
      skills: ['Java', 'Spring Boot', 'React', 'AWS', 'PostgreSQL'],
      certifications: ['AWS Solutions Architect Associate'],
      github: 'github.com/rohanteja-dev',
      aptitudeScore: 88,
      preferredRoles: ['Backend Engineer', 'Cloud Engineer'],
      preferredLocations: ['Hyderabad', 'Bengaluru', 'Pune']
    }
  }
];

const INITIAL_DRIVES = [
  {
    id: 'DRV-01',
    company: 'Accenture India',
    role: 'Advanced App Engineering Analyst',
    packageLPA: 6.5,
    minCgpa: 7.0,
    maxBacklogs: 0,
    eligibleBranches: ['CSE', 'IT', 'AIML', 'DS', 'ECE'],
    location: 'Hyderabad / Bengaluru',
    driveDate: '2026-11-28',
    deadline: '2026-11-24',
    applicants: [
      { studentId: 'STU-22-045', stage: 'Offer Accepted' }
    ]
  },
  {
    id: 'DRV-02',
    company: 'ServiceNow',
    role: 'Associate Software Engineer',
    packageLPA: 14.5,
    minCgpa: 8.0,
    maxBacklogs: 0,
    eligibleBranches: ['CSE', 'IT', 'AIML'],
    location: 'Hyderabad',
    driveDate: '2026-12-06',
    deadline: '2026-12-01',
    applicants: [
      { studentId: 'STU-22-045', stage: 'Shortlisted' }
    ]
  },
  {
    id: 'DRV-03',
    company: 'Qualcomm India',
    role: 'Interim / Graduate Embedded Engineer',
    packageLPA: 12.0,
    minCgpa: 7.5,
    maxBacklogs: 0,
    eligibleBranches: ['ECE', 'EEE', 'CSE'],
    location: 'Hyderabad / Chennai',
    driveDate: '2026-12-12',
    deadline: '2026-12-08',
    applicants: []
  }
];

const INITIAL_AUDIT_LOGS = [
  { id: 'AUD-01', timestamp: '2026-11-20 08:30:12', actor: 'Dr. K. Suryanarayana (Registrar)', role: 'Admin', action: 'SYSTEM_LOGIN', detail: 'Authenticated into UniTrack ERP Admin Console' },
  { id: 'AUD-02', timestamp: '2026-11-19 16:42:05', actor: 'Prof. A. Ramakrishna', role: 'Faculty', action: 'ATTENDANCE_SAVED', detail: 'Recorded Period 1–3 attendance for CSE 2nd Year Sec-A' },
  { id: 'AUD-03', timestamp: '2026-11-18 11:15:40', actor: 'Dr. K. Suryanarayana (Registrar)', role: 'Admin', action: 'QUOTA_FEE_CONFIGURED', detail: 'Verified Counselling (₹70,000) & Management (₹2,00,000) B.Tech fee slabs' },
];

// ============================================================================
// 2. UTILITY FUNCTIONS
// ============================================================================

const formatINR = (num) => {
  const val = Number(num) || 0;
  return '₹' + val.toLocaleString('en-IN');
};

const calculateStudentFeeTotals = (student) => {
  const f = student.fees || { tuition: 0, hostel: 0, transport: 0, exam: 0, other: 0, scholarship: 0 };
  const gross = Number(f.tuition) + Number(f.hostel) + Number(f.transport) + Number(f.exam) + Number(f.other);
  const netPayable = Math.max(0, gross - Number(f.scholarship || 0));
  const paid = (student.payments || []).reduce((acc, p) => acc + Number(p.amount || 0), 0);
  const due = Math.max(0, netPayable - paid);
  return { gross, netPayable, paid, due };
};

const calculateOverallAttendance = (student) => {
  const list = student.attendanceSummary || [];
  const totalConducted = list.reduce((a, b) => a + b.conducted, 0);
  const totalAttended = list.reduce((a, b) => a + b.attended, 0);
  if (totalConducted === 0) return 100;
  return Number(((totalAttended / totalConducted) * 100).toFixed(1));
};

const classesNeededFor75 = (conducted, attended) => {
  if (conducted === 0) return 0;
  if (attended / conducted >= 0.75) return 0;
  // (attended + x) / (conducted + x) >= 0.75 => attended + x >= 0.75*conducted + 0.75*x => 0.25x >= 0.75*conducted - attended
  const needed = Math.ceil((0.75 * conducted - attended) / 0.25);
  return Math.max(1, needed);
};

const calculateGradeAndPoints = (total) => {
  if (total >= 90) return { grade: 'O', points: 10, status: 'Pass' };
  if (total >= 80) return { grade: 'A+', points: 9, status: 'Pass' };
  if (total >= 70) return { grade: 'A', points: 8, status: 'Pass' };
  if (total >= 60) return { grade: 'B+', points: 7, status: 'Pass' };
  if (total >= 50) return { grade: 'B', points: 6, status: 'Pass' };
  if (total >= 40) return { grade: 'C', points: 5, status: 'Pass' };
  return { grade: 'F', points: 0, status: 'Fail' };
};

const exportToCSV = (filename, rows) => {
  if (!rows || rows.length === 0) return;
  const headers = Object.keys(rows[0]);
  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(h => {
        const cell = row[h] === null || row[h] === undefined ? '' : String(row[h]);
        return `"${cell.replace(/"/g, '""')}"`;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// ============================================================================
// 3. MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Persistent State with LocalStorage
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('unitrack_dark') === 'true');
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('unitrack_users_v3');
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch { return INITIAL_USERS; }
  });
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('unitrack_session_v3');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  const [branches, setBranches] = useState(() => {
    try {
      const saved = localStorage.getItem('unitrack_branches_v3');
      return saved ? JSON.parse(saved) : INITIAL_BRANCHES;
    } catch { return INITIAL_BRANCHES; }
  });
  const [subjects, setSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem('unitrack_subjects_v3');
      return saved ? JSON.parse(saved) : INITIAL_SUBJECTS;
    } catch { return INITIAL_SUBJECTS; }
  });
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem('unitrack_students_v3');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch { return INITIAL_STUDENTS; }
  });
  const [periods, setPeriods] = useState(() => {
    try {
      const saved = localStorage.getItem('unitrack_periods_v3');
      return saved ? JSON.parse(saved) : INITIAL_PERIODS;
    } catch { return INITIAL_PERIODS; }
  });
  const [drives, setDrives] = useState(() => {
    try {
      const saved = localStorage.getItem('unitrack_drives_v3');
      return saved ? JSON.parse(saved) : INITIAL_DRIVES;
    } catch { return INITIAL_DRIVES; }
  });
  const [auditLogs, setAuditLogs] = useState(() => {
    try {
      const saved = localStorage.getItem('unitrack_audit_v3');
      return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
    } catch { return INITIAL_AUDIT_LOGS; }
  });

  // Navigation & Global UI State
  const [activeNav, setActiveNav] = useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [globalSearch, setGlobalSearch] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Login & Password Reset State
  const [loginEmail, setLoginEmail] = useState('admin@unitrack.edu.in');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Account Settings Modal (Update Username & Password)
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [accountForm, setAccountForm] = useState({
    name: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('unitrack_dark', String(darkMode));
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => { localStorage.setItem('unitrack_users_v3', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('unitrack_session_v3', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('unitrack_branches_v3', JSON.stringify(branches)); }, [branches]);
  useEffect(() => { localStorage.setItem('unitrack_subjects_v3', JSON.stringify(subjects)); }, [subjects]);
  useEffect(() => { localStorage.setItem('unitrack_students_v3', JSON.stringify(students)); }, [students]);
  useEffect(() => { localStorage.setItem('unitrack_periods_v3', JSON.stringify(periods)); }, [periods]);
  useEffect(() => { localStorage.setItem('unitrack_drives_v3', JSON.stringify(drives)); }, [drives]);
  useEffect(() => { localStorage.setItem('unitrack_audit_v3', JSON.stringify(auditLogs)); }, [auditLogs]);

  const triggerToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const logAudit = (action, detail, actorOverride = null) => {
    const actorName = actorOverride?.name || currentUser?.name || 'System';
    const actorRole = actorOverride?.role || currentUser?.role || 'System';
    const entry = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toLocaleString('en-IN'),
      actor: actorName,
      role: actorRole,
      action,
      detail
    };
    setAuditLogs(prev => [entry, ...prev.slice(0, 99)]);
  };

  // Role-Scoped Accessible Students (Must remain unconditionally above early return!)
  const accessibleStudents = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'Admin') return students;
    if (currentUser.role === 'Faculty') {
      const allowedBranches = currentUser.assignedBranches || [currentUser.department];
      return students.filter(s => allowedBranches.includes(s.branch));
    }
    return [];
  }, [currentUser, students]);

  const selectedStudent = useMemo(
    () => students.find(s => s.id === selectedStudentId) || null,
    [students, selectedStudentId]
  );

  const globalMatches = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    if (!q || !currentUser) return [];
    return accessibleStudents
      .filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.regNo.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.branch.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [globalSearch, accessibleStudents, currentUser]);

  const openStudentProfile = (studentId) => {
    setSelectedStudentId(studentId);
    setActiveNav('student-profile');
    setGlobalSearch('');
  };

  const openAccountSettings = () => {
    if (!currentUser) return;
    setAccountForm({
      name: currentUser.name,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setAccountModalOpen(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const matched = users.find(
      u => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword
    );
    if (!matched) {
      setLoginError('Invalid institutional email or password.');
      return;
    }
    if (matched.role !== 'Admin' && matched.role !== 'Faculty') {
      setLoginError('Access restricted to authorized Admin and Faculty accounts.');
      return;
    }
    if (!matched.active) {
      setLoginError('This institutional account has been deactivated by the Registrar.');
      return;
    }
    const updatedUser = { ...matched, lastLogin: new Date().toLocaleString('en-IN') };
    setUsers(prev => prev.map(u => u.id === matched.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    setActiveNav('dashboard');
    logAudit('USER_LOGIN', `Signed into UniTrack ERP (${updatedUser.role})`, updatedUser);
    triggerToast(`Welcome back, ${updatedUser.name}`);
  };

  const handleLogout = () => {
    logAudit('USER_LOGOUT', 'Signed out of UniTrack ERP');
    setCurrentUser(null);
    setSelectedStudentId(null);
  };

  // ==========================================================================
  // AUTHENTICATION PORTAL (ADMIN & FACULTY ONLY)
  // ==========================================================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans">
        {/* Left University Branding Panel */}
        <div className="lg:w-1/2 bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#0284C7] p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wide mb-6">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>ENTERPRISE UNIVERSITY ERP • B.TECH 4-YEAR SUITE</span>
            </div>
            <div className="flex items-center gap-3.5 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#1E3A8A] flex items-center justify-center font-black text-2xl shadow-lg">
                U
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-white">UniTrack</h1>
                <p className="text-sky-200 text-xs font-medium">Private University Academic & Campus ERP</p>
              </div>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-xl">
              Unified Student Lifecycle, Attendance, Fee & Placement Management.
            </h2>
            <p className="mt-4 text-sky-100/90 text-sm lg:text-base max-w-lg leading-relaxed">
              Manage 4 years (8 semesters) of B.Tech engineering programs across branch-specific curricula, period-wise attendance registers, Counselling (₹70,000) & Management (₹2,00,000) fee ledgers, Hostel/Bus/Day-Scholar logistics, and 3rd/4th-year career outcomes.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-3 mt-10 pt-6 border-t border-white/15 text-xs">
            <div>
              <div className="text-2xl font-extrabold text-white">8</div>
              <div className="text-sky-200">Engineering Branches</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">6-Period</div>
              <div className="text-sky-200">Daily Attendance Grid</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">RBAC</div>
              <div className="text-sky-200">Admin & Faculty Security</div>
            </div>
          </div>
        </div>

        {/* Right Login Form Panel */}
        <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-slate-900">
          <div className="w-full max-w-md space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Staff & Registrar Sign In</h3>
              <p className="text-sm text-slate-400 mt-1">
                Authorized Admin and Faculty credentials only. Self-registration is disabled.
              </p>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-700 text-red-200 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Institutional Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  placeholder="name@unitrack.edu.in"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => { setResetEmail(loginEmail); setResetModalOpen(true); }}
                    className="text-xs text-sky-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#1E3A8A] to-[#0284C7] hover:opacity-95 text-white font-bold text-sm shadow-lg transition"
              >
                Sign In to UniTrack Console
              </button>
            </form>

            {/* Quick Role Demo Access (Admin & Faculty Only) */}
            <div className="pt-4 border-t border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                1-Click Institutional Demo Accounts
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {users.filter(u => u.role === 'Admin' || u.role === 'Faculty').slice(0, 2).map(acc => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      setLoginEmail(acc.email);
                      setLoginPassword(acc.password);
                      setLoginError('');
                    }}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500 text-left transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${acc.role === 'Admin' ? 'bg-blue-950 text-sky-300' : 'bg-emerald-950 text-emerald-300'}`}>
                        {acc.role}
                      </span>
                      <span className="text-[11px] text-slate-500">{acc.department}</span>
                    </div>
                    <div className="text-xs font-bold text-white mt-1.5 truncate">{acc.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{acc.email}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Password Reset Modal */}
        {resetModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-white">Institutional Password Recovery</h4>
                <button onClick={() => setResetModalOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400">
                Enter your registered university email address. A secure verification link will be dispatched by the IT Cell.
              </p>
              <input
                type="email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                placeholder="faculty@unitrack.edu.in"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
              <div className="flex justify-end gap-2">
                <button onClick={() => setResetModalOpen(false)} className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-semibold">
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setResetModalOpen(false);
                    setLoginError('');
                    alert ? null : null;
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold"
                >
                  Send Recovery Link
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================================================
  // SIDEBAR NAVIGATION ITEMS (ROLE-FILTERED)
  // ==========================================================================
  const navItems = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Faculty'] },
    { id: 'students', label: 'Student Directory', icon: Users, roles: ['Admin', 'Faculty'] },
    { id: 'curriculum', label: 'Branches & Subjects', icon: BookOpen, roles: ['Admin', 'Faculty'] },
    { id: 'attendance', label: 'Period Attendance', icon: CalendarCheck, roles: ['Admin', 'Faculty'] },
    { id: 'marks', label: 'Marks & Examinations', icon: Award, roles: ['Admin', 'Faculty'] },
    { id: 'fees', label: 'Fees, Hostel & Bus', icon: CreditCard, roles: ['Admin'] },
    { id: 'internships', label: '3rd Yr Internships', icon: Briefcase, roles: ['Admin', 'Faculty'] },
    { id: 'placements', label: '4th Yr Placements', icon: GraduationCap, roles: ['Admin', 'Faculty'] },
    { id: 'reports', label: 'Reports & Exports', icon: FileSpreadsheet, roles: ['Admin', 'Faculty'] },
    { id: 'security', label: 'Users & Audit Logs', icon: ShieldCheck, roles: ['Admin'] },
    { id: 'blueprint', label: 'DB & Vercel Blueprint', icon: Database, roles: ['Admin'] },
  ].filter(item => item.roles.includes(currentUser.role));

  return (
    <div className={`min-h-screen flex ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans`}>
      {/* Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#1E3A8A] text-white text-sm font-semibold shadow-2xl border border-sky-400/30">
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Mobile Sidebar Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/60 lg:hidden"
        />
      )}

      {/* Left Sidebar Navigation */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-68 flex flex-col bg-[#0F172A] text-slate-200 border-r border-slate-800 transition-transform duration-200 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A8A] to-[#0284C7] text-white flex items-center justify-center font-black text-xl shadow">
              U
            </div>
            <div>
              <div className="font-extrabold text-white text-lg tracking-tight leading-none">UniTrack</div>
              <div className="text-[11px] text-sky-400 font-medium mt-1">University ERP v3.0</div>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeNav === item.id || (item.id === 'students' && activeNav === 'student-profile');
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveNav(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? 'bg-gradient-to-r from-[#1E3A8A] to-[#0284C7] text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Logged-in User Card */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-900/80">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-[11px] text-sky-400 font-medium">{currentUser.role} • {currentUser.department}</div>
            </div>
            <button
              onClick={openAccountSettings}
              title="Update Username & Password"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleLogout}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/70 border border-red-800/60 text-red-200 text-xs font-bold transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-700"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Student Quick Search */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={globalSearch}
                onChange={e => setGlobalSearch(e.target.value)}
                placeholder="Search student by Name, Reg No (24UT1A...), Roll No, or Branch..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:border-[#1E3A8A]"
              />
              {globalMatches.length > 0 && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-40">
                  {globalMatches.map(st => (
                    <button
                      key={st.id}
                      onClick={() => openStudentProfile(st.id)}
                      className="w-full px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-between border-b last:border-0 border-slate-100 dark:border-slate-800"
                    >
                      <div>
                        <div className="text-sm font-bold">{st.name}</div>
                        <div className="text-xs text-slate-500">{st.regNo} • {st.branch} Year {st.year} Sec-{st.section}</div>
                      </div>
                      <span className="text-xs font-semibold text-[#1E3A8A] dark:text-sky-400">Open Profile →</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={openAccountSettings}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-sky-400" />
              <span>Account</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle Theme"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </header>

        {/* Active Page Content */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {activeNav === 'dashboard' && (
            <DashboardView
              currentUser={currentUser}
              students={accessibleStudents}
              branches={branches}
              subjects={subjects}
              drives={drives}
              onOpenStudent={openStudentProfile}
              onNavigate={setActiveNav}
            />
          )}

          {activeNav === 'students' && (
            <StudentDirectoryView
              currentUser={currentUser}
              students={accessibleStudents}
              allStudents={students}
              setStudents={setStudents}
              branches={branches}
              subjects={subjects}
              onOpenStudent={openStudentProfile}
              logAudit={logAudit}
              triggerToast={triggerToast}
            />
          )}

          {activeNav === 'student-profile' && selectedStudent && (
            <StudentTenTabProfile
              currentUser={currentUser}
              student={selectedStudent}
              setStudents={setStudents}
              branches={branches}
              subjects={subjects}
              onBack={() => setActiveNav('students')}
              logAudit={logAudit}
              triggerToast={triggerToast}
            />
          )}

          {activeNav === 'curriculum' && (
            <CurriculumManagementView
              currentUser={currentUser}
              branches={branches}
              setBranches={setBranches}
              subjects={subjects}
              setSubjects={setSubjects}
              logAudit={logAudit}
              triggerToast={triggerToast}
            />
          )}

          {activeNav === 'attendance' && (
            <AttendanceManagementView
              currentUser={currentUser}
              students={accessibleStudents}
              setStudents={setStudents}
              branches={branches}
              subjects={subjects}
              periods={periods}
              setPeriods={setPeriods}
              onOpenStudent={openStudentProfile}
              logAudit={logAudit}
              triggerToast={triggerToast}
            />
          )}

          {activeNav === 'marks' && (
            <MarksExaminationView
              currentUser={currentUser}
              students={accessibleStudents}
              setStudents={setStudents}
              branches={branches}
              subjects={subjects}
              logAudit={logAudit}
              triggerToast={triggerToast}
            />
          )}

          {activeNav === 'fees' && (
            <FeeManagementView
              currentUser={currentUser}
              students={students}
              setStudents={setStudents}
              onOpenStudent={openStudentProfile}
              logAudit={logAudit}
              triggerToast={triggerToast}
            />
          )}

          {activeNav === 'internships' && (
            <InternshipManagementView
              currentUser={currentUser}
              students={accessibleStudents}
              setStudents={setStudents}
              onOpenStudent={openStudentProfile}
              logAudit={logAudit}
              triggerToast={triggerToast}
            />
          )}

          {activeNav === 'placements' && (
            <PlacementManagementView
              currentUser={currentUser}
              students={accessibleStudents}
              drives={drives}
              setDrives={setDrives}
              onOpenStudent={openStudentProfile}
              logAudit={logAudit}
              triggerToast={triggerToast}
            />
          )}

          {activeNav === 'reports' && (
            <ReportsExportView
              students={accessibleStudents}
              branches={branches}
              subjects={subjects}
              drives={drives}
              triggerToast={triggerToast}
            />
          )}

          {activeNav === 'security' && (
            <SecurityUsersAuditView
              currentUser={currentUser}
              users={users}
              setUsers={setUsers}
              branches={branches}
              auditLogs={auditLogs}
              logAudit={logAudit}
              triggerToast={triggerToast}
            />
          )}

          {activeNav === 'blueprint' && <DatabaseDeploymentBlueprintView />}
        </main>
      </div>

      {/* SELF-SERVICE ACCOUNT SETTINGS MODAL (UPDATE USERNAME & PASSWORD) */}
      {accountModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-[#1E3A8A] dark:text-sky-400" />
                <h3 className="text-base font-bold">Account Settings — Username & Password</h3>
              </div>
              <button onClick={() => setAccountModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!accountForm.name.trim()) {
                  triggerToast('Display username cannot be empty', 'error');
                  return;
                }
                const wantsPasswordChange = accountForm.newPassword.trim().length > 0;
                if (wantsPasswordChange) {
                  if (accountForm.currentPassword !== currentUser.password) {
                    triggerToast('Current password is incorrect', 'error');
                    return;
                  }
                  if (accountForm.newPassword.length < 6) {
                    triggerToast('New password must be at least 6 characters', 'error');
                    return;
                  }
                  if (accountForm.newPassword !== accountForm.confirmPassword) {
                    triggerToast('New password and confirmation do not match', 'error');
                    return;
                  }
                }
                const updatedUser = {
                  ...currentUser,
                  name: accountForm.name.trim(),
                  password: wantsPasswordChange ? accountForm.newPassword : currentUser.password
                };
                setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
                setCurrentUser(updatedUser);
                logAudit('ACCOUNT_UPDATED', `Updated username${wantsPasswordChange ? ' and password' : ''} for ${updatedUser.email}`, updatedUser);
                setAccountModalOpen(false);
                triggerToast('Username & account credentials updated successfully');
              }}
              className="mt-4 space-y-3 text-sm"
            >
              <div>
                <label className="block text-xs font-semibold mb-1">Display Name / Username</label>
                <input
                  type="text"
                  required
                  value={accountForm.name}
                  onChange={e => setAccountForm({ ...accountForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-500 mb-2">Change Password (Optional)</p>
                <div className="space-y-2.5">
                  <input
                    type="password"
                    placeholder="Current Password"
                    value={accountForm.currentPassword}
                    onChange={e => setAccountForm({ ...accountForm, currentPassword: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                  />
                  <input
                    type="password"
                    placeholder="New Password (min 6 chars)"
                    value={accountForm.newPassword}
                    onChange={e => setAccountForm({ ...accountForm, newPassword: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={accountForm.confirmPassword}
                    onChange={e => setAccountForm({ ...accountForm, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setAccountModalOpen(false)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white font-semibold">
                  Save Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 4. EXECUTIVE & FACULTY DASHBOARD VIEW
// ============================================================================

function DashboardView({ currentUser, students, branches, subjects, drives, onOpenStudent, onNavigate }) {
  const cardClass = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs';

  const stats = useMemo(() => {
    const totalStudents = students.length;
    const avgAttendance = totalStudents === 0
      ? 0
      : Number((students.reduce((acc, s) => acc + calculateOverallAttendance(s), 0) / totalStudents).toFixed(1));
    const shortageStudents = students.filter(s => calculateOverallAttendance(s) < 75);
    const totalCollected = students.reduce((acc, s) => acc + calculateStudentFeeTotals(s).paid, 0);
    const totalPending = students.reduce((acc, s) => acc + calculateStudentFeeTotals(s).due, 0);
    const hostelCount = students.filter(s => s.commuteType === 'Hostel').length;
    const busCount = students.filter(s => s.commuteType === 'Bus').length;
    const privateCount = students.filter(s => s.commuteType === 'Private').length;
    const counsellingCount = students.filter(s => s.fees?.tuition === 70000 || s.seatType === 'Counselling').length;
    const managementCount = students.filter(s => s.fees?.tuition === 200000 || s.seatType === 'Management').length;

    return {
      totalStudents,
      avgAttendance,
      shortageStudents,
      totalCollected,
      totalPending,
      hostelCount,
      busCount,
      privateCount,
      counsellingCount,
      managementCount
    };
  }, [students]);

  // Accurate real-time branch enrollment chart data
  const branchChartData = useMemo(() => {
    return branches.map(b => ({
      branch: b.id,
      name: b.name,
      enrolled: students.filter(s => s.branch === b.id).length,
      intake: b.intake
    }));
  }, [branches, students]);

  const stayPieData = [
    { name: 'Campus Hostel', value: stats.hostelCount, color: '#1E3A8A' },
    { name: 'University Bus', value: stats.busCount, color: '#0284C7' },
    { name: 'Private / Day Scholar', value: stats.privateCount, color: '#10B981' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">
            {currentUser.role === 'Admin' ? 'University Executive Overview' : `${currentUser.department} Faculty Workspace`}
          </h1>
          <p className="text-sm text-slate-500">
            Academic Year 2026–27 • Real-time student enrollment, attendance, quota fee, and campus residency analytics
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigate('attendance')}
            className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white text-xs font-bold hover:opacity-95"
          >
            + Mark Period Attendance
          </button>
          <button
            onClick={() => onNavigate('students')}
            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Manage Students
          </button>
        </div>
      </div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={cardClass}>
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>ACTIVE B.TECH STUDENTS</span>
            <Users className="w-4 h-4 text-[#1E3A8A] dark:text-sky-400" />
          </div>
          <div className="text-3xl font-extrabold mt-2">{stats.totalStudents}</div>
          <div className="text-xs text-slate-500 mt-1">
            Counselling: <strong className="text-emerald-600">{stats.counsellingCount}</strong> • Management: <strong className="text-indigo-600">{stats.managementCount}</strong>
          </div>
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>AVERAGE ATTENDANCE</span>
            <CalendarCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold mt-2">{stats.avgAttendance}%</div>
          <div className="text-xs text-red-500 font-semibold mt-1">
            {stats.shortageStudents.length} student(s) below 75% threshold
          </div>
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>FEES COLLECTED / DUE</span>
            <CreditCard className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold mt-2 text-emerald-600">{formatINR(stats.totalCollected)}</div>
          <div className="text-xs text-amber-600 font-semibold mt-1">
            Pending Balance: {formatINR(stats.totalPending)}
          </div>
        </div>

        <div className={cardClass}>
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>STAY & COMMUTE SPLIT</span>
            <Building2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-lg font-extrabold mt-2">
            {stats.hostelCount} Hostel • {stats.busCount} Bus • {stats.privateCount} Private
          </div>
          <div className="text-xs text-slate-500 mt-1">
            {subjects.length} active branch subjects configured
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${cardClass} lg:col-span-2`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold">Branch-Wise Student Enrollment</h3>
              <p className="text-xs text-slate-500">Live count of enrolled students across all B.Tech departments</p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchChartData} margin={{ top: 10, right: 16, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} />
                <XAxis dataKey="branch" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
                />
                <Bar dataKey="enrolled" name="Enrolled Students" fill="#1E3A8A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={cardClass}>
          <h3 className="text-base font-bold mb-1">Hostel vs Bus vs Private</h3>
          <p className="text-xs text-slate-500 mb-3">Student residential & commute distribution</p>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stayPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={4}>
                  {stayPieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs mt-2">
            {stayPieData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Shortage Alert List */}
      <div className={cardClass}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="text-base font-bold">Attendance Shortage Watchlist (&lt; 75%)</h3>
          </div>
          <span className="text-xs text-slate-500">Click a student to adjust attendance or notify parents</span>
        </div>
        {stats.shortageStudents.length === 0 ? (
          <p className="text-sm text-emerald-600 font-medium">All students currently maintain ≥ 75% attendance.</p>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {stats.shortageStudents.map(st => (
              <div key={st.id} className="py-3 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-bold">{st.name} <span className="text-xs font-mono text-slate-500">({st.regNo})</span></div>
                  <div className="text-xs text-slate-500">{st.branch} • Year {st.year} Sec-{st.section} • {st.commuteType}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                    {calculateOverallAttendance(st)}% Attendance
                  </span>
                  <button
                    onClick={() => onOpenStudent(st.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-semibold"
                  >
                    Open & Adjust
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 5. STUDENT DIRECTORY & NEW ADMISSION MODAL
// ============================================================================

function StudentDirectoryView({ currentUser, students, allStudents, setStudents, branches, subjects, onOpenStudent, logAudit, triggerToast }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [branchFilter, setBranchFilter] = useState('ALL');
  const [yearFilter, setYearFilter] = useState('ALL');
  const [commuteFilter, setCommuteFilter] = useState('ALL');
  const [quotaFilter, setQuotaFilter] = useState('ALL');
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: '',
    regNo: '25UT1A0510',
    rollNo: '25CSE-A10',
    dob: '2007-04-12',
    gender: 'Male',
    phone: '+91 98480 55443',
    email: '',
    address: 'Guntur, Andhra Pradesh',
    branch: 'CSE',
    year: 1,
    semester: 1,
    section: 'A',
    seatType: 'Counselling',
    category: 'OC',
    commuteType: 'Hostel',
    commuteDetails: 'Kaveri Hostel • Room 105',
    fatherName: '',
    fatherPhone: '',
    motherName: '',
    motherPhone: '',
    parentEmail: ''
  });

  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const q = searchTerm.trim().toLowerCase();
      const matchesQ = !q ||
        s.name.toLowerCase().includes(q) ||
        s.regNo.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.phone.toLowerCase().includes(q);
      const matchesBranch = branchFilter === 'ALL' || s.branch === branchFilter;
      const matchesYear = yearFilter === 'ALL' || String(s.year) === yearFilter;
      const matchesCommute = commuteFilter === 'ALL' || s.commuteType === commuteFilter;
      const matchesQuota = quotaFilter === 'ALL' || s.seatType === quotaFilter;
      return matchesQ && matchesBranch && matchesYear && matchesCommute && matchesQuota;
    });
  }, [students, searchTerm, branchFilter, yearFilter, commuteFilter, quotaFilter]);

  const handleAddStudent = (e) => {
    e.preventDefault();
    const branchSubjects = subjects.filter(sub => sub.branch === newStudent.branch && sub.semester === Number(newStudent.semester));
    const fallbackSubs = branchSubjects.length > 0 ? branchSubjects : subjects.slice(0, 4);

    const quotaTuition = newStudent.seatType === 'Management' ? 200000 : 70000;
    const hostelFee = newStudent.commuteType === 'Hostel' ? 85000 : 0;
    const busFee = newStudent.commuteType === 'Bus' ? 28000 : 0;

    const created = {
      id: `STU-${Date.now()}`,
      regNo: newStudent.regNo.trim(),
      universityId: `UNI-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      rollNo: newStudent.rollNo.trim(),
      name: newStudent.name.trim(),
      dob: newStudent.dob,
      gender: newStudent.gender,
      phone: newStudent.phone,
      email: newStudent.email.trim() || `${newStudent.regNo.toLowerCase()}@unitrack.edu.in`,
      address: newStudent.address,
      admissionDate: new Date().toISOString().split('T')[0],
      admissionYear: new Date().getFullYear(),
      course: 'B.Tech',
      branch: newStudent.branch,
      year: Number(newStudent.year),
      semester: Number(newStudent.semester),
      section: newStudent.section,
      seatType: newStudent.seatType,
      category: newStudent.category,
      status: 'Active',
      cgpa: 8.0,
      backlogs: 0,
      commuteType: newStudent.commuteType,
      commuteDetails: newStudent.commuteDetails,
      parent: {
        fatherName: newStudent.fatherName || 'Parent / Guardian',
        fatherPhone: newStudent.fatherPhone || newStudent.phone,
        motherName: newStudent.motherName || 'Mother',
        motherPhone: newStudent.motherPhone || newStudent.phone,
        guardianName: newStudent.fatherName || 'Guardian',
        guardianPhone: newStudent.fatherPhone || newStudent.phone,
        emergencyContact: newStudent.fatherPhone || newStudent.phone,
        parentEmail: newStudent.parentEmail || 'parent@example.com',
      },
      attendanceSummary: fallbackSubs.map(sub => ({ subjectId: sub.id, conducted: 20, attended: 18 })),
      marks: fallbackSubs.map(sub => ({ subjectId: sub.id, internal: 24, external: 55, published: false })),
      fees: {
        tuition: quotaTuition,
        hostel: hostelFee,
        transport: busFee,
        exam: 3500,
        other: 2500,
        scholarship: 0,
        dueDate: '2026-12-30'
      },
      payments: [],
      remarks: [],
      internships: [],
      placementProfile: {
        skills: ['C', 'Python', 'Problem Solving'],
        certifications: [],
        github: '',
        aptitudeScore: 75,
        preferredRoles: ['Software Engineer'],
        preferredLocations: ['Hyderabad', 'Bengaluru']
      }
    };

    setStudents(prev => [created, ...prev]);
    logAudit('STUDENT_ENROLLED', `Admitted ${created.name} (${created.regNo}) under ${created.seatType} quota (${formatINR(quotaTuition)})`);
    setAddModalOpen(false);
    triggerToast(`Student ${created.name} admitted under ${created.seatType} Quota`);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">B.Tech Student Directory</h1>
          <p className="text-sm text-slate-500">Showing {filteredStudents.length} of {students.length} students across 4 academic years</p>
        </div>
        {currentUser.role === 'Admin' && (
          <button
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1E3A8A] text-white text-sm font-bold shadow"
          >
            <Plus className="w-4 h-4" />
            <span>Enroll New Student</span>
          </button>
        )}
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-sm">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search Name / Reg No..."
          className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
        />
        <select value={branchFilter} onChange={e => setBranchFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
          <option value="ALL">All Branches</option>
          {branches.map(b => <option key={b.id} value={b.id}>{b.id} — {b.name}</option>)}
        </select>
        <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
          <option value="ALL">All Years (1st–4th)</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>
        <select value={quotaFilter} onChange={e => setQuotaFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
          <option value="ALL">All Fee Quotas</option>
          <option value="Counselling">Counselling (₹70,000)</option>
          <option value="Management">Management (₹2,00,000)</option>
        </select>
        <select value={commuteFilter} onChange={e => setCommuteFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
          <option value="ALL">Hostel / Bus / Private</option>
          <option value="Hostel">Campus Hostel</option>
          <option value="Bus">University Bus</option>
          <option value="Private">Private / Day Scholar</option>
        </select>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Student & Reg No</th>
                <th className="py-3 px-4">Branch / Year</th>
                <th className="py-3 px-4">Quota & Tuition</th>
                <th className="py-3 px-4">Stay / Commute</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">CGPA</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredStudents.map(st => {
                const att = calculateOverallAttendance(st);
                return (
                  <tr key={st.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                    <td className="py-3.5 px-4">
                      <div className="font-bold">{st.name}</div>
                      <div className="text-xs font-mono text-slate-500">{st.regNo} • {st.rollNo}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-300 font-bold text-xs">
                        {st.branch}
                      </span>
                      <div className="text-xs text-slate-500 mt-1">Year {st.year} • Sem {st.semester} ({st.section})</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        st.seatType === 'Management'
                          ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}>
                        {st.seatType}
                      </span>
                      <div className="text-xs font-semibold mt-1">{formatINR(st.fees.tuition)}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-xs">{st.commuteType}</div>
                      <div className="text-xs text-slate-500 max-w-[190px] truncate">{st.commuteDetails}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`font-bold ${att >= 75 ? 'text-emerald-600' : 'text-red-500'}`}>{att}%</span>
                    </td>
                    <td className="py-3.5 px-4 font-bold">{st.cgpa}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => onOpenStudent(st.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white text-xs font-semibold"
                      >
                        10-Tab Profile & Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enroll New Student Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold">Enroll New B.Tech Student</h3>
              <button onClick={() => setAddModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="mt-4 space-y-3 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Full Name *</label>
                  <input required value={newStudent.name} onChange={e => setNewStudent({ ...newStudent, name: e.target.value })} placeholder="e.g. Sai Charan Teja" className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Registration Number *</label>
                  <input required value={newStudent.regNo} onChange={e => setNewStudent({ ...newStudent, regNo: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Branch</label>
                  <select value={newStudent.branch} onChange={e => setNewStudent({ ...newStudent, branch: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                    {branches.map(b => <option key={b.id} value={b.id}>{b.id} — {b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Year & Semester</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={newStudent.year} onChange={e => setNewStudent({ ...newStudent, year: Number(e.target.value) })} className="px-2 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                      {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                    </select>
                    <select value={newStudent.semester} onChange={e => setNewStudent({ ...newStudent, semester: Number(e.target.value) })} className="px-2 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>Sem {s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Admission Quota & Tuition Fee</label>
                  <select value={newStudent.seatType} onChange={e => setNewStudent({ ...newStudent, seatType: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                    <option value="Counselling">Counselling Quota (₹70,000 / yr)</option>
                    <option value="Management">Management Quota (₹2,00,000 / yr)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Stay / Commute Mode</label>
                  <select value={newStudent.commuteType} onChange={e => setNewStudent({ ...newStudent, commuteType: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                    <option value="Hostel">Campus Hostel (+₹85,000)</option>
                    <option value="Bus">University Bus (+₹28,000)</option>
                    <option value="Private">Private / Day Scholar (₹0)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Hostel Room / Bus Route Details</label>
                  <input value={newStudent.commuteDetails} onChange={e => setNewStudent({ ...newStudent, commuteDetails: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Father / Guardian Name</label>
                  <input value={newStudent.fatherName} onChange={e => setNewStudent({ ...newStudent, fatherName: e.target.value })} placeholder="Parent Name" className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setAddModalOpen(false)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E3A8A] text-white font-semibold">
                  Complete Enrollment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 6. 10-TAB STUDENT PROFILE (WITH EDIT DETAILS, ATTENDANCE ADJUST & QUOTA FEES)
// ============================================================================

function StudentTenTabProfile({ currentUser, student, setStudents, branches, subjects, onBack, logAudit, triggerToast }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [newRemark, setNewRemark] = useState({ category: 'Academic', visibility: 'Public', text: '' });
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: student.name,
    regNo: student.regNo,
    rollNo: student.rollNo,
    dob: student.dob,
    gender: student.gender,
    phone: student.phone,
    email: student.email,
    address: student.address,
    branch: student.branch,
    year: student.year,
    semester: student.semester,
    section: student.section,
    seatType: student.seatType,
    category: student.category,
    status: student.status,
    cgpa: student.cgpa,
    backlogs: student.backlogs,
    commuteType: student.commuteType,
    commuteDetails: student.commuteDetails,
    fatherName: student.parent.fatherName,
    fatherPhone: student.parent.fatherPhone,
    motherName: student.parent.motherName,
    motherPhone: student.parent.motherPhone,
    guardianName: student.parent.guardianName,
    guardianPhone: student.parent.guardianPhone,
    emergencyContact: student.parent.emergencyContact,
    parentEmail: student.parent.parentEmail,
  });

  useEffect(() => {
    setEditForm({
      name: student.name,
      regNo: student.regNo,
      rollNo: student.rollNo,
      dob: student.dob,
      gender: student.gender,
      phone: student.phone,
      email: student.email,
      address: student.address,
      branch: student.branch,
      year: student.year,
      semester: student.semester,
      section: student.section,
      seatType: student.seatType,
      category: student.category,
      status: student.status,
      cgpa: student.cgpa,
      backlogs: student.backlogs,
      commuteType: student.commuteType,
      commuteDetails: student.commuteDetails,
      fatherName: student.parent.fatherName,
      fatherPhone: student.parent.fatherPhone,
      motherName: student.parent.motherName,
      motherPhone: student.parent.motherPhone,
      guardianName: student.parent.guardianName,
      guardianPhone: student.parent.guardianPhone,
      emergencyContact: student.parent.emergencyContact,
      parentEmail: student.parent.parentEmail,
    });
  }, [student]);

  const cardClass = 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs';
  const overallAtt = calculateOverallAttendance(student);
  const { netPayable, paid, due: feeDue } = calculateStudentFeeTotals(student);

  const sgpa = useMemo(() => {
    if (!student.marks || student.marks.length === 0) return '0.00';
    let totalPoints = 0;
    let totalCredits = 0;
    student.marks.forEach(m => {
      const sub = subjects.find(s => s.id === m.subjectId);
      const cr = sub ? sub.credits : 3;
      const gp = calculateGradeAndPoints(m.internal + m.external).points;
      totalPoints += gp * cr;
      totalCredits += cr;
    });
    return totalCredits === 0 ? '0.00' : (totalPoints / totalCredits).toFixed(2);
  }, [student.marks, subjects]);

  const tabs = [
    { id: 'overview', label: '1. Overview' },
    { id: 'personal', label: '2. Personal Details' },
    { id: 'academics', label: '3. Academics' },
    { id: 'attendance', label: '4. Attendance' },
    { id: 'marks', label: '5. Marks & Results' },
    { id: 'fees', label: '6. Fees & Hostel/Bus' },
    { id: 'parents', label: '7. Parent Details' },
    { id: 'remarks', label: '8. Remarks' },
    { id: 'internships', label: '9. Internships' },
    { id: 'placements', label: '10. Placements' },
  ];

  return (
    <div className="space-y-5">
      {/* Top Student Profile Banner */}
      <div className={cardClass}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ← Directory
            </button>
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#0284C7] text-white flex items-center justify-center font-extrabold text-xl">
              {student.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-extrabold">{student.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-sky-300">
                  {student.regNo}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  student.seatType === 'Management'
                    ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                    : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                }`}>
                  {student.seatType} Quota ({formatINR(student.fees.tuition)})
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {student.branch} • Year {student.year} (Sem {student.semester}) • Section {student.section} • {student.commuteType}: {student.commuteDetails}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1E3A8A] hover:bg-blue-800 text-white text-xs font-bold shadow"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Update Student Details</span>
          </button>
        </div>

        {/* 10 Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeTab === t.id
                  ? 'bg-[#1E3A8A] text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={cardClass}>
            <div className="text-xs text-slate-500 font-semibold">CUMULATIVE CGPA</div>
            <div className="text-2xl font-extrabold mt-1">{student.cgpa} / 10.0</div>
            <div className="text-xs text-emerald-600 mt-1">SGPA: {sgpa} • Backlogs: {student.backlogs}</div>
          </div>
          <div className={cardClass}>
            <div className="text-xs text-slate-500 font-semibold">OVERALL ATTENDANCE</div>
            <div className={`text-2xl font-extrabold mt-1 ${overallAtt >= 75 ? 'text-emerald-600' : 'text-red-500'}`}>{overallAtt}%</div>
            <div className="text-xs text-slate-500 mt-1">{overallAtt >= 75 ? 'Eligible for End-Sem Exams' : 'Below 75% Shortage Alert'}</div>
          </div>
          <div className={cardClass}>
            <div className="text-xs text-slate-500 font-semibold">QUOTA & FEE BALANCE</div>
            <div className="text-2xl font-extrabold mt-1">{formatINR(feeDue)}</div>
            <div className="text-xs text-slate-500 mt-1">{student.seatType} • Net Payable {formatINR(netPayable)}</div>
          </div>
          <div className={cardClass}>
            <div className="text-xs text-slate-500 font-semibold">RESIDENCY / COMMUTE</div>
            <div className="text-2xl font-extrabold mt-1">{student.commuteType}</div>
            <div className="text-xs text-slate-500 mt-1 truncate">{student.commuteDetails}</div>
          </div>
        </div>
      )}

      {/* TAB 2: PERSONAL DETAILS */}
      {activeTab === 'personal' && (
        <div className={cardClass}>
          <h3 className="text-base font-bold mb-4">Personal & Identity Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'Full Name', val: student.name },
              { label: 'Registration No', val: student.regNo },
              { label: 'University ID', val: student.universityId },
              { label: 'Roll Number', val: student.rollNo },
              { label: 'Date of Birth', val: student.dob },
              { label: 'Gender', val: student.gender },
              { label: 'Student Phone', val: student.phone },
              { label: 'Institutional Email', val: student.email },
              { label: 'Admission Date', val: student.admissionDate },
              { label: 'Stay / Commute Mode', val: `${student.commuteType} — ${student.commuteDetails}` },
              { label: 'Permanent Address', val: student.address },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500">{item.label}</div>
                <div className="font-semibold mt-0.5">{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ACADEMICS */}
      {activeTab === 'academics' && (
        <div className={cardClass}>
          <h3 className="text-base font-bold mb-4">Academic Enrollment & Seat Classification</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            {[
              { label: 'Program', val: student.course },
              { label: 'Branch / Department', val: student.branch },
              { label: 'Current Year & Semester', val: `Year ${student.year} • Semester ${student.semester}` },
              { label: 'Section', val: `Section ${student.section}` },
              { label: 'Admission Quota', val: `${student.seatType} (${formatINR(student.fees.tuition)}/yr)` },
              { label: 'Reservation Category', val: student.category },
              { label: 'Academic Status', val: student.status },
              { label: 'Active Backlogs', val: String(student.backlogs) },
            ].map((item, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500">{item.label}</div>
                <div className="font-semibold mt-0.5">{item.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ATTENDANCE (WITH DIRECT ADJUSTMENT CONTROLS) */}
      {activeTab === 'attendance' && (
        <div className={cardClass}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold">Subject-Wise Attendance & 75% Shortage Estimator</h3>
              <p className="text-xs text-slate-500">Cumulative attendance: <span className="font-bold">{overallAtt}%</span></p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-sky-300 font-semibold">
              Direct Attendance Adjustment Enabled
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Total Periods</th>
                  <th className="py-2.5 px-3">Present</th>
                  <th className="py-2.5 px-3">Absent</th>
                  <th className="py-2.5 px-3">Percentage</th>
                  <th className="py-2.5 px-3">75% Eligibility</th>
                  <th className="py-2.5 px-3 text-right">Adjust Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {student.attendanceSummary.map(item => {
                  const sub = subjects.find(s => s.id === item.subjectId);
                  const pct = item.conducted === 0 ? 100 : Number(((item.attended / item.conducted) * 100).toFixed(1));
                  const needed = classesNeededFor75(item.conducted, item.attended);

                  const adjustSubjectAttendance = (deltaAttended, deltaConducted = 0) => {
                    setStudents(prev => prev.map(s => {
                      if (s.id !== student.id) return s;
                      return {
                        ...s,
                        attendanceSummary: s.attendanceSummary.map(attRow => {
                          if (attRow.subjectId !== item.subjectId) return attRow;
                          const nextConducted = Math.max(0, attRow.conducted + deltaConducted);
                          const nextAttended = Math.min(nextConducted, Math.max(0, attRow.attended + deltaAttended));
                          return { ...attRow, conducted: nextConducted, attended: nextAttended };
                        })
                      };
                    }));
                    logAudit('ATTENDANCE_ADJUSTED', `Adjusted ${item.subjectId} attendance for ${student.regNo} (${deltaAttended >= 0 ? '+' : ''}${deltaAttended} present, ${deltaConducted >= 0 ? '+' : ''}${deltaConducted} conducted)`);
                    triggerToast(`Attendance updated for ${sub?.code || item.subjectId}`);
                  };

                  return (
                    <tr key={item.subjectId}>
                      <td className="py-3 px-3 font-semibold">{sub ? `${sub.code} — ${sub.name}` : item.subjectId}</td>
                      <td className="py-3 px-3">{item.conducted}</td>
                      <td className="py-3 px-3 text-emerald-600 font-semibold">{item.attended}</td>
                      <td className="py-3 px-3 text-red-500 font-semibold">{item.conducted - item.attended}</td>
                      <td className="py-3 px-3 font-bold">{pct}%</td>
                      <td className="py-3 px-3">
                        {pct >= 75 ? (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                            Eligible (≥75%)
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                            Shortage: Attend next {needed}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => adjustSubjectAttendance(1, 0)}
                            className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                          >
                            +1 Present
                          </button>
                          <button
                            type="button"
                            onClick={() => adjustSubjectAttendance(-1, 0)}
                            className="px-2 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold"
                          >
                            -1
                          </button>
                          <button
                            type="button"
                            onClick={() => adjustSubjectAttendance(1, 1)}
                            className="px-2 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            +1 Class
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: MARKS & RESULTS */}
      {activeTab === 'marks' && (
        <div className={cardClass}>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold">Semester {student.semester} Examination Ledger</h3>
              <p className="text-xs text-slate-500">SGPA: <span className="font-bold">{sgpa}</span> • Overall CGPA: <span className="font-bold">{student.cgpa}</span></p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3">Internal (30)</th>
                  <th className="py-2.5 px-3">External (70)</th>
                  <th className="py-2.5 px-3">Total (100)</th>
                  <th className="py-2.5 px-3">Grade</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {student.marks.map(m => {
                  const sub = subjects.find(s => s.id === m.subjectId);
                  const total = m.internal + m.external;
                  const gradeInfo = calculateGradeAndPoints(total);
                  return (
                    <tr key={m.subjectId}>
                      <td className="py-3 px-3 font-semibold">{sub ? `${sub.code} — ${sub.name}` : m.subjectId}</td>
                      <td className="py-3 px-3">{m.internal}</td>
                      <td className="py-3 px-3">{m.external}</td>
                      <td className="py-3 px-3 font-bold">{total}</td>
                      <td className="py-3 px-3 font-bold text-blue-600">{gradeInfo.grade}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${gradeInfo.status === 'Pass' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {gradeInfo.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: FEES & COUNSELLING (70K) vs MANAGEMENT (2 LAC) QUOTA */}
      {activeTab === 'fees' && (
        <div className="space-y-4">
          <div className={cardClass}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-base font-bold">Fee Structure & Quota Slab Selection</h3>
                <p className="text-xs text-slate-500">
                  Quota: <span className="font-bold text-indigo-600 dark:text-indigo-400">{student.seatType}</span> • Stay/Commute: <span className="font-bold text-blue-600 dark:text-sky-400">{student.commuteType}</span> ({student.commuteDetails})
                </p>
              </div>
              {currentUser.role === 'Admin' && (
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 font-semibold">Set Tuition Quota:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setStudents(prev => prev.map(s => s.id === student.id ? {
                        ...s,
                        seatType: 'Counselling',
                        fees: { ...s.fees, tuition: 70000 }
                      } : s));
                      logAudit('QUOTA_FEE_UPDATED', `Applied Counselling Quota tuition (₹70,000) for ${student.regNo}`);
                      triggerToast('Applied Counselling Quota Fee: ₹70,000');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold border transition ${
                      student.fees.tuition === 70000
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Counselling (₹70,000)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStudents(prev => prev.map(s => s.id === student.id ? {
                        ...s,
                        seatType: 'Management',
                        fees: { ...s.fees, tuition: 200000 }
                      } : s));
                      logAudit('QUOTA_FEE_UPDATED', `Applied Management Quota tuition (₹2,00,000) for ${student.regNo}`);
                      triggerToast('Applied Management Quota Fee: ₹2,00,000');
                    }}
                    className={`px-3 py-1.5 rounded-xl font-bold border transition ${
                      student.fees.tuition === 200000
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                        : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    Management (₹2,00,000)
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-sm">
              {[
                { label: 'Tuition Fee', value: student.fees.tuition },
                { label: 'Hostel Fee', value: student.fees.hostel },
                { label: 'Bus / Transport', value: student.fees.transport },
                { label: 'Exam & Other', value: student.fees.exam + student.fees.other },
                { label: 'Scholarship (-)', value: student.fees.scholarship },
                { label: 'Balance Due', value: feeDue },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs text-slate-500">{item.label}</div>
                  <div className="text-base font-extrabold mt-0.5">{formatINR(item.value)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={cardClass}>
            <h3 className="text-base font-bold mb-3">Verified Payment Receipts ({formatINR(paid)} Paid)</h3>
            {student.payments.length === 0 ? (
              <p className="text-sm text-slate-500">No payments recorded yet.</p>
            ) : (
              <div className="space-y-2">
                {student.payments.map(pay => (
                  <div key={pay.id} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm">
                    <div>
                      <span className="font-mono font-bold text-blue-600">{pay.receipt}</span>
                      <span className="mx-2 text-slate-400">•</span>
                      <span>{pay.date} via <strong>{pay.method}</strong></span>
                      {pay.note && <span className="ml-2 text-xs text-slate-500">({pay.note})</span>}
                    </div>
                    <span className="font-extrabold text-emerald-600">{formatINR(pay.amount)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 7: PARENT DETAILS */}
      {activeTab === 'parents' && (
        <div className={cardClass}>
          <h3 className="text-base font-bold mb-4">Parent & Emergency Guardian Contact Records</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              { label: "Father's Name", val: student.parent.fatherName },
              { label: "Father's Phone", val: student.parent.fatherPhone },
              { label: "Mother's Name", val: student.parent.motherName },
              { label: "Mother's Phone", val: student.parent.motherPhone },
              { label: "Guardian Name", val: student.parent.guardianName || 'Same as Parents' },
              { label: "Guardian Phone", val: student.parent.guardianPhone || 'N/A' },
              { label: "Emergency Contact", val: student.parent.emergencyContact },
              { label: "Parent Email", val: student.parent.parentEmail },
            ].map((row, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500">{row.label}</div>
                <div className="font-semibold mt-0.5">{row.val}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: REMARKS */}
      {activeTab === 'remarks' && (
        <div className="space-y-4">
          <div className={cardClass}>
            <h3 className="text-base font-bold mb-3">Record Mentoring / Academic / Discipline Remark</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newRemark.text.trim()) return;
                const entry = {
                  id: `RMK-${Date.now()}`,
                  author: currentUser.name,
                  date: new Date().toISOString().split('T')[0],
                  category: newRemark.category,
                  visibility: newRemark.visibility,
                  text: newRemark.text.trim()
                };
                setStudents(prev => prev.map(s => s.id === student.id ? { ...s, remarks: [entry, ...s.remarks] } : s));
                setNewRemark({ category: 'Academic', visibility: 'Public', text: '' });
                logAudit('REMARK_ADDED', `Added ${entry.category} remark on ${student.regNo}`);
                triggerToast('Student remark saved');
              }}
              className="space-y-3"
            >
              <div className="flex flex-wrap gap-3">
                <select
                  value={newRemark.category}
                  onChange={e => setNewRemark({ ...newRemark, category: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm"
                >
                  <option value="Academic">Academic</option>
                  <option value="Mentoring">Mentoring</option>
                  <option value="Achievement">Achievement</option>
                  <option value="Behaviour">Behaviour</option>
                  <option value="Discipline">Discipline</option>
                  <option value="Counselling">Counselling</option>
                </select>
                <select
                  value={newRemark.visibility}
                  onChange={e => setNewRemark({ ...newRemark, visibility: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm"
                >
                  <option value="Public">Public (Visible to Parent)</option>
                  <option value="Private">Private (Faculty & Admin Only)</option>
                </select>
              </div>
              <textarea
                rows={2}
                required
                value={newRemark.text}
                onChange={e => setNewRemark({ ...newRemark, text: e.target.value })}
                placeholder="Enter observation, improvement plan, or achievement note..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm"
              />
              <button type="submit" className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white text-sm font-semibold">
                Save Remark
              </button>
            </form>
          </div>

          <div className={cardClass}>
            <h3 className="text-base font-bold mb-3">Recorded Observations ({student.remarks.length})</h3>
            {student.remarks.length === 0 ? (
              <p className="text-sm text-slate-500">No remarks logged for this student.</p>
            ) : (
              <div className="space-y-3">
                {student.remarks.map(r => (
                  <div key={r.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-sky-300 font-bold">{r.category}</span>
                        <span className={`px-2 py-0.5 rounded font-bold ${r.visibility === 'Private' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'}`}>
                          {r.visibility}
                        </span>
                      </div>
                      <span className="text-slate-500">{r.author} • {r.date}</span>
                    </div>
                    <p className="text-sm mt-1">{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 9: INTERNSHIPS */}
      {activeTab === 'internships' && (
        <div className={cardClass}>
          <h3 className="text-base font-bold mb-3">3rd Year Industrial Internship Records</h3>
          {student.internships.length === 0 ? (
            <p className="text-sm text-slate-500">No internship records logged yet.</p>
          ) : (
            <div className="space-y-3">
              {student.internships.map(intern => (
                <div key={intern.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-base">{intern.role} — {intern.company}</h4>
                      <p className="text-xs text-slate-500">{intern.domain} • {intern.type} • {intern.duration} ({intern.startDate} to {intern.endDate})</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                      {intern.status} • {intern.stipend}
                    </span>
                  </div>
                  <p className="text-sm mt-2">{intern.projectDesc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 10: PLACEMENTS */}
      {activeTab === 'placements' && (
        <div className={cardClass}>
          <h3 className="text-base font-bold mb-3">4th Year Campus Recruitment & Career Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500">Preferred Roles & Locations</div>
              <div className="font-semibold mt-1">{student.placementProfile.preferredRoles.join(', ')} • {student.placementProfile.preferredLocations.join(', ')}</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <div className="text-xs text-slate-500">Aptitude Score & Portfolio</div>
              <div className="font-semibold mt-1">Aptitude: {student.placementProfile.aptitudeScore}/100 • {student.placementProfile.github || 'N/A'}</div>
            </div>
          </div>
        </div>
      )}

      {/* UPDATE STUDENT DETAILS MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-bold">Update Student Profile — {student.regNo}</h2>
                <p className="text-xs text-slate-500">Modify personal, academic, quota fee (₹70k / ₹2L), hostel/bus, and parent details</p>
              </div>
              <button onClick={() => setIsEditOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStudents(prev => prev.map(s => {
                  if (s.id !== student.id) return s;
                  const quotaTuition = editForm.seatType === 'Management'
                    ? 200000
                    : editForm.seatType === 'Counselling'
                    ? 70000
                    : s.fees.tuition;
                  return {
                    ...s,
                    name: editForm.name,
                    regNo: editForm.regNo,
                    rollNo: editForm.rollNo,
                    dob: editForm.dob,
                    gender: editForm.gender,
                    phone: editForm.phone,
                    email: editForm.email,
                    address: editForm.address,
                    branch: editForm.branch,
                    year: Number(editForm.year),
                    semester: Number(editForm.semester),
                    section: editForm.section,
                    seatType: editForm.seatType,
                    category: editForm.category,
                    status: editForm.status,
                    cgpa: Number(editForm.cgpa),
                    backlogs: Number(editForm.backlogs),
                    commuteType: editForm.commuteType,
                    commuteDetails: editForm.commuteDetails,
                    fees: {
                      ...s.fees,
                      tuition: quotaTuition,
                      hostel: editForm.commuteType === 'Hostel' ? (s.fees.hostel || 85000) : 0,
                      transport: editForm.commuteType === 'Bus' ? (s.fees.transport || 28000) : 0,
                    },
                    parent: {
                      fatherName: editForm.fatherName,
                      fatherPhone: editForm.fatherPhone,
                      motherName: editForm.motherName,
                      motherPhone: editForm.motherPhone,
                      guardianName: editForm.guardianName,
                      guardianPhone: editForm.guardianPhone,
                      emergencyContact: editForm.emergencyContact,
                      parentEmail: editForm.parentEmail,
                    }
                  };
                }));
                logAudit('STUDENT_UPDATED', `Updated profile & quota details for ${editForm.name} (${editForm.regNo})`);
                setIsEditOpen(false);
                triggerToast('Student details updated successfully');
              }}
              className="mt-4 space-y-4 text-sm max-h-[75vh] overflow-y-auto pr-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Full Name</label>
                  <input required value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Registration No</label>
                  <input required value={editForm.regNo} onChange={e => setEditForm({ ...editForm, regNo: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Roll Number</label>
                  <input required value={editForm.rollNo} onChange={e => setEditForm({ ...editForm, rollNo: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Branch</label>
                  <select value={editForm.branch} onChange={e => setEditForm({ ...editForm, branch: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                    {branches.map(b => <option key={b.id} value={b.id}>{b.id} — {b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Academic Year & Sem</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={editForm.year} onChange={e => setEditForm({ ...editForm, year: Number(e.target.value) })} className="px-2 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                      {[1, 2, 3, 4].map(y => <option key={y} value={y}>Year {y}</option>)}
                    </select>
                    <select value={editForm.semester} onChange={e => setEditForm({ ...editForm, semester: Number(e.target.value) })} className="px-2 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => <option key={sem} value={sem}>Sem {sem}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Section & CGPA</label>
                  <div className="grid grid-cols-2 gap-2">
                    <select value={editForm.section} onChange={e => setEditForm({ ...editForm, section: e.target.value })} className="px-2 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                      {['A', 'B', 'C'].map(sec => <option key={sec} value={sec}>Sec {sec}</option>)}
                    </select>
                    <input type="number" step="0.01" min="0" max="10" value={editForm.cgpa} onChange={e => setEditForm({ ...editForm, cgpa: e.target.value })} className="px-2 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Admission Quota / Fee</label>
                  <select value={editForm.seatType} onChange={e => setEditForm({ ...editForm, seatType: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                    <option value="Counselling">Counselling (₹70,000)</option>
                    <option value="Management">Management (₹2,00,000)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Stay / Commute</label>
                  <select value={editForm.commuteType} onChange={e => setEditForm({ ...editForm, commuteType: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                    <option value="Hostel">Campus Hostel</option>
                    <option value="Bus">University Bus</option>
                    <option value="Private">Private / Day Scholar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Room / Bus Route / Address</label>
                  <input value={editForm.commuteDetails} onChange={e => setEditForm({ ...editForm, commuteDetails: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Student Phone</label>
                  <input value={editForm.phone} onChange={e => setEditForm({ ...editForm, phone: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Father's Name</label>
                  <input value={editForm.fatherName} onChange={e => setEditForm({ ...editForm, fatherName: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Father's Phone</label>
                  <input value={editForm.fatherPhone} onChange={e => setEditForm({ ...editForm, fatherPhone: e.target.value })} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button type="button" onClick={() => setIsEditOpen(false)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-[#1E3A8A] text-white font-semibold">
                  Save Student Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 7. BRANCH-WISE CURRICULUM & SUBJECT MANAGEMENT
// ============================================================================

function CurriculumManagementView({ currentUser, branches, setBranches, subjects, setSubjects, logAudit, triggerToast }) {
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [selectedSem, setSelectedSem] = useState(3);
  const [newSub, setNewSub] = useState({ code: '', name: '', credits: 4, faculty: 'Prof. A. Ramakrishna' });

  const filteredSubjects = subjects.filter(s => s.branch === selectedBranch && s.semester === selectedSem);

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (!newSub.code.trim() || !newSub.name.trim()) return;
    const item = {
      id: `${selectedBranch}-${newSub.code.trim().toUpperCase()}`,
      code: newSub.code.trim().toUpperCase(),
      name: newSub.name.trim(),
      branch: selectedBranch,
      year: Math.ceil(selectedSem / 2),
      semester: selectedSem,
      credits: Number(newSub.credits),
      faculty: newSub.faculty,
      maxInternal: 30,
      maxExternal: 70
    };
    setSubjects(prev => [...prev, item]);
    setNewSub({ code: '', name: '', credits: 4, faculty: 'Prof. A. Ramakrishna' });
    logAudit('SUBJECT_ADDED', `Added ${item.code} (${item.name}) to ${selectedBranch} Sem ${selectedSem}`);
    triggerToast(`Subject ${item.code} added to ${selectedBranch}`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold">Branch-Wise Curricula & Subject Management</h1>
        <p className="text-sm text-slate-500">Configure independent subjects, credits, and faculty assignments per B.Tech branch and semester</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)} className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-sm font-semibold">
          {branches.map(b => <option key={b.id} value={b.id}>{b.id} — {b.name}</option>)}
        </select>
        <div className="flex flex-wrap gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
            <button
              key={sem}
              onClick={() => setSelectedSem(sem)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                selectedSem === sem ? 'bg-[#1E3A8A] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Sem {sem}
            </button>
          ))}
        </div>
      </div>

      {currentUser.role === 'Admin' && (
        <form onSubmit={handleAddSubject} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-5 gap-3 text-sm">
          <input required placeholder="Code (e.g. CS307)" value={newSub.code} onChange={e => setNewSub({ ...newSub, code: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
          <input required placeholder="Subject Title" value={newSub.name} onChange={e => setNewSub({ ...newSub, name: e.target.value })} className="sm:col-span-2 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
          <input type="number" min="1" max="6" value={newSub.credits} onChange={e => setNewSub({ ...newSub, credits: e.target.value })} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
          <button type="submit" className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white font-bold">
            + Add Subject
          </button>
        </form>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Subject Name</th>
                <th className="py-3 px-4">Credits</th>
                <th className="py-3 px-4">Assigned Faculty</th>
                <th className="py-3 px-4">Marks Scheme</th>
                {currentUser.role === 'Admin' && <th className="py-3 px-4 text-right">Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredSubjects.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-500">
                    No subjects configured yet for {selectedBranch} Semester {selectedSem}. Use the form above to add subjects.
                  </td>
                </tr>
              ) : (
                filteredSubjects.map(sub => (
                  <tr key={sub.id}>
                    <td className="py-3 px-4 font-mono font-bold text-[#1E3A8A] dark:text-sky-400">{sub.code}</td>
                    <td className="py-3 px-4 font-semibold">{sub.name}</td>
                    <td className="py-3 px-4">{sub.credits}</td>
                    <td className="py-3 px-4">{sub.faculty}</td>
                    <td className="py-3 px-4 text-xs text-slate-500">{sub.maxInternal} Int + {sub.maxExternal} Ext</td>
                    {currentUser.role === 'Admin' && (
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSubjects(prev => prev.filter(s => s.id !== sub.id));
                            triggerToast(`Removed ${sub.code}`);
                          }}
                          className="text-red-500 hover:underline text-xs font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 8. PERIOD-WISE ATTENDANCE REGISTER & ADJUSTMENT VIEW
// ============================================================================

function AttendanceManagementView({ currentUser, students, setStudents, branches, subjects, periods, onOpenStudent, logAudit, triggerToast }) {
  const [branch, setBranch] = useState('CSE');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [gridState, setGridState] = useState({});

  const classStudents = students.filter(s => s.branch === branch);

  const cycleStatus = (studentId, periodNum) => {
    const order = ['P', 'A', 'L', 'E'];
    const current = gridState[`${studentId}-${periodNum}`] || 'P';
    const next = order[(order.indexOf(current) + 1) % order.length];
    setGridState(prev => ({ ...prev, [`${studentId}-${periodNum}`]: next }));
  };

  const badgeStyle = (status) => {
    if (status === 'A') return 'bg-red-600 text-white';
    if (status === 'L') return 'bg-amber-500 text-white';
    if (status === 'E') return 'bg-slate-500 text-white';
    return 'bg-emerald-600 text-white';
  };

  const handleSaveDailyRegister = () => {
    setStudents(prev => prev.map(st => {
      if (st.branch !== branch) return st;
      let presentPeriods = 0;
      periods.forEach(p => {
        const val = gridState[`${st.id}-${p.period}`] || 'P';
        if (val === 'P' || val === 'L') presentPeriods += 1;
      });
      return {
        ...st,
        attendanceSummary: st.attendanceSummary.map((row, idx) =>
          idx === 0
            ? { ...row, conducted: row.conducted + periods.length, attended: row.attended + presentPeriods }
            : row
        )
      };
    }));
    logAudit('PERIOD_ATTENDANCE_POSTED', `Saved 6-period register for ${branch} on ${date}`);
    triggerToast(`Period-wise attendance posted for ${branch} (${date})`);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Period-Wise Attendance Register</h1>
          <p className="text-sm text-slate-500">Click period cells to cycle P (Present), A (Absent), L (Late), E (Excused)</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select value={branch} onChange={e => setBranch(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold">
            {branches.map(b => <option key={b.id} value={b.id}>{b.id}</option>)}
          </select>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm" />
          <button onClick={handleSaveDailyRegister} className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white text-sm font-bold shadow">
            Submit Daily Register
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Student</th>
                {periods.map(p => (
                  <th key={p.period} className="py-3 px-2 text-center">
                    <div>P{p.period}</div>
                    <div className="text-[10px] font-normal text-slate-400">{p.time}</div>
                  </th>
                ))}
                <th className="py-3 px-4 text-right">Overall %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan={periods.length + 2} className="py-6 text-center text-slate-500">
                    No students enrolled in {branch} yet.
                  </td>
                </tr>
              ) : (
                classStudents.map(st => {
                  const pct = calculateOverallAttendance(st);
                  return (
                    <tr key={st.id}>
                      <td className="py-3 px-4">
                        <div className="font-bold">{st.name}</div>
                        <div className="text-xs font-mono text-slate-500">{st.regNo}</div>
                      </td>
                      {periods.map(p => {
                        const status = gridState[`${st.id}-${p.period}`] || 'P';
                        return (
                          <td key={p.period} className="py-3 px-2 text-center">
                            <button
                              type="button"
                              onClick={() => cycleStatus(st.id, p.period)}
                              className={`w-9 h-9 rounded-xl font-extrabold text-xs shadow-xs transition ${badgeStyle(status)}`}
                            >
                              {status}
                            </button>
                          </td>
                        );
                      })}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onOpenStudent(st.id)}
                          className={`font-bold underline ${pct >= 75 ? 'text-emerald-600' : 'text-red-500'}`}
                        >
                          {pct}% (Adjust)
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 9. MARKS & EXAMINATION MANAGEMENT VIEW
// ============================================================================

function MarksExaminationView({ currentUser, students, setStudents, branches, subjects, logAudit, triggerToast }) {
  const [branch, setBranch] = useState('CSE');
  const branchStudents = students.filter(s => s.branch === branch);

  const handleMarkChange = (studentId, subjectId, field, value) => {
    const max = field === 'internal' ? 30 : 70;
    const clamped = Math.min(max, Math.max(0, Number(value) || 0));
    setStudents(prev => prev.map(st => {
      if (st.id !== studentId) return st;
      return {
        ...st,
        marks: st.marks.map(m => m.subjectId === subjectId ? { ...m, [field]: clamped } : m)
      };
    }));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold">Marks & Examination Ledger</h1>
          <p className="text-sm text-slate-500">Enter Internal (30) and External (70) scores with automatic grade calculation</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={branch} onChange={e => setBranch(e.target.value)} className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold">
            {branches.map(b => <option key={b.id} value={b.id}>{b.id}</option>)}
          </select>
          {currentUser.role === 'Admin' && (
            <button
              onClick={() => {
                logAudit('RESULTS_PUBLISHED', `Published semester examination results for ${branch}`);
                triggerToast(`Results published for ${branch}`);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-sm font-bold"
            >
              Publish Results
            </button>
          )}
        </div>
      </div>

      {branchStudents.map(st => (
        <div key={st.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base">{st.name} <span className="text-xs font-mono text-slate-500">({st.regNo})</span></h3>
              <p className="text-xs text-slate-500">Semester {st.semester} • Current CGPA: {st.cgpa}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="py-2 px-3">Subject</th>
                  <th className="py-2 px-3">Internal (30)</th>
                  <th className="py-2 px-3">External (70)</th>
                  <th className="py-2 px-3">Total</th>
                  <th className="py-2 px-3">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {st.marks.map(m => {
                  const sub = subjects.find(s => s.id === m.subjectId);
                  const total = m.internal + m.external;
                  const g = calculateGradeAndPoints(total);
                  return (
                    <tr key={m.subjectId}>
                      <td className="py-2.5 px-3 font-semibold">{sub ? `${sub.code} — ${sub.name}` : m.subjectId}</td>
                      <td className="py-2.5 px-3">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={m.internal}
                          onChange={e => handleMarkChange(st.id, m.subjectId, 'internal', e.target.value)}
                          className="w-20 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
                        />
                      </td>
                      <td className="py-2.5 px-3">
                        <input
                          type="number"
                          min="0"
                          max="70"
                          value={m.external}
                          onChange={e => handleMarkChange(st.id, m.subjectId, 'external', e.target.value)}
                          className="w-20 px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent"
                        />
                      </td>
                      <td className="py-2.5 px-3 font-bold">{total} / 100</td>
                      <td className="py-2.5 px-3 font-bold text-[#1E3A8A] dark:text-sky-400">{g.grade} ({g.status})</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// 10. FEE MANAGEMENT (COUNSELLING ₹70K vs MANAGEMENT ₹2LAC + HOSTEL/BUS)
// ============================================================================

function FeeManagementView({ currentUser, students, setStudents, onOpenStudent, logAudit, triggerToast }) {
  const [payModalStudent, setPayModalStudent] = useState(null);
  const [payAmount, setPayAmount] = useState('');
  const [payMethod, setPayMethod] = useState('UPI / NetBanking');

  const handleQuotaSwitch = (student, quotaType) => {
    const tuitionFee = quotaType === 'Management' ? 200000 : 70000;
    setStudents(prev => prev.map(s => s.id === student.id ? {
      ...s,
      seatType: quotaType,
      fees: { ...s.fees, tuition: tuitionFee }
    } : s));
    logAudit('QUOTA_FEE_CHANGED', `Updated ${student.regNo} to ${quotaType} Quota (${formatINR(tuitionFee)})`);
    triggerToast(`${student.name}: Set to ${quotaType} Quota (${formatINR(tuitionFee)})`);
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    const amt = Number(payAmount);
    if (!payModalStudent || amt <= 0) return;
    const receipt = `UT-REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setStudents(prev => prev.map(s => {
      if (s.id !== payModalStudent.id) return s;
      return {
        ...s,
        payments: [
          ...s.payments,
          {
            id: `PAY-${Date.now()}`,
            receipt,
            date: new Date().toISOString().split('T')[0],
            amount: amt,
            method: payMethod,
            note: 'Fee Installment Recorded'
          }
        ]
      };
    }));
    logAudit('FEE_PAYMENT_RECORDED', `Collected ${formatINR(amt)} from ${payModalStudent.regNo} (Receipt ${receipt})`);
    setPayModalStudent(null);
    setPayAmount('');
    triggerToast(`Payment receipt ${receipt} generated`);
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold">University Fee, Quota & Hostel/Bus Ledger</h1>
        <p className="text-sm text-slate-500">
          Configure Counselling Quota (₹70,000) vs Management Quota (₹2,00,000), track Hostel/Bus charges, and issue payment receipts
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Quota Slab (₹70k / ₹2L)</th>
                <th className="py-3 px-4">Tuition</th>
                <th className="py-3 px-4">Hostel / Bus</th>
                <th className="py-3 px-4">Net Payable</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Balance Due</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {students.map(st => {
                const { netPayable, paid, due } = calculateStudentFeeTotals(st);
                return (
                  <tr key={st.id}>
                    <td className="py-3.5 px-4">
                      <button onClick={() => onOpenStudent(st.id)} className="font-bold hover:underline text-left">
                        {st.name}
                      </button>
                      <div className="text-xs font-mono text-slate-500">{st.regNo} • {st.branch}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={st.seatType === 'Management' ? 'Management' : 'Counselling'}
                        onChange={e => handleQuotaSwitch(st, e.target.value)}
                        className="px-2.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-xs font-bold"
                      >
                        <option value="Counselling">Counselling (₹70,000)</option>
                        <option value="Management">Management (₹2,00,000)</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 font-semibold">{formatINR(st.fees.tuition)}</td>
                    <td className="py-3.5 px-4 text-xs">
                      {st.commuteType}: <strong>{formatINR(st.fees.hostel + st.fees.transport)}</strong>
                    </td>
                    <td className="py-3.5 px-4 font-bold">{formatINR(netPayable)}</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold">{formatINR(paid)}</td>
                    <td className="py-3.5 px-4">
                      <span className={`font-extrabold ${due > 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                        {formatINR(due)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {due > 0 ? (
                        <button
                          onClick={() => {
                            setPayModalStudent(st);
                            setPayAmount(String(due));
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                        >
                          Collect Fee
                        </button>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-xs font-bold">
                          Cleared
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Collect Payment Modal */}
      {payModalStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">Record Fee Payment — {payModalStudent.name}</h3>
              <button onClick={() => setPayModalStudent(null)}><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleRecordPayment} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-semibold mb-1">Amount (INR)</label>
                <input type="number" required min="1" value={payAmount} onChange={e => setPayAmount(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Payment Mode</label>
                <select value={payMethod} onChange={e => setPayMethod(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent">
                  <option value="UPI / NetBanking">UPI / NetBanking</option>
                  <option value="NEFT / RTGS">NEFT / RTGS</option>
                  <option value="Bank Challan">Bank Challan</option>
                  <option value="Demand Draft">Demand Draft</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setPayModalStudent(null)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold">Generate Receipt</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 11. 3RD YEAR INTERNSHIP MANAGEMENT VIEW
// ============================================================================

function InternshipManagementView({ students, onOpenStudent }) {
  const thirdYearStudents = students.filter(s => s.year === 3 || s.internships.length > 0);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold">3rd Year Industrial Internship Tracker</h1>
        <p className="text-sm text-slate-500">Monitor summer/semester internships, stipends, faculty mentors, and completion certificates</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {thirdYearStudents.map(st => (
          <div key={st.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base">{st.name}</h3>
                <p className="text-xs text-slate-500">{st.regNo} • {st.branch} Year {st.year}</p>
              </div>
              <button onClick={() => onOpenStudent(st.id)} className="text-xs font-bold text-[#1E3A8A] dark:text-sky-400 hover:underline">
                View Profile →
              </button>
            </div>
            {st.internships.length === 0 ? (
              <p className="text-xs text-amber-600 font-semibold">Status: Applying / Awaiting Offer</p>
            ) : (
              st.internships.map(i => (
                <div key={i.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                  <div className="font-bold">{i.role} at {i.company}</div>
                  <div className="text-slate-500 mt-0.5">{i.type} • {i.duration} • Stipend: {i.stipend} • Status: <strong>{i.status}</strong></div>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 12. 4TH YEAR PLACEMENT MANAGEMENT VIEW
// ============================================================================

function PlacementManagementView({ students, drives }) {
  const fourthYear = students.filter(s => s.year === 4);
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold">4th Year Campus Recruitment & Placement Drives</h1>
        <p className="text-sm text-slate-500">Final year eligible pool: {fourthYear.length} student(s) • Active Drives: {drives.length}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {drives.map(d => (
          <div key={d.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                {d.packageLPA} LPA
              </span>
              <span className="text-xs text-slate-500">Drive: {d.driveDate}</span>
            </div>
            <h3 className="font-extrabold text-base">{d.company}</h3>
            <div className="text-xs font-semibold text-[#1E3A8A] dark:text-sky-400">{d.role}</div>
            <div className="text-xs text-slate-500">
              Min CGPA: {d.minCgpa} • Branches: {d.eligibleBranches.join(', ')}
            </div>
            <div className="text-xs text-slate-500">Location: {d.location}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 13. REPORTS & CSV/PDF EXPORTS VIEW
// ============================================================================

function ReportsExportView({ students, triggerToast }) {
  const handleDownloadMaster = () => {
    const rows = students.map(s => {
      const fee = calculateStudentFeeTotals(s);
      return {
        RegNo: s.regNo,
        Name: s.name,
        Branch: s.branch,
        Year: s.year,
        Semester: s.semester,
        Quota: s.seatType,
        TuitionFee: s.fees.tuition,
        CommuteType: s.commuteType,
        AttendancePct: calculateOverallAttendance(s) + '%',
        CGPA: s.cgpa,
        FeePaid: fee.paid,
        FeeBalance: fee.due
      };
    });
    exportToCSV('UniTrack_Master_Student_Report.csv', rows);
    triggerToast('Master Student CSV Report downloaded');
  };

  const handleDownloadDefaulters = () => {
    const defaulters = students
      .filter(s => calculateOverallAttendance(s) < 75)
      .map(s => ({
        RegNo: s.regNo,
        Name: s.name,
        Branch: s.branch,
        Year: s.year,
        AttendancePct: calculateOverallAttendance(s) + '%',
        ParentPhone: s.parent.fatherPhone
      }));
    exportToCSV('UniTrack_Attendance_Shortage_Report.csv', defaulters.length ? defaulters : [{ Note: 'No defaulters below 75%' }]);
    triggerToast('Attendance Shortage CSV downloaded');
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold">University Reports & Data Exports</h1>
        <p className="text-sm text-slate-500">Download Excel-compatible CSV spreadsheets or print official PDF registers</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={handleDownloadMaster}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#1E3A8A] text-left space-y-2"
        >
          <Download className="w-6 h-6 text-[#1E3A8A] dark:text-sky-400" />
          <div className="font-bold">Master Student & Quota Fee CSV</div>
          <p className="text-xs text-slate-500">Exports student details, Counselling/Management tuition, Hostel/Bus status, CGPA, and fee balances.</p>
        </button>

        <button
          onClick={handleDownloadDefaulters}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500 text-left space-y-2"
        >
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <div className="font-bold">Attendance Shortage (&lt;75%) CSV</div>
          <p className="text-xs text-slate-500">Exports students below 75% attendance along with parent emergency contact numbers.</p>
        </button>

        <button
          onClick={() => window.print()}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-left space-y-2"
        >
          <Printer className="w-6 h-6 text-emerald-600" />
          <div className="font-bold">Print / Save PDF Ledger</div>
          <p className="text-xs text-slate-500">Opens clean browser print view to save any register as an institutional PDF.</p>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 14. USERS, CREDENTIAL MANAGEMENT & AUDIT LOGS VIEW
// ============================================================================

function SecurityUsersAuditView({ currentUser, users, setUsers, auditLogs, logAudit, triggerToast }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPassword, setEditPassword] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold">Institutional Users & Immutable Audit Logs</h1>
        <p className="text-sm text-slate-500">Manage Admin & Faculty accounts, update usernames/passwords, and monitor security trails</p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">User & Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Credentials & Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {users.map(u => (
                <tr key={u.id}>
                  <td className="py-3 px-4">
                    <div className="font-bold">{u.name}</div>
                    <div className="text-xs text-slate-500">{u.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${u.role === 'Admin' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4">{u.department}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-bold ${u.active ? 'text-emerald-600' : 'text-red-500'}`}>
                      {u.active ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setEditingUser(u);
                        setEditName(u.name);
                        setEditPassword('');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#1E3A8A] text-white text-xs font-semibold"
                    >
                      Edit Name / Password
                    </button>
                    {u.id !== currentUser.id && (
                      <button
                        onClick={() => {
                          setUsers(prev => prev.map(item => item.id === u.id ? { ...item, active: !item.active } : item));
                          logAudit('ACCOUNT_STATUS_TOGGLED', `Toggled active status for ${u.email}`);
                          triggerToast(`Updated status for ${u.name}`);
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold"
                      >
                        {u.active ? 'Deactivate' : 'Activate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
        <h3 className="text-base font-bold mb-3">Recent Security & ERP Audit Trail</h3>
        <div className="space-y-2 max-h-72 overflow-y-auto text-xs">
          {auditLogs.map(log => (
            <div key={log.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="font-mono font-bold text-[#1E3A8A] dark:text-sky-400">[{log.action}]</span>{' '}
                <span>{log.detail}</span>
              </div>
              <span className="text-slate-500">{log.actor} • {log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit User Name/Password Modal */}
      {editingUser && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold">Update Credentials — {editingUser.email}</h3>
              <button onClick={() => setEditingUser(null)}><X className="w-5 h-5" /></button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!editName.trim()) return;
                setUsers(prev => prev.map(u => u.id === editingUser.id ? {
                  ...u,
                  name: editName.trim(),
                  password: editPassword.trim() ? editPassword.trim() : u.password
                } : u));
                logAudit('ADMIN_CREDENTIAL_RESET', `Updated display name/password for ${editingUser.email}`);
                setEditingUser(null);
                triggerToast('User credentials updated');
              }}
              className="space-y-3 text-sm"
            >
              <div>
                <label className="block text-xs font-semibold mb-1">Display Name / Username</label>
                <input required value={editName} onChange={e => setEditName(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">New Password (leave blank to keep current)</label>
                <input type="password" placeholder="Enter new password" value={editPassword} onChange={e => setEditPassword(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-semibold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#1E3A8A] text-white font-bold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 15. SUPABASE POSTGRESQL & VERCEL DEPLOYMENT BLUEPRINT VIEW
// ============================================================================

function DatabaseDeploymentBlueprintView() {
  const schemaSQL = `-- UniTrack Production PostgreSQL Schema (Supabase + RLS Ready)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('Admin', 'Faculty')) NOT NULL,
  department TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reg_no TEXT UNIQUE NOT NULL,
  roll_no TEXT NOT NULL,
  full_name TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  academic_year INT CHECK (academic_year BETWEEN 1 AND 4),
  semester INT CHECK (semester BETWEEN 1 AND 8),
  section TEXT NOT NULL,
  seat_type TEXT CHECK (seat_type IN ('Counselling', 'Management')) NOT NULL,
  tuition_fee NUMERIC(10,2) NOT NULL DEFAULT 70000,
  commute_type TEXT CHECK (commute_type IN ('Hostel', 'Bus', 'Private')) NOT NULL,
  commute_details TEXT,
  cgpa NUMERIC(4,2) DEFAULT 0.00,
  backlogs INT DEFAULT 0
);`;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold">Supabase PostgreSQL Schema & Vercel Deployment Guide</h1>
        <p className="text-sm text-slate-500">Production database DDL with Counselling (₹70k) / Management (₹2L) quota constraints and Row-Level Security</p>
      </div>

      <div className="bg-slate-900 text-sky-200 rounded-2xl p-5 overflow-x-auto text-xs font-mono border border-slate-800">
        <pre>{schemaSQL}</pre>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 text-sm space-y-2">
        <h3 className="font-bold">Vercel Deployment Environment Variables</h3>
        <p className="text-xs text-slate-500">Configure these keys in Vercel → Project Settings → Environment Variables:</p>
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 font-mono text-xs space-y-1">
          <div>VITE_SUPABASE_URL=https://your-project-id.supabase.co</div>
          <div>VITE_SUPABASE_ANON_KEY=your-public-anon-key</div>
        </div>
      </div>
    </div>
  );
}