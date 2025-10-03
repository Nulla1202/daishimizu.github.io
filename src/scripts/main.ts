// Portfolio Data Interface
interface Experience {
  id: number;
  period: string;
  title: string;
  role: string;
  description: string;
}

interface PortfolioData {
  experience: Experience[];
}

// Load portfolio data
async function loadPortfolioData(): Promise<PortfolioData> {
  const response = await fetch('/src/data/portfolio.json');
  return await response.json();
}

// Render experience
function renderExperience(experiences: Experience[]): void {
  const container = document.getElementById('experience-list');
  if (!container) return;

  experiences.forEach((exp) => {
    const item = document.createElement('div');
    item.className = 'exp-item';
    item.innerHTML = `
      <div class="exp-header">
        <span class="exp-title">${exp.title}</span>
        <span class="exp-period">${exp.period}</span>
      </div>
      <div class="exp-role">${exp.role}</div>
      <div class="exp-description">${exp.description}</div>
    `;
    container.appendChild(item);
  });
}

// Initialize
async function init(): Promise<void> {
  try {
    const data = await loadPortfolioData();
    renderExperience(data.experience);
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
