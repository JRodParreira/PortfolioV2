import React, { useEffect, useMemo, useState, useRef } from "react";
import Grainient from './Grainient.jsx';
import MobileMenu from "./MobileMenu";
import { useLanguage } from "./lan/LanguageContext.jsx";
import { useTranslation } from "./lan/useTranslation.js";
const asset = (name) => new URL(`assets/${name}`, import.meta.env.BASE_URL).href;

const projects = [
  {
    id: "HOS",
    title: "HospitalityOS",
    date: "08/2025",
    metric: "32%",
    metricLabel: "Reduced task coordination time",
    image1: "HOS.png",
    image2: "project-hos-bg.png",
    image3: "project-hos-detail.png",
    image4: "HOS_Guests.png",
    image5: "HOS_HK.png",
    image6: "HOS_HKTasks.png",
    image7: "HOS_Orders.png",
    image8: "HOS_OrderDet.png",
    image9: "HOS_Rooms.png", 
    image10: "HOS_RoomDet.png", 
    alt: "HospitalityOS interface preview",
    description:
      "Multi-role operational platform that centralizes hotel workflows and improves coordination between departments.",
    closedate: "August of 2025",
    problem: "Hotel operations are traditionally fragmented across disconnected teams. Front desk, housekeeping, and restaurant staff often work in silos, leading to communication gaps, delayed service, and a poor guest experience.",
    goal: "Design a centralized system that enables hotel staff to manage operations clearly, reduce miscommunication, and improve efficiency across departments.",
    personas: "Hotel managers, front desk staff, housekeeping, maintenance.",
    decision: "Why role-based dashboards instead of a unified interface? Reduced cognitive load per role Faster task execution Easier onboarding",
    tradeoff: "Reduced cross-role visibility",
    solution: "Introduced a shared system layer to maintain alignment across teams"
  },
  {
    id: "FB",
    title: "FoodBridge",
    date: "02/2026",
    metric: "40%",
    metricLabel: "Reduced manual data entry errors",
    image1: "FB.png",
    image2: "FB_Login.png",
    image3: "FB_Dashboard.png",
    image4: "FB_Del.png",
    image5: "FB_Don.png",
    image6: "FB_Fam.png",
    image7: "FB_Inv.png",
    image8: "FB_Rep.png",
    image9: "FB_Scedule.png", 
    image10: "FB_Set.png", 
    alt: "FoodBridge product preview",
    description:
      "Platform to reduce food waste by connecting restaurants with surplus food to charities and communities.",
    closedate: "February of 2026",
    problem: "Many restaurants generate surplus food daily, but lack efficient systems to redistribute it. At the same time, charities struggle to access consistent food sources. Existing solutions are either fragmented or difficult to use, leading to wasted resources and missed opportunities.",
    goal: "Design a simple and reliable system that allows restaurants to quickly list surplus food and enables charities to claim and manage pickups efficiently.",
    personas: "Restaurant owners, charity representatives, community members.",
    decision: "Why structured inventory workflows instead of flexible input? Reduced data entry errors More consistent data across locations Easier reporting and tracking",
    tradeoff: "Less flexibility for edge cases",
    solution: "Introduced controlled input patterns with optional overrides"
  },
  // {
  //   title: "Shiftly",
  //   date: "07/2026",
  //   metric: "32%",
  //   metricLabel: "Reduced task coordination time",
  //   image1: "HOS.png",
  //   hoverImage: "HOS_Hover.png",
  //   alt: "Shiftly interface preview",
  //   description:
  //     "Architected a multi-role system to coordinate housekeeping, reception, and maintenance workflows in real-time.",
  // },
];

const services = [
  {
    title: "UX & UI Audit",
    image: "uxui_Audit.png",  },
  {
    title: "Development Audit",
    image: "dev_audit.png",
  },
  {
    title: "Website Design",
    image: "webdesign.png",
  },
  {
    title: "Website Development",
    image: "webdev.png",
  },
  {
    title: "App Design",
    image: "appdesign.png",
  },
];

const mobileDecorations = [

    {
        image:"icon1.svg",
        top:120,
        right:0
    },

    {
        image:"icon2.svg",
        top:720,
        left:0
    },

    {
        image:"icon3.svg",
        top:1320,
        right:0
    },

    {
        image:"icon4.svg",
        top:2240,
        left:0
    }

];

const processSteps = [
  {
    label: "Step 01",
    title: "We discover what matters",
    body: "I turn fuzzy goals, constraints, business priorities, and product context into the information architecture that guides every decision.",
    img: "Step1.png",
  },
  {
    label: "Step 02",
    title: "We craft the experience",
    body: "The structure becomes interface: clear screens, usable flows, thoughtful interactions, and a system that can grow without visual noise.",
    alt: true,
    img: "Step2.png",
  },
  {
    label: "Step 03",
    title: "We launch with confidence",
    body: "From final handoff to implementation support, I help make sure the experience lands exactly as planned.",
    alt2: true,
    img: "Step3.png",
  },
];

const faqs = [
  {
    question: "How do you usually start a project?",
    answer:
      "Every project starts with understanding the business, the users, and the existing product. From there, I identify opportunities, define priorities, and build a clear roadmap before moving into design.",
  },
  {
    question: "Can you redesign an existing product?",
    answer: "Yes. Whether it's improving usability, modernizing the interface, or increasing conversion, I can work with existing products as well as build new ones from scratch.",
  },
  {
    question: "Do you also develop what you design?",
    answer:
      "Yes. I combine product design with frontend development, allowing me to build interfaces that stay faithful to the original design while remaining performant and maintainable.",
  },
  {
    question: "Can you work with our existing design system?",
    answer: "Absolutely. I can work within an existing design system or create one from scratch to improve consistency and scalability.",
  },
  {
    question: "How long does a project usually take?",
    answer: "It depends on the scope. A UX audit may take a few days, while complete product design or website projects typically range from several weeks to a few months.",
  },
];


function Header() {

  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuClosing(true);
  };

  const handleAnimationEnd = () => {
    if (menuClosing) {
      setMenuClosing(false);
      setMenuOpen(false);
    }
  };

  useEffect(() => {

    const hero = document.querySelector(".hero");

    const handleScroll = () => {

        if (!hero) return;

        const trigger =
          window.innerWidth < 768
            ? hero.offsetHeight - 40
            : hero.offsetHeight - 120;

        setScrolled(window.scrollY > trigger);
    };


    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);

    return () => document.body.classList.remove("mobile-menu-open");
  }, [menuOpen]);

  return (
    <>
    <header className={`site-header ${
                scrolled ? "scrolled" : ""
            } ${menuOpen ? "menu-open" : ""}`}>
      <a className="brand" href="#top" aria-label="José Parreira home" onClick={closeMenu}>
        <img src={asset("Logo.svg")} alt="" />
      </a>
      <nav id="primary-menu" className="main-nav" aria-label="Portfolio sections">
        <a href="#about" onClick={closeMenu}>{t.nav.about}</a>
        <a href="#projects" onClick={closeMenu}>{t.nav.projects}</a>
        <a href="#services" onClick={closeMenu}>{t.nav.services}</a>
        <a href="#process" onClick={closeMenu}>{t.nav.process}</a>
      </nav>
      <div className="nav-actions">
        <button
          className={`lang-switch ${language === "pt" ? "active" : ""}`}
          onClick={toggleLanguage}
        >
          <div className="lang-track">
            <span>EN</span>
            <span>PT</span>
          </div>
        </button>
        <a className="talk-button" href="https://cal.com/joseparreira/calendar">
          <span>{t.nav.letsTalk}</span>

          <span className="talk-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M9 7H17V15" />
            </svg>
          </span>
        </a>
      </div>
      <button
        className="menu-toggle"
        type="button"
        aria-controls="mobile-menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(true)}
      >
        {t.nav.menu}
      </button>
    </header>

    <MobileMenu
        menuOpen={menuOpen}
        menuClosing={menuClosing}
        closeMenu={closeMenu}
        onAnimationEnd={handleAnimationEnd}
        language={language}
        toggleLanguage={toggleLanguage}
    />
    </>
  );
}

function Hero() {
  const t = useTranslation();
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Grainient
            color1="#207E8E"
            color2="#161616"
            color3="#212121"
            timeSpeed={0.25}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={5}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={0}
            blendSoftness={0.05}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0.1}
            grainScale={2}
            grainAnimated={false}
            contrast={1.5}
            gamma={1}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
      <aside className="hero-note" aria-label="Intro note">
        <img src={asset("Hero_Symbol.svg")} alt="" />
        <strong>{t.hero.title}</strong>
        <p>{t.hero.subtitle}</p>
      </aside>
      <img className="hero-logo" src={asset("Logo_Hero.svg")} alt="" />
    </section>
  );
}

function SectionLabel({ children, title, id }) {
  return (
    <div className="section-label">
      <h2 id={id}>{title}</h2>
      {children}
    </div>
  );
}

function SectionDivider() {
  const t = useTranslation();
  return (
    <div className="mobile-chat-section">
      <div className="mobile-chat-card">
        <img
            src={asset("avatar.png")}
            alt="José Parreira"
        />

        <h3>
            {t.mobile.gotQuestions}
            <br />
            {t.mobile.chatWith}
        </h3>

      <a className="mobile-talk-button" href="https://cal.com/joseparreira/calendar">
        <span>{t.mobile.bookCall}</span>

        <span className="talk-icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 17L17 7M17 7H9M17 7V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </div>
      <div className="bottom-angle"></div>
    </div>
  );
}

function Projects() {
  const t = useTranslation();
  const [selectedProject, setSelectedProject] = useState(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [projectClosing, setProjectClosing] = useState(false);

  const openProject = (project) => {
    setProjectClosing(false);
    setSelectedProject(project);
  };

  const closeProject = () => {
      setProjectClosing(true);
  };

  const handleProjectAnimationEnd = () => {
      if (projectClosing) {
          setProjectClosing(false);
          setSelectedProject(null);
      }
  };
   useEffect(() => {

    if (selectedProject || galleryOpen) {

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;

    } else {

      document.body.style.overflow = "";
      document.body.style.paddingRight = "";

    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };

  }, [selectedProject, galleryOpen]);

  return (
    <section className="section section-light projects-section" id="projects" aria-labelledby="projects-title">
      <SectionLabel title={t.projects.title} id="projects-title">
        <div className="chat-card">
          <img src={asset("avatar.png")} alt="José Parreira" />
          <p>
            {t.projects.gotQuestions}
            <br />
            {t.projects.chatWith}
          </p>
          <a href="https://cal.com/joseparreira/calendar">
            {t.projects.bookCall} <span aria-hidden="true">→</span>
          </a>
        </div>
      </SectionLabel>
      <div className="project-list">
        {projects.map((project) => {
          const text = t.projects[project.id];

          return (
            <article
              className="project-card"
              key={project.title}
            >
              <button
                className="project-image"
                type="button"
                onClick={() => openProject(project)}
              >
                <img
                  className="project-bg"
                  src={asset(project.image1)}
                  alt=""
                />

                <img
                  className="project-preview"
                  src={asset(project.image3)}
                  alt=""
                />
              </button>

              <div className="project-copy">
                <div className="project-title">
                  <h3>{project.title}</h3>
                  <p className="project-kicker">{project.date}</p>
                </div>

                <p>{text.description}</p>

                <div className="metric">
                  <strong>{project.metric}</strong>
                  <span>{text.metricLabel}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

            {selectedProject && (() => {

        const text = t.projects[selectedProject.id];

        return (
          <>
            <div
              className="overlay-backdrop"
              onClick={closeProject}
            />

            <div
              className={`project-overlay-wrapper ${
                projectClosing ? "closing" : "open"
              }`}
              onAnimationEnd={handleProjectAnimationEnd}
            >
              <aside className="project-overlay">

                <div className="overlay-header">

                  <div className="overlay-title-row">
                    <h1>{t.projects.caseStudy}</h1>

                    <button
                      className="close-button"
                      onClick={closeProject}
                    >
                      {t.projects.close}
                    </button>
                  </div>

                  <div className="overlay-project-row">
                    <h2>{selectedProject.title}</h2>

                    <span className="project-date">
                      {text.closeDate}
                    </span>
                  </div>
                </div>

                <h3>{t.projects.problem}</h3>
                <p>{text.problem}</p>

                <h3>{t.projects.goal}</h3>
                <p>{text.goal}</p>

                <h3>{t.projects.personas}</h3>
                <p>{text.personas}</p>

                <h3>{t.projects.decision}</h3>
                <p>{text.decision}</p>

                <h3>{t.projects.tradeoff}</h3>
                <p>{text.tradeoff}</p>

                <h3>{t.projects.solution}</h3>
                <p>{text.solution}</p>

                <div className="overlay-footer">
                  <button
                    className="talk-button talk-button--overlay"
                    onClick={() => setGalleryOpen(true)}
                  >
                    <span>{t.projects.viewGallery}</span>

                    <span className="talk-icon">
                      <span className="talk-icon">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7" />
                        <path d="M9 7H17V15" />
                      </svg>
                    </span>
                    </span>
                  </button>
                </div>

              </aside>
            </div>
          </>
        );
      })()}

      {galleryOpen && (

          <>
          <div
              className="overlay-backdrop gallery-backdrop"
              onClick={() => setGalleryOpen(false)}
          />
          <div className="gallery-overlay-wrapper">

              <aside className="gallery-overlay">

                  <div className="overlay-title-row">

                      <h1>{t.projects.gallery}</h1>

                      <button
                          className="close-button"
                          onClick={() => setGalleryOpen(false)}
                      >
                          {t.projects.close}
                      </button>

                  </div>

                  <div className="gallery-grid">

                      <img src={asset(selectedProject?.image2 || "HOS_Hover.png")} alt="" />
                      <img src={asset(selectedProject?.image3 || "HOS.png")} alt="" />
                      <img src={asset(selectedProject?.image4 || "HOS_Hover.png")} alt="" />
                      <img src={asset(selectedProject?.image5 || "HOS.png")} alt="" />
                      <img src={asset(selectedProject?.image6 || "HOS_Hover.png")} alt="" />
                      <img src={asset(selectedProject?.image7 || "HOS.png")} alt="" />
                      <img src={asset(selectedProject?.image8 || "HOS_Hover.png")} alt="" />
                      <img src={asset(selectedProject?.image9 || "HOS.png")} alt="" />
                      <img src={asset(selectedProject?.image10 || "HOS_Hover.png")} alt="" />

                  </div>

              </aside>

          </div>
          </>

      )}
    </section>
  );
}

function Services() {
  const t = useTranslation();
  const [activeService, setActiveService] = useState(0);
  const serviceLabels = [
    t.services.uxAudit,
    t.services.developmentAudit,
    t.services.websiteDesign,
    t.services.websiteDevelopment,
    t.services.appDesign,
  ];
  
  return (
    <section className="section section-dark services-section" id="services" aria-labelledby="services-title">
      <div className="services-grid">
      <SectionLabel className="service-title" title={t.services.title} id="services-title" />
      <div className="services-content">
        <p className="eyebrow">{t.services.eyebrow}</p>
          <ul className="service-list" aria-label="Services">
            {services.map((service, index) => (
            <li
              key={service.title}
              onMouseEnter={() => setActiveService(index)}
              onClick={() => setActiveService(index)}
              onFocus={() => setActiveService(index)}
              className={activeService === index ? "active" : ""}
              tabIndex={0}
            >
              {serviceLabels[index]}
            </li>
          ))}
          </ul>
        </div>
        <img
            key={services[activeService].image}
            className="services-art"
            src={asset(services[activeService].image)}
            alt={serviceLabels[activeService]}
          />
      </div>
    </section>
  );
}

function MobileService({ title, image, index }){

    return(

        <article className={`mobile-service service-${index + 1}`}>

            <h3>{title}</h3>

            <img
                src={asset(image)}
                alt={title}
            />

        </article>

    )

}

function MobileServices(){

    const t = useTranslation();
    const serviceLabels = [
        t.services.uxAudit,
        t.services.developmentAudit,
        t.services.websiteDesign,
        t.services.websiteDevelopment,
        t.services.appDesign,
    ];

    return(

        <section className="mobile-services">

            <div className="mobile-services-header">

                <h2>{t.services.title}</h2>

                <p>{t.services.eyebrow}</p>

            </div>

            {mobileDecorations.map((icon, index) => (

                <img
                    key={index}
                    src={asset(icon.image)}
                    alt=""
                    className={`mobile-decoration icon-${index + 1}`}
                    style={{

                        top: icon.top,

                        left: icon.left,

                        right: icon.right

                    }}
                />

            ))}

            {services.map((service, index) => (

                <MobileService
                    key={service.title}
                    index={index}
                    {...service}
                    title={serviceLabels[index]}
                />

            ))}

        </section>

    )

}

function Process() {
  
  const t = useTranslation();
  const processLabels = [t.process.step1, t.process.step2, t.process.step3];
  const processTitles = [t.process.discoverTitle, t.process.craftTitle, t.process.launchTitle];
  const processBodies = [t.process.discoverBody, t.process.craftBody, t.process.launchBody];
  const sectionRef = useRef(null);

  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= 780
  );

  useEffect(() => {

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 780);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  
 
  
  
  useEffect(() => {

    const handleScroll = () => {

      const section = sectionRef.current;
      if (!section) return;

      const left = section.querySelector(".left");
      const right = section.querySelector(".right");

      const rect = section.getBoundingClientRect();
   

      const titleProgress = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight * 0.8))
      );

      left.style.transform = `translateX(${(-600 + titleProgress * 600)}px)`;
      right.style.transform = `translateX(${(600 - titleProgress * 600)}px)`;

      left.style.opacity = titleProgress;
      right.style.opacity = titleProgress;
    
      const steps = section.querySelectorAll(".process-step");

      steps.forEach((step) => {

        const rect = step.getBoundingClientRect();

        const progress = Math.max(
            0,
            Math.min(
                1,
                (window.innerHeight - rect.top) / (window.innerHeight * 0.5)
            )
        );

        step.style.opacity = progress;

        step.style.transform = `
            translateY(${50 - progress * 50}px)
        `;

    });
        
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  useEffect(() => {

    const lines = document.querySelectorAll(".process-line");

    lines.forEach((line) => {

        const length = line.getTotalLength();

        line.style.strokeDashoffset = line.getTotalLength();

    });

}, []);
  
  
  return (
    <section className="process-title" ref={sectionRef}>
        <h2 className="left">{t.process.title}</h2>
        <h2 className="right">{t.process.breakdown}</h2>
      
      <section className="section section-dark process-section" id="process" aria-labelledby="process-title">
      <div className="process-list">

        {/* STEP 01 */}
        <article className="process-step">
          <span className="process-label">
            {processLabels[0]}
          </span>

          <div>
            <h3>{processTitles[0]}</h3>
            <p>{processBodies[0]}</p>
          </div>

          <div className="process-media-1" >
            <img src={asset(processSteps[0].img)} alt={processSteps[0].title} />
          </div>
        </article>

        <div className="process-divider" />
        {/* STEP 02 */}
        <article className="process-step process-step-alt">
          <span className="process-label">
            {processLabels[1]}
          </span>

          <div>
            <h3>{processTitles[1]}</h3>
            <p>{processBodies[1]}</p>
          </div>

          <div className="process-media-2" >
            <img src={asset(processSteps[1].img)} alt={processSteps[1].title} />
          </div>
        </article>

        <div className="process-divider" />
        {/* STEP 03 */}
        <article className="process-step">
          <span className="process-label">
            {processLabels[2]}
          </span>

          <div>
            <h3>{processTitles[2]}</h3>
            <p>{processBodies[2]}</p>
          </div>

          <div className="process-media-3" >
            <img src={asset(processSteps[2].img)} alt={processSteps[2].title} />
          </div>
        </article>

      </div>
    </section>
    </section>
    
  );
}

function About() {
  const t = useTranslation();
  return (
    <section className="section section-dark about-section" id="about" aria-labelledby="about-title">
      <SectionLabel title={t.about.title} id="about-title" />
      <div className="about-content">
        <img src={asset("Profile.png")} alt="José Parreira portrait" />
        <div>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <p>
            {t.about.body}
          </p>
          <p className="about-note">
            {t.about.note}
          </p>
        </div>
      </div>
    </section>
  );
}

function Faqs() {
  const t = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);
  const faqsTranslated = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 },
    { question: t.faq.q5, answer: t.faq.a5 },
  ];

  return (
    <section className="section section-mid faq-section faq" aria-labelledby="faq-title">
      <SectionLabel title={t.faq.title} id="faq-title" />
      <div className="faq-list">
        {faqsTranslated.map((faq, index) => (
          <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
          >
              <button
                  className="faq-question"
                  onClick={() =>
                      setOpenIndex(openIndex === index ? null : index)
                  }
              >
                  <span>{faq.question}</span>

                  <svg
                      className="faq-icon"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                  >
                      <path
                          d="M6 9l6 6 6-6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                      />
                  </svg>
              </button>

              <div className="faq-answer">
                  <p>{faq.answer}</p>
              </div>
          </div>
      ))}
      </div>
    </section>
  );
}

function Footer() {
  const t = useTranslation();
  const [now, setNow] = useState(() => new Date());
  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Europe/Lisbon",
      }),
    [],
  );

const formattedTime = timeFormatter
  .formatToParts(now)
  .map((part) =>
    part.type === "dayPeriod"
      ? part.value.toUpperCase()
      : part.value
  )
  .join("");

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <footer className="footer" aria-labelledby="contacts-title">
      <img className="footer-band" src={asset("footer-band.svg")} alt="" />
      <h2 id="contacts-title">{t.footer.contacts}</h2>
      <div className="footer-grid">
        <nav className="social-links" aria-label="Social links">
          <a href="https://www.instagram.com/joseparreira.design/">Instagram</a>
          <a href="https://x.com/joseuxdev">X (Twitter)</a>
          <a href="https://www.linkedin.com/in/joseparreira/">Linkedin</a>
        </nav>
        <address>
          <a href="mailto:hello@joseparreira.com">✉ hello@joseparreira.com</a>
          <p>{t.footer.location}</p>
        </address>
      </div>
      <div className="footer-bottom">
        <div className="time-block">
          <p>{t.footer.lisbon} {formattedTime} (GMT +01)</p>
        </div>
        <a href="#top" className="back-top">
          {t.footer.backTop}
        </a>
      </div>
      <img src={asset("Logo_Hero.svg")} alt="" />
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Projects />
        <SectionDivider />
        <Services />
        <MobileServices />
        <Process />
        <About />
        <span className="frame91" />
        <Faqs />
      </main>
      <span className="frame90" />
      <Footer />
    </>
  );
}
