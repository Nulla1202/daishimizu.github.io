// Portfolio Data Interface
interface Experience {
  id: number;
  period: string;
  title: string;
  role: string;
  description: string;
  type: string;
  tags?: string[];
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

interface Award {
  id: number;
  title: string;
  description: string;
  year: string;
  type: string;
  amount?: string;
}

interface PortfolioData {
  experience: Experience[];
  skills: {
    programming: Skill[];
    dataCollection: string[];
    researchTools: string[];
  };
  awards: Award[];
}

// Neural Network Animation
class NeuralNetwork {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private nodes: { x: number; y: number; vx: number; vy: number }[] = [];
  private connections: { from: number; to: number; opacity: number }[] = [];
  private animationId: number = 0;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    this.createNodes();
    window.addEventListener('resize', () => this.resize());
  }

  private resize(): void {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  private createNodes(): void {
    const nodeCount = 50;
    for (let i = 0; i < nodeCount; i++) {
      this.nodes.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Create connections
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.95) {
          this.connections.push({ from: i, to: j, opacity: Math.random() * 0.3 });
        }
      }
    }
  }

  public animate(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update and draw nodes
    this.nodes.forEach((node) => {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;

      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(100, 200, 255, 0.6)';
      this.ctx.fill();
    });

    // Draw connections
    this.connections.forEach((conn) => {
      const from = this.nodes[conn.from];
      const to = this.nodes[conn.to];

      this.ctx.beginPath();
      this.ctx.moveTo(from.x, from.y);
      this.ctx.lineTo(to.x, to.y);
      this.ctx.strokeStyle = `rgba(100, 200, 255, ${conn.opacity})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  public stop(): void {
    cancelAnimationFrame(this.animationId);
  }
}

// Brain Visualization
class BrainVisualization {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private waves: { amplitude: number; frequency: number; phase: number }[] = [];

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    this.createWaves();
    window.addEventListener('resize', () => this.resize());
  }

  private resize(): void {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  private createWaves(): void {
    for (let i = 0; i < 5; i++) {
      this.waves.push({
        amplitude: 20 + Math.random() * 30,
        frequency: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  public animate(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.waves.forEach((wave, index) => {
      this.ctx.beginPath();
      for (let x = 0; x < this.canvas.width; x++) {
        const y =
          this.canvas.height / 2 +
          Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
        if (x === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.strokeStyle = `rgba(100, 200, 255, ${0.3 - index * 0.05})`;
      this.ctx.lineWidth = 2;
      this.ctx.stroke();

      wave.phase += 0.02;
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Load and render portfolio data
async function loadPortfolioData(): Promise<PortfolioData> {
  const response = await fetch('/src/data/portfolio.json');
  return await response.json();
}

function renderTimeline(experiences: Experience[]): void {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  experiences.forEach((exp, index) => {
    const item = document.createElement('div');
    item.className = `timeline-item ${exp.type}`;
    item.innerHTML = `
      <div class="timeline-marker"></div>
      <div class="timeline-content">
        <div class="timeline-period">${exp.period}</div>
        <h3 class="timeline-title">${exp.title}</h3>
        <div class="timeline-role">${exp.role}</div>
        <p class="timeline-description">${exp.description}</p>
        ${exp.tags ? `<div class="timeline-tags">${exp.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>` : ''}
      </div>
    `;

    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          item.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(item);
    container.appendChild(item);
  });
}

function renderSkills(skills: PortfolioData['skills']): void {
  // Programming skills with bars
  const programmingContainer = document.querySelector('[data-category="programming"]');
  if (programmingContainer) {
    skills.programming.forEach((skill) => {
      const skillBar = document.createElement('div');
      skillBar.className = 'skill-bar';
      skillBar.innerHTML = `
        <div class="skill-info">
          <span class="skill-name">${skill.name}</span>
          <span class="skill-category">${skill.category}</span>
        </div>
        <div class="skill-progress">
          <div class="skill-progress-fill" data-level="${skill.level}"></div>
        </div>
      `;
      programmingContainer.appendChild(skillBar);
    });
  }

  // Data collection skills
  const dataCollectionContainer = document.querySelector('[data-category="data-collection"]');
  if (dataCollectionContainer) {
    skills.dataCollection.forEach((skill) => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';
      skillItem.textContent = skill;
      dataCollectionContainer.appendChild(skillItem);
    });
  }

  // Research tools
  const researchToolsContainer = document.querySelector('[data-category="research-tools"]');
  if (researchToolsContainer) {
    skills.researchTools.forEach((tool) => {
      const toolItem = document.createElement('div');
      toolItem.className = 'skill-item';
      toolItem.textContent = tool;
      researchToolsContainer.appendChild(toolItem);
    });
  }
}

function renderAwards(awards: Award[]): void {
  const container = document.getElementById('awards-container');
  if (!container) return;

  awards.forEach((award) => {
    const item = document.createElement('div');
    item.className = `award-card ${award.type}`;
    item.innerHTML = `
      <div class="award-year">${award.year}</div>
      <h3 class="award-title">${award.title}</h3>
      <p class="award-description">${award.description}</p>
      ${award.amount ? `<div class="award-amount">${award.amount}</div>` : ''}
    `;

    // Animate on scroll
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          item.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(item);
    container.appendChild(item);
  });
}

// Animated counters
function animateCounters(): void {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target') || '0');
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current).toString();
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toString();
            }
          };
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counter);
  });
}

// Skill bar animation
function animateSkillBars(): void {
  const skillBars = document.querySelectorAll('.skill-progress-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target as HTMLElement;
        const level = bar.getAttribute('data-level') || '0';
        setTimeout(() => {
          bar.style.width = `${level}%`;
        }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach((bar) => observer.observe(bar));
}

// Smooth scroll
function setupSmoothScroll(): void {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(
        anchor.getAttribute('href') || ''
      );
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Mobile menu toggle
function setupMobileMenu(): void {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle?.addEventListener('click', () => {
    navLinks?.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('active');
      menuToggle?.classList.remove('active');
    });
  });
}

// Navbar scroll effect
function setupNavbarScroll(): void {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

// Initialize
async function init(): Promise<void> {
  try {
    // Load and render data
    const data = await loadPortfolioData();
    renderTimeline(data.experience);
    renderSkills(data.skills);
    renderAwards(data.awards);

    // Setup animations and interactions
    animateCounters();
    animateSkillBars();
    setupSmoothScroll();
    setupMobileMenu();
    setupNavbarScroll();

    // Start visualizations
    const neuralNetwork = new NeuralNetwork('neuralNetwork');
    neuralNetwork.animate();

    const brainViz = new BrainVisualization('brainVisualization');
    brainViz.animate();
  } catch (error) {
    console.error('Error initializing portfolio:', error);
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
