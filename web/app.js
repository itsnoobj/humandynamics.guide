// --- Data ---
const chapter = {
  story: `## The Situation

You're rolling out something objectively better — a new tool, a simpler process, a restructure that gives people more autonomy. You've done the work. The logic is airtight.

And yet. People drag their feet. They find reasons it won't work. They nod in meetings and do nothing after.

You're not fighting the change. You're fighting something deeper.

## The Story

Five monkeys are placed in a cage. At the top of a ladder sits a banana. Every time one monkey climbs up to grab it, all five get blasted with cold water.

Soon, no monkey climbs. They've learned: reaching up means pain for everyone.

Then one monkey is replaced. The new one sees the banana, starts climbing — and the other four pull it down. Hard. No water comes. But the beating does.

One by one, every original monkey is replaced. None of the new monkeys have ever been sprayed. But every one of them has been pulled down for trying to climb.

Now you have five monkeys. None have ever experienced the water. None will climb the ladder. If you asked them why, they couldn't tell you. "That's just how things are done here."

## The Contrast

In the 1990s, Kodak engineers built one of the first digital cameras. They showed it to leadership. The response wasn't excitement — it was burial.

Everyone at Kodak had built their identity, expertise, and daily routines around film. Digital wasn't just a new product. It was a threat to who they were.

They didn't lack information. They lacked the willingness to let go of a self-image that was already dying. Kodak filed for bankruptcy in 2012.

## The Principle

People don't resist change. They resist loss.

Every change asks someone to give something up — familiarity, competence, status, identity, comfort. The new thing might be better in the future, but the loss is felt right now. And the brain weighs losses roughly twice as heavily as gains.

## Why It Happens

Three forces working together:

Identity threat. If I've spent 10 years mastering a process and you replace it, you're not just changing a tool — you're telling me my expertise is obsolete. My competence was my status. Now I'm a beginner again.

Loss aversion. Psychologically, losing 100 dollars hurts more than gaining 200 feels good. Change is always framed as "give up the known for the uncertain." The math never feels fair.

Mere exposure effect. We prefer things simply because they're familiar. The current way — however broken — feels safe because it's known.

## The Move

1. Name the loss — before selling the gain, acknowledge what people are giving up.

2. Make the first step tiny — not "we're migrating everything." Instead: "Try it for one task this week."

3. Let the early adopters be proof — don't argue theoretically. Let one team go first and succeed visibly.

4. Protect status during transition — the expert in the old system? Make them the guide in the new one.

5. Give it time, but not infinite time — set a clear horizon. Ambiguity feeds resistance; deadlines force adaptation.`,

  quiz: [
    {
      situation: "Your team won't adopt the new process. You've shown them the data three times. Nothing moves.",
      options: [
        { text: "Show even more data — a side-by-side comparison with numbers", correct: false, feedback: "You're arguing with emotion using reason. The resistance isn't logical — it's emotional." },
        { text: "Say: 'I know this means re-learning something you're already good at. That's real.'", correct: true, feedback: "Naming the loss opens the door. People need to feel that their discomfort is seen, not dismissed." },
        { text: "Escalate — get leadership to mandate the switch", correct: false, feedback: "Forced change confirms their fear. It hardens resistance into identity." }
      ]
    },
    {
      situation: "You acknowledged the loss. They seem more open. Next step?",
      options: [
        { text: "Announce full migration starting next week", correct: false, feedback: "Too big, too fast. You lowered defenses — then triggered the identity threat again." },
        { text: "Ask one volunteer to try it for one small task this week", correct: true, feedback: "Small enough to stay below the threat threshold. One person succeeding becomes proof for everyone else." },
        { text: "Run a 2-hour training session for everyone", correct: false, feedback: "Training assumes the problem is knowledge. But they're not confused — they're afraid." }
      ]
    },
    {
      situation: "One person tried it and loved it. But the team expert in the old system feels threatened.",
      options: [
        { text: "Tell them the old system is going away whether they like it or not", correct: false, feedback: "You just confirmed their worst fear — their expertise is worthless now." },
        { text: "Ignore their concerns — focus on the adopters", correct: false, feedback: "They're influential. Ignoring them means they'll quietly undermine the change." },
        { text: "Make them the guide for the new system — their expertise gets a new home", correct: true, feedback: "Protect status during transition. Their competence isn't deleted — it's redirected." }
      ]
    }
  ],

  principle: "People don't resist change. They resist loss.",
  subtext: "Every change asks someone to give up familiarity, competence, or status. The brain weighs losses roughly twice as heavily as equivalent gains.",
  reflection: "What change am I currently resisting — and what's the loss I'm actually afraid of?"
};

// Map nodes — Mario World Map style: nodes at path intersections
const nodes = [
  { id: 26, x: 100, y: 400, label: "1", title: "Hidden Motives", status: "done" },
  { id: 27, x: 250, y: 400, label: "2", title: "Gaming Metrics", status: "done" },
  { id: 28, x: 400, y: 400, label: "3", title: "Promotions", status: "done" },
  { id: 31, x: 400, y: 260, label: "4", title: "Resisting Change", status: "current" },
  { id: 32, x: 550, y: 260, label: "5", title: "Ownership", status: "locked" },
  { id: 33, x: 550, y: 130, label: "6", title: "Meeting Theatre", status: "locked" },
  { id: 73, x: 400, y: 130, label: "7", title: "Org Change", status: "locked" },
];

// Paths between nodes (edges)
const edges = [[26,27],[27,28],[28,31],[31,32],[32,33],[33,73]];

// --- Views ---
function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// --- World Map (Mario-style) ---
function renderMap() {
  const svg = document.getElementById('map-svg');
  svg.innerHTML = '';
  const nodeMap = {};
  nodes.forEach(n => nodeMap[n.id] = n);

  // Draw paths — thick white dots (Mario's signature dotted path)
  edges.forEach(([fromId, toId]) => {
    const a = nodeMap[fromId], b = nodeMap[toId];
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', a.x); line.setAttribute('y1', a.y);
    line.setAttribute('x2', b.x); line.setAttribute('y2', b.y);

    // Gold for completed path segments, white for rest
    const bothDone = a.status === 'done' && (b.status === 'done' || b.status === 'current');
    line.setAttribute('stroke', bothDone ? '#DAA520' : '#FFFFFF');
    line.setAttribute('stroke-width', '5');
    line.setAttribute('stroke-dasharray', '2 10');
    line.setAttribute('stroke-linecap', 'round');
    svg.appendChild(line);
  });

  // Draw nodes
  nodes.forEach(n => {
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.style.cursor = n.status === 'locked' ? 'default' : 'pointer';

    // Outer ring for current (pulsing)
    if (n.status === 'current') {
      const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      pulse.setAttribute('cx', n.x); pulse.setAttribute('cy', n.y); pulse.setAttribute('r', '24');
      pulse.setAttribute('fill', 'none'); pulse.setAttribute('stroke', '#DAA520'); pulse.setAttribute('stroke-width', '2');
      const aR = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      aR.setAttribute('attributeName', 'r'); aR.setAttribute('from', '24'); aR.setAttribute('to', '34');
      aR.setAttribute('dur', '1.5s'); aR.setAttribute('repeatCount', 'indefinite');
      const aO = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
      aO.setAttribute('attributeName', 'opacity'); aO.setAttribute('from', '0.8'); aO.setAttribute('to', '0');
      aO.setAttribute('dur', '1.5s'); aO.setAttribute('repeatCount', 'indefinite');
      pulse.appendChild(aR); pulse.appendChild(aO);
      g.appendChild(pulse);
    }

    // Node circle
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', n.x); circle.setAttribute('cy', n.y);
    circle.setAttribute('r', '22');
    if (n.status === 'done') {
      circle.setAttribute('fill', '#DAA520'); circle.setAttribute('stroke', '#FFF'); circle.setAttribute('stroke-width', '3');
    } else if (n.status === 'current') {
      circle.setAttribute('fill', '#FFF'); circle.setAttribute('stroke', '#DAA520'); circle.setAttribute('stroke-width', '3');
    } else {
      circle.setAttribute('fill', '#444'); circle.setAttribute('stroke', '#666'); circle.setAttribute('stroke-width', '2');
    }
    g.appendChild(circle);

    // Label (number or star)
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', n.x); text.setAttribute('y', n.y + 6);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-family', 'IBM Plex Sans, sans-serif');
    text.setAttribute('font-weight', '600');
    if (n.status === 'done') {
      text.textContent = '★'; text.setAttribute('font-size', '18'); text.setAttribute('fill', '#FFF');
    } else if (n.status === 'current') {
      text.textContent = n.label; text.setAttribute('font-size', '16'); text.setAttribute('fill', '#1A1A1A');
    } else {
      text.textContent = n.label; text.setAttribute('font-size', '14'); text.setAttribute('fill', '#888');
    }
    g.appendChild(text);

    // Title below node
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', n.x); title.setAttribute('y', n.y + 42);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-family', 'IBM Plex Sans, sans-serif');
    title.setAttribute('font-size', '11'); title.setAttribute('font-weight', '400');
    title.setAttribute('fill', n.status === 'locked' ? '#666' : '#CCC');
    title.textContent = n.title;
    g.appendChild(title);

    // Click
    if (n.status !== 'locked') {
      g.addEventListener('click', () => { if (n.id === 31) showView('chapter-view'); });
    }
    svg.appendChild(g);
  });

  // Player indicator — small triangle above current node
  const curr = nodes.find(n => n.status === 'current');
  if (curr) {
    const tri = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    const tx = curr.x, ty = curr.y - 34;
    tri.setAttribute('points', `${tx},${ty} ${tx-7},${ty-12} ${tx+7},${ty-12}`);
    tri.setAttribute('fill', '#DAA520');
    // Bounce animation
    const bounce = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
    bounce.setAttribute('attributeName', 'transform'); bounce.setAttribute('type', 'translate');
    bounce.setAttribute('values', '0 0; 0 -4; 0 0'); bounce.setAttribute('dur', '1s');
    bounce.setAttribute('repeatCount', 'indefinite');
    tri.appendChild(bounce);
    svg.appendChild(tri);
  }
}

// --- Chapter Story ---
function renderStory() {
  const container = document.getElementById('story-text');
  const sections = chapter.story.split(/^## /m).filter(Boolean);
  let html = '';
  sections.forEach(sec => {
    const lines = sec.trim().split('\n');
    const title = lines[0];
    const body = lines.slice(1).join('\n').trim();
    html += `<h3>${title}</h3>`;
    body.split('\n\n').forEach(p => {
      if (p.trim()) html += `<p>${p.trim()}</p>`;
    });
  });
  container.innerHTML = html;
}

// --- Audio ---
function initAudio() {
  const audio = document.getElementById('audio-player');
  const btn = document.getElementById('audio-toggle');
  const bar = document.getElementById('audio-bar');
  const time = document.getElementById('audio-time');
  const progress = document.querySelector('.audio-progress');

  btn.addEventListener('click', () => {
    if (audio.paused) { audio.play(); btn.textContent = '❚❚ Pause'; btn.classList.add('playing'); }
    else { audio.pause(); btn.textContent = '▶ Listen'; btn.classList.remove('playing'); }
  });

  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      bar.style.width = (audio.currentTime / audio.duration * 100) + '%';
      const m = Math.floor(audio.currentTime / 60);
      const s = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
      time.textContent = `${m}:${s}`;
    }
  });

  progress.addEventListener('click', (e) => {
    const rect = progress.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });

  audio.addEventListener('ended', () => {
    btn.textContent = '▶ Listen'; btn.classList.remove('playing');
  });
}

// --- Quiz ---
let quizIndex = 0;

function renderQuiz() {
  const q = chapter.quiz[quizIndex];
  const progress = document.getElementById('quiz-progress');
  const situation = document.getElementById('quiz-situation');
  const options = document.getElementById('quiz-options');
  const feedback = document.getElementById('quiz-feedback');

  // Progress dots
  progress.innerHTML = chapter.quiz.map((_, i) =>
    `<div class="quiz-dot ${i < quizIndex ? 'done' : i === quizIndex ? 'current' : ''}"></div>`
  ).join('');

  situation.textContent = q.situation;
  feedback.classList.add('hidden');
  feedback.className = 'quiz-feedback hidden';

  options.innerHTML = q.options.map((opt, i) =>
    `<button class="quiz-option" data-index="${i}">${opt.text}</button>`
  ).join('');

  // Option click
  options.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
  });
}

function handleAnswer(idx) {
  const q = chapter.quiz[quizIndex];
  const opt = q.options[idx];
  const options = document.getElementById('quiz-options');
  const feedback = document.getElementById('quiz-feedback');

  // Disable all options
  options.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === idx) btn.classList.add(opt.correct ? 'correct' : 'wrong');
    if (q.options[i].correct) btn.classList.add('correct');
  });

  // Show feedback
  feedback.textContent = opt.feedback;
  feedback.classList.remove('hidden');
  feedback.classList.add(opt.correct ? 'correct' : 'wrong');

  // Next button
  const next = document.createElement('button');
  next.className = 'quiz-next';
  next.textContent = quizIndex < chapter.quiz.length - 1 ? 'Next →' : 'See Principle →';
  next.addEventListener('click', () => {
    quizIndex++;
    if (quizIndex < chapter.quiz.length) renderQuiz();
    else showCompletion();
  });
  feedback.appendChild(next);
}

function showCompletion() {
  document.getElementById('complete-principle').textContent = chapter.principle;
  document.getElementById('complete-subtext').textContent = chapter.subtext;
  document.getElementById('reflection-question').textContent = chapter.reflection;
  showView('complete-view');
}

// --- Navigation ---
document.getElementById('back-to-map').addEventListener('click', () => showView('world-map'));
document.getElementById('start-quiz').addEventListener('click', () => { quizIndex = 0; renderQuiz(); showView('quiz-view'); });
document.getElementById('quiz-back').addEventListener('click', () => showView('chapter-view'));
document.getElementById('back-to-map-final').addEventListener('click', () => {
  if (params.get('from') === 'game') {
    // Return to game, increment chapter
    const progress = JSON.parse(localStorage.getItem('gameProgress') || '{}');
    progress.currentChapter = (progress.currentChapter || 0) + 1;
    progress.score = (progress.score || 0) + 1;
    localStorage.setItem('gameProgress', JSON.stringify(progress));
    window.location.href = 'game.html?resume=1';
    return;
  }
  // Normal map flow
  const node = nodes.find(n => n.id === 31);
  if (node) node.status = 'done';
  nodes.forEach(n => { if (n.id === 32 || n.id === 33) n.status = 'unlocked'; });
  renderMap();
  showView('world-map');
});

// --- Init ---
renderMap();
renderStory();
initAudio();

// --- Handle coming from game ---
const params = new URLSearchParams(window.location.search);
if (params.get('from') === 'game') {
  showView('chapter-view');
  document.getElementById('back-to-map-final').textContent = 'Continue Running →';
}

// --- Theme Toggle ---
const toggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', saved);
toggle.textContent = saved === 'dark' ? '☀' : '☾';

toggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  toggle.textContent = next === 'dark' ? '☀' : '☾';
});
