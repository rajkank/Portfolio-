/** Update social URLs here if they differ from your email handle. */
export const site = {
  name: 'Raj Sudhir Kank',
  nameDisplay: 'RAJ SUDHIR KANK',
  location: 'Mumbai, India',
  title: 'AI Engineer',
  focus: 'Generative AI, LLMs, Machine Learning',
  email: 'kankraj24@gmail.com',
  phone: '+91 8446730959',
  /** Profile image in /public */
  profileImage: '/profile.jpeg',
  /** Resume PDF in /public — keep filename in sync with the actual file */
  resume: {
    pdfPath: '/RAJ SUDHIR KANK.pdf',
    downloadFileName: 'Raj-Sudhir-Kank-Resume.pdf',
    /** Shown on the Download option before the user taps */
    downloadDescription:
      'Download a PDF copy for applications, recruiters, or your records.',
    /** Shown right after Download is triggered (browsers handle saving differently) */
    downloadAfterMessage:
      'Your download should begin in a moment. If nothing happens, check that downloads are allowed for this site, then look in your Downloads folder — the file is saved as',
  },
  social: {
    /** Order: LinkedIn → GitHub → Kaggle */
    linkedin: 'https://www.linkedin.com/in/rajkank/',
    github: 'https://github.com/rajkank',
    kaggle: 'https://www.kaggle.com/rajkank',
  },
  tagline:
    'Production-ready RAG pipelines, semantic search, and LLM-powered systems that improve how businesses operate.',
  /** About section — full bio only */
  aboutBio:
    'AI Engineer specializing in Generative AI and LLM-powered systems, with hands-on experience building production-ready RAG pipelines, semantic search, and enterprise chatbots. Proficient in LangChain, prompt engineering, and LLM integration (OpenAI, Claude, Gemini), backed by strong Machine Learning, NLP, and Computer Vision expertise for document intelligence and automation. Experienced in designing scalable AI architectures and REST APIs that improve business processes and operational efficiency.',
}

export const experience = [
  {
    id: 'rigved',
    role: 'AI Engineer',
    company: 'Rigved Technologies',
    period: 'Jun 2025 – Present',
    projects: [
      {
        id: 'hrms',
        title: 'AI-Enabled HRMS',
        highlights: [
          'Developed an AI-powered HRMS for attendance, leave management, employee onboarding, and document verification.',
          'Built OCR-based document processing for Aadhaar, PAN, and employee certificates using OpenCV and Python.',
          'Implemented attendance anomaly detection and intelligent leave recommendation using machine learning.',
          'Developed REST APIs to integrate AI modules into HR workflows.',
        ],
      },
      {
        id: 'time-flow',
        title: 'Time Flow',
        highlights: [
          'Developed an enterprise time tracking system for attendance, work-hour monitoring, and workforce analytics.',
          'Built automated attendance, overtime, and productivity reporting modules.',
          'Developed analytics to identify attendance trends and irregular employee work patterns.',
          'Optimized backend services and reporting APIs for HR operations.',
        ],
      },
      {
        id: 'enterprise-chatbot',
        title: 'Enterprise AI Chatbot',
        highlights: [
          'Developed a RAG-based chatbot for HR policy and employee support using enterprise documents.',
          'Built document indexing, embedding generation, and semantic search pipelines.',
          'Integrated LLM APIs to deliver accurate, context-aware responses.',
          'Improved chatbot performance through prompt engineering and retrieval optimization.',
        ],
      },
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
    id: 'genai',
    title: 'Generative AI',
    items: [
      'LLM Integration (OpenAI, Claude, Gemini)',
      'LangChain',
      'RAG Pipelines',
      'Prompt Engineering',
      'Embeddings & Semantic Search',
      'Vector Databases (FAISS / Pinecone / Chroma)',
      'Custom GPTs',
      'LLM-based Content Generation',
    ],
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    items: [
      'Scikit-learn',
      'TensorFlow',
      'PyTorch',
      'Random Forest',
      'Anomaly Detection',
    ],
  },
  {
    id: 'nlp',
    title: 'NLP',
    items: [
      'Document Parsing',
      'Text Extraction',
      'Named Entity Recognition',
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
      'Document Validation Pipelines',
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    items: ['Python', 'FastAPI', 'Flask', 'REST API Development', 'Microservices'],
  },
  {
    id: 'prog',
    title: 'Programming & Data Libraries',
    items: ['Python', 'NumPy', 'Pandas', 'Matplotlib'],
  },
  {
    id: 'db',
    title: 'Databases',
    items: ['PostgreSQL', 'SQLite', 'Vector Stores (FAISS / Chroma)'],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    items: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Git', 'GitHub'],
  },
  {
    id: 'web',
    title: 'Web Technologies',
    items: ['JavaScript', 'HTML', 'CSS', 'ReactJS'],
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
