import { StudentProfile, CompanyProfile, Internship, Application } from '../types';

export const INITIAL_STUDENT: StudentProfile = {
  id: 'std_01',
  role: 'student',
  name: 'Alex Chen',
  email: 'alex.chen@stanford.edu',
  college: 'Stanford University',
  degree: 'Bachelor of Science',
  department: 'Computer Science',
  gradYear: '2026',
  skills: ['Python', 'TypeScript', 'React', 'Machine Learning', 'Next.js', 'PyTorch', 'Tailwind CSS', 'SQL'],
  bio: 'Passionate CS junior focused on modern web platforms and distributed machine learning systems. Building scalable applications and seeking Summer 2026 internships.',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  resumeName: 'Alex_Chen_Software_Resume_2026.pdf',
  resumeUrl: '#',
  github: 'https://github.com/alexchen-dev',
  linkedin: 'https://linkedin.com/in/alexchen-cs',
  portfolio: 'https://alexchen.dev',
  preferredRoles: ['Machine Learning Engineer Intern', 'Full-Stack Developer Intern', 'Software Engineer Intern'],
  certifications: [
    { name: 'Deep Learning Specialization', issuer: 'DeepLearning.AI', year: '2025' },
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024' }
  ],
  projects: [
    {
      title: 'NeuralVision Classifier',
      description: 'Real-time multi-modal image classification engine deployed using ONNX runtime and React frontend with sub-15ms inference latency.',
      link: 'https://github.com/alexchen-dev/neural-vision',
      tech: ['PyTorch', 'TypeScript', 'WebGL', 'Docker']
    },
    {
      title: 'Distributed Log Synchronizer',
      description: 'Lightweight Raft-based consensus protocol written in Go to synchronize high-throughput streaming audit events across cluster nodes.',
      link: 'https://github.com/alexchen-dev/raft-sync',
      tech: ['Go', 'gRPC', 'Distributed Systems']
    }
  ]
};

export const INITIAL_COMPANY: CompanyProfile = {
  id: 'comp_01',
  role: 'company',
  companyName: 'QuantumPay Technologies',
  email: 'careers@quantumpay.io',
  industry: 'FinTech & AI Systems',
  website: 'https://quantumpay.io',
  description: 'QuantumPay develops next-generation algorithmic payment routing and automated financial risk mitigation software used by tier-1 global banks.',
  contactPerson: 'Sarah Jenkins (Head of University Talent)',
  logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
  location: 'San Francisco, CA (Hybrid)',
  verified: true,
  size: '250 - 500 Employees'
};

export const INITIAL_INTERNSHIPS: Internship[] = [
  {
    id: 'int_01',
    companyId: 'comp_01',
    companyName: 'QuantumPay Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    title: 'Machine Learning & AI Research Intern',
    department: 'Artificial Intelligence',
    location: 'San Francisco, CA / Remote',
    workType: 'Hybrid',
    isPaid: true,
    stipend: '$52 / hr',
    duration: '12 Weeks (Summer 2026)',
    experienceLevel: 'Intermediate',
    skills: ['Python', 'Machine Learning', 'PyTorch', 'Data Analytics'],
    description: 'Collaborate with our quantitative intelligence squad to research and deploy predictive fraud-detection architectures handling millions of daily transactions.',
    responsibilities: [
      'Implement transformer architectures for anomaly pattern detection in transactional graphs',
      'Optimize tensor models for low-latency inference pipelines',
      'Benchmark feature engineering pipelines on distributed data warehouses',
      'Publish internal research whitepapers and collaborate directly with senior quants'
    ],
    requirements: [
      'Pursuing degree in Computer Science, Data Science, or related quantitative field',
      'Solid foundations in linear algebra, probability, and PyTorch / TensorFlow',
      'Proficiency writing idiomatic Python and vectorized operations with NumPy/Pandas',
      'Demonstrated enthusiasm via academic research or GitHub repositories'
    ],
    perks: [
      'Competitive hourly compensation ($52/hr)',
      'Mentorship from former Stanford AI Lab researchers',
      'Full equipment stipend ($1,500 Home Office budget)',
      'Direct pipeline to Full-Time New Grad offers'
    ],
    deadline: 'May 30, 2026',
    postedDate: 'Oct 02, 2026',
    applicantsCount: 42,
    status: 'active',
    featured: true
  },
  {
    id: 'int_02',
    companyId: 'comp_02',
    companyName: 'NovaCloud Infrastructure',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    title: 'Full-Stack Web Development Intern',
    department: 'Platform Engineering',
    location: 'New York, NY',
    workType: 'Remote',
    isPaid: true,
    stipend: '$45 / hr',
    duration: '10 Weeks',
    experienceLevel: 'Beginner / Fresher',
    skills: ['Web Development', 'TypeScript', 'React', 'Cloud Computing'],
    description: 'Build responsive developer console interfaces and resilient API gateways powering high-scale distributed Kubernetes clusters.',
    responsibilities: [
      'Construct high-performance dashboard interfaces using Next.js and Tailwind CSS',
      'Build resilient GraphQL and REST API endpoints connected to PostgreSQL',
      'Participate in code reviews, CI/CD automated deployments, and end-to-end testing'
    ],
    requirements: [
      'Strong proficiency in TypeScript, React, and modern CSS frameworks',
      'Familiarity with Git and modern developer workflows',
      'Great communication and collaborative mindset'
    ],
    perks: [
      '$45/hr + $1,000 learning stipend',
      'Flexible remote schedule across North American timezones',
      'Bi-weekly technical masterclasses with Principal Architects'
    ],
    deadline: 'June 15, 2026',
    postedDate: 'Oct 04, 2026',
    applicantsCount: 29,
    status: 'active',
    featured: true
  },
  {
    id: 'int_03',
    companyId: 'comp_03',
    companyName: 'Aura Studio Digital',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    title: 'UI/UX Design & Product Strategy Intern',
    department: 'Design System Team',
    location: 'Austin, TX',
    workType: 'Hybrid',
    isPaid: true,
    stipend: '$40 / hr',
    duration: '12 Weeks',
    experienceLevel: 'Beginner / Fresher',
    skills: ['UI/UX Design', 'Figma', 'Design Systems', 'User Research'],
    description: 'Craft intuitive glassmorphic micro-interactions, cohesive component token sets, and conducts student usability experiments.',
    responsibilities: [
      'Design modular component libraries in Figma following tokenized specs',
      'Conduct 1-on-1 moderated user feedback sessions with early beta users',
      'Prototype micro-interactions and smooth transition states'
    ],
    requirements: [
      'Portfolio showcasing clean typography, spatial composition, and interactive prototypes',
      'Proficiency in Figma and component auto-layout',
      'Keen eye for aesthetic restraint and visual hierarchy'
    ],
    perks: [
      'Mentorship by seasoned Design Directors',
      'Latest 16" MacBook Pro provided',
      'Weekly design critique and guest speaker sessions'
    ],
    deadline: 'June 01, 2026',
    postedDate: 'Oct 06, 2026',
    applicantsCount: 37,
    status: 'active',
    featured: true
  },
  {
    id: 'int_04',
    companyId: 'comp_04',
    companyName: 'CipherLock Systems',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    title: 'Cybersecurity & Threat Analysis Intern',
    department: 'SecOps',
    location: 'Seattle, WA',
    workType: 'On-site',
    isPaid: true,
    stipend: '$48 / hr',
    duration: '12 Weeks',
    experienceLevel: 'Intermediate',
    skills: ['Cybersecurity', 'Python', 'Cloud Computing', 'Data Analytics'],
    description: 'Perform automated vulnerability auditing, zero-trust cloud configuration scanning, and threat intelligence synthesis.',
    responsibilities: [
      'Analyze network traffic logs using automated heuristic detectors',
      'Conduct simulated penetration audits against test environments',
      'Author automated remediation scripts in Python and Bash'
    ],
    requirements: [
      'Understanding of TCP/IP, TLS cryptographic handshakes, and OWASP Top 10',
      'Scripting capability in Python or Go',
      'Curiosity for offensive and defensive security primitives'
    ],
    perks: [
      'Full security clearance sponsorship assistance',
      'Complimentary certification vouchers (Security+ / OSCP)',
      'Housing stipend for out-of-state candidates'
    ],
    deadline: 'May 20, 2026',
    postedDate: 'Oct 01, 2026',
    applicantsCount: 19,
    status: 'active',
    featured: false
  },
  {
    id: 'int_05',
    companyId: 'comp_01',
    companyName: 'QuantumPay Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    title: 'Java Backend & Enterprise Systems Intern',
    department: 'Core Banking Engine',
    location: 'San Francisco, CA',
    workType: 'On-site',
    isPaid: true,
    stipend: '$50 / hr',
    duration: '12 Weeks',
    experienceLevel: 'Intermediate',
    skills: ['Java Development', 'Cloud Computing', 'SQL', 'Web Development'],
    description: 'Architect ultra-reliable settlement engines in Spring Boot capable of processing 25,000 operations per second.',
    responsibilities: [
      'Build scalable microservices utilizing Spring Boot and Kafka',
      'Optimize relational database indexing and partition strategies',
      'Write exhaustive unit and integration test suites'
    ],
    requirements: [
      'Fluency in Java (Java 17/21) and object-oriented architectural patterns',
      'Knowledge of multi-threading and asynchronous messaging architectures',
      'Strong grasp of relational databases and transaction isolation'
    ],
    perks: [
      'Competitive compensation and full meal service on campus',
      'Direct sponsorship for return offers',
      'Comprehensive mentorship'
    ],
    deadline: 'June 10, 2026',
    postedDate: 'Oct 05, 2026',
    applicantsCount: 22,
    status: 'active',
    featured: false
  },
  {
    id: 'int_06',
    companyId: 'comp_05',
    companyName: 'PulseData Labs',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    title: 'Data Analytics & Business Intelligence Intern',
    department: 'Strategic Insights',
    location: 'Boston, MA',
    workType: 'Remote',
    isPaid: true,
    stipend: '$38 / hr',
    duration: '10 Weeks',
    experienceLevel: 'Beginner / Fresher',
    skills: ['Data Analytics', 'Python', 'Finance', 'SQL'],
    description: 'Transform complex consumer datasets into actionable predictive dashboards, cohorts, and executive business summaries.',
    responsibilities: [
      'Construct automated SQL transformations and daily reporting views',
      'Design interactive cohort analysis dashboards in modern visualization tools',
      'Present weekly data discovery briefings to product leadership'
    ],
    requirements: [
      'Strong SQL querying skills (window functions, CTEs)',
      'Experience with Pandas, Tableau, or PowerBI',
      'Excellent verbal storytelling and presentation clarity'
    ],
    perks: [
      'Flexible working arrangements',
      'All necessary software and hardware provided',
      'Access to senior executive mentorship'
    ],
    deadline: 'June 20, 2026',
    postedDate: 'Oct 07, 2026',
    applicantsCount: 31,
    status: 'active',
    featured: false
  },
  {
    id: 'int_07',
    companyId: 'comp_06',
    companyName: 'SkyScale Cloud',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    title: 'Cloud DevOps & Site Reliability Intern',
    department: 'Infrastructure',
    location: 'Seattle, WA / Remote',
    workType: 'Remote',
    isPaid: true,
    stipend: '$46 / hr',
    duration: '12 Weeks',
    experienceLevel: 'Intermediate',
    skills: ['Cloud Computing', 'Python', 'Web Development', 'Cybersecurity'],
    description: 'Work alongside SRE specialists to automate terraform deployments, monitor telemetry pipelines, and maintain 99.99% system availability.',
    responsibilities: [
      'Write Infrastructure-as-Code definitions using Terraform',
      'Configure Prometheus and Grafana alerts for distributed microservices',
      'Participate in chaos engineering drills and latency tuning'
    ],
    requirements: [
      'Experience with Linux command-line environments and Docker containers',
      'Basic knowledge of AWS or GCP core networking services',
      'Familiarity with scripting in Python or Bash'
    ],
    perks: [
      'Generous tech stipend',
      'Cloud certification fee reimbursement',
      'High conversion rate to full-time SRE roles'
    ],
    deadline: 'June 05, 2026',
    postedDate: 'Oct 03, 2026',
    applicantsCount: 26,
    status: 'active',
    featured: false
  },
  {
    id: 'int_08',
    companyId: 'comp_07',
    companyName: 'MintGrowth Digital',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    title: 'Growth Marketing & Brand Strategy Intern',
    department: 'Brand Marketing',
    location: 'Chicago, IL',
    workType: 'Hybrid',
    isPaid: true,
    stipend: '$35 / hr',
    duration: '8 Weeks',
    experienceLevel: 'Beginner / Fresher',
    skills: ['Marketing', 'Data Analytics', 'UI/UX Design'],
    description: 'Develop data-driven campus marketing campaigns, university student ambassador initiatives, and interactive viral activations.',
    responsibilities: [
      'Plan and execute organic social and university ambassador marketing pushes',
      'Analyze acquisition funnels and track conversion metrics',
      'Write engaging copywriting for campus student newsletters'
    ],
    requirements: [
      'Enthusiastic communicator with deep understanding of student digital channels',
      'Strong written storytelling and analytical aptitude',
      'Experience running digital campaigns or student clubs'
    ],
    perks: [
      'Hands-on budget management experience',
      'Performance bonuses based on viral growth',
      'Fun collaborative team culture'
    ],
    deadline: 'June 30, 2026',
    postedDate: 'Oct 08, 2026',
    applicantsCount: 18,
    status: 'active',
    featured: false
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app_01',
    internshipId: 'int_01',
    internshipTitle: 'Machine Learning & AI Research Intern',
    companyName: 'QuantumPay Technologies',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    studentId: 'std_01',
    studentName: 'Alex Chen',
    studentEmail: 'alex.chen@stanford.edu',
    studentCollege: 'Stanford University',
    studentDegree: 'B.S. Computer Science (2026)',
    studentSkills: ['Python', 'Machine Learning', 'PyTorch', 'TypeScript'],
    resumeName: 'Alex_Chen_Software_Resume_2026.pdf',
    coverNote: 'I have hands-on experience building multi-modal transformer models and sub-15ms inference engines. I would love to contribute to QuantumPay fraud-detection architectures.',
    appliedDate: 'Oct 05, 2026',
    status: 'Interview Scheduled',
    timeline: [
      { status: 'Applied', date: 'Oct 05, 2026', note: 'Application and resume submitted successfully.' },
      { status: 'Under Review', date: 'Oct 07, 2026', note: 'Profile evaluated by University Talent team.' },
      { status: 'Shortlisted', date: 'Oct 09, 2026', note: 'Shortlisted for technical interview round.' },
      { status: 'Interview Scheduled', date: 'Oct 11, 2026', note: 'Technical Round 1 scheduled with Senior ML Research Scientist.' }
    ],
    interviewDetails: {
      date: 'Oct 16, 2026',
      time: '02:00 PM PST',
      meetingLink: 'https://meet.google.com/qnt-leaf-int',
      interviewer: 'Dr. Marcus Vance (Staff AI Scientist)',
      roundName: 'Technical Deep-Dive: Transformers & Graph Neural Networks',
      notes: 'Prepare a 10-minute overview of your NeuralVision Classifier architecture.'
    }
  },
  {
    id: 'app_02',
    internshipId: 'int_02',
    internshipTitle: 'Full-Stack Web Development Intern',
    companyName: 'NovaCloud Infrastructure',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    studentId: 'std_01',
    studentName: 'Alex Chen',
    studentEmail: 'alex.chen@stanford.edu',
    studentCollege: 'Stanford University',
    studentDegree: 'B.S. Computer Science (2026)',
    studentSkills: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
    resumeName: 'Alex_Chen_Software_Resume_2026.pdf',
    coverNote: 'Excited about modern cloud dashboards and developer infrastructure tooling.',
    appliedDate: 'Oct 06, 2026',
    status: 'Under Review',
    timeline: [
      { status: 'Applied', date: 'Oct 06, 2026', note: 'Application submitted.' },
      { status: 'Under Review', date: 'Oct 08, 2026', note: 'Screening by Engineering Manager.' }
    ]
  },
  {
    id: 'app_03',
    internshipId: 'int_03',
    internshipTitle: 'UI/UX Design & Product Strategy Intern',
    companyName: 'Aura Studio Digital',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
    studentId: 'std_01',
    studentName: 'Alex Chen',
    studentEmail: 'alex.chen@stanford.edu',
    studentCollege: 'Stanford University',
    studentDegree: 'B.S. Computer Science (2026)',
    studentSkills: ['UI/UX Design', 'Figma', 'React'],
    resumeName: 'Alex_Chen_Software_Resume_2026.pdf',
    coverNote: 'Bringing engineering depth to product design systems.',
    appliedDate: 'Oct 09, 2026',
    status: 'Applied',
    timeline: [
      { status: 'Applied', date: 'Oct 09, 2026', note: 'Application received.' }
    ]
  }
];
