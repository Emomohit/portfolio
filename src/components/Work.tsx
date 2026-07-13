import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from "react";

gsap.registerPlugin(useGSAP);

interface ProjectType {
  name: string;
  category: string;
  tools: string;
  image: string;
  link?: string;
}

const staticProjectsTop: ProjectType[] = [
  {
    name: "EMO Learners",
    category: "A comprehensive educational platform designed to empower students with curated resources, interactive learning modules, and a modern UI.",
    tools: "React, TailwindCSS, Web Technologies",
    image: "/images/emo_learners.png",
    link: "https://emolearners.vercel.app/"
  },
  {
    name: "EMoIQ",
    category: "An intelligent productivity and smart workflow platform leveraging AI to streamline daily tasks, note-taking, and scheduling.",
    tools: "Python, Next.js, APIs",
    image: "/images/emoiq.png",
    link: "https://emolearners.vercel.app/emoiq"
  }
];

const staticProjectsBottom: ProjectType[] = [
  {
    name: "Achievements",
    category: "Certifications & Activities",
    tools: "Google Gemini Student Ambassador 2026, Smart India Hackathon",
    image: "/images/google_ambassador.png"
  },
  {
    name: "EMOAi",
    category: "An intelligent conversational AI assistant system with advanced natural language processing capabilities.",
    tools: "Python, HTML, APIs, AI Integration",
    image: "/images/emo_ai.png"
  }
];

const Work = () => {
  const [projects, setProjects] = useState<ProjectType[]>([...staticProjectsTop, ...staticProjectsBottom]);

  useEffect(() => {
    // Fetch GitHub repos and inject them in the middle
    fetch('https://api.github.com/users/Emomohit/repos?sort=updated&per_page=10')
      .then(r => r.json())
      .then(repos => {
        if (!Array.isArray(repos)) return;
        
        const githubProjects = repos
          // Filter out existing ones to avoid duplication
          .filter(repo => !['EmoIQ', 'EMo-Learners', 'EmoAi', 'portfolio'].some(name => repo.name.toLowerCase().includes(name.toLowerCase())))
          .slice(0, 4) // Show latest 4 GitHub projects so the scroll doesn't get infinitely long
          .map((repo: any) => {
            let thumb = "/images/github_placeholder.png";
            const lowerName = repo.name.toLowerCase();
            if (lowerName.includes("inkwell")) thumb = "/images/inkwell_thumb.png";
            
            return {
             name: repo.name,
             category: repo.description || "Open Source GitHub Repository",
             tools: repo.language || "Various",
             image: thumb,
             link: repo.html_url
            };
          });
        
        setProjects([...staticProjectsTop, ...githubProjects, ...staticProjectsBottom]);
      })
      .catch(e => console.error("Error fetching GitHub repos:", e));
  }, []);

  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if(box.length === 0) return;
      
      const workContainer = document.querySelector(".work-container");
      if(!workContainer) return;
      
      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, { dependencies: [projects], revertOnUpdate: true });

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index} style={{ cursor: project.link ? 'pointer' : 'default' }} onClick={() => project.link && window.open(project.link, '_blank')}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer" className="view-project-btn" style={{marginTop: '15px', display: 'inline-block', color: 'var(--text-color)', textDecoration: 'underline'}}>View Project ↗</a>
                )}
              </div>
              <WorkImage image={project.image} alt={project.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
