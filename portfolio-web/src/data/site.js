/** Update social URLs here if they differ from your email handle. */
export const site = {
  name: 'Raj Sudhir Kank',
  nameDisplay: 'RAJ SUDHIR KANK',
  location: 'Mumbai, India',
  title: 'AI Engineer',
  focus: 'Agentic AI, Generative AI, Machine Learning',
  email: 'kankraj24@gmail.com',
  phone: '+91 8446730959',
  /** Profile image in /public */
  profileImage: '/profile.jpeg',
  /** Resume PDF in /public — keep filename in sync with the actual file */
  resume: {
    pdfPath: '/RAJ SUDHIR KANK.pdf',
    downloadFileName: 'Raj-Sudhir-Kank-Resume.pdf',
  },
  social: {
    /** Order: LinkedIn → GitHub → Kaggle */
    linkedin: 'https://www.linkedin.com/in/rajkank/',
    github: 'https://github.com/rajkank',
    kaggle: 'https://www.kaggle.com/rajkank',
  },
  tagline:
    'Autonomous, decision-driven AI systems that turn complex business needs into scalable products.',
  /** About section — full bio only */
  aboutBio:
    'AI Engineer specializing in Agentic AI, Generative AI, and Machine Learning, with 10 months of hands-on experience, focused on building autonomous, decision-driven systems that solve real-world problems. Experienced in designing end-to-end AI solutions across HRTech, FinTech, and AgriTech, including AI-powered HRMS, intelligent document verification, startup–investor matchmaking platforms, and resume analysis systems. Strong expertise in Python, LLMs, NLP, Computer Vision, and intelligent automation, with a proven ability to translate complex business requirements into scalable AI products.',
}

export const experience = [
  {
    id: 'rigved',
    role: 'AI Engineer',
    company: 'Rigved Technologies',
    period: 'Jun 2025 – Present',
    highlights: [
      'Designed and developed an AI-enabled HRMS covering Attendance, Leave Management, and Employee Onboarding workflows.',
      'Automated document verification for Aadhaar, PAN, and certificates using OCR, NLP, and Computer Vision.',
      'Implemented anomaly detection models to identify irregular attendance and policy violations.',
      'Built a smart leave recommendation system using historical employee data and ML algorithms.',
      'Enhanced system accuracy and operational efficiency through Python-based ML pipelines and OpenCV integration.',
      'Built a RAG-based enterprise chatbot integrated with internal databases for automated query resolution.',
      'Developed embedding and semantic search pipeline to improve chatbot response accuracy.',
    ],
  },
  {
    id: 'prodigy',
    role: 'Software Developer Intern',
    company: 'Prodigy InfoTech',
    period: 'Jan 2025 – Feb 2025',
    highlights: [
      'Developed responsive and interactive UI components using HTML, CSS, JavaScript, and ReactJS.',
      'Built functional web applications including a Stopwatch and Tic-Tac-Toe game with smooth animations.',
      'Designed and deployed a personal portfolio website to showcase projects, skills, and technical expertise.',
    ],
  },
  {
    id: 'accenture',
    role: 'Data Analyst Intern',
    company: 'Accenture',
    period: 'Nov 2024 – Jan 2025',
    highlights: [
      'Cleaned, modeled, and analyzed datasets using Excel, SQL, Pandas, and NumPy to extract business insights.',
      'Delivered actionable recommendations for a social media analytics use case based on content trends.',
      'Designed dashboards and reports using Tableau and data visualization techniques.',
      'Presented insights through structured presentations and video reports for stakeholder communication.',
    ],
  },
]

export const projects = [
  {
    id: 'investor-iq',
    shortName: 'Investor IQ',
    title: 'Investor IQ – AI-Powered Startup & Investment Matchmaking Platform',
    period: 'Jun 2024 – May 2025',
    bullets: [
      'Developed an AI-driven platform that connects startups and investors for seamless collaboration.',
      'Implemented Generative AI–based proposal generation from startup problem statements.',
      'Designed intelligent success-ratio prediction logic using data analysis to support investor decision-making.',
      'Built advanced search, filtering, and recommendation workflows based on investment amount and startup category.',
    ],
    liveUrl: 'https://github.com/rajkank',
  },
  {
    id: 'resume-analyzer',
    shortName: 'AI-Powered Resume Analyzer',
    title: 'AI-Powered Resume Analyzer',
    period: 'Dec 2023 – Mar 2024',
    bullets: [
      'Developed a Streamlit-based web application to analyze PDF resumes and extract skills and qualifications.',
      'Integrated Generative AI (LLMs) to generate automated resume feedback and improvement suggestions.',
      'Implemented document text extraction using pdf2image to improve analysis accuracy.',
      'Designed a clean, user-friendly interface for resume upload and result visualization.',
    ],
    liveUrl: 'https://github.com/rajkank',
  },
  {
    id: 'crop',
    shortName: 'Crop Recommendation System',
    title: 'Crop Recommendation System',
    period: 'Jun 2023 – Nov 2023',
    bullets: [
      'Built a machine learning–based Crop Recommendation System using soil nutrients (NPK) and climate data.',
      'Trained a Random Forest model for accurate crop prediction.',
      'Performed data preprocessing and feature engineering using Pandas and NumPy.',
      'Developed a Flask API for real-time crop recommendations.',
    ],
    liveUrl: 'https://field-advisor.onrender.com/',
  },
]

export const skillCategories = [
  {
    id: 'prog',
    title: 'Programming & Libraries',
    items: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'],
  },
  {
    id: 'dl',
    title: 'Deep Learning Frameworks',
    items: ['TensorFlow', 'PyTorch'],
  },
  {
    id: 'genai',
    title: 'Generative AI',
    items: [
      'LLM Integration (OpenAI, Claude, Gemini)',
      'LangChain',
      'Custom GPTs',
      'RAG Pipelines',
    ],
  },
  {
    id: 'nlp',
    title: 'NLP',
    items: [
      'Document Parsing',
      'Text Extraction',
      'Skill & Resume Analysis',
      'OCR + NLP Pipelines',
      'Automated Document Verification',
    ],
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    items: [
      'OpenCV',
      'Image Processing',
      'OCR (Aadhaar, PAN, Certificates)',
      'Computer Vision–based Document Validation',
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    items: ['Git', 'GitHub', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'CICD', 'Jupyter', 'VS Code'],
  },
  {
    id: 'web',
    title: 'Web Technologies',
    items: ['JavaScript', 'HTML', 'CSS', 'ReactJS'],
  },
  {
    id: 'db',
    title: 'Databases',
    items: ['Postgresql', 'SQLite'],
  },
]

export const education = [
  {
    id: 'be',
    degree: 'B.E. Information Technology',
    school: 'SIES Graduate School of Technology, Mumbai',
    period: 'Jun 2022 – May 2025',
    result: 'CGPA 8.16 / 10',
  },
  {
    id: 'dip',
    degree: 'Diploma in Computer Engineering',
    school: 'DBATU Lonere',
    period: 'Jun 2020 – May 2022',
    result: 'GPA 8.75 / 10',
  },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
