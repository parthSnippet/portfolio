import { title } from "framer-motion/client";

export const portfolioData = {
  name: 'Parth Rohit',
  role: 'Frontend Developer',
  tagline: 'I design and build modern, responsive web experiences.',
  about:
    'Passionate frontend developer with a strong focus on React, clean UI architecture, and API-driven applications.',
  location: 'India',
  email: 'parthatwork24@gmail.com',
  social: {
    github: 'https://github.com/parthSnippet',
    linkedin: 'https://www.linkedin.com/in/parth-rohit-b65910307',
  },
  skills: [
    'React',
    'JavaScript',
    'TypeScript',
    'HTML5',
    'CSS3',
    'Tailwind CSS',
    'Redux',
    'REST APIs',
  ],
  projects: [
    {
      title: 'Paisavara E-commerce Platform with Custom CMS & Storefront',
      description:
        'Developed a comprehensive e-commerce solution with a custom CMS and storefront, enabling product management, cart functionality, and seamless user experience.',
      stack: ['React', 'Tailwind', 'API'],
      link: 'api.paisavara.com',
    },
    {
      title: 'GreenSwitch - Monitoring Dashboard',
      description: `Built an IoT-based smart monitoring and control system using Flask, enabling real-time visualization of sensor data such as temperature and power usage. Developed an interactive web dashboard to display live logs and system
metrics.Implemented manual controls to remotely operate devices like lights and fans through the UI.Integrated
backend logic to process sensor inputs and trigger hardware actions efficiently.`,
      stack: ['JavaScript', 'CSS', 'Flask'],
      link: '#',
    },

    {
      title: 'LettrBox',
      description: 'A modern letter-writing app that allows users to create and send personalized letters with a clean, intuitive interface.',
      stack: ['MERN Stack', 'Tailwind CSS'],
      link: '#',
    }
  ],
}
