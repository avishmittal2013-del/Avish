/**
 * static Portfolio Website - Core Scripts
 * Pure HTML, CSS, and JS (deployment ready for GitHub Pages)
 */

// --- 0. DATA STORES & CONFIGURATION ---

const RECENT_PROJECTS = [
  {
    id: "apex-kanban",
    title: "Apex Kanban Board",
    category: "utilities",
    tags: ["Kanban", "Local Storage", "Interactive UX"],
    shortDesc: "A complete offline-first task board to manage your work streams.",
    fullDesc: "An immersive, offline-first Kanban board that lets you manage workflow columns (Todo, In Progress, Complete), customize cards, and persist state securely in your browser's localStorage. Demonstrates professional UI state management and client-side memory architectures.",
    features: [
      "Dynamic task status column updates",
      "Persistent state through LocalStorage",
      "Color-coded priority indices",
      "One-click task deletion and column migration"
    ]
  },
  {
    id: "chronos-notepad",
    title: "Chronos Live Notepad",
    category: "utilities",
    tags: ["Text Editor", "File Export", "Auto Save"],
    shortDesc: "A sleek plain-text editor with instant metrics and dynamic export.",
    fullDesc: "A lightweight, beautiful, distraction-free environment for taking notes. Features live word and character counters, automatic draft saving so you never lose progress, and a secure local export module to download drafts directly as standard text (.txt) files.",
    features: [
      "Dynamic character and word counts",
      "Draft auto-save on every keystroke",
      "Immediate file downloader (.txt)",
      "Distraction-free focus writing toggle"
    ]
  },
  {
    id: "aurora-monitor",
    title: "Aurora Telemetry Monitor",
    category: "experiments",
    tags: ["Canvas API", "Charts", "Real-Time Stats"],
    shortDesc: "Live telemetry dashboard simulating modern system node monitors.",
    fullDesc: "An interactive, beautiful real-time dashboard plotting synthetic performance telemetry. Drawn dynamically on an HTML5 canvas element, it monitors CPU nodes, memory clusters, and simulated API response spikes with premium visual line graphs and micro-counters.",
    features: [
      "Double-buffered Canvas graph plotting",
      "Ticking mock API request rate indicators",
      "Smooth Bezier-curve graphics representing telemetry",
      "Pause/Resume tracking state controls"
    ]
  }
];

const SKILL_ITEMS = [
  { name: "HTML5 Semantic Canvas", percentage: 98, category: "Core Web" },
  { name: "CSS3 Flex & Grid Layouts", percentage: 96, category: "Core Web" },
  { name: "Modern ESM JavaScript (ES6+)", percentage: 95, category: "Core Web" },
  { name: "Vite Asset Management", percentage: 90, category: "Workflow Tools" },
  { name: "Performance Optimization", percentage: 88, category: "Workflow Tools" },
  { name: "Responsive UI Architecture", percentage: 97, category: "Design Systems" },
  { name: "Accessible ARIA Design", percentage: 85, category: "Design Systems" }
];

const TIMELINE_DATA = [
  {
    period: "2024 - Present",
    role: "Senior Frontend Interactive Architect",
    company: "Vivid Pixel Labs",
    desc: "Spearheaded frontend engineering and fluid layout animations for elite corporate web projects. Established local state persistent guidelines and unified design systems."
  },
  {
    period: "2022 - 2024",
    role: "Core Web UI Engineer",
    company: "Aether Grid Tech",
    desc: "Engineered ultra-fast loading landing pages using modern vanilla layouts and optimized bundling systems. Achieved standard LCP load times of under 0.6 seconds."
  },
  {
    period: "2019 - 2022",
    role: "Interactive Design Specialist",
    company: "Apex Synthesis Studio",
    desc: "Designed vector art assets, clean responsive email layouts, and vanilla browser engines. Championed semantic structures and cross-platform browser support."
  }
];

// --- 1. THEME AND INITIALIZATION CONTROLLER ---

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initMainClock();
  initTypingSequence();
  initSkillsLoader();
  initProjectsPanel();
  initTimelineTimeline();
  initKanbanApp();
  initNotepadApp();
  initCanvasMonitor();
  initContactController();
  setupNavigationSpy();
});

// App Theme Manager (Dark/Light)
function initTheme() {
  const toggleBtn = document.getElementById("theme-toggle-btn");
  if (!toggleBtn) return;

  const currentTheme = localStorage.getItem("applet-theme") || 
                       (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  if (currentTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  updateThemeUI(currentTheme);

  toggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    const nextTheme = isDark ? "dark" : "light";
    localStorage.setItem("applet-theme", nextTheme);
    updateThemeUI(nextTheme);
  });
}

function updateThemeUI(theme) {
  const moonIcon = document.getElementById("theme-icon-moon");
  const sunIcon = document.getElementById("theme-icon-sun");
  const themeText = document.getElementById("theme-text");

  if (theme === "dark") {
    if (moonIcon) moonIcon.classList.remove("hidden");
    if (sunIcon) sunIcon.classList.add("hidden");
    if (themeText) themeText.textContent = "DARK VISUAL";
  } else {
    if (moonIcon) moonIcon.classList.add("hidden");
    if (sunIcon) sunIcon.classList.remove("hidden");
    if (themeText) themeText.textContent = "LIGHT VISUAL";
  }
}

// GMT UTC / Local Clock Ticking on Hero
function initMainClock() {
  const clockContainer = document.getElementById("hero-dynamic-clock");
  const greetingText = document.getElementById("hero-greeting");
  if (!clockContainer) return;

  const updateClock = () => {
    const now = new Date();
    
    // Greeting depending on current hours
    const hr = now.getHours();
    let greet = "Welcome to my portfolio,";
    if (hr >= 5 && hr < 12) {
      greet = "Good morning,";
    } else if (hr >= 12 && hr < 17) {
      greet = "Good afternoon,";
    } else if (hr >= 17 && hr < 22) {
      greet = "Good evening,";
    } else {
      greet = "Harnessing the night lights,";
    }

    if (greetingText) {
      greetingText.textContent = greet;
    }

    const timeStr = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    
    const zoneStr = "UTC" + (now.getTimezoneOffset() === 0 ? "" : (now.getTimezoneOffset() < 0 ? "+" : "-") + Math.abs(now.getTimezoneOffset() / 60));
    clockContainer.innerHTML = `<span class="font-semibold text-indigo-600 dark:text-indigo-400">${timeStr}</span> <span class="text-xs text-slate-400 ml-1">(${zoneStr})</span>`;
  };

  updateClock();
  setInterval(updateClock, 1000);
}

// Typing Text Carousel
function initTypingSequence() {
  const target = document.getElementById("typing-carousel-item");
  if (!target) return;

  const items = ["Frontend Craftsman", "Vanilla JS Virtuoso", "Interface Developer", "Static Web Specialist"];
  let itemIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 150;

  const type = () => {
    const currentWord = items[itemIndex];
    if (isDeleting) {
      target.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      delay = 60;
    } else {
      target.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      delay = 120;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      delay = 2000; // Stay at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      itemIndex = (itemIndex + 1) % items.length;
      delay = 400;
    }

    setTimeout(type, delay);
  };

  type();
}

// Skills Bento Loaders
function initSkillsLoader() {
  const container = document.getElementById("skills-bento-grid");
  if (!container) return;

  // Render skills with custom design progress bars
  container.innerHTML = SKILL_ITEMS.map((skill, index) => {
    return `
      <div class="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-900 transition-all-300 transform hover:-translate-y-0.5 group" id="skill-card-${index}">
        <div class="flex justify-between items-center mb-2">
          <div>
            <span class="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">${skill.category}</span>
            <h4 class="font-medium text-slate-800 dark:text-slate-100">${skill.name}</h4>
          </div>
          <span class="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">${skill.percentage}%</span>
        </div>
        <div class="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-400 rounded-full transition-all duration-1000 ease-out" style="width: 0%" id="skill-bar-${index}"></div>
        </div>
      </div>
    `;
  }).join("");

  // Trigger loading animation on elements entering view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        SKILL_ITEMS.forEach((skill, idx) => {
          const bar = document.getElementById(`skill-bar-${idx}`);
          if (bar) {
            bar.style.width = skill.percentage + "%";
          }
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(container);
}

// --- 2. PROJECTS FILTER & DETAIL MODAL CONTROLLER ---

function initProjectsPanel() {
  const grid = document.getElementById("projects-showcase-grid");
  const filterButtons = document.querySelectorAll(".project-filter-btn");
  const searchInput = document.getElementById("project-search-bar");

  if (!grid) return;

  const renderProjects = (filter = "all", searchQuery = "") => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = RECENT_PROJECTS.filter(p => {
      const matchFilter = (filter === "all" || p.category === filter);
      const matchSearch = (p.title.toLowerCase().includes(q) || 
                           p.shortDesc.toLowerCase().includes(q) || 
                           p.tags.some(t => t.toLowerCase().includes(q)));
      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
          <p class="font-mono text-sm">No Projects Match Selected Queries</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(p => {
      const tagLabels = p.tags.map(t => `<span class="px-2 py-0.5 text-[10px] font-mono leading-none border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded dark:bg-slate-900 bg-slate-50">${t}</span>`).join(" ");
      return `
        <div class="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm group hover:border-indigo-400 dark:hover:border-indigo-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between" id="project-card-${p.id}">
          <div class="p-6">
            <div class="flex justify-between items-center mb-3">
              <span class="text-xs uppercase font-mono tracking-wider text-indigo-500 dark:text-indigo-400 font-medium">${p.category}</span>
              <div class="flex space-x-1">
                <span class="h-2 w-2 rounded-full bg-rose-500"></span>
                <span class="h-2 w-2 rounded-full bg-amber-500"></span>
                <span class="h-2 w-2 rounded-full bg-green-500"></span>
              </div>
            </div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${p.title}</h3>
            <p class="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">${p.shortDesc}</p>
            <div class="flex flex-wrap gap-1.5 mb-2">${tagLabels}</div>
          </div>
          <div class="p-6 pt-0 border-t border-slate-100 dark:border-slate-900 mt-auto flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/10">
            <button class="text-xs font-mono font-medium text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-2 flex items-center cursor-pointer" onclick="openProjectModal('${p.id}')">
              VIEW SPECIFICATIONS &rarr;
            </button>
            <a href="#demo-${p.id}" class="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all">
              Launch Demo
            </a>
          </div>
        </div>
      `;
    }).join("");
  };

  // Switch Filters
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("bg-indigo-600", "text-white", "dark:bg-indigo-500"));
      filterButtons.forEach(b => b.classList.add("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300"));
      
      btn.classList.remove("bg-slate-100", "dark:bg-slate-800", "text-slate-700", "dark:text-slate-300");
      btn.classList.add("bg-indigo-600", "text-white", "dark:bg-indigo-500");

      const filterVal = btn.dataset.filter;
      renderProjects(filterVal, searchInput ? searchInput.value : "");
    });
  });

  // Search Queries
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const currentActiveBtn = document.querySelector(".project-filter-btn.text-white");
      const activeFilter = currentActiveBtn ? currentActiveBtn.dataset.filter : "all";
      renderProjects(activeFilter, e.target.value);
    });
  }

  // Initial draw
  renderProjects();
}

// Open Deep Specification Modal
window.openProjectModal = function(id) {
  const project = RECENT_PROJECTS.find(p => p.id === id);
  if (!project) return;

  const modal = document.getElementById("project-specification-modal");
  const modalTitle = document.getElementById("modal-project-title");
  const modalCategory = document.getElementById("modal-project-category");
  const modalFullDesc = document.getElementById("modal-project-fulldesc");
  const modalFeatures = document.getElementById("modal-project-features-list");
  
  if (!modal || !modalTitle || !modalCategory || !modalFullDesc || !modalFeatures) return;

  modalTitle.textContent = project.title;
  modalCategory.textContent = "CATEGORY: " + project.category.toUpperCase();
  modalFullDesc.textContent = project.fullDesc;

  // Populate Features Checklist
  modalFeatures.innerHTML = project.features.map(f => {
    return `
      <li class="flex items-start text-sm text-slate-700 dark:text-slate-300">
        <span class="text-emerald-500 mr-2 font-semibold">✓</span>
        <span>${f}</span>
      </li>
    `;
  }).join("");

  // Show Modal
  modal.classList.remove("opacity-0", "pointer-events-none");
  modal.querySelector(".modal-card").classList.remove("scale-95");
  modal.querySelector(".modal-card").classList.add("scale-100");
  document.body.style.overflow = "hidden"; // Prevent page scroll
};

window.closeProjectModal = function() {
  const modal = document.getElementById("project-specification-modal");
  if (!modal) return;

  modal.classList.add("opacity-0", "pointer-events-none");
  modal.querySelector(".modal-card").classList.remove("scale-100");
  modal.querySelector(".modal-card").classList.add("scale-95");
  document.body.style.overflow = ""; // Re-enable scroll
};

// --- 3. TIMELINE EVENTS CONTROLLER ---

function initTimelineTimeline() {
  const timelineNode = document.getElementById("timeline-interactive-path");
  if (!timelineNode) return;

  timelineNode.innerHTML = TIMELINE_DATA.map((t, idx) => {
    return `
      <div class="relative pl-8 pb-8 last:pb-0 group" id="timeline-node-${idx}">
        <!-- Vertical connector line segment -->
        <span class="absolute left-[7px] top-[24px] bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 group-last:hidden transition-colors group-hover:bg-indigo-300 dark:group-hover:bg-indigo-900"></span>
        
        <!-- Interactive node icon -->
        <span class="absolute left-0 top-1.5 w-4.5 h-4.5 rounded-full border-2 border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center group-hover:border-indigo-500 dark:group-hover:border-indigo-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950/20 transition-all duration-300">
          <span class="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-400 transition-all"></span>
        </span>

        <span class="text-xs font-mono font-semibold tracking-wider text-indigo-500 dark:text-indigo-400 block mb-1">${t.period}</span>
        <h4 class="text-md font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${t.role}</h4>
        <span class="text-xs font-mono text-slate-400">${t.company}</span>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-2xl">${t.desc}</p>
      </div>
    `;
  }).join("");
}

// --- 4. EMBEDDED WIDGETS (APEX KANBAN) ---

function initKanbanApp() {
  const form = document.getElementById("kb-task-form");
  const input = document.getElementById("kb-task-input");
  const prioritySelect = document.getElementById("kb-task-priority");
  
  // Columns
  const todoCol = document.getElementById("kb-col-todo");
  const progressCol = document.getElementById("kb-col-progress");
  const doneCol = document.getElementById("kb-col-done");

  if (!todoCol || !progressCol || !doneCol) return;

  const getSavedTasks = () => {
    try {
      const raw = localStorage.getItem("apex-tasks");
      return raw ? JSON.parse(raw) : [
        { id: "task-1", text: "Create high-performance assets", status: "todo", priority: "high" },
        { id: "task-2", text: "Audit local storage state integrity", status: "progress", priority: "medium" },
        { id: "task-3", text: "Remove unneeded CSS lines", status: "done", priority: "low" }
      ];
    } catch {
      return [];
    }
  };

  let tasks = getSavedTasks();

  const saveTasks = () => {
    localStorage.setItem("apex-tasks", JSON.stringify(tasks));
  };

  const renderKanban = () => {
    todoCol.innerHTML = "";
    progressCol.innerHTML = "";
    doneCol.innerHTML = "";

    const counts = { todo: 0, progress: 0, done: 0 };

    tasks.forEach(task => {
      counts[task.status]++;
      const card = document.createElement("div");
      card.className = `p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col justify-between transition-all hover:border-indigo-400 dark:hover:border-indigo-700 select-none group/card`;
      card.id = `kb-card-${task.id}`;

      let priorityBadgeColor = "text-green-600 bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900";
      if (task.priority === "high") {
        priorityBadgeColor = "text-rose-600 bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900";
      } else if (task.priority === "medium") {
        priorityBadgeColor = "text-amber-600 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900";
      }

      card.innerHTML = `
        <div class="flex items-start justify-between mb-2 gap-3">
          <p class="text-sm font-medium text-slate-800 dark:text-slate-100 leading-snug">${task.text}</p>
          <button class="text-slate-400 hover:text-rose-600 py-0.5 px-1 cursor-pointer transition-colors" title="Delete Task" onclick="deleteKanbanTask('${task.id}')">
            ×
          </button>
        </div>
        <div class="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-850">
          <span class="text-[10px] font-mono border rounded px-1.5 leading-none uppercase ${priorityBadgeColor}">
            ${task.priority}
          </span>
          <div class="flex space-x-1">
            ${task.status !== "todo" ? `
              <button class="px-1.5 py-0.5 rounded text-[10px] uppercase font-mono bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 cursor-pointer" onclick="moveKanbanTask('${task.id}', 'prev')">
                &larr;
              </button>
            `: ""}
            ${task.status !== "done" ? `
              <button class="px-1.5 py-0.5 rounded text-[10px] uppercase font-mono bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 cursor-pointer" onclick="moveKanbanTask('${task.id}', 'next')">
                &rarr;
              </button>
            `: ""}
          </div>
        </div>
      `;

      if (task.status === "todo") todoCol.appendChild(card);
      else if (task.status === "progress") progressCol.appendChild(card);
      else if (task.status === "done") doneCol.appendChild(card);
    });

    // Update column sizes
    document.getElementById("kb-count-todo").textContent = counts.todo;
    document.getElementById("kb-count-progress").textContent = counts.progress;
    document.getElementById("kb-count-done").textContent = counts.done;
  };

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      const priority = prioritySelect.value;
      const newTask = {
        id: "task-" + Date.now(),
        text,
        status: "todo",
        priority
      };

      tasks.push(newTask);
      saveTasks();
      renderKanban();
      input.value = "";
    });
  }

  // Exposed Actions globally
  window.deleteKanbanTask = function(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderKanban();
  };

  window.moveKanbanTask = function(taskId, direction) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const statuses = ["todo", "progress", "done"];
    const currIndex = statuses.indexOf(task.status);
    let nextIndex = currIndex;

    if (direction === "next" && currIndex < 2) nextIndex++;
    else if (direction === "prev" && currIndex > 0) nextIndex--;

    task.status = statuses[nextIndex];
    saveTasks();
    renderKanban();
  };

  // Initial draw
  renderKanban();
}

// --- 5. EMBEDDED WIDGETS (CHRONOS NOTEPAD) ---

function initNotepadApp() {
  const textarea = document.getElementById("notepad-editor");
  const clearBtn = document.getElementById("notepad-clear-btn");
  const saveBtn = document.getElementById("notepad-save-btn");
  const wordsCounter = document.getElementById("notepad-words-count");
  const charsCounter = document.getElementById("notepad-chars-count");
  const autoSavedIndicator = document.getElementById("notepad-autosave-indicator");

  if (!textarea) return;

  // Load existing draft
  const savedDraft = localStorage.getItem("chronos-draft") || "";
  textarea.value = savedDraft;

  const updateMetrics = () => {
    const text = textarea.value;
    const chars = text.length;
    
    const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
    if (wordsCounter) wordsCounter.textContent = words;
    if (charsCounter) charsCounter.textContent = chars;
  };

  // Update stats & auto save on key input
  let autoSaveTimeout;
  textarea.addEventListener("input", () => {
    updateMetrics();

    if (autoSavedIndicator) {
      autoSavedIndicator.textContent = "Saving...";
      autoSavedIndicator.className = "text-[10px] font-mono text-indigo-500";
    }

    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      localStorage.setItem("chronos-draft", textarea.value);
      if (autoSavedIndicator) {
        autoSavedIndicator.textContent = "Saved Local Draft";
        autoSavedIndicator.className = "text-[10px] font-mono text-emerald-500 dark:text-emerald-400";
      }
    }, 1000);
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("Clear notepad? All unsaved inputs will be lost.")) {
        textarea.value = "";
        localStorage.removeItem("chronos-draft");
        updateMetrics();
        if (autoSavedIndicator) {
          autoSavedIndicator.textContent = "notepad Cleared";
          autoSavedIndicator.className = "text-[10px] font-mono text-slate-400";
        }
      }
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const textVal = textarea.value;
      if (!textVal.trim()) {
        alert("The notepad is empty. Cannot export file.");
        return;
      }

      // Export as local file
      const blob = new Blob([textVal], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `chronos_note_${new Date().toISOString().slice(0, 10)}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  // Draw initially
  updateMetrics();
}

// --- 6. EMBEDDED WIDGETS (AURORA CANVAS GRAPH) ---

function initCanvasMonitor() {
  const canvas = document.getElementById("aurora-canvas-chart");
  const statsLabel = document.getElementById("aurora-api-rate");
  const playBtn = document.getElementById("aurora-play-trigger");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let animationId = null;
  let isRunning = true;

  // Track coordinates for graph line
  const maxDataPoints = 40;
  const dataPoints = Array(maxDataPoints).fill(30);

  // Resize Listener support
  const scaleCanvas = () => {
    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.clientWidth * window.devicePixelRatio;
      canvas.height = 140 * window.devicePixelRatio;
      canvas.style.width = parent.clientWidth + "px";
      canvas.style.height = "140px";
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  };

  scaleCanvas();
  window.addEventListener("resize", scaleCanvas);

  const drawGrid = (w, h) => {
    ctx.strokeStyle = document.documentElement.classList.contains("dark") ? "#1e293b" : "#e2e8f0";
    ctx.lineWidth = 1;
    
    // Draw 4 vertical grid dividers
    for (let i = 1; i < 4; i++) {
      const x = (w / 4) * i;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    // Draw 2 horizontal grid dividers
    for (let i = 1; i < 3; i++) {
      const y = (h / 3) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const tick = () => {
    if (!isRunning) return;

    const w = canvas.width / window.devicePixelRatio;
    const h = canvas.height / window.devicePixelRatio;

    ctx.clearRect(0, 0, w, h);
    drawGrid(w, h);

    // Shifts endpoints and inject a randomized jitter value representing performance metric
    dataPoints.shift();
    const lastValue = dataPoints[dataPoints.length - 1];
    
    // Target base telemetry between 20px and h-20px
    const targetBase = 60 + Math.sin(Date.now() / 1500) * 15;
    const noise = (Math.random() - 0.5) * 15;
    const finalVal = Math.max(10, Math.min(h - 10, targetBase + noise));
    dataPoints.push(finalVal);

    // Render smooth gradient filled plot
    ctx.strokeStyle = "#6366f1";
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const segmentWidth = w / (maxDataPoints - 1);
    
    ctx.moveTo(0, h - dataPoints[0]);
    for (let i = 1; i < maxDataPoints; i++) {
      const x = i * segmentWidth;
      const y = h - dataPoints[i];
      
      // Interpolate curves smoothing transition segments
      const prevX = (i - 1) * segmentWidth;
      const prevY = h - dataPoints[i - 1];
      ctx.bezierCurveTo(prevX + segmentWidth / 2, prevY, x - segmentWidth / 2, y, x, y);
    }
    ctx.stroke();

    // Render underlying layout mask gradient shadow fill
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    
    const fillGlow = ctx.createLinearGradient(0, 0, 0, h);
    fillGlow.addColorStop(0, "rgba(99, 102, 241, 0.25)");
    fillGlow.addColorStop(1, "rgba(99, 102, 241, 0.0)");
    ctx.fillStyle = fillGlow;
    ctx.fill();

    // Set interactive visual metrics readout
    if (statsLabel) {
      const rateVal = Math.round((h - finalVal) + 50);
      statsLabel.textContent = `${rateVal} ms`;
      if (rateVal > 110) {
        statsLabel.className = "text-amber-500 font-semibold font-mono";
      } else {
        statsLabel.className = "text-indigo-600 dark:text-indigo-400 font-semibold font-mono";
      }
    }

    animationId = requestAnimationFrame(tick);
  };

  // Setup pause controllers
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      isRunning = !isRunning;
      playBtn.textContent = isRunning ? "PAUSE FEED" : "RESUME FEED";
      if (isRunning) {
        tick();
      } else {
        cancelAnimationFrame(animationId);
      }
    });
  }

  tick();
}

// --- 7. CONTACT & LOCAL ARCHIVE ADMINISTRATION CONTROLLER ---

function initContactController() {
  const form = document.getElementById("contact-web-form");
  const nameInput = document.getElementById("form-name");
  const emailInput = document.getElementById("form-email");
  const messageInput = document.getElementById("form-message");
  
  const draftLabel = document.getElementById("form-draft-label");
  const successBox = document.getElementById("form-submit-success-box");

  // Admin section
  const adminToggle = document.getElementById("admin-tab-toggle");
  const adminPanel = document.getElementById("admin-inbox-section");
  const adminLogsGrid = document.getElementById("admin-logs-grid");
  const adminFilterInput = document.getElementById("admin-filter-query");
  const adminExportBtn = document.getElementById("admin-export-btn");

  if (!form) return;

  // Auto load contact form draft
  try {
    const rawForm = localStorage.getItem("contact-form-draft");
    if (rawForm) {
      const parsed = JSON.parse(rawForm);
      if (nameInput) nameInput.value = parsed.name || "";
      if (emailInput) emailInput.value = parsed.email || "";
      if (messageInput) messageInput.value = parsed.message || "";
    }
  } catch (err) {}

  // Auto Save draft inputs on change
  const saveContactDraft = () => {
    const data = {
      name: nameInput ? nameInput.value.trim() : "",
      email: emailInput ? emailInput.value.trim() : "",
      message: messageInput ? messageInput.value.trim() : ""
    };
    localStorage.setItem("contact-form-draft", JSON.stringify(data));
    if (draftLabel) {
      if (data.name || data.email || data.message) {
        draftLabel.textContent = "Writing Draft (Auto Saved)...";
        draftLabel.classList.remove("opacity-0");
      } else {
        draftLabel.classList.add("opacity-0");
      }
    }
  };

  [nameInput, emailInput, messageInput].forEach(inp => {
    if (inp) inp.addEventListener("input", saveContactDraft);
  });

  // Load submissions
  const getSubmissions = () => {
    try {
      const raw = localStorage.getItem("received-messages-log");
      return raw ? JSON.parse(raw) : [
        {
          id: "msg-sample-1",
          name: "Jessica Vance",
          email: "jessica@stellaragency.co",
          message: "Interested in hiring you for a static interface replica! Loved the portfolio layout, let us set an appointment next Monday morning.",
          timestamp: "2026-05-21T14:40:02Z",
          isRead: false
        }
      ];
    } catch {
      return [];
    }
  };

  let messages = getSubmissions();

  const saveSubmissions = () => {
    localStorage.setItem("received-messages-log", JSON.stringify(messages));
  };

  const drawAdminSubmissions = () => {
    if (!adminLogsGrid) return;

    const query = adminFilterInput ? adminFilterInput.value.toLowerCase().trim() : "";
    const filtered = messages.filter(m => {
      return m.name.toLowerCase().includes(query) || 
             m.email.toLowerCase().includes(query) || 
             m.message.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      adminLogsGrid.innerHTML = `
        <div class="col-span-full py-8 text-center text-slate-400 dark:text-slate-500 font-mono text-xs border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          No Logged Submissions Match Query
        </div>
      `;
      return;
    }

    adminLogsGrid.innerHTML = filtered.map(m => {
      const dateStr = new Date(m.timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });

      return `
        <div class="p-4 bg-slate-50 dark:bg-slate-900 border ${m.isRead ? "border-slate-200 dark:border-slate-800" : "border-indigo-400 dark:border-indigo-800 bg-indigo-50/10 dark:bg-indigo-950/5"} rounded-xl transition-all hover:shadow-sm" id="msg-id-${m.id}">
          <div class="flex justify-between items-start mb-2 gap-2">
            <div>
              <h5 class="font-semibold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                ${m.name}
                ${!m.isRead ? `<span class="h-2 w-2 rounded-full bg-indigo-600 block" title="New Message"></span>` : ""}
              </h5>
              <span class="text-xs font-mono text-slate-400">${m.email}</span>
            </div>
            <span class="text-[10px] font-mono text-slate-400 shrink-0">${dateStr}</span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-350 leading-relaxed mb-4 whitespace-pre-wrap">${m.message}</p>
          <div class="flex gap-2 pt-2 border-t border-slate-150 dark:border-slate-800">
            <button class="text-[10px] font-mono uppercase font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer" onclick="toggleReadMessage('${m.id}')">
              Mark ${m.isRead ? "Unread" : "Read"}
            </button>
            <span class="text-slate-300 dark:text-slate-700">|</span>
            <button class="text-[10px] font-mono uppercase font-semibold text-rose-500 hover:underline cursor-pointer" onclick="deleteMessage('${m.id}')">
              Delete
            </button>
          </div>
        </div>
      `;
    }).join("");
  };

  // Submit Contact Form Handler
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";

    if (!name || !email || !message) {
      alert("Please populate all text fields before submitting form.");
      return;
    }

    const newSubStr = {
      id: "msg-" + Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    messages.unshift(newSubStr); // Insert at index 0 leading
    saveSubmissions();

    // Clear Drafts
    localStorage.removeItem("contact-form-draft");
    if (form) form.reset();
    if (draftLabel) draftLabel.classList.add("opacity-0");

    // Success banner feedback animation
    if (successBox) {
      successBox.classList.remove("hidden");
      successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
      
      // Auto dismiss success toast after 6s
      setTimeout(() => {
        successBox.classList.add("hidden");
      }, 6000);
    }

    // Refresh Log Box
    drawAdminSubmissions();
  });

  // Admin Logs Filtering
  if (adminFilterInput) {
    adminFilterInput.addEventListener("input", drawAdminSubmissions);
  }

  // Admin Log Operations
  window.toggleReadMessage = function(id) {
    const msg = messages.find(m => m.id === id);
    if (msg) {
      msg.isRead = !msg.isRead;
      saveSubmissions();
      drawAdminSubmissions();
    }
  };

  window.deleteMessage = function(id) {
    messages = messages.filter(m => m.id !== id);
    saveSubmissions();
    drawAdminSubmissions();
  };

  // Secret Dev Admin panel toggle button
  if (adminToggle) {
    adminToggle.addEventListener("click", () => {
      adminPanel.classList.toggle("hidden");
      if (!adminPanel.classList.contains("hidden")) {
        adminPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  // Export Archive Log to JSON File
  if (adminExportBtn) {
    adminExportBtn.addEventListener("click", () => {
      if (messages.length === 0) {
        alert("The Message log index contains zero entries. No download constructed.");
        return;
      }
      const rawJSON = JSON.stringify(messages, null, 2);
      const blob = new Blob([rawJSON], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `lucent_inbox_log_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  // Initial draw
  drawAdminSubmissions();
}

// --- 8. SCROLL-SPY ACTIVE INDEX INDICATORS ---

function setupNavigationSpy() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-spy-target");

  window.addEventListener("scroll", () => {
    let currentId = "home";

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 180)) {
        currentId = section.getAttribute("id") || "home";
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("text-indigo-600", "dark:text-indigo-400", "font-semibold");
      link.classList.add("text-slate-600", "dark:text-slate-350");

      const href = link.getAttribute("href");
      if (href === `#${currentId}`) {
        link.classList.remove("text-slate-600", "dark:text-slate-350");
        link.classList.add("text-indigo-600", "dark:text-indigo-400", "font-semibold");
      }
    });
  });
}
