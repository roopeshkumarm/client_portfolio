/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  Download, 
  ArrowRight, 
  ChevronUp, 
  Menu, 
  X,
  Code,
  Cloud,
  Layout,
  Award,
  ExternalLink,
  MapPin,
  CheckCircle2,
  Quote
} from 'lucide-react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  category: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  initials: string;
}

// --- Components ---

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] bg-carbon-black flex flex-col items-center justify-center"
    >
      <div className="relative w-32 h-32 mb-8">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M20 80 L20 20 L50 20 Q80 20 80 50 Q80 80 50 80 L20 80 M50 50 L80 80"
            fill="none"
            stroke="#E8002D"
            strokeWidth="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </svg>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-4xl font-bold text-white font-mono">.rk</span>
        </motion.div>
      </div>
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.8, ease: "linear" }}
          className="h-full bg-ferrari-red"
        />
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-4 text-xs font-mono text-white/50 uppercase tracking-widest"
      >
        Initialising...
      </motion.p>
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] bg-ferrari-red z-[1001] origin-left"
        style={{ scaleX }}
      />
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 h-[70px] flex items-center ${isScrolled ? 'glass' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          <a href="#home" className="text-2xl font-black text-white font-mono tracking-tighter">. <span className="text-ferrari-red">rk</span></a>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[13px] uppercase tracking-wider font-medium text-white/70 hover:text-ferrari-red transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3 mr-4">
              <a href="#" className="text-white/70 hover:text-ferrari-red transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="text-white/70 hover:text-ferrari-red transition-colors"><Github size={18} /></a>
              <a href="#" className="text-white/70 hover:text-ferrari-red transition-colors"><Instagram size={18} /></a>
            </div>
            <button className="px-5 py-2.5 bg-ferrari-red text-white text-[12px] font-bold rounded-[4px] uppercase hover:bg-ferrari-red/80 transition-all transform hover:scale-105">
              Let's Connect
            </button>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[2000] bg-carbon-black flex flex-col items-center justify-center"
          >
            <button 
              className="absolute top-8 right-8 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-bold text-white hover:text-ferrari-red transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex items-center space-x-6 pt-8">
                <a href="#" className="text-white hover:text-ferrari-red transition-colors"><Linkedin size={28} /></a>
                <a href="#" className="text-white hover:text-ferrari-red transition-colors"><Github size={28} /></a>
                <a href="#" className="text-white hover:text-ferrari-red transition-colors"><Instagram size={28} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Typewriter = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className="text-ferrari-red">
      {words[index].substring(0, subIndex)}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const F1CarSVG = () => (
  <svg viewBox="0 0 800 300" className="w-full h-auto drop-shadow-[0_0_30px_rgba(232,0,45,0.3)]">
    {/* Simplified F1 Car Silhouette */}
    <motion.g
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* Body */}
      <path d="M100 220 L700 220 L720 180 L650 160 L500 150 L300 160 L150 180 Z" fill="#E8002D" />
      {/* Cockpit */}
      <path d="M400 155 L500 150 L480 130 L420 130 Z" fill="#0A0A0A" />
      {/* Front Wing */}
      <path d="M100 220 L50 220 L50 200 L120 200 Z" fill="#FFFFFF" />
      {/* Rear Wing */}
      <path d="M680 180 L750 180 L750 120 L680 120 Z" fill="#E8002D" />
      <path d="M680 140 L750 140" stroke="#FFFFFF" strokeWidth="4" />
      {/* Wheels */}
      <circle cx="200" cy="220" r="40" fill="#0A0A0A" />
      <circle cx="200" cy="220" r="20" fill="#333" />
      <circle cx="600" cy="220" r="45" fill="#0A0A0A" />
      <circle cx="600" cy="220" r="25" fill="#333" />
      {/* Speed Lines */}
      <motion.line 
        x1="50" y1="180" x2="150" y2="180" 
        stroke="#E8002D" strokeWidth="2" 
        animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      />
      <motion.line 
        x1="30" y1="200" x2="130" y2="200" 
        stroke="#FFFFFF" strokeWidth="2" 
        animate={{ x: [-30, 30], opacity: [0, 1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }}
      />
    </motion.g>
  </svg>
);

const CountUp = ({ end, duration = 2000 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

const CircularProgress = ({ percentage, label }: { percentage: number, label: string }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64" cy="64" r={radius}
            fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8"
          />
          <motion.circle
            cx="64" cy="64" r={radius}
            fill="none" stroke="url(#gradient)" strokeWidth="8"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={isVisible ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E8002D" />
              <stop offset="100%" stopColor="#6C3CE1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">{percentage}%</span>
        </div>
      </div>
      <span className="mt-4 text-sm font-medium text-white/70">{label}</span>
    </div>
  );
};

const SectionDivider = ({ flip = false }: { flip?: boolean }) => (
  <div className={`w-full overflow-hidden leading-[0] ${flip ? 'rotate-180' : ''}`}>
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-[#0A0A0A]">
      <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
    </svg>
  </div>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const projects: Project[] = [
    {
      id: 1,
      title: "Indu's Kitchen",
      description: "A premium food delivery platform with real-time tracking and seamless payments.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://picsum.photos/seed/food/600/400",
      link: "#",
      category: "Web Dev"
    },
    {
      id: 2,
      title: "Zyphr",
      description: "Cloud-native project management tool for agile teams with AI-driven insights.",
      tags: ["Next.js", "AWS", "DynamoDB", "Tailwind"],
      image: "https://picsum.photos/seed/tech/600/400",
      link: "#",
      category: "Cloud"
    },
    {
      id: 3,
      title: "RoleFit AI",
      description: "AI-powered recruitment platform that matches candidates to roles using LLMs.",
      tags: ["Python", "React", "OpenAI", "AWS Lambda"],
      image: "https://picsum.photos/seed/ai/600/400",
      link: "#",
      category: "AI"
    }
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechFlow",
      text: "Promoth's ability to blend high-performance cloud architecture with stunning UI is unmatched. He delivered our project ahead of schedule.",
      rating: 5,
      initials: "SJ"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager, Zyphr",
      text: "The precision in his code and the attention to detail in the design made our product stand out in a crowded market.",
      rating: 5,
      initials: "MC"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Founder, Indu's Kitchen",
      text: "Working with Promoth was a breeze. He understood our vision perfectly and brought it to life with amazing tech.",
      rating: 5,
      initials: "ER"
    }
  ];

  return (
    <div className="relative min-h-screen bg-carbon-black">
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(232,0,45,0.15)_0%,transparent_70%)] z-0 pointer-events-none" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(108,60,225,0.1)_0%,transparent_70%)] z-0 pointer-events-none" />
      
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div 
        className="custom-cursor" 
        style={{ left: cursorPos.x, top: cursorPos.y }}
      />

      {!isLoading && (
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Navbar />

          {/* --- Hero Section --- */}
          <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center relative z-10">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="flex items-center space-x-2 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-[20px]">
                    <span className="w-1.5 h-1.5 bg-[#00FF41] rounded-full shadow-[0_0_10px_#00FF41]" />
                    <span className="text-[11px] font-medium text-white/70">Available for work</span>
                  </div>
                </div>
                
                <h1 className="text-7xl md:text-[72px] font-bold mb-4 leading-[1] tracking-[-2px]">
                  <span className="text-ferrari-red block">Promoth K</span>
                  Dev & Architect
                </h1>
                
                <div className="text-lg font-mono text-deep-purple mb-6">
                  [ <Typewriter words={["Web Developer", "AWS Cloud Architect", "UI Designer", "Problem Solver"]} /> ]
                </div>
                
                <p className="text-base text-white/60 max-w-[500px] mb-10 leading-relaxed">
                  Crafting high-performance digital engines and scalable cloud infrastructures. Chennai based, globally driven, racing towards perfection.
                </p>
                
                <div className="flex flex-wrap gap-5">
                  <a href="#projects" className="px-8 py-4 bg-ferrari-red text-white text-[13px] font-bold rounded-[4px] uppercase flex items-center space-x-2 hover:bg-ferrari-red/80 transition-all transform hover:scale-105">
                    <span>View Projects &rarr;</span>
                  </a>
                  <button className="px-8 py-4 border border-white text-white text-[13px] font-bold rounded-[4px] uppercase hover:bg-white/5 transition-all flex items-center space-x-2">
                    <span>Download CV</span>
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative hidden lg:block"
              >
                <F1CarSVG />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-ferrari-red/20 blur-[100px] -z-10" />
              </motion.div>
            </div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-10 left-6 text-white/30"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest rotate-90 mb-8">Scroll</span>
                <div className="w-[1px] h-12 bg-white/20" />
              </div>
            </motion.div>
          </section>

          {/* --- Stats Bar --- */}
          <section className="py-10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0 glass p-8 rounded-[12px]">
                {[
                  { label: "Years Exp", value: 3, suffix: "+" },
                  { label: "Projects", value: 20, suffix: "+" },
                  { label: "Happy Clients", value: 15, suffix: "+" },
                  { label: "AWS Certs", value: 5, suffix: "+" },
                ].map((stat, i) => (
                  <div key={i} className={`flex flex-col items-center text-center relative py-4 ${i < 3 ? 'md:border-r md:border-ferrari-red/30' : ''}`}>
                    <div className="text-3xl md:text-[32px] font-extrabold text-ferrari-red mb-1">
                      <CountUp end={stat.value} />{stat.suffix}
                    </div>
                    <div className="text-[11px] font-medium uppercase tracking-widest text-white/50">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* --- About Me --- */}
          <section id="about" className="py-32 relative">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-20 items-center">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="glass p-8 rounded-3xl border-t-4 border-t-ferrari-red relative z-10">
                  <div className="w-24 h-24 bg-ferrari-red rounded-2xl flex items-center justify-center text-4xl font-bold mb-6">RK</div>
                  <h3 className="text-2xl font-bold mb-2">Promoth K</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/70 border border-white/10">Web Developer</span>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono uppercase tracking-widest text-white/70 border border-white/10">Cloud Architect</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white/50 text-sm mb-8">
                    <MapPin size={16} />
                    <span>Chennai, India</span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-sm text-white/70">Availability</span>
                      <span className="text-sm font-bold text-green-500">Full-time</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-sm text-white/70">Experience</span>
                      <span className="text-sm font-bold">3+ Years</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-ferrari-red/20 rounded-3xl -z-10" />
              </motion.div>

              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Building the web. <br />
                  <span className="text-ferrari-red">Architecting the cloud.</span>
                </h2>
                <p className="text-lg text-white/60 mb-10 leading-relaxed">
                  I am a passionate developer who thrives at the intersection of design and technology. My journey started with a fascination for how things work on the internet, which led me to master the art of full-stack development and cloud orchestration.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {[
                    { icon: <Code size={24} />, title: "Code Quality", desc: "Clean, maintainable, and scalable codebases." },
                    { icon: <Cloud size={24} />, title: "Cloud First", desc: "Serverless and microservices architecture." },
                    { icon: <Layout size={24} />, title: "User Focused", desc: "Intuitive and accessible user interfaces." },
                  ].map((item, i) => (
                    <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-ferrari-red/50 transition-colors">
                      <div className="text-ferrari-red mb-4">{item.icon}</div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                
                <button className="px-8 py-4 bg-white text-carbon-black font-bold rounded-full hover:bg-white/90 transition-all flex items-center space-x-2">
                  <Download size={20} />
                  <span>Download Resume</span>
                </button>
              </motion.div>
            </div>
          </section>

          <SectionDivider />

          {/* --- Skills Section --- */}
          <section id="skills" className="py-32 bg-carbon-black relative">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Mastered <span className="text-ferrari-red">Skills</span></h2>
                <p className="text-white/50">Technical expertise honed through years of practice.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                <CircularProgress percentage={95} label="Web Development" />
                <CircularProgress percentage={90} label="Web Designing" />
                <CircularProgress percentage={85} label="AWS Cloud Architecture" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 mb-32">
                {["React", "Node.js", "AWS SAA", "Terraform", "Docker", "Figma", "JavaScript", "TypeScript"].map((skill, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="flex flex-col items-center p-4 bg-white/5 rounded-[4px] border border-white/10 hover:border-ferrari-red/30 transition-all"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-widest text-deep-purple">{skill}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                viewport={{ once: true }}
                className="glass p-8 md:p-12 rounded-[40px] border-l-8 border-l-ferrari-red flex flex-col md:flex-row items-center justify-between gap-8"
              >
                <div className="flex items-center space-x-8">
                  <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center">
                    <Cloud size={40} className="text-ferrari-red" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">AWS Certified Cloud Architect</h3>
                    <div className="flex items-center space-x-2 text-yellow-500">
                      <Award size={18} />
                      <span className="text-sm font-bold uppercase tracking-widest">Gold Badge Recipient</span>
                    </div>
                  </div>
                </div>
                <button className="px-8 py-4 bg-ferrari-red text-white font-bold rounded-full hover:bg-ferrari-red/80 transition-all flex items-center space-x-2">
                  <span>View Credentials</span>
                  <ExternalLink size={18} />
                </button>
              </motion.div>
            </div>
          </section>

          {/* --- Experience Timeline --- */}
          <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Professional <span className="text-ferrari-red">Journey</span></h2>
                <p className="text-white/50">The timeline of my career growth.</p>
              </div>

              <div className="relative">
                {/* Center Line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-ferrari-red/30" />
                
                <div className="space-y-24">
                  {[
                    { role: "Current Role", company: "Tech Solutions", date: "2023 - Present", desc: "Leading cloud migration and full-stack development for enterprise clients." },
                    { role: "Cloud Solutions Project", company: "Freelance", date: "2022 - 2023", desc: "Architected serverless backends for multiple startups using AWS Lambda and DynamoDB." },
                    { role: "Freelance Web Developer", company: "Self-Employed", date: "2021 - 2022", desc: "Built responsive and performant websites for local businesses in Chennai." },
                  ].map((exp, i) => (
                    <motion.div 
                      key={i}
                      whileInView={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      viewport={{ once: true }}
                      className={`relative flex items-center justify-between ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      <div className="w-[45%]">
                        <div className="glass p-8 rounded-3xl border border-white/10 hover:border-ferrari-red/50 transition-all">
                          <span className="text-ferrari-red font-mono text-sm mb-2 block">{exp.date}</span>
                          <h4 className="text-xl font-bold mb-1">{exp.role}</h4>
                          <h5 className="text-white/50 mb-4">{exp.company}</h5>
                          <p className="text-sm text-white/60 leading-relaxed">{exp.desc}</p>
                        </div>
                      </div>
                      
                      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-ferrari-red rounded-full border-4 border-carbon-black z-10" />
                      
                      <div className="w-[45%]" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- Projects Section --- */}
          <section id="projects" className="py-32 bg-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="text-ferrari-red">Projects</span></h2>
                  <p className="text-white/50">A selection of my best work.</p>
                </div>
                
                <div className="flex bg-carbon-black p-1 rounded-full border border-white/10">
                  {[1, 2, 3].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${activeTab === tab ? 'bg-ferrari-red text-white' : 'text-white/50 hover:text-white'}`}
                    >
                      Tab {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <AnimatePresence mode="wait">
                  {projects.map((project, i) => (
                    <motion.div
                      key={`${activeTab}-${project.id}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group relative bg-carbon-black rounded-3xl overflow-hidden border border-white/10 hover:border-ferrari-red/50 transition-all"
                    >
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-8">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, j) => (
                            <span key={j} className="text-[10px] font-mono uppercase tracking-widest text-ferrari-red">{tag}</span>
                          ))}
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                        <p className="text-sm text-white/50 mb-6 leading-relaxed">{project.description}</p>
                        <a href={project.link} className="flex items-center space-x-2 text-white font-bold hover:text-ferrari-red transition-colors">
                          <span>View Project</span>
                          <ArrowRight size={18} />
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* --- Testimonials --- */}
          <section className="py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Client <span className="text-ferrari-red">Feedback</span></h2>
                <p className="text-white/50">What others say about my work.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 30 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass p-8 rounded-[40px] relative"
                  >
                    <Quote className="text-ferrari-red/20 absolute top-8 right-8" size={60} />
                    <div className="flex mb-6">
                      {[...Array(t.rating)].map((_, j) => (
                        <span key={j} className="text-yellow-500 text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-lg text-white/80 mb-8 italic leading-relaxed">"{t.text}"</p>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-ferrari-red rounded-full flex items-center justify-center font-bold">{t.initials}</div>
                      <div>
                        <h4 className="font-bold">{t.name}</h4>
                        <p className="text-xs text-white/50 uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- Contact Section --- */}
          <section id="contact" className="py-32 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-deep-purple/20 to-ferrari-red/20 -z-10" />
            
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -50 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                  Let's build <br />
                  <span className="text-ferrari-red">something great.</span>
                </h2>
                <p className="text-xl text-white/70 mb-12 max-w-md">
                  Have a project in mind? Or just want to say hi? Feel free to reach out!
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-ferrari-red border border-white/10">
                      <Mail size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-white/50">Email Me</p>
                      <p className="text-lg font-bold">hello@promoth.rk</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-ferrari-red border border-white/10">
                      <Phone size={24} />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-widest text-white/50">Call Me</p>
                      <p className="text-lg font-bold">+91 98765 43210</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 50 }}
                viewport={{ once: true }}
                className="glass p-8 md:p-12 rounded-[40px]"
              >
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-2">First Name</label>
                      <input 
                        type="text" 
                        placeholder="John"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-ferrari-red focus:ring-1 focus:ring-ferrari-red transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-2">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-ferrari-red focus:ring-1 focus:ring-ferrari-red transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-2">Email Address</label>
                      <input 
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-ferrari-red focus:ring-1 focus:ring-ferrari-red transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-2">Phone Number</label>
                      <input 
                        type="tel" 
                        placeholder="+91 00000 00000"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-ferrari-red focus:ring-1 focus:ring-ferrari-red transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-white/50 ml-2">Your Message</label>
                    <textarea 
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-ferrari-red focus:ring-1 focus:ring-ferrari-red transition-all resize-none"
                    />
                  </div>
                  <button className="w-full py-5 bg-ferrari-red text-white font-bold rounded-2xl flex items-center justify-center space-x-2 hover:bg-ferrari-red/80 transition-all transform hover:scale-[1.02]">
                    <span>Send Message</span>
                    <ArrowRight size={20} />
                  </button>
                </form>
              </motion.div>
            </div>
          </section>

          {/* --- Footer --- */}
          <footer className="py-20 bg-carbon-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
                <div className="text-center md:text-left">
                  <a href="#home" className="text-3xl font-bold text-white font-mono mb-4 block">.rk</a>
                  <p className="text-white/50 max-w-xs">Built with passion. Deployed with precision. Your vision, architected for the future.</p>
                </div>
                
                <div className="flex flex-wrap justify-center gap-8">
                  {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link) => (
                    <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-ferrari-red transition-colors">{link}</a>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4">
                  <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-ferrari-red transition-all"><Linkedin size={20} /></a>
                  <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-ferrari-red transition-all"><Github size={20} /></a>
                  <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-ferrari-red transition-all"><Instagram size={20} /></a>
                </div>
              </div>
              
              <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-sm text-white/30">© 2025 Promoth K. All rights reserved.</p>
                <div className="flex items-center space-x-6 text-sm text-white/30">
                  <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
              </div>
            </div>
          </footer>

          {/* --- Back to Top --- */}
          <AnimatePresence>
            {showBackToTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-14 h-14 bg-ferrari-red text-white rounded-full flex items-center justify-center shadow-2xl z-[1000] hover:bg-ferrari-red/80 transition-all transform hover:scale-110"
              >
                <ChevronUp size={28} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.main>
      )}
    </div>
  );
}
