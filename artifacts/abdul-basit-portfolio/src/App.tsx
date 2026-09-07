import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  Linkedin,
  Mail,
  Menu,
  MonitorCog,
  Phone,
  Quote,
  Sparkles,
  X,
} from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import resumePdf from '@assets/Abdul_Basit_Resume_ATS_1788811364498.pdf';

const queryClient = new QueryClient();

const navigation = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Proof', href: '#proof' },
  { label: 'Contact', href: '#contact' },
];

const strengths = [
  {
    number: '01',
    title: 'Build the thing',
    copy: 'From Java desktop systems to data-led interfaces, I like turning a rough problem into something people can use.',
  },
  {
    number: '02',
    title: 'Read the system',
    copy: 'Enterprise exposure taught me to look beyond the screen: monitoring, security, service desks, databases, and the people around them.',
  },
  {
    number: '03',
    title: 'Keep learning',
    copy: 'I am building a practical AI foundation while staying curious about the tools changing how software gets made.',
  },
];

const experiences = [
  {
    date: 'Jul — Aug 2026',
    role: 'IT Intern',
    organization: 'Askari Bank Limited',
    badge: 'Enterprise IT',
    icon: MonitorCog,
    copy: 'Supported day-to-day enterprise IT operations across SolarWinds monitoring, Kaspersky endpoint security, and HaloITSM. Gained exposure to Oracle FLEXCUBE and Oracle Exadata in a banking environment.',
  },
  {
    date: 'Aug — Sep 2025',
    role: 'Data Visualization Associate Intern',
    organization: 'Excelerate / Saint Louis University',
    badge: 'Star Performer',
    icon: Sparkles,
    copy: 'Worked with data visualization workflows and was recognized as a Star Performer. The internship closed with an 80% manager evaluation and a 65% overall 360-degree rating.',
  },
];

const projects = [
  {
    index: '01 / 03',
    name: 'Bank Management System',
    type: 'Desktop application',
    copy: 'A JavaFX banking system focused on the flows and structure behind everyday account management.',
    tags: ['Java', 'JavaFX'],
    tone: 'tall',
  },
  {
    index: '02 / 03',
    name: 'Student Grade Tracker',
    type: 'Academic utility',
    copy: 'A Java Swing tracker using data structures, searching, and sorting to make grade records easier to manage.',
    tags: ['Java Swing', 'Data structures'],
    tone: 'warm',
  },
  {
    index: '03 / 03',
    name: 'Library Management System',
    type: 'Object-oriented system',
    copy: 'A C++ library system built around OOP principles and file handling for persistent records.',
    tags: ['C++', 'OOP', 'File handling'],
    tone: 'lime',
  },
];

const technicalSkills = [
  'C++',
  'Java',
  'OOP',
  'File handling',
  'JavaFX',
  'Java Swing',
  'Python basics',
  'MySQL',
  'Git',
  'WordPress basics',
];

const enterpriseSkills = [
  'SolarWinds',
  'Kaspersky',
  'HaloITSM',
  'Oracle FLEXCUBE',
  'Oracle Exadata',
];

const peopleSkills = [
  'Public speaking',
  'Event leadership',
  'Communication',
  'Teamwork',
  'Time management',
];

const certifications = [
  ['01', 'Generative AI Application Developer Certificate', 'NCEAC x HEC — Promising Performer'],
  ['02', 'Google Prompt Writing', 'Google'],
  ['03', 'Google AI Essentials', 'Google'],
  ['04', 'Python Essentials 1', 'Cisco'],
  ['05', 'Effective Presentation', 'HP LIFE'],
  ['06', 'WordPress Workshop', 'Workshop certificate'],
];

const honors = [
  'ISSB assessment call',
  'SZABIST convocation appreciation',
  'Merit shield for public speaking and essay writing',
  'IEEE Tech Fest 2025',
  'SZAB Talent Hunt',
  'All Pakistan Elite Institutions Talent Contest — essay writing',
  'Hosted SZABIST Welcome Party',
  'Editor of bilingual college publications',
];

function SectionHeading({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mb-12 grid gap-6 md:grid-cols-[8rem_1fr] md:items-start">
      <div className="mono pt-2 text-[0.65rem] tracking-[0.12em] text-[#2459e8]" data-testid={`text-section-index-${index}`}>
        {index}
      </div>
      <div>
        <span className="eyebrow" data-testid={`text-eyebrow-${index}`}>{eyebrow}</span>
        <h2 className="mt-4 max-w-4xl text-5xl leading-[0.92] tracking-[-0.065em] md:text-7xl" data-testid={`heading-section-${index}`}>
          {title}
        </h2>
        {children ? <div className="mt-5 max-w-xl text-sm leading-7 text-[#4d6264]">{children}</div> : null}
      </div>
    </div>
  );
}

function Header({ activeSection }: { activeSection: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-[rgba(25,49,60,0.16)] bg-[#f4f0e7]/90 backdrop-blur-md">
      <div className="section-wrap flex h-[4.5rem] items-center justify-between">
        <a href="#top" onClick={closeMenu} className="group flex items-center gap-3" data-testid="link-home">
          <span className="grid size-8 place-items-center bg-[#19313c] text-xs font-bold text-[#d9ff52] transition-transform group-hover:rotate-12">AB</span>
          <span className="hidden text-[0.68rem] font-bold uppercase tracking-[0.13em] sm:block">Abdul Basit Shaikh</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`nav-link ${activeSection === item.href.slice(1) ? 'is-active' : ''}`}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href={resumePdf} download="Abdul-Basit-Shaikh-Resume.pdf" className="button-outline min-h-10 px-4 text-[0.68rem]" data-testid="link-download-resume-header">
            <Download size={14} strokeWidth={2.2} />
            Resume
          </a>
          <a href="#contact" className="button-primary min-h-10 px-4 text-[0.68rem]" data-testid="link-contact-header">
            Let&apos;s talk <ArrowUpRight size={14} />
          </a>
        </div>
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
          className="grid size-10 place-items-center border border-[#19313c] md:hidden"
          data-testid="button-toggle-menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {menuOpen ? (
        <div className="border-t border-[rgba(25,49,60,0.16)] bg-[#e9e2d3] px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={closeMenu} className="flex items-center justify-between border-b border-[rgba(25,49,60,0.18)] pb-3 text-sm font-semibold" data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}>
                {item.label}
                <ArrowUpRight size={15} />
              </a>
            ))}
          </nav>
          <a href={resumePdf} download="Abdul-Basit-Shaikh-Resume.pdf" onClick={closeMenu} className="button-primary mt-5 w-full text-xs" data-testid="link-download-resume-mobile">
            <Download size={15} /> Download resume
          </a>
        </div>
      ) : null}
    </header>
  );
}

function Home() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = navigation.map((item) => document.querySelector(item.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: [0.1, 0.35, 0.7] },
    );
    sections.forEach((section) => section && observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div id="top" className="min-h-[100dvh] bg-[#f4f0e7]">
      <Header activeSection={activeSection} />
      <main>
        <section id="about" className="section-wrap hero-orbit scroll-mt-24 pb-20 pt-36 md:pb-32 md:pt-48">
          <div className="grid items-end gap-14 lg:grid-cols-[1fr_0.72fr]">
            <div>
              <div className="reveal eyebrow" data-testid="text-hero-eyebrow">Computer science student / Larkana, Pakistan</div>
              <h1 className="display-title reveal reveal-delay-1 mt-7 max-w-5xl font-semibold" data-testid="heading-hero">
                Building with<br />
                <span className="serif font-normal italic text-[#2459e8]">discipline</span>
                <br />
                and curiosity.
              </h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-lg text-base leading-7 text-[#4d6264] md:text-lg">
                I&apos;m Abdul Basit Shaikh — a BS Computer Science student combining a cadet mindset with hands-on software building, enterprise IT exposure, data visualization, and emerging AI skills.
              </p>
              <div className="reveal reveal-delay-3 mt-9 flex flex-wrap gap-4">
                <a href="#projects" className="button-primary" data-testid="link-hero-projects">
                  See selected work <ArrowDownRight size={16} />
                </a>
                <a href={resumePdf} download="Abdul-Basit-Shaikh-Resume.pdf" className="button-outline" data-testid="link-download-resume-hero">
                  Download resume <Download size={16} />
                </a>
              </div>
            </div>
            <div className="reveal reveal-delay-2 flex justify-start lg:justify-end">
              <div className="portrait-mark" data-testid="img-portrait-mark" role="img" aria-label="Abdul Basit Shaikh initials mark">
                <span className="initials">AB</span>
                <div className="portrait-caption">
                  <span>AB / build log</span>
                  <span>Keep moving</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-[#19313c] pt-7 md:mt-28 md:grid-cols-4">
            <div className="stat-card" data-testid="stat-education">
              <strong>3.4</strong>
              <span>CGPA / 4.0</span>
            </div>
            <div className="stat-card" data-testid="stat-graduation">
              <strong>2028</strong>
              <span>Expected graduation</span>
            </div>
            <div className="stat-card" data-testid="stat-stack">
              <strong>03</strong>
              <span>Built projects</span>
            </div>
            <div className="stat-card" data-testid="stat-location">
              <strong>PK</strong>
              <span>Based in Sindh</span>
            </div>
          </div>
        </section>

        <div className="marquee" aria-label="Areas of interest">
          <div className="marquee-track">
            {['Software building', 'Enterprise IT', 'Data visualization', 'Generative AI', 'Public speaking', 'Software building', 'Enterprise IT', 'Data visualization', 'Generative AI', 'Public speaking'].map((item, index) => (
              <span className="marquee-item" key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="section-wrap py-24 md:py-36">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionHeading index="01" eyebrow="The short version" title={<>A student with <span className="serif italic text-[#2459e8]">range.</span></>} />
            <div className="grid gap-10 md:grid-cols-3">
              {strengths.map((strength) => (
                <article key={strength.number} className="border-t-2 border-[#19313c] pt-5" data-testid={`card-strength-${strength.number}`}>
                  <div className="mono text-[0.65rem] text-[#2459e8]">{strength.number}</div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.055em]">{strength.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-[#4d6264]">{strength.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-wrap scroll-mt-24 border-t border-[rgba(25,49,60,0.2)] py-24 md:py-36">
          <SectionHeading index="02" eyebrow="Where I&apos;ve learned" title={<>Experience that puts the <span className="serif italic text-[#f58268]">details</span> first.</>}>
            Two internships, two different lenses: one inside enterprise banking IT and one at the intersection of data, communication, and performance.
          </SectionHeading>
          <div className="section-rule">
            {experiences.map((experience) => {
              const Icon = experience.icon;
              return (
                <article className="work-item" key={experience.role} data-testid={`card-experience-${experience.role.toLowerCase().replaceAll(' ', '-')}`}>
                  <div className="work-date">{experience.date}</div>
                  <div>
                    <div className="flex items-start gap-3">
                      <Icon size={20} className="mt-1 shrink-0 text-[#2459e8]" strokeWidth={1.8} />
                      <div>
                        <h3 className="work-title">{experience.role}</h3>
                        <p className="work-org">{experience.organization}</p>
                      </div>
                    </div>
                    <p className="work-description">{experience.copy}</p>
                  </div>
                  <div className="work-badge">{experience.badge}</div>
                </article>
              );
            })}
          </div>
          <div className="mt-12 grid items-start gap-8 md:grid-cols-[8rem_1fr]">
            <div className="mono text-[0.65rem] tracking-[0.12em] text-[#2459e8]">EDU / 01</div>
            <div className="flex flex-col justify-between gap-6 border-l-2 border-[#d9ff52] pl-5 md:flex-row md:items-center">
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.055em]">BS Computer Science</h3>
                <p className="mt-1 text-sm text-[#4d6264]">SZABIST University Larkana · 2024 — present</p>
              </div>
              <div className="text-left md:text-right">
                <p className="mono text-xs text-[#2459e8]">EXPECTED 2028</p>
                <p className="mt-1 text-sm text-[#4d6264]">CGPA 3.4 / 4.0</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-24 bg-[#19313c] py-24 text-[#f4f0e7] md:py-36">
          <div className="section-wrap">
            <SectionHeading index="03" eyebrow="Made, not imagined" title={<>A small, growing <span className="serif italic text-[#d9ff52]">body of work.</span></>}>
              These projects are where concepts became interfaces, logic, and persistent records — one working system at a time.
            </SectionHeading>
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.name} className={`project-card ${project.tone} ${project.tone === 'tall' ? 'row-span-2' : ''}`} data-testid={`card-project-${project.index.replaceAll(' ', '-').replaceAll('/', '')}`}>
                  <div className="project-index">{project.index}</div>
                  <div className="project-type mt-3">{project.type}</div>
                  <h3 className="project-name">{project.name}</h3>
                  <p className="project-copy">{project.copy}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="project-graphic" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap py-24 md:py-36">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <SectionHeading index="04" eyebrow="The toolkit" title={<>Useful at the <span className="serif italic text-[#2459e8]">edges.</span></>} />
            <div className="grid gap-12">
              <div className="skill-group" data-testid="group-technical-skills">
                <div className="skill-index">01 / Technical</div>
                <h3 className="mt-4">Languages, frameworks, and foundations</h3>
                <div className="skill-pills">
                  {technicalSkills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}
                </div>
              </div>
              <div className="skill-columns">
                <div className="skill-group" data-testid="group-enterprise-skills">
                  <div className="skill-index">02 / Enterprise</div>
                  <h3 className="mt-4">Tools I&apos;ve encountered in the field</h3>
                  <div className="skill-pills">
                    {enterpriseSkills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}
                  </div>
                </div>
                <div className="skill-group" data-testid="group-people-skills">
                  <div className="skill-index">03 / People</div>
                  <h3 className="mt-4">How I show up</h3>
                  <div className="skill-pills">
                    {peopleSkills.map((skill) => <span className="skill-pill" key={skill}>{skill}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="proof" className="scroll-mt-24 border-t border-[rgba(25,49,60,0.2)] py-24 md:py-36">
          <div className="section-wrap">
            <SectionHeading index="05" eyebrow="Receipts" title={<>Momentum, in <span className="serif italic text-[#f58268]">public.</span></>}>
              The credentials, rooms, stages, and small moments that have shaped how I learn and contribute.
            </SectionHeading>
            <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                  <Award size={16} className="text-[#2459e8]" /> Certifications
                </div>
                <div className="credential-list">
                  {certifications.map(([number, name, meta]) => (
                    <article className="credential" key={number} data-testid={`row-certification-${number}`}>
                      <div className="credential-number">{number}</div>
                      <div>
                        <div className="credential-name">{name}</div>
                        <div className="credential-meta">{meta}</div>
                      </div>
                      <div className="credential-mark"><Check size={14} className="ml-auto mb-1 text-[#2459e8]" /> Certificate</div>
                    </article>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                  <BookOpen size={16} className="text-[#2459e8]" /> Honors & activities
                </div>
                <div className="border-t border-[#19313c]">
                  {honors.map((honor, index) => (
                    <div className="flex gap-4 border-b border-[rgba(25,49,60,0.2)] py-3 text-sm leading-6" key={honor} data-testid={`text-honor-${index + 1}`}>
                      <span className="mono text-[0.62rem] text-[#2459e8]">0{index + 1}</span>
                      <span>{honor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-20 grid gap-7 border-t border-[#19313c] pt-8 md:grid-cols-[1fr_0.8fr] md:items-center">
              <Quote className="text-[#f58268]" size={34} strokeWidth={1.4} />
              <p className="serif text-3xl leading-[1.05] md:text-4xl">
                “I bring the focus of a cadet and the curiosity of a builder.”
              </p>
            </div>
            <div className="mt-16 grid gap-5 border-t border-[rgba(25,49,60,0.2)] pt-7 md:grid-cols-[8rem_1fr] md:items-start">
              <div className="mono text-[0.65rem] tracking-[0.12em] text-[#2459e8]">OFF / HOURS</div>
              <div className="flex flex-col gap-4 md:flex-row md:items-baseline md:justify-between">
                <h3 className="text-2xl font-semibold tracking-[-0.055em]" data-testid="heading-hobbies">Curious beyond the curriculum.</h3>
                <p className="max-w-xl text-sm leading-6 text-[#4d6264]" data-testid="text-hobbies">
                  Horse riding, video games, and exploring emerging technologies and AI.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-wrap scroll-mt-24 pb-12 pt-8 md:pb-20">
          <div className="contact-panel">
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:items-end">
              <div>
                <span className="eyebrow !text-[#d9ff52]" data-testid="text-contact-eyebrow">Open to the next chapter</span>
                <h2 className="mt-6 max-w-3xl text-5xl leading-[0.9] tracking-[-0.07em] md:text-8xl" data-testid="heading-contact">
                  Let&apos;s make<br /><span className="serif italic text-[#d9ff52]">useful things.</span>
                </h2>
                <p className="mt-7 max-w-md text-sm leading-6 text-[#c5d0cd]">
                  Looking for internships and entry-level opportunities where I can learn quickly, contribute thoughtfully, and keep building.
                </p>
              </div>
              <div className="grid gap-5">
                <a href="mailto:basitshaikh587@gmail.com" className="contact-link" data-testid="link-contact-email">
                  <Mail size={18} /> basitshaikh587@gmail.com <ArrowUpRight size={16} className="ml-auto" />
                </a>
                <a href="tel:+923465668188" className="contact-link" data-testid="link-contact-phone">
                  <Phone size={18} /> +92 346 5668188 <ArrowUpRight size={16} className="ml-auto" />
                </a>
                <a href="https://linkedin.com/in/abdulbasitshaikh" target="_blank" rel="noreferrer" className="contact-link" data-testid="link-contact-linkedin">
                  <Linkedin size={18} /> LinkedIn <ExternalLink size={16} className="ml-auto" />
                </a>
                <a href={resumePdf} download="Abdul-Basit-Shaikh-Resume.pdf" className="button-primary mt-3 w-fit !bg-[#d9ff52] !text-[#19313c] !shadow-[4px_4px_0_#f58268]" data-testid="link-download-resume-contact">
                  <Download size={16} /> Download the full resume
                </a>
              </div>
            </div>
          </div>
          <footer className="flex flex-col gap-5 border-t border-[#19313c] pt-7 text-[0.65rem] uppercase tracking-[0.1em] text-[#4d6264] md:flex-row md:items-center md:justify-between">
            <span data-testid="text-footer-name">Abdul Basit Shaikh · Larkana, Sindh, Pakistan</span>
            <div className="flex items-center gap-5">
              <a href="https://abdulbasitshaikh.github.io/abdul-basit-portfolio" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[#2459e8]" data-testid="link-portfolio-website">
                Portfolio <ExternalLink size={12} />
              </a>
              <a href="https://linkedin.com/in/abdulbasitshaikh" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[#2459e8]" data-testid="link-footer-linkedin">
                LinkedIn <ExternalLink size={12} />
              </a>
              <a href="#top" className="inline-flex items-center gap-1 hover:text-[#2459e8]" data-testid="link-back-to-top">
                Top <ChevronDown size={12} className="rotate-180" />
              </a>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;