import { JobRole } from '../types';

export const JOB_ROLES: JobRole[] = [
  {
    id: 'frontend',
    name: 'Frontend Developer',
    tagline: 'Build interactive, responsive user interfaces and web applications',
    skills: [
      { name: 'HTML', priority: 'LOW', description: 'Core building block of all web page layouts and document structure.' },
      { name: 'CSS', priority: 'LOW', description: 'Essential styling language for layouts, responsiveness, and aesthetics.' },
      { name: 'JavaScript', priority: 'HIGH', description: 'Primary language for client-side interactivity, DOM manipulation, and dynamic logic.' },
      { name: 'Git', priority: 'LOW', description: 'Standard version control system for source code tracking and collaboration.' },
      { name: 'React', priority: 'HIGH', description: 'Important skill for this sample role.' },
      { name: 'REST API', priority: 'MEDIUM', description: 'Useful for building and connecting applications.' },
      { name: 'TypeScript', priority: 'LOW', description: 'Useful for strengthening modern frontend development.' },
    ],
  },
  {
    id: 'backend',
    name: 'Backend Developer',
    tagline: 'Design resilient APIs, business logic, server runtimes, and databases',
    skills: [
      { name: 'JavaScript', priority: 'HIGH', description: 'Core programming language powering modern asynchronous server runtimes.' },
      { name: 'Node.js', priority: 'HIGH', description: 'JavaScript runtime environment for building scalable backend network services.' },
      { name: 'Express.js', priority: 'HIGH', description: 'Lightweight, fast web application framework for routing and API endpoints.' },
      { name: 'MongoDB', priority: 'MEDIUM', description: 'Flexible NoSQL document database for managing application data.' },
      { name: 'REST API', priority: 'HIGH', description: 'Standard architectural pattern for designing scalable HTTP services.' },
      { name: 'Git', priority: 'LOW', description: 'Essential distributed version control for engineering teams.' },
      { name: 'Authentication', priority: 'MEDIUM', description: 'Securing routes, session management, password hashing, and JWT authorization.' },
    ],
  },
  {
    id: 'python',
    name: 'Python Developer',
    tagline: 'Engineer automated systems, backends, scripts, and scalable algorithms',
    skills: [
      { name: 'Python', priority: 'HIGH', description: 'Versatile, readable programming language powering modern software and automation.' },
      { name: 'OOP', priority: 'HIGH', description: 'Object-oriented programming principles for modular, maintainable architecture.' },
      { name: 'SQL', priority: 'MEDIUM', description: 'Declarative query language for interacting with relational databases.' },
      { name: 'Git', priority: 'LOW', description: 'Essential tool for tracking revisions, branching, and team collaboration.' },
      { name: 'REST API', priority: 'MEDIUM', description: 'Interfacing server capabilities with clients and external systems.' },
      { name: 'Flask', priority: 'LOW', description: 'Lightweight micro-framework for building web services quickly.' },
      { name: 'Data Structures', priority: 'HIGH', description: 'Foundational algorithmic models for optimized memory and processing efficiency.' },
    ],
  },
  {
    id: 'data-analyst',
    name: 'Data Analyst',
    tagline: 'Translate complex datasets into actionable business intelligence',
    skills: [
      { name: 'Python', priority: 'HIGH', description: 'Industry-standard programming language for data wrangling and numerical analysis.' },
      { name: 'SQL', priority: 'HIGH', description: 'Indispensable language for querying, filtering, and aggregating structured databases.' },
      { name: 'Excel', priority: 'MEDIUM', description: 'Foundational tool for rapid tabular analysis, formulas, and pivot tables.' },
      { name: 'Statistics', priority: 'HIGH', description: 'Mathematical theory for distributions, probability, and hypothesis validation.' },
      { name: 'Power BI', priority: 'MEDIUM', description: 'Business analytics suite for creating interactive corporate dashboards.' },
      { name: 'Data Visualization', priority: 'LOW', description: 'Crafting clear charts and graphical summaries to communicate findings.' },
      { name: 'Pandas', priority: 'MEDIUM', description: 'Powerful Python library for DataFrame transformations and data cleaning.' },
    ],
  },
  {
    id: 'java',
    name: 'Java Developer',
    tagline: 'Develop robust, high-performance enterprise applications and services',
    skills: [
      { name: 'Java', priority: 'HIGH', description: 'Strongly-typed object-oriented language for enterprise-grade solutions.' },
      { name: 'OOP', priority: 'HIGH', description: 'Foundational paradigms including inheritance, polymorphism, and encapsulation.' },
      { name: 'SQL', priority: 'MEDIUM', description: 'Structured query language for transactional relational database persistence.' },
      { name: 'Git', priority: 'LOW', description: 'Standard version control system for enterprise source management.' },
      { name: 'Data Structures', priority: 'HIGH', description: 'Key data representations (trees, graphs, heaps) for high-performance computing.' },
      { name: 'Spring Boot', priority: 'HIGH', description: 'Industry-leading framework for microservices, dependency injection, and web apps.' },
      { name: 'REST API', priority: 'MEDIUM', description: 'Designing clean contracts and HTTP endpoints for interconnected services.' },
    ],
  },
];

export const ALL_PREDEFINED_SKILLS: string[] = [
  'HTML',
  'CSS',
  'JavaScript',
  'React',
  'TypeScript',
  'Git',
  'REST API',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Authentication',
  'Python',
  'OOP',
  'SQL',
  'Flask',
  'Data Structures',
  'Excel',
  'Statistics',
  'Power BI',
  'Data Visualization',
  'Pandas',
  'Java',
  'Spring Boot',
];

/**
 * Priority ordering for sorting missing skills:
 * 1. HIGH
 * 2. MEDIUM
 * 3. LOW
 */
export const PRIORITY_ORDER: Record<string, number> = {
  HIGH: 1,
  MEDIUM: 2,
  LOW: 3,
};
