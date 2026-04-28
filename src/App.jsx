import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Upload, Box, Home, Settings2, Camera, Sun, Moon, Download, 
  ChevronRight, Search, LayoutGrid, Image as ImageIcon, CheckCircle2, 
  Clock, ArrowLeft, Layers, Palette, Users, Car, CloudSun, Maximize2, 
  Minimize2, RefreshCcw, Sparkles, DoorOpen, DoorClosed, Info, Send, 
  Zap, Lock, Unlock, CreditCard, Building2, LogOut, MousePointer2, 
  Gamepad2, MapPin, UserPlus, MoreVertical, ShieldCheck, Eye, EyeOff, X,
  ThumbsUp, Heart, Handshake, Linkedin, Fingerprint, ChevronUp, ChevronDown, Shield
} from 'lucide-react';

// --- Theme & Brand Constants ---
const BRAND = { sunsetOrange: '#FF8A3D', softCopper: '#C98C6C', amberGlow: '#FFB068' };
const LOGO_URL = "https://static.wixstatic.com/media/3069e0_a8673a14d1914bb995df7c95de94ca65~mv2.png/v1/fill/w_238,h_238,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/aiai3D-RGB.png";

const THEMES = {
  dark: { 
    bg: '#000000', 
    panel: 'rgba(45, 45, 45, 0.4)', 
    header: 'rgba(255, 255, 255, 0.05)', 
    text: '#FAFAFA', 
    textMuted: 'rgba(255, 255, 255, 0.5)', 
    border: 'rgba(255, 255, 255, 0.015)', 
    input: 'rgba(255, 255, 255, 0.05)' 
  },
  light: { 
    bg: '#dedede', 
    panel: 'rgba(255, 255, 255, 0.6)', 
    header: 'rgba(0, 0, 0, 0.03)', 
    text: '#111111', 
    textMuted: 'rgba(0, 0, 0, 0.5)', 
    border: 'rgba(0, 0, 0, 0.08)', 
    input: 'rgba(0, 0, 0, 0.05)' 
  }
};

const SCREENS = { 
  LANDING: 'landing', 
  LOGIN: 'login', 
  DASHBOARD: 'dashboard', 
  UPLOAD: 'upload', 
  PROCESSING: 'processing', 
  MODEL_READY: 'model_ready', 
  PROJECT_OVERVIEW: 'project_overview', 
  ENGINE: 'engine', 
  RESULT: 'result', 
  REPOSITORY: 'repository', 
  ACCOUNT: 'account' 
};

const ROOMS = { EXTERIOR: 'Exterior', LIVING: 'Living Room', KITCHEN: 'Kitchen', BATHROOM: 'Bathroom' };

const MOCK_PROJECTS = [
  { id: 1, name: "Skyline Residences", address: "Storgatan 42, Stockholm", status: "Ready", units: 42, floors: 12, date: "2024-03-15", collaborators: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2"] },
  { id: 2, name: "The Harbor Lofts", address: "Kajpromenaden 5, Gothenburg", status: "Processing", units: 85, floors: 8, date: "2024-02-10", collaborators: ["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5"] },
  { id: 3, name: "Oakwood Heights", address: "Tallvägen 12, Malmö", status: "Ready", units: 12, floors: 3, date: "2024-03-20", collaborators: ["https://i.pravatar.cc/150?u=3"] },
];

const ROOM_IMAGES = {
  [ROOMS.EXTERIOR]: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
  [ROOMS.LIVING]: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000",
  [ROOMS.KITCHEN]: "https://images.unsplash.com/photo-1556911220-e15224bbaf39?auto=format&fit=crop&q=80&w=2000",
  [ROOMS.BATHROOM]: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=2000"
};

const PREVIEW_IMAGES = {
  dark: [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600", // Dashboard Data Placehoder
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600", // Project Overview Placeholder
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1600"  // Studio Engine Placeholder
  ],
  light: [
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1600",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1600"
  ]
};

const APARTMENTS = ["H-0401", "H-0402", "H-0403", "H-0404", "H-0407", "H-0408"];

const MESH_PRESETS = {
  dark: { numParticles: 30, maxDist: 150, mouseRadius: 360, baseOpacity: 0.13, pulseIntensity: 0, pulseSpeed: 0.7, mouseNudge: 5.0 },
  light: { numParticles: 30, maxDist: 250, mouseRadius: 130, baseOpacity: 0.24, pulseIntensity: 0, pulseSpeed: 0.7, mouseNudge: 5.0 }
};

// --- Cookie & Privacy Policy Content ---
const COOKIE_POLICY_CONTENT = (
  <div className="space-y-4 text-sm leading-relaxed">
    <p>We use cookies and similar technologies on our website and in our platform to improve user experience, analyze traffic, and tailor content. This policy explains which cookies we use, their purpose, and the choices available to you.</p>
    <h3 className="font-bold text-lg mt-6">What are cookies?</h3>
    <p>Cookies are small text files stored on your device when you visit a website. They are used, among other things, to remember settings, analyze website usage, and help services function properly.</p>
    
    <h3 className="font-bold text-lg mt-6">Cookies we use</h3>
    <h4 className="font-semibold mt-4 text-[#FF8A3D]">Necessary cookies (always active)</h4>
    <p className="opacity-80">These are technically necessary for the website to function correctly. Consent is not required under the Electronic Communications Act for this type of cookie.</p>
    <ul className="list-disc pl-5 space-y-2 mt-2 opacity-80">
      <li><strong>wix, svSession:</strong> Session management, security, and basic website functionality (Session / up to 12 months) - Wix</li>
      <li><strong>make_:</strong> Automation ID for integrations between contact forms and internal systems (Session) - Make</li>
    </ul>

    <h4 className="font-semibold mt-4 text-[#FF8A3D]">Analytics cookies (require consent)</h4>
    <p className="opacity-80">These are only set if you consent via the cookie banner. They are used to analyze traffic and improve the website.</p>
    <ul className="list-disc pl-5 space-y-2 mt-2 opacity-80">
      <li><strong>_ga:</strong> Used by Google Analytics to distinguish users (2 years) - Google</li>
      <li><strong>_gid:</strong> Used by Google Analytics to record statistics about website usage (24 hours) - Google</li>
      <li><strong>_gat:</strong> Used by Google Analytics to limit the number of requests (1 minute) - Google</li>
    </ul>

    <h4 className="font-semibold mt-4 text-[#FF8A3D]">Third-party cookies</h4>
    <p className="opacity-80">Some services we use may set their own cookies.</p>
    <ul className="list-disc pl-5 space-y-2 mt-2 opacity-80">
      <li>Wix – website platform</li>
      <li>Tribe CRM – may use session cookies when submitting forms</li>
      <li>Social media – if you click LinkedIn buttons, these platforms may register your visit</li>
    </ul>

    <h3 className="font-bold text-lg mt-6">Your cookie choices</h3>
    <p className="opacity-80">You can manage the use of cookies via the cookie banner on the website or through your browser settings.</p>
    <ul className="list-disc pl-5 space-y-1 mt-2 opacity-80">
      <li><strong>Necessary cookies:</strong> cannot be disabled</li>
      <li><strong>Analytics cookies:</strong> can be turned on or off via the cookie banner</li>
      <li><strong>Withdrawal of consent:</strong> can be done at any time via the cookie settings</li>
    </ul>

    <h3 className="font-bold text-lg mt-6">Managing cookies in your browser</h3>
    <p className="opacity-80">Most browsers accept cookies automatically. You can change this in your browser settings. Please note that certain necessary cookies must be enabled for the website to function optimally.</p>

    <div className="mt-8 pt-6 border-t border-white/10 opacity-60 text-xs">
      <p>Aiai3d AS</p>
      <p>Organization number: 936235697</p>
      <p>Email: vw@aiai3d.io | Phone: +47 97676358</p>
      <p className="mt-2">Cookie Policy – April 2026</p>
    </div>
  </div>
);

const PRIVACY_POLICY_CONTENT = (
  <div className="space-y-4 text-sm leading-relaxed">
    <p>At Aiai3d AS, we process personal data in accordance with the Norwegian Personal Data Act and the EU General Data Protection Regulation (GDPR). This policy explains what information we collect, how it is used, and your rights.</p>
    
    <h3 className="font-bold text-lg mt-6 text-[#FF8A3D]">Data Controller</h3>
    <p className="opacity-80">Aiai3d AS is the data controller for the processing of personal data.</p>
    <ul className="list-none space-y-1 mt-2 opacity-80">
      <li>Organization number: 936235697</li>
      <li>Email: vw@aiai3d.io</li>
      <li>Phone: +47 97676358</li>
    </ul>

    <h3 className="font-bold text-lg mt-6 text-[#FF8A3D]">What information we collect</h3>
    <p className="opacity-80">When you contact us via forms on our website or register for our services, we may collect: Name, Company, Email address, Phone number. This information is provided voluntarily by you.</p>
    <p className="opacity-80 mt-2">When you visit our website, we may also collect: Date and time of visit, IP address, Device type, Operating system, Browser, Referring link or page. This information is used for statistics and to improve our services.</p>

    <h3 className="font-bold text-lg mt-6 text-[#FF8A3D]">Purpose of processing</h3>
    <p className="opacity-80">We use personal data for the following purposes:</p>
    <ul className="list-disc pl-5 space-y-1 mt-2 opacity-80">
      <li>Responding to inquiries via contact forms</li>
      <li>Following up on requests and customer dialogue</li>
      <li>Booking meetings</li>
      <li>Delivering services within 3D visualization and proptech</li>
      <li>Sending relevant information and newsletters (if you have consented)</li>
    </ul>

    <h3 className="font-bold text-lg mt-6 text-[#FF8A3D]">Legal basis for processing</h3>
    <ul className="list-disc pl-5 space-y-1 mt-2 opacity-80">
      <li><strong>Consent</strong> – for example when submitting a contact form</li>
      <li><strong>Contract</strong> – when the data is necessary to deliver services</li>
      <li><strong>Legitimate interest</strong> – for follow-up of inquiries and improvement of services</li>
      <li><strong>Legal obligation</strong> – such as storage of accounting data</li>
    </ul>

    <h3 className="font-bold text-lg mt-6 text-[#FF8A3D]">Your rights</h3>
    <p className="opacity-80">You have the right to access, rectify, request deletion, restrict processing, and data portability. To exercise your rights, you may contact us by email.</p>
    <p className="opacity-80 mt-2">If you believe that the processing of personal data does not comply with applicable regulations, you may file a complaint with the Norwegian Data Protection Authority (Datatilsynet).</p>

    <div className="mt-8 pt-6 border-t border-white/10 opacity-60 text-xs">
      <p>Aiai3d AS</p>
      <p>Organization number: 936235697</p>
      <p>Email: vw@aiai3d.io | Phone: +47 97676358</p>
      <p className="mt-2">Privacy Policy - April 2026</p>
    </div>
  </div>
);

// --- Modals Components ---

const PolicyModal = ({ title, content, onClose, theme }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
    <div className="relative w-full max-w-2xl max-h-[80vh] flex flex-col rounded-[2rem] border shadow-2xl animate-in zoom-in-95 duration-300" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
      <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: theme.border }}>
        <h2 className="text-xl font-bold" style={{ color: theme.text }}>{title}</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-black/10 transition-colors" style={{ color: theme.text }}><X size={20} /></button>
      </div>
      <div className="p-8 overflow-y-auto" style={{ color: theme.text }}>
        {content}
      </div>
    </div>
  </div>
);

const CookieConsentModal = ({ onClose }) => {
  const [toggles, setToggles] = React.useState({ functional: true, analytical: true, marketing: true, unknown: false });
  const handleToggle = (key) => setToggles({ ...toggles, [key]: !toggles[key] });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 text-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <div className="w-full" /> {/* Spacer */}
          <div className="flex items-center space-x-2 shrink-0 select-none">
            <Shield size={18} className="text-slate-700" />
            <span className="font-bold tracking-tight text-slate-800 flex flex-col items-start leading-none">
              USERCENTRICS <span className="text-[8px] font-medium text-slate-500 uppercase tracking-widest mt-0.5">Web Consent Management Platform</span>
            </span>
          </div>
          <div className="w-full flex justify-end">
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 transition-colors"><X size={20} /></button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          <button className="flex-1 py-3 text-sm font-semibold text-[#1d4ed8] border-b-2 border-[#1d4ed8]">Categories</button>
          <button className="flex-1 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">Services</button>
          <button className="flex-1 py-3 text-sm font-medium text-slate-500 hover:text-slate-800">About</button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 max-h-[50vh]">
          {/* Essential */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ChevronDown size={18} className="text-slate-400" />
                <span className="font-semibold text-slate-800">Essential</span>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">1</span>
              </div>
              <div className="w-11 h-6 rounded-full bg-gray-300 flex items-center px-1 opacity-50 cursor-not-allowed">
                <div className="w-4 h-4 bg-white rounded-full translate-x-5" />
              </div>
            </div>
            <p className="text-sm text-slate-500 pl-8">These components are required for the basic functions of the website.</p>
          </div>

          {/* Functional */}
          <div className="flex flex-col space-y-2 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ChevronDown size={18} className="text-slate-400" />
                <span className="font-semibold text-slate-800">Functional</span>
              </div>
              <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${toggles.functional ? 'bg-[#1d4ed8]' : 'bg-gray-300'}`} onClick={() => handleToggle('functional')}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${toggles.functional ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
            <p className="text-sm text-slate-500 pl-8">These components enable a website to remember information that changes the way the website looks or behaves.</p>
          </div>

          {/* Analytical */}
          <div className="flex flex-col space-y-2 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ChevronDown size={18} className="text-slate-400" />
                <span className="font-semibold text-slate-800">Analytical</span>
              </div>
              <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${toggles.analytical ? 'bg-[#1d4ed8]' : 'bg-gray-300'}`} onClick={() => handleToggle('analytical')}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${toggles.analytical ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
            <p className="text-sm text-slate-500 pl-8">These components enable a website to analyze the website usage to measure and improve performance.</p>
          </div>

          {/* Marketing */}
          <div className="flex flex-col space-y-2 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ChevronDown size={18} className="text-slate-400" />
                <span className="font-semibold text-slate-800">Marketing</span>
              </div>
              <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${toggles.marketing ? 'bg-[#1d4ed8]' : 'bg-gray-300'}`} onClick={() => handleToggle('marketing')}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${toggles.marketing ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
            <p className="text-sm text-slate-500 pl-8">These components enable tracking technologies to collect data about user behaviour on the website or across websites.</p>
          </div>

          {/* Unknown */}
          <div className="flex flex-col space-y-2 border-t border-gray-100 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ChevronDown size={18} className="text-slate-400" />
                <span className="font-semibold text-slate-800">Unknown</span>
                <span className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">1</span>
              </div>
              <div className={`w-11 h-6 rounded-full flex items-center px-1 cursor-pointer transition-colors ${toggles.unknown ? 'bg-[#1d4ed8]' : 'bg-gray-300'}`} onClick={() => handleToggle('unknown')}>
                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${toggles.unknown ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </div>
            <p className="text-sm text-slate-500 pl-8">Any component in this category could run regardless of consent as no intended blocking category was specified.</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-200 flex space-x-2 bg-gray-50/50">
          <button onClick={onClose} className="flex-1 bg-[#1d4ed8] hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition-colors text-sm">Save Settings</button>
          <button onClick={onClose} className="flex-1 bg-[#1d4ed8] hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition-colors text-sm">Deny</button>
          <button onClick={onClose} className="flex-1 bg-[#1d4ed8] hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition-colors text-sm">Accept All</button>
        </div>
      </div>
    </div>
  );
}

// --- Mesh Particle Background Component ---
const MeshBackground = ({ isDarkMode, settings }) => {
  const canvasRef = React.useRef(null);
  const mouseRef = React.useRef({ x: -1000, y: -1000 });
  const defaultSettings = MESH_PRESETS.dark;
  const settingsRef = React.useRef(settings || defaultSettings);

  React.useEffect(() => { settingsRef.current = settings || defaultSettings; }, [settings]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let W, H;
    let particles = [];
    let animationFrameId;
    const RGB = '255, 138, 61';

    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    const handleMouseMove = (e) => { mouseRef.current.x = e.clientX; mouseRef.current.y = e.clientY; };
    const handleMouseLeave = () => { mouseRef.current.x = -1000; mouseRef.current.y = -1000; };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * W;
        this.y = Math.random() * H;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() * 2 + 2.5;
        this.pulseOffset = Math.random();
        this.fillAlpha = 0;
      }
      update(s) {
        this.x += this.vx;
        this.y += this.vy;
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distM = Math.sqrt(dx * dx + dy * dy);
        const nudgeForce = s.mouseNudge !== undefined ? s.mouseNudge : 1.5;
        if (distM < 150 && nudgeForce > 0) {
          const force = (150 - distM) / 150;
          this.vx -= (dx / distM) * force * 0.03 * nudgeForce;
          this.vy -= (dy / distM) * force * 0.03 * nudgeForce;
        }
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > 0.32) { this.vx = (this.vx / speed) * 0.32; this.vy = (this.vy / speed) * 0.32; }
        if (this.x < -20) this.x = W + 20;
        if (this.x > W + 20) this.x = -20;
        if (this.y < -20) this.y = H + 20;
        if (this.y > H + 20) this.y = -20;
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      const s = settingsRef.current || defaultSettings;
      const targetParticles = s.numParticles || 30;

      if (particles.length < targetParticles) particles.push(new Particle());
      else if (particles.length > targetParticles) particles.pop();

      particles.forEach(p => p.update(s));
      particles.forEach(p => { p.fillAlpha *= 0.94; });

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const maxD = s.maxDist || 70;
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx*dx + dy*dy);

          if (dist < maxD) {
            const baseOp = s.baseOpacity !== undefined ? s.baseOpacity : 0.22;
            const distFactor = 1 - (dist / maxD);
            const activeLevel = Math.max(p1.fillAlpha, p2.fillAlpha);
            const lineAlpha = (baseOp * distFactor) + (activeLevel * distFactor * 0.5);
            
            if (lineAlpha > 0.01) {
              ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(${RGB}, ${lineAlpha})`; ctx.lineWidth = 1 + (activeLevel * 1.5); ctx.stroke();
              
              if (lineAlpha > 0.1) {
                const pairSeed = i * 100 + j;
                const pSpeedMult = s.pulseSpeed !== undefined ? s.pulseSpeed : 1.0;
                const netPulseSpeed = 0.0008 * pSpeedMult;
                const t = ((Date.now() * netPulseSpeed) + pairSeed) % 3;
                if (t <= 1) {
                  const pulseWidth = 0.3;
                  const pStart = Math.max(0, t - pulseWidth / 2);
                  const pEnd = Math.min(1, t + pulseWidth / 2);
                  const pxStart = p1.x - dx * pStart; const pyStart = p1.y - dy * pStart;
                  const pxEnd = p1.x - dx * pEnd; const pyEnd = p1.y - dy * pEnd;
                  const grad = ctx.createLinearGradient(pxStart, pyStart, pxEnd, pyEnd);
                  grad.addColorStop(0, `rgba(${RGB}, 0)`); grad.addColorStop(0.5, `rgba(${RGB}, ${lineAlpha * 2.5})`); grad.addColorStop(1, `rgba(${RGB}, 0)`);
                  ctx.beginPath(); ctx.moveTo(pxStart, pyStart); ctx.lineTo(pxEnd, pyEnd);
                  ctx.strokeStyle = grad; ctx.lineWidth = 1.5 + (lineAlpha * 2.5); ctx.lineCap = 'round'; ctx.stroke(); ctx.lineCap = 'butt';
                }
              }
            }
          }
        }
      }

      particles.forEach(p => {
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const distM = Math.sqrt(dx*dx + dy*dy);
        const mRad = s.mouseRadius || 140;
        
        if (distM < mRad) {
          const lineAlpha = (1 - distM / mRad) * (s.baseOpacity || 0.22);
          ctx.beginPath(); ctx.moveTo(mouseRef.current.x, mouseRef.current.y); ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = `rgba(${RGB}, ${lineAlpha})`; ctx.lineWidth = 1; ctx.stroke();
          
          const pSpeedMult = s.pulseSpeed !== undefined ? s.pulseSpeed : 1.0;
          const pulseSpeed = 0.0015 * pSpeedMult; 
          const pulseT = ((Date.now() * pulseSpeed) + p.pulseOffset) % 1;
          const pIntensity = s.pulseIntensity !== undefined ? s.pulseIntensity : 0.5;
          if (pIntensity > 0) {
            const pulseWidth = 0.25;
            const pStart = Math.max(0, pulseT - pulseWidth / 2);
            const pEnd = Math.min(1, pulseT + pulseWidth / 2);
            const pxStart = mouseRef.current.x + dx * pStart; const pyStart = mouseRef.current.y + dy * pStart;
            const pxEnd = mouseRef.current.x + dx * pEnd; const pyEnd = mouseRef.current.y + dy * pEnd;
            const pulseAlpha = Math.sin(pulseT * Math.PI) * pIntensity * 1.5;
            
            if (pulseAlpha > 0.01) {
              const grad = ctx.createLinearGradient(pxStart, pyStart, pxEnd, pyEnd);
              grad.addColorStop(0, `rgba(${RGB}, 0)`); grad.addColorStop(0.5, `rgba(255, 230, 200, ${pulseAlpha})`); grad.addColorStop(1, `rgba(${RGB}, 0)`);
              ctx.beginPath(); ctx.moveTo(pxStart, pyStart); ctx.lineTo(pxEnd, pyEnd);
              ctx.strokeStyle = grad; ctx.lineWidth = 3 + (pIntensity * 3); ctx.lineCap = 'round';
              ctx.shadowBlur = 12 * pIntensity; ctx.shadowColor = `rgba(${RGB}, 1)`; ctx.stroke(); ctx.lineCap = 'butt'; ctx.shadowBlur = 0;
            }
          }
          if (pulseT > 0.85 && pulseT < 0.95) p.fillAlpha = Math.min(1, p.fillAlpha + 0.2); 
        }
      });

      particles.forEach(p => {
        const baseOp = s.baseOpacity !== undefined ? s.baseOpacity : 0.22;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${RGB}, ${baseOp * 2})`; ctx.lineWidth = 1.5; ctx.stroke();
        
        if (p.fillAlpha > 0.01) {
          ctx.beginPath(); ctx.arc(p.x, p.y, p.size - 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${RGB}, ${p.fillAlpha})`; ctx.shadowBlur = p.fillAlpha * 12;
          ctx.shadowColor = `rgba(${RGB}, 1)`; ctx.fill(); ctx.shadowBlur = 0;
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000" style={{ opacity: isDarkMode ? 1 : 0.8 }} />;
};

const SettingsSlider = ({ label, value, min, max, step, onChange, theme }) => (
  <div className="mb-4">
     <div className="flex justify-between mb-2">
       <span className="text-[10px] font-extrabold uppercase tracking-widest opacity-60" style={{ color: theme.text }}>{String(label)}</span>
       <span className="text-[10px] font-bold" style={{ color: theme.text }}>{Number(value)}</span>
     </div>
     <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full accent-[#FF8A3D]" />
  </div>
);

// --- Main App Component ---

export default function App() {
  const [currentScreen, setCurrentScreen] = React.useState(SCREENS.LANDING);
  const [activeProject, setActiveProject] = React.useState(null);
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [uiHidden, setUiHidden] = React.useState(false);
  const [showMeshSettings, setShowMeshSettings] = React.useState(false);
  
  // Modals state
  const [showCookieConsent, setShowCookieConsent] = React.useState(false);
  const [policyModal, setPolicyModal] = React.useState(null); 

  // Platform Preview State
  const [activePreviewTab, setActivePreviewTab] = React.useState(0);

  const [meshSettings, setMeshSettings] = React.useState(MESH_PRESETS.dark);
  React.useEffect(() => { setMeshSettings(isDarkMode ? MESH_PRESETS.dark : MESH_PRESETS.light); }, [isDarkMode]);

  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [processingProgress, setProcessingProgress] = React.useState(0);
  const [selectedUnit, setSelectedUnit] = React.useState("H-0407");
  const [activeRoom, setActiveRoom] = React.useState(ROOMS.EXTERIOR);
  const [isLocked, setIsLocked] = React.useState(false);
  const [style, setStyle] = React.useState('Scandi-Minimal');
  const [timeOfDay, setTimeOfDay] = React.useState(14);
  const [viewpoints, setViewpoints] = React.useState([{ id: 1, name: "Living Room · Sunset", thumbnail: ROOM_IMAGES[ROOMS.LIVING] }]);
  const [renders, setRenders] = React.useState([{ id: 1, name: "Living Room · Sunset · Scandi", image: ROOM_IMAGES[ROOMS.LIVING], unit: "H-0407", room: ROOMS.LIVING }]);

  const theme = isDarkMode ? THEMES.dark : THEMES.light;
  const [pipeStep, setPipeStep] = React.useState(0);
  const pipelineSteps = ["Parsing IFC Geometry", "Decoding Excel Materials", "Enriching Model", "AI Object Completion", "Finalizing Lightmaps"];

  const saveViewpoint = () => {
    const newVp = { id: Date.now(), name: String(activeRoom) + " Frame", thumbnail: ROOM_IMAGES[activeRoom] || ROOM_IMAGES[ROOMS.LIVING] };
    setViewpoints([...viewpoints, newVp]);
  };

  const handleTakeImage = () => {
    const newRender = { id: Date.now(), image: ROOM_IMAGES[activeRoom] || ROOM_IMAGES[ROOMS.LIVING], unit: String(selectedUnit), room: String(activeRoom), name: String(activeRoom) + " Synthesis" };
    setRenders([newRender, ...renders]);
    setCurrentScreen(SCREENS.RESULT);
    setUiHidden(false); 
  };

  React.useEffect(() => {
    const link = document.createElement('link'); link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap'; link.rel = 'stylesheet'; document.head.appendChild(link);
  }, []);

  React.useEffect(() => {
    if (currentScreen === SCREENS.UPLOAD && uploadProgress > 0) {
      const timer = setTimeout(() => setUploadProgress(p => p < 100 ? p + 10 : 100), 200);
      if (uploadProgress === 100) setTimeout(() => setCurrentScreen(SCREENS.PROCESSING), 500);
      return () => clearTimeout(timer);
    }
  }, [uploadProgress, currentScreen]);

  React.useEffect(() => {
    if (currentScreen === SCREENS.PROCESSING) {
      const timer = setTimeout(() => {
        if (processingProgress < 100) {
          setProcessingProgress(p => p + 1); setPipeStep(Math.floor(processingProgress / 20));
        } else { setCurrentScreen(SCREENS.MODEL_READY); }
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [processingProgress, currentScreen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = 'button' }) => {
    const baseStyles = "px-5 py-2.5 rounded-full font-medium text-[13px] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-40";
    const variants = {
      primary: `bg-[#FF8A3D] hover:bg-[#FFB068] text-[#0A0A0A] shadow-[0_0_20px_rgba(255,138,61,0.3)] hover:shadow-[0_0_30px_rgba(255,138,61,0.5)] hover:scale-105`,
      secondary: isDarkMode ? `bg-white/10 hover:bg-white/20 text-white backdrop-blur-md` : `bg-black/5 hover:bg-black/10 text-black backdrop-blur-md`,
      outline: `border border-current opacity-60 hover:opacity-100 bg-transparent`,
      ghost: isDarkMode ? `text-white/60 hover:text-white hover:bg-white/5` : `text-[#0A0A0A]/60 hover:text-[#0A0A0A] hover:bg-black/5`
    };
    return (
      <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </button>
    );
  };

  const renderContextAwareControls = () => {
    return (
      <>
        {activeRoom === ROOMS.KITCHEN && (
          <section className="animate-in slide-in-from-right-4 duration-500">
            <label className="text-sm font-medium opacity-60 mb-3 block" style={{ color: theme.text }}>Cabinet Finish</label>
            <div className="grid grid-cols-2 gap-2">
              <button className="py-3 rounded-xl border text-[10px] font-medium text-black transition-all" style={{ backgroundColor: BRAND.sunsetOrange, borderColor: BRAND.sunsetOrange }}>Matte Charcoal</button>
              <button className="py-3 rounded-xl border text-[10px] font-medium transition-all hover:bg-white/5" style={{ borderColor: theme.border, color: theme.textMuted }}>Brushed Oak</button>
            </div>
            <label className="text-sm font-medium opacity-60 mt-5 mb-3 block" style={{ color: theme.text }}>Countertop</label>
            <div className="p-3 rounded-xl border flex items-center justify-between" style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
              <span className="text-[11px] font-medium" style={{ color: theme.text }}>Nero Marquina</span>
              <Palette size={14} style={{ color: theme.textMuted }} />
            </div>
          </section>
        )}
        {activeRoom === ROOMS.BATHROOM && (
          <section className="animate-in slide-in-from-right-4 duration-500">
            <label className="text-sm font-medium opacity-60 mb-3 block" style={{ color: theme.text }}>Tile Pattern</label>
            <div className="grid grid-cols-3 gap-3">
              <div className="aspect-square rounded-xl border-2 shadow-sm bg-black/20" style={{ borderColor: BRAND.sunsetOrange }}></div>
              <div className="aspect-square rounded-xl border hover:border-white/40 cursor-pointer transition-colors bg-black/10" style={{ borderColor: theme.border }}></div>
              <div className="aspect-square rounded-xl border hover:border-white/40 cursor-pointer transition-colors bg-black/10" style={{ borderColor: theme.border }}></div>
            </div>
          </section>
        )}
        {(activeRoom === ROOMS.LIVING || activeRoom === ROOMS.EXTERIOR) && (
          <section className="animate-in slide-in-from-right-4 duration-500">
             <label className="text-sm font-medium opacity-60 mb-3 block" style={{ color: theme.text }}>Design Style</label>
             <select value={style} onChange={(e) => setStyle(e.target.value)} className="w-full bg-transparent border p-3.5 rounded-xl text-sm font-medium outline-none" style={{ borderColor: theme.border, color: theme.text }}>
              <option>Scandi-Minimal</option>
              <option>Modern Luxury</option>
              <option>Nordic Industrial</option>
             </select>
          </section>
        )}
      </>
    );
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.LANDING:
        return (
          <div className="relative font-manrope">
             {/* HERO SECTION */}
             <div id="home" className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 text-center z-10 relative">
               <h1 className="text-6xl md:text-8xl font-semibold tracking-tight max-w-4xl mb-6" style={{ color: theme.text }}>
                 AI-powered <br/><span className="text-[#FF8A3D]">3D visualization</span> <br/>for real estate marketing
               </h1>
               <p className="text-lg md:text-xl font-medium max-w-2xl mb-16" style={{ color: theme.textMuted }}>
                 Creates and connects data to streamline workflows. Automates and simplifies 3D visualization for the real estate industry.
               </p>
               
               {/* Stay Updated Form */}
               <div className="w-full max-w-md p-8 rounded-[2rem] border backdrop-blur-2xl shadow-2xl" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                  <h3 className="text-2xl font-medium mb-2" style={{ color: theme.text }}>Stay updated?</h3>
                  <p className="text-sm font-medium mb-6" style={{ color: theme.textMuted }}>Sign up for updates as we build the platform</p>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex space-x-4">
                      <input type="text" placeholder="First name" className="w-1/2 border-none rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                      <input type="text" placeholder="Second name" className="w-1/2 border-none rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                    </div>
                    <input type="text" placeholder="Company" className="w-full border-none rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                    <input type="email" placeholder="Email" className="w-full border-none rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                    <Button className="w-full py-4 mt-2">Subscribe</Button>
                  </form>
               </div>
             </div>

             {/* PLATFORM SECTION */}
             <div id="platform" className="py-24 px-6 relative z-10">
               <div className="max-w-6xl mx-auto text-center">
                  <h2 className="text-5xl font-medium tracking-tight mb-8" style={{ color: theme.text }}>Visualization platform</h2>
                  <div className="text-lg font-medium space-y-2 mb-16 max-w-3xl mx-auto" style={{ color: theme.textMuted }}>
                    <p>Do you work with sales and marketing of new development projects?</p>
                    <p>Long production times for 3D visualizations?</p>
                    <p>Not enough 3D visualizations to showcase all units?</p>
                    <p className="mt-6" style={{ color: theme.text }}>With aiai3D, you can visualize everything faster, more easily, and at much larger scale. Our visualization platform is designed to streamline and improve the day-to-day work of selling and marketing new developments, giving you the tools you need from “coming soon” to “sold.”</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="relative p-10 rounded-[2rem] border backdrop-blur-2xl shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500 overflow-hidden" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                      {/* Mesh Hover Background */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-0">
                        <div className="absolute top-6 left-10 w-1.5 h-1.5 bg-[#FF8A3D] rounded-full shadow-[0_0_8px_#FF8A3D] animate-ping" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute bottom-10 right-12 w-2 h-2 bg-[#FF8A3D] rounded-full shadow-[0_0_8px_#FF8A3D] animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
                        <div className="absolute top-1/4 right-8 w-1 h-1 bg-[#FF8A3D] rounded-full shadow-[0_0_5px_#FF8A3D]"></div>
                        <svg className="absolute inset-0 w-full h-full opacity-30">
                          <line x1="2.5rem" y1="1.5rem" x2="50%" y2="30%" stroke="#FF8A3D" strokeWidth="0.5" className="animate-pulse" />
                          <line x1="50%" y1="30%" x2="calc(100% - 2rem)" y2="25%" stroke="#FF8A3D" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                          <line x1="50%" y1="30%" x2="calc(100% - 3rem)" y2="calc(100% - 2.5rem)" stroke="#FF8A3D" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                        </svg>
                      </div>
                      <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500 z-10">
                        <ThumbsUp size={64} className="text-[#FF8A3D] relative z-10" />
                      </div>
                      <h3 className="text-2xl font-medium mb-4 relative z-10" style={{ color: theme.text }}>Improves day-to-day work</h3>
                      <p className="text-sm font-medium relative z-10" style={{ color: theme.textMuted }}>Avoid concerns about production time. Get flexible, relevant content for web, ads, and construction sites.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="relative p-10 rounded-[2rem] border backdrop-blur-2xl shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500 overflow-hidden" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-0">
                        <div className="absolute top-10 right-10 w-1.5 h-1.5 bg-[#FF8A3D] rounded-full shadow-[0_0_8px_#FF8A3D] animate-ping" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute bottom-6 left-12 w-2 h-2 bg-[#FF8A3D] rounded-full shadow-[0_0_8px_#FF8A3D] animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
                        <div className="absolute top-1/3 left-8 w-1 h-1 bg-[#FF8A3D] rounded-full shadow-[0_0_5px_#FF8A3D]"></div>
                        <svg className="absolute inset-0 w-full h-full opacity-30">
                          <line x1="calc(100% - 2.5rem)" y1="2.5rem" x2="50%" y2="30%" stroke="#FF8A3D" strokeWidth="0.5" className="animate-pulse" />
                          <line x1="50%" y1="30%" x2="3rem" y2="calc(100% - 1.5rem)" stroke="#FF8A3D" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                          <line x1="50%" y1="30%" x2="2rem" y2="33%" stroke="#FF8A3D" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                        </svg>
                      </div>
                      <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500 z-10">
                        <Heart size={64} className="text-[#FF8A3D] relative z-10" />
                      </div>
                      <h3 className="text-2xl font-medium mb-4 relative z-10" style={{ color: theme.text }}>Customer journey confidence</h3>
                      <p className="text-sm font-medium relative z-10" style={{ color: theme.textMuted }}>Increased visual information provides confidence and a better basis for decision-making for potential buyers.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="relative p-10 rounded-[2rem] border backdrop-blur-2xl shadow-xl flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500 overflow-hidden" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden z-0">
                        <div className="absolute top-8 left-1/2 w-1.5 h-1.5 bg-[#FF8A3D] rounded-full shadow-[0_0_8px_#FF8A3D] animate-ping" style={{ animationDuration: '3s' }}></div>
                        <div className="absolute bottom-10 right-10 w-2 h-2 bg-[#FF8A3D] rounded-full shadow-[0_0_8px_#FF8A3D] animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}></div>
                        <div className="absolute bottom-8 left-8 w-1 h-1 bg-[#FF8A3D] rounded-full shadow-[0_0_5px_#FF8A3D]"></div>
                        <svg className="absolute inset-0 w-full h-full opacity-30">
                          <line x1="50%" y1="2rem" x2="50%" y2="30%" stroke="#FF8A3D" strokeWidth="0.5" className="animate-pulse" />
                          <line x1="50%" y1="30%" x2="calc(100% - 2.5rem)" y2="calc(100% - 2.5rem)" stroke="#FF8A3D" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                          <line x1="50%" y1="30%" x2="2rem" y2="calc(100% - 2rem)" stroke="#FF8A3D" strokeWidth="0.5" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                        </svg>
                      </div>
                      <div className="relative mb-8 group-hover:scale-110 transition-transform duration-500 z-10">
                        <Handshake size={64} className="text-[#FF8A3D] relative z-10" />
                      </div>
                      <h3 className="text-2xl font-medium mb-4 relative z-10" style={{ color: theme.text }}>Sell projects faster</h3>
                      <p className="text-sm font-medium relative z-10" style={{ color: theme.textMuted }}>When all units and upgrades are visualized early, the project becomes easier to communicate and faster to sell.</p>
                    </div>
                  </div>
               </div>
             </div>

             {/* APP PREVIEW SECTION */}
             <div id="preview" className="py-24 px-6 relative z-10 border-t border-white/5">
               <div className="max-w-6xl mx-auto">
                 <div className="text-center mb-16">
                   <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6" style={{ color: theme.text }}>Inside the platform</h2>
                   <p className="text-lg font-medium max-w-2xl mx-auto" style={{ color: theme.textMuted }}>Explore the intuitive tools designed to revolutionize your visualization workflow.</p>
                 </div>
                 
                 {/* Tab selector */}
                 <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {['Dashboard', 'Project Overview', 'Studio Engine'].map((tab, idx) => (
                       <button key={idx} onClick={() => setActivePreviewTab(idx)} className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${activePreviewTab === idx ? 'bg-[#FF8A3D] text-black shadow-[0_0_15px_rgba(255,138,61,0.3)]' : 'border backdrop-blur-md hover:bg-white/5'}`} style={{ borderColor: activePreviewTab === idx ? 'transparent' : theme.border, color: activePreviewTab === idx ? '#000' : theme.text }}>
                         {tab}
                       </button>
                    ))}
                 </div>

                 {/* Browser Mockup Container */}
                 <div className="rounded-[2rem] border backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-700" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                    {/* Content - Placeholders */}
                    <div className="aspect-video relative bg-black/20 flex items-center justify-center overflow-hidden">
                       <img src={PREVIEW_IMAGES[isDarkMode ? 'dark' : 'light'][activePreviewTab]} className="w-full h-full object-cover opacity-80 animate-in fade-in zoom-in-95 duration-500" key={activePreviewTab} alt="Platform Preview" />
                       <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity hover:opacity-0 duration-500 group cursor-pointer">
                          <Eye size={48} className="text-white opacity-50 mb-4 group-hover:scale-110 transition-transform duration-500" />
                          <p className="text-white text-xl font-medium tracking-widest uppercase">{['Dashboard', 'Project Overview', 'Studio Engine'][activePreviewTab]}</p>
                          <p className="text-white/60 text-xs font-medium tracking-widest uppercase mt-4">Hover to view</p>
                       </div>
                    </div>
                 </div>
               </div>
             </div>

             {/* ABOUT SECTION */}
             <div id="about" className="py-24 px-6 relative z-10 border-t border-white/5">
               <div className="max-w-5xl mx-auto text-center">
                  <h2 className="text-5xl font-medium tracking-tight mb-8" style={{ color: theme.text }}>Industry experience &<br/>tech expertise</h2>
                  <p className="text-lg font-medium max-w-4xl mx-auto mb-16" style={{ color: theme.textMuted }}>
                    Over 10 years of experience in the real estate industry, both as a provider of 3D visualizations and as a client. With deep insight into processes and how visualizations impact sales, we have also experienced the two biggest challenges: long production times and consistently having too few visualizations for a project. With strong input from our pilot panel consisting of representatives from the real estate industry, the platform is being built by the industry, for the industry - where the client is the captain.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-3xl mx-auto">
                    {/* Vegard */}
                    <div className="text-left group cursor-pointer">
                      <div className="relative rounded-[2rem] overflow-hidden mb-6 aspect-square shadow-lg transition-all duration-500 group-hover:shadow-[0_10px_40px_rgba(255,138,61,0.4)] group-hover:-translate-y-2">
                        {/* Mesh-inspired Animated Border/Nodes */}
                        <div className="absolute inset-0 rounded-[2rem] border border-[#FF8A3D]/0 group-hover:border-[#FF8A3D]/40 transition-colors duration-700 z-20 pointer-events-none">
                          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#FF8A3D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#FF8A3D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping" style={{animationDelay: '1s'}}></div>
                          <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#FF8A3D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_#FF8A3D]"></div>
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#FF8A3D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_#FF8A3D]"></div>
                          <div className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8A3D] to-transparent w-[200%] -translate-x-[100%] group-hover:translate-x-[50%] transition-transform duration-[2s] ease-in-out opacity-0 group-hover:opacity-100"></div>
                          <div className="absolute bottom-0 right-0 h-[1px] bg-gradient-to-l from-transparent via-[#FF8A3D] to-transparent w-[200%] translate-x-[100%] group-hover:-translate-x-[50%] transition-transform duration-[2s] ease-in-out opacity-0 group-hover:opacity-100 delay-500"></div>
                        </div>
                        <img src="https://static.wixstatic.com/media/3069e0_85f4fad5791e402a926141f47bc57100~mv2.jpg/v1/fill/w_612,h_630,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMG_7261_black_white_web.jpg" alt="Vegard" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 relative z-10" />
                      </div>
                      <h4 className="text-xl font-medium mb-1" style={{ color: theme.text }}>Vegard Rossi Westergård</h4>
                      <p className="text-sm font-medium text-[#FF8A3D] mb-4">Founder/CEO</p>
                      <p className="text-sm font-medium" style={{ color: theme.textMuted }}>Background from several 3D visualization providers, as well as experience as a client working with marketing in one of the largest developers in the Nordics.</p>
                    </div>
                    {/* Per */}
                    <div className="text-left group cursor-pointer">
                      <div className="relative rounded-[2rem] overflow-hidden mb-6 aspect-square shadow-lg transition-all duration-500 group-hover:shadow-[0_10px_40px_rgba(255,138,61,0.4)] group-hover:-translate-y-2">
                        {/* Mesh-inspired Animated Border/Nodes */}
                        <div className="absolute inset-0 rounded-[2rem] border border-[#FF8A3D]/0 group-hover:border-[#FF8A3D]/40 transition-colors duration-700 z-20 pointer-events-none">
                          <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-[#FF8A3D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping"></div>
                          <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-[#FF8A3D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping" style={{animationDelay: '1s'}}></div>
                          <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#FF8A3D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_#FF8A3D]"></div>
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#FF8A3D] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_#FF8A3D]"></div>
                          <div className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF8A3D] to-transparent w-[200%] -translate-x-[100%] group-hover:translate-x-[50%] transition-transform duration-[2s] ease-in-out opacity-0 group-hover:opacity-100"></div>
                          <div className="absolute bottom-0 right-0 h-[1px] bg-gradient-to-l from-transparent via-[#FF8A3D] to-transparent w-[200%] translate-x-[100%] group-hover:-translate-x-[50%] transition-transform duration-[2s] ease-in-out opacity-0 group-hover:opacity-100 delay-500"></div>
                        </div>
                        <img src="https://static.wixstatic.com/media/3069e0_5c530b43ab27405abb751d90836eba2e~mv2.jpg/v1/crop/x_14,y_0,w_461,h_475/fill/w_553,h_569,al_c,lg_1,q_80,enc_avif,quality_auto/profilbild%20Per.jpg" alt="Per" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 relative z-10" />
                      </div>
                      <h4 className="text-xl font-medium mb-1" style={{ color: theme.text }}>Per Hjaldahl</h4>
                      <p className="text-sm font-medium text-[#FF8A3D] mb-4">Founding CTO</p>
                      <p className="text-sm font-medium" style={{ color: theme.textMuted }}>Tech enthusiast, serial entrepreneur, and former co-founder of a Swedish 3D visualization agency, with strong technical and visual expertise.</p>
                    </div>
                  </div>
               </div>
             </div>

             {/* CONTACT SECTION */}
             <div id="contact" className="py-24 px-6 relative z-10 pb-40">
               <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-16 italic" style={{ color: theme.text }}>
                    "We are building the solution we needed when ordering 3D visualizations. Now we are making it available to the entire real estate industry."
                  </h2>
                  
                  <div className="p-10 rounded-[2rem] border backdrop-blur-2xl shadow-2xl text-left" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                    <h3 className="text-2xl font-medium mb-2 text-center" style={{ color: theme.text }}>Questions?</h3>
                    <p className="text-sm font-medium mb-8 text-center" style={{ color: theme.textMuted }}>Fill out the form and we'll get back to you.</p>
                    
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="flex space-x-4">
                        <input type="text" placeholder="First name" className="w-1/2 border-none rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                        <input type="text" placeholder="Second name" className="w-1/2 border-none rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                      </div>
                      <input type="text" placeholder="Company" className="w-full border-none rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                      <input type="email" placeholder="Email" className="w-full border-none rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                      <input type="tel" placeholder="Phone" className="w-full border-none rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                      <textarea placeholder="Question" rows="4" className="w-full border-none rounded-xl py-3 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }}></textarea>
                      <div className="flex items-start space-x-3 pt-2">
                        <input type="checkbox" className="mt-1" />
                        <p className="text-xs font-medium" style={{ color: theme.textMuted }}>I consent to aiai3D using my information in accordance with the Privacy Policy.</p>
                      </div>
                      <Button className="w-full py-4 mt-4">Send Message</Button>
                    </form>
                  </div>
               </div>
             </div>

             {/* FOOTER SECTION */}
             <footer className="w-full border-t pt-16 pb-8 relative z-10" style={{ borderColor: isDarkMode ? 'rgba(201,140,108,0.4)' : theme.border }}>
               <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center px-6">
                  
                  {/* Left Column */}
                  <div className="flex flex-col space-y-3 mb-10 md:mb-0 items-start">
                     <h4 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>Contact</h4>
                     <a href="#" className="text-sm font-medium underline decoration-1 underline-offset-4 hover:text-[#FF8A3D] transition-colors" style={{ color: theme.text }}>+47 976 76 358</a>
                     <a href="#" className="text-sm font-medium underline decoration-1 underline-offset-4 hover:text-[#FF8A3D] transition-colors" style={{ color: theme.text }}>vw@aiai3d.io</a>
                     <p className="text-sm font-medium mt-1" style={{ color: theme.text }}>Oslo / Ørebro</p>

                     <div className="flex items-center space-x-4 pt-6">
                       <div className="w-8 h-8 rounded bg-white text-black flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                         <Linkedin size={20} fill="currentColor" strokeWidth={0} />
                       </div>
                     </div>
                     <p className="text-xs font-medium mt-10 opacity-60" style={{ color: theme.text }}>© 2026 Aiai3d AS. All rights reserved.</p>
                  </div>

                  {/* Center Column */}
                  <div className="flex flex-col items-center justify-center mb-10 md:mb-0">
                     <div className="relative mb-4 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                        <img src={LOGO_URL} alt="aiai3D" className="h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                     </div>
                     <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-center" style={{ color: theme.text }}>Connecting<br/>Dots to viz</p>
                  </div>

                  {/* Right Column */}
                  <div className="flex flex-col space-y-3 items-start md:items-end text-left md:text-right">
                     <h4 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>Company</h4>
                     <p className="text-sm font-medium" style={{ color: theme.text }}>Org.nr 9362356979</p>
                     <a href="#" onClick={(e) => { e.preventDefault(); setPolicyModal('cookie'); }} className="text-sm font-medium underline decoration-1 underline-offset-4 hover:text-[#FF8A3D] transition-colors" style={{ color: theme.text }}>Cookie policy</a>
                     <a href="#" onClick={(e) => { e.preventDefault(); setPolicyModal('privacy'); }} className="text-sm font-medium underline decoration-1 underline-offset-4 hover:text-[#FF8A3D] transition-colors" style={{ color: theme.text }}>Privacy policy</a>

                     {/* Innovation Norway Logo */}
                     <div className="mt-8 flex items-center bg-white rounded-sm overflow-hidden p-1 shadow-md">
                       <div className="bg-[#FF0000] text-white font-extrabold text-xl px-2 py-1 leading-none rounded-sm tracking-tighter">.V</div>
                       <div className="text-[9px] text-black font-bold text-left leading-tight ml-2 pr-2">Together with<br/>Innovation Norway</div>
                     </div>

                     {/* Scroll to Top */}
                     <button onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="mt-10 p-3 border rounded-sm transition-colors group" style={{ borderColor: isDarkMode ? '#C98C6C' : theme.border }}>
                       <ChevronUp size={24} style={{ color: isDarkMode ? '#C98C6C' : theme.text }} className="group-hover:-translate-y-1 transition-transform" />
                     </button>
                  </div>
               </div>
             </footer>
          </div>
        );

      case SCREENS.LOGIN:
        return (
          <div className="min-h-screen flex items-center justify-center p-6 relative z-10">
            <div className="w-full max-w-md p-10 rounded-[2rem] border backdrop-blur-2xl shadow-2xl" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
              <div className="flex justify-center mb-8">
                <img src={LOGO_URL} alt="aiai3D" className="h-16 w-auto object-contain" />
              </div>
              <h2 className="text-3xl font-medium text-center mb-2" style={{ color: theme.text }}>Welcome back</h2>
              <p className="text-sm font-medium text-center mb-8" style={{ color: theme.textMuted }}>Sign in to access your projects</p>
              
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setCurrentScreen(SCREENS.DASHBOARD); }}>
                <div>
                  <label className="text-xs font-medium opacity-60 mb-2 block" style={{ color: theme.text }}>Email address</label>
                  <input type="email" placeholder="name@company.com" className="w-full border-none rounded-xl py-3.5 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                </div>
                <div>
                  <label className="text-xs font-medium opacity-60 mb-2 block" style={{ color: theme.text }}>Password</label>
                  <input type="password" placeholder="••••••••" className="w-full border-none rounded-xl py-3.5 px-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#FF8A3D] transition-all" style={{ backgroundColor: theme.input, color: theme.text }} />
                </div>
                <div className="flex items-center justify-between pt-2 mb-6">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span className="text-xs font-medium" style={{ color: theme.textMuted }}>Remember me</span>
                  </label>
                  <a href="#" className="text-xs font-medium hover:underline" style={{ color: BRAND.sunsetOrange }}>Forgot password?</a>
                </div>
                <Button type="submit" className="w-full py-4 text-sm">Log In</Button>
              </form>
              
              <button onClick={() => setCurrentScreen(SCREENS.LANDING)} className="w-full mt-6 text-xs font-medium hover:underline opacity-60" style={{ color: theme.text }}>
                ← Back to Home
              </button>
            </div>
          </div>
        );

      case SCREENS.DASHBOARD:
        return (
          <div className="p-12 max-w-7xl mx-auto font-manrope animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex justify-between items-end mb-12" style={{ color: theme.text }}>
              <div>
                <div className="flex items-center space-x-2 mb-4">
                   <div className="w-8 h-8 flex items-center justify-center border border-current opacity-40 rounded-full"><Building2 size={16} /></div>
                   <span className="text-sm font-medium opacity-60" style={{ color: theme.text }}>Scandinavian Housing</span>
                </div>
                <h1 className="text-4xl font-medium tracking-tight" style={{ color: theme.text }}>Projects</h1>
              </div>
              <Button onClick={() => setCurrentScreen(SCREENS.UPLOAD)}><Plus size={18} strokeWidth={2} /><span>New Project</span></Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_PROJECTS.map(project => (
                <div key={project.id} onClick={() => { if (project.status === 'Ready') { setActiveProject(project); setCurrentScreen(SCREENS.PROJECT_OVERVIEW); }}} 
                     className={`border p-6 transition-all group relative overflow-hidden rounded-[2rem] backdrop-blur-2xl shadow-2xl ${project.status === 'Ready' ? `cursor-pointer hover:shadow-2xl hover:scale-[1.02]` : 'opacity-60 cursor-wait'}`} 
                     style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                  <div className="aspect-video rounded-2xl mb-6 relative overflow-hidden bg-black/20">
                    <img src={project.id === 1 ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800" : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800"} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" alt={String(project.name)} />
                    {project.status === 'Processing' && (
                       <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md"><RefreshCcw className="text-[#FF8A3D] animate-spin" size={32} /></div>
                    )}
                    <div className="absolute bottom-4 left-4 flex space-x-2">
                      <span className={`text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-md shadow-lg ${project.status === 'Ready' ? 'bg-white/20 text-white border border-white/20' : 'bg-white/20 text-white'}`}>{String(project.status) === 'Processing' ? 'Enriching Model...' : String(project.status)}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium tracking-tight" style={{ color: theme.text }}>{String(project.name || '')}</h3>
                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-current border-opacity-10" style={{ borderColor: theme.border }}>
                    <div className="flex -space-x-2">{project.collaborators.map((a, i) => <img key={i} src={a} className="w-8 h-8 rounded-full border-2" style={{ borderColor: theme.panel }} alt="User" />)}</div>
                    <span className="text-[11px] font-medium opacity-40" style={{ color: theme.text }}>{String(project.units || '')} Units</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case SCREENS.UPLOAD:
        return (
          <div className="max-w-4xl mx-auto mt-20 p-12 border rounded-[2rem] backdrop-blur-2xl shadow-2xl font-manrope text-center" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
            <h2 className="text-4xl font-medium tracking-tight" style={{ color: theme.text, marginBottom: '0.5rem' }}>Ingest Assets</h2>
            <p className="text-sm font-medium opacity-60 mb-12" style={{ color: theme.text }}>Architectural Data Pipeline</p>
            <div className={`border-4 border-dashed rounded-[2rem] p-24 transition-all ${uploadProgress > 0 ? 'border-[#FF8A3D] bg-[#FF8A3D]/5' : ''}`} style={{ borderColor: uploadProgress > 0 ? '#FF8A3D' : theme.border }}>
               {uploadProgress === 0 ? <Upload size={48} className="mx-auto text-current opacity-20 mb-4" /> : <div className="text-3xl font-medium text-[#FF8A3D] mb-4">{uploadProgress}%</div>}
               <p className="text-xl font-medium tracking-tight" style={{ color: theme.text }}>{uploadProgress > 0 ? 'Uploading Site Data...' : 'Drop IFC / PDF / Excel files'}</p>
            </div>
            <div className="mt-12 flex justify-center">
              <Button onClick={() => setUploadProgress(10)} disabled={uploadProgress > 0}>Begin AI Pipeline</Button>
            </div>
          </div>
        );

      case SCREENS.PROCESSING:
        return (
          <div className="max-w-xl mx-auto mt-32 text-center font-manrope">
            <div className="w-48 h-48 rounded-full border-[6px] mx-auto mb-12 flex items-center justify-center relative backdrop-blur-2xl shadow-2xl" style={{ borderColor: theme.border, backgroundColor: theme.panel }}>
              <div className="absolute inset-0 border-[6px] border-[#FF8A3D] rounded-full border-t-transparent animate-spin" style={{ clipPath: `polygon(0 0, 100% 0, 100% ${processingProgress}%, 0 ${processingProgress}%)` }}></div>
              <Sparkles size={32} className="text-[#FF8A3D] animate-pulse" />
            </div>
            <h2 className="text-3xl font-medium tracking-tight" style={{ color: theme.text, marginBottom: '2.5rem' }}>Synthesizing Environment</h2>
            <div className="space-y-4 text-left p-8 border rounded-[2rem] backdrop-blur-2xl shadow-2xl" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
               {pipelineSteps.map((s, i) => <div key={i} className={`text-sm font-medium opacity-60 flex items-center ${i <= pipeStep ? 'text-[#FF8A3D]' : 'opacity-20'}`} style={{ color: i === pipeStep ? theme.text : undefined }}>{i < pipeStep ? <CheckCircle2 size={16} className="mr-4" /> : <Clock size={16} className="mr-4" />} {String(s)}</div>)}
            </div>
          </div>
        );

      case SCREENS.MODEL_READY:
        return (
          <div className="max-w-lg mx-auto mt-32 text-center p-16 border rounded-[2rem] backdrop-blur-2xl shadow-2xl font-manrope" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
            <div className="w-24 h-24 bg-[#FF8A3D]/20 rounded-full flex items-center justify-center mx-auto mb-8"><Sparkles size={40} className="text-[#FF8A3D]" /></div>
            <h2 className="text-3xl font-medium tracking-tight" style={{ color: theme.text, marginBottom: '2rem' }}>Environment Ready</h2>
            <Button onClick={() => setCurrentScreen(SCREENS.DASHBOARD)} className="w-full">Enter Platform</Button>
          </div>
        );

      case SCREENS.PROJECT_OVERVIEW:
        return (
          <div className="p-12 max-w-7xl mx-auto font-manrope animate-in fade-in duration-500">
             <button onClick={() => setCurrentScreen(SCREENS.DASHBOARD)} className="text-sm font-medium mb-10 opacity-60 hover:opacity-100 flex items-center" style={{ color: theme.text }}><ArrowLeft size={16} className="mr-2" /> Back to projects</button>
             
             <div className="w-full h-72 rounded-[2rem] mb-12 relative overflow-hidden border backdrop-blur-2xl shadow-2xl" style={{ borderColor: theme.border }}>
                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" alt="Hero" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                <div className="absolute bottom-10 left-10">
                   <h1 className="text-5xl font-medium tracking-tight text-white">{String(activeProject?.name || '')}</h1>
                   <div className="flex space-x-6 text-sm font-medium opacity-80 text-white mt-4">
                    <span className="flex items-center"><MapPin size={16} className="mr-2 opacity-60" /> {String(activeProject?.address || '')}</span>
                    <span className="flex items-center"><Layers size={16} className="mr-2 opacity-60" /> {String(activeProject?.floors || '')} Floors</span>
                  </div>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-2 gap-8">
                    <div onClick={() => setCurrentScreen(SCREENS.ENGINE)} className="bg-gradient-to-br from-[#FF8A3D] to-[#FFB068] p-10 rounded-[2rem] cursor-pointer group hover:shadow-[0_0_40px_rgba(255,138,61,0.4)] transition-all border border-transparent flex flex-col justify-between h-48">
                      <Sparkles size={32} className="text-black group-hover:scale-110 transition-transform" />
                      <div>
                        <h3 className="text-2xl font-medium tracking-tight text-black">Launch Studio</h3>
                        <p className="text-black/60 text-sm font-medium mt-1">Launch 3D Engine</p>
                      </div>
                    </div>
                    <div onClick={() => setCurrentScreen(SCREENS.REPOSITORY)} className="p-10 border rounded-[2rem] cursor-pointer transition-all hover:shadow-2xl hover:scale-[1.02] flex flex-col justify-between h-48 backdrop-blur-2xl shadow-2xl" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                      <LayoutGrid size={32} style={{ color: theme.text }} />
                      <div>
                        <h3 className="text-2xl font-medium tracking-tight" style={{ color: theme.text }}>Repository</h3>
                        <p className="text-sm font-medium mt-1 opacity-60" style={{ color: theme.text }}>{renders.length} Assets Stored</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 pt-8">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium opacity-60" style={{ color: theme.text }}>Latest captures</h4>
                      <button className="text-[11px] font-medium opacity-40" style={{ color: theme.text }}>View All</button>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      {renders.length > 0 ? renders.slice(0, 3).map(r => (
                        <div key={r.id} className="aspect-video rounded-2xl overflow-hidden border transition-all hover:scale-[1.02] shadow-sm" style={{ borderColor: theme.border }}>
                          <img src={r.image} className="w-full h-full object-cover" alt="Recent" />
                        </div>
                      )) : (
                        <div className="col-span-3 h-40 border border-dashed rounded-2xl flex items-center justify-center" style={{ borderColor: theme.border }}>
                           <p className="text-[11px] font-medium opacity-40" style={{ color: theme.text }}>No images captured yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-8 border rounded-[2rem] backdrop-blur-2xl shadow-2xl h-fit" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                  <h4 className="text-sm font-medium opacity-60 mb-8 flex items-center" style={{ color: theme.text }}><Users size={16} className="mr-3 opacity-60" /> Project team</h4>
                  <div className="space-y-6">
                    {activeProject?.collaborators.map((c, i) => (
                      <div key={i} className="flex items-center space-x-4 border-b pb-4 last:border-0 last:pb-0" style={{ borderColor: `${theme.border}80` }}>
                        <img src={c} className="w-12 h-12 rounded-full border-2 border-[#FF8A3D]/20" alt="User" />
                        <div>
                          <p className="text-sm font-medium" style={{ color: theme.text }}>User {i + 1}</p>
                          <p className="text-[11px] font-medium opacity-40" style={{ color: theme.text }}>Lead Architect</p>
                        </div>
                      </div>
                    ))}
                    <button className="w-full flex items-center justify-center space-x-2 py-4 border border-dashed rounded-2xl transition-all text-sm font-medium opacity-60 mt-4 hover:border-current" style={{ borderColor: theme.border, color: theme.textMuted }}>
                      <UserPlus size={16} /><span>Add Collaborator</span>
                    </button>
                  </div>
                </div>
             </div>
          </div>
        );

      case SCREENS.ENGINE:
        return (
          <div className="fixed inset-0 w-full h-full bg-black overflow-hidden font-manrope z-40">
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 z-0" style={{ backgroundImage: `url('${ROOM_IMAGES[activeRoom] || ROOM_IMAGES[ROOMS.EXTERIOR]}')`, filter: `brightness(${timeOfDay > 18 || timeOfDay < 7 ? 0.3 : 1})`, transform: isLocked ? 'scale(1.05)' : 'scale(1)' }}></div>
            
            <div className="absolute bottom-6 right-6 z-50">
               <button 
                 onClick={() => setUiHidden(!uiHidden)} 
                 className="flex items-center space-x-2 px-5 py-3 rounded-full border backdrop-blur-2xl shadow-2xl transition-all hover:scale-105" 
                 style={{ backgroundColor: theme.panel, borderColor: theme.border, color: theme.text }}
               >
                 {uiHidden ? <Eye size={18} /> : <EyeOff size={18} />}
                 <span className="text-xs font-medium pl-1">{uiHidden ? "Bring Menu Back" : "Hide UI"}</span>
               </button>
            </div>

            <div className={`absolute top-32 left-10 z-10 text-white drop-shadow-2xl transition-all duration-500 ${uiHidden ? 'opacity-0 translate-y-[-20px] pointer-events-none' : 'opacity-100 translate-y-0'}`}>
              <div className="text-sm font-medium opacity-80 mb-1">{String(activeRoom || '')}</div>
              <h2 className="text-5xl font-medium tracking-tight">{activeRoom === ROOMS.EXTERIOR ? "Building Site" : `Unit ${selectedUnit}`}</h2>
            </div>

            {activeRoom !== ROOMS.EXTERIOR && (
              <div className={`absolute inset-0 flex items-center justify-center space-x-8 z-10 transition-all duration-500 ${uiHidden ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
                 <button onClick={() => setActiveRoom(ROOMS.KITCHEN)} className="pointer-events-auto bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white transition-all hover:text-black shadow-2xl">Kitchen</button>
                 <button onClick={() => setActiveRoom(ROOMS.BATHROOM)} className="pointer-events-auto bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-sm font-medium text-white hover:bg-white transition-all hover:text-black shadow-2xl">Bathroom</button>
              </div>
            )}

            <div className={`absolute left-6 top-52 bottom-28 w-64 rounded-[2rem] border backdrop-blur-2xl flex flex-col overflow-hidden shadow-2xl z-20 transition-all duration-500 ${uiHidden ? 'translate-x-[-150%] opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`} style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
              <div className="p-6 border-b border-current border-opacity-10" style={{ color: theme.text }}>
                <div className="relative">
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
                  <input placeholder="Search Units..." className="w-full bg-transparent border rounded-full py-2.5 pl-10 pr-4 text-xs font-medium outline-none transition-all focus:border-[#FF8A3D]" style={{ borderColor: theme.border }} />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <div className="px-4 py-2 text-xs font-medium opacity-50" style={{ color: theme.text }}>Spaces</div>
                <button onClick={() => setActiveRoom(ROOMS.EXTERIOR)} className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all ${activeRoom === ROOMS.EXTERIOR ? 'bg-[#FF8A3D] text-black shadow-lg shadow-[#FF8A3D]/20' : 'hover:bg-white/5'}`} style={{ color: activeRoom === ROOMS.EXTERIOR ? undefined : theme.text }}>Exterior</button>
                <button onClick={() => { setActiveRoom(ROOMS.LIVING); setSelectedUnit("H-0407"); }} className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all ${activeRoom !== ROOMS.EXTERIOR ? 'bg-[#FF8A3D] text-black shadow-lg shadow-[#FF8A3D]/20' : 'hover:bg-white/5'}`} style={{ color: activeRoom !== ROOMS.EXTERIOR ? undefined : theme.text }}>Apartment {selectedUnit}</button>
              </div>
            </div>

            <div className={`absolute right-6 top-52 bottom-28 w-80 rounded-[2rem] border backdrop-blur-2xl flex flex-col p-6 space-y-8 shadow-2xl z-20 overflow-y-auto transition-all duration-500 ${uiHidden ? 'translate-x-[150%] opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'}`} style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
              <section>
                <label className="text-xs font-medium opacity-60 mb-3 block" style={{ color: theme.text }}>AI Assistant</label>
                <div className="relative group">
                  <Sparkles size={16} className="absolute left-4 top-3.5 text-[#FF8A3D] group-hover:scale-110 transition-transform" />
                  <input placeholder="Ask aiai to redesign..." className="w-full bg-transparent border rounded-2xl py-3.5 pl-12 pr-10 text-sm font-medium outline-none transition-all focus:border-[#FF8A3D]" style={{ borderColor: theme.border, color: theme.text }} />
                  <Send size={14} className="absolute right-4 top-3.5 opacity-40 hover:opacity-100 cursor-pointer transition-colors" style={{ color: theme.text }} />
                </div>
              </section>

              <section className="p-5 rounded-2xl border bg-black/5" style={{ borderColor: theme.border }}>
                <label className="text-xs font-medium opacity-60 mb-4 block" style={{ color: theme.text }}>Navigation Guide</label>
                <div className="flex flex-col items-center space-y-4 opacity-60" style={{ color: theme.text }}>
                  <div className="flex space-x-1"><span className="w-8 h-8 border rounded-lg flex items-center justify-center font-medium" style={{ borderColor: theme.border }}>W</span></div>
                  <div className="flex space-x-1"><span className="w-8 h-8 border rounded-lg flex items-center justify-center font-medium" style={{ borderColor: theme.border }}>A</span><span className="w-8 h-8 border rounded-lg flex items-center justify-center font-medium" style={{ borderColor: theme.border }}>S</span><span className="w-8 h-8 border rounded-lg flex items-center justify-center font-medium" style={{ borderColor: theme.border }}>D</span></div>
                  <p className="text-xs font-medium mt-2">Use RMB to orbit</p>
                </div>
              </section>

              {renderContextAwareControls()}

              <section>
                 <label className="text-xs font-medium opacity-60 mb-3 block" style={{ color: theme.text }}>Solar Simulation</label>
                 <div className="flex justify-between text-xs font-medium mb-3 opacity-60" style={{ color: theme.text }}><span>Time</span> <span>{timeOfDay}:00</span></div>
                 <input type="range" min="0" max="23" value={timeOfDay} onChange={(e) => setTimeOfDay(parseInt(e.target.value))} className="w-full accent-[#FF8A3D] cursor-pointer" />
              </section>
            </div>

            <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 h-20 rounded-[2rem] border backdrop-blur-2xl flex items-center px-4 space-x-6 shadow-2xl z-20 transition-all duration-500`} style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
               <div className={`flex space-x-3 items-center border-r border-current border-opacity-10 transition-all duration-500 ${uiHidden ? 'w-0 opacity-0 overflow-hidden pr-0 border-r-0' : 'pr-6 opacity-100 w-auto'}`} style={{ color: theme.text }}>
                  {viewpoints.map(vp => (
                    <div key={vp.id} className="h-12 w-20 rounded-xl overflow-hidden shadow-md shrink-0">
                      <img src={vp.thumbnail} className="w-full h-full object-cover" alt="Saved" />
                    </div>
                  ))}
                  <button onClick={saveViewpoint} className="h-12 w-20 border border-dashed rounded-xl flex items-center justify-center transition-all opacity-60 hover:opacity-100 shrink-0" style={{ borderColor: theme.border, color: theme.text }}>
                    <Camera size={16} />
                  </button>
               </div>
               <div className="flex space-x-3 pl-2">
                  <Button variant={isLocked ? "primary" : "secondary"} onClick={() => setIsLocked(!isLocked)}>
                    {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                    <span>{isLocked ? "Locked" : "Lock Frame"}</span>
                  </Button>
                  <Button variant="primary" onClick={handleTakeImage}>
                    <Sparkles size={16} />
                    <span>Take Image</span>
                  </Button>
               </div>
            </div>
          </div>
        );

      case SCREENS.ACCOUNT:
        return (
          <div className="p-12 max-w-5xl mx-auto font-manrope animate-in fade-in duration-500 relative z-10">
            <button onClick={() => setCurrentScreen(SCREENS.DASHBOARD)} className="text-[11px] font-medium opacity-40 mb-12 hover:opacity-100 flex items-center cursor-pointer" style={{ color: theme.text }}><ArrowLeft size={16} className="mr-2" /> Back to Dashboard</button>
            <h1 className="text-4xl font-medium tracking-tight mb-12" style={{ color: theme.text }}>Account Settings</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-12">
                <section className="border rounded-[2rem] p-8 backdrop-blur-2xl shadow-2xl" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                  <div className="flex items-center space-x-6 mb-8">
                    <div className="w-20 h-20 bg-[#FF8A3D] rounded-2xl flex items-center justify-center text-3xl font-extrabold text-black">JA</div>
                    <div><h3 className="text-xl font-medium tracking-tight" style={{ color: theme.text }}>Johan Architect</h3><p className="text-[11px] font-medium opacity-40" style={{ color: theme.text }}>Super Admin</p></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-xl" style={{ backgroundColor: theme.bg, borderColor: theme.border }}><p className="text-[9px] text-[#C98C6C] font-extrabold uppercase mb-1">Organization</p><p className="text-sm font-medium" style={{ color: theme.text }}>Scandinavian Housing AB</p></div>
                    <div className="p-4 border rounded-xl" style={{ backgroundColor: theme.bg, borderColor: theme.border }}><p className="text-[9px] text-[#C98C6C] font-extrabold uppercase mb-1">Billing Email</p><p className="text-sm font-medium" style={{ color: theme.text }}>johan@scandi.se</p></div>
                  </div>
                </section>
                <section className="border rounded-[2rem] p-8 backdrop-blur-2xl shadow-2xl" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="text-sm font-medium opacity-60" style={{ color: theme.text }}>Team Management</h4>
                    <Button variant="outline"><UserPlus size={14} /><span>Invite</span></Button>
                  </div>
                  <div className="space-y-4">
                    {['Anna Lund', 'Erik Svahn', 'Klara Berg'].map((name, i) => (
                      <div key={i} className="flex items-center justify-between p-5 border rounded-2xl" style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 bg-[#FF8A3D]/10 text-[#FF8A3D] rounded-full flex items-center justify-center font-bold text-xs uppercase">{name[0]}</div>
                           <div><p className="text-sm font-medium" style={{ color: theme.text }}>{name}</p><p className="text-[11px] font-medium opacity-40" style={{ color: theme.text }}>{i === 0 ? 'Admin' : 'Viewer'}</p></div>
                        </div>
                        <MoreVertical size={16} style={{ color: theme.textMuted }} />
                      </div>
                    ))}
                  </div>
                </section>
                <section className="border rounded-[2rem] p-8 backdrop-blur-2xl shadow-2xl" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                  <h4 className="text-sm font-medium opacity-60 mb-8 flex items-center" style={{ color: theme.text }}>
                    <CreditCard size={16} className="mr-3 text-[#FF8A3D]" /> Payment Method
                  </h4>
                  <div className="flex items-center justify-between border p-6 rounded-2xl" style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-8 bg-black text-white rounded flex items-center justify-center text-[10px] font-extrabold">VISA</div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: theme.text }}>•••• 4242</p>
                        <p className="text-[11px] font-medium opacity-40" style={{ color: theme.text }}>Expires 12/26</p>
                      </div>
                    </div>
                    <Button variant="outline" className="h-8 py-0">Edit</Button>
                  </div>
                </section>
              </div>
              <div className="bg-gradient-to-br from-[#FF8A3D] to-[#FFB068] p-10 rounded-[2rem] text-black h-fit shadow-[0_0_40px_rgba(255,138,61,0.2)]">
                <h4 className="text-sm font-medium opacity-70 mb-4">Active Tier</h4>
                <h3 className="text-4xl font-semibold tracking-tight mb-8">PRO ARCHITECT</h3>
                <div className="space-y-4 mb-10 text-sm font-medium">
                   <div className="flex justify-between border-b border-black/10 pb-3"><span>Synthesis Credit</span><span>184 / 500</span></div>
                   <div className="flex justify-between border-b border-black/10 pb-3"><span>Storage</span><span>42GB / 100GB</span></div>
                </div>
                <button className="w-full bg-black text-white py-4 rounded-2xl font-medium text-sm hover:bg-black/80 transition-colors">Upgrade Package</button>
              </div>
            </div>
          </div>
        );

      case SCREENS.RESULT:
        return (
          <div className="max-w-6xl mx-auto mt-20 p-12 border rounded-[2rem] backdrop-blur-2xl shadow-2xl animate-in zoom-in-95 duration-500" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
             <div className="flex justify-between items-center mb-10">
               <h2 className="text-3xl font-medium tracking-tight" style={{ color: theme.text }}>Image captured</h2>
               <div className="flex space-x-3"><Button variant="secondary" onClick={() => setCurrentScreen(SCREENS.ENGINE)}>Retake</Button><Button onClick={() => setCurrentScreen(SCREENS.REPOSITORY)}>Open Repository</Button></div>
             </div>
             <div className="grid grid-cols-3 gap-12">
               <div className="col-span-2"><img src={renders[0]?.image} className="w-full rounded-2xl border border-[#C98C6C]/20 shadow-2xl" alt="Captured" /></div>
               <div className="p-8 rounded-[2rem] border space-y-6" style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
                  <h4 className="text-sm font-medium opacity-60" style={{ color: '#C98C6C' }}>Metadata</h4>
                  <div className="space-y-4">
                     <div className="flex justify-between border-b pb-3 text-sm font-medium opacity-80" style={{ color: theme.text, borderColor: theme.border }}><span className="opacity-50">Unit</span><span>{String(renders[0]?.unit || '')}</span></div>
                     <div className="flex justify-between border-b pb-3 text-sm font-medium opacity-80" style={{ color: theme.text, borderColor: theme.border }}><span className="opacity-50">View</span><span>{String(renders[0]?.room || '')}</span></div>
                  </div>
                  <Button variant="outline" className="w-full mt-10"><Download size={14} /><span>Download 4K</span></Button>
               </div>
             </div>
          </div>
        );

      case SCREENS.REPOSITORY:
        return (
          <div className="p-12 max-w-7xl mx-auto font-manrope relative z-10">
            <Button variant="ghost" onClick={() => setCurrentScreen(SCREENS.PROJECT_OVERVIEW)} className="mb-10"><ArrowLeft size={16} /><span>Back to Overview</span></Button>
            <h1 className="text-4xl font-medium tracking-tight mb-12" style={{ color: theme.text }}>Repository</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {renders.map(r => (
                <div key={r.id} className="group border rounded-2xl overflow-hidden hover:border-[#FF8A3D] transition-all backdrop-blur-2xl shadow-2xl" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                   <div className="aspect-video relative overflow-hidden">
                    <img src={r.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Repository Item" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"><Download size={24} className="text-white drop-shadow-md" /></div>
                  </div>
                   <div className="p-5 flex justify-between items-center"><span className="text-[11px] font-medium opacity-40" style={{ color: theme.text }}>{String(r.unit || '')} · {String(r.room || '')}</span><ImageIcon size={16} className="text-[#C98C6C]" /></div>
                </div>
              ))}
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 font-manrope overflow-x-hidden" style={{ backgroundColor: theme.bg }}>
      {/* Mesh Particle Background */}
      {currentScreen !== SCREENS.ENGINE && (
        <MeshBackground isDarkMode={isDarkMode} settings={meshSettings} />
      )}

      {/* Policy Modals */}
      {policyModal === 'cookie' && (
        <PolicyModal title="Cookie Policy" content={COOKIE_POLICY_CONTENT} onClose={() => setPolicyModal(null)} theme={theme} />
      )}
      {policyModal === 'privacy' && (
        <PolicyModal title="Privacy Policy" content={PRIVACY_POLICY_CONTENT} onClose={() => setPolicyModal(null)} theme={theme} />
      )}

      {/* Usercentrics Cookie Consent Modal */}
      {showCookieConsent && (
        <CookieConsentModal onClose={() => setShowCookieConsent(false)} />
      )}

      {/* Navigation Layer */}
      {currentScreen === SCREENS.LANDING ? (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-7xl h-16 rounded-full border backdrop-blur-2xl z-50 px-8 flex items-center justify-between shadow-lg transition-all duration-500" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
          <div onClick={() => window.scrollTo({top:0, behavior:'smooth'})} className="flex items-center cursor-pointer group">
             <img src={LOGO_URL} alt="aiai3D" className="h-7 w-auto object-contain group-hover:scale-105 transition-transform" />
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium" style={{ color: theme.text }}>
            <button onClick={() => scrollToSection('home')} className="hover:text-[#FF8A3D] transition-colors">Home</button>
            <button onClick={() => scrollToSection('platform')} className="hover:text-[#FF8A3D] transition-colors">Platform</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-[#FF8A3D] transition-colors">About us</button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-[#FF8A3D] transition-colors">Contact</button>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full border transition-all hover:scale-110" style={{ borderColor: theme.border, color: theme.text }}>{isDarkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
            <button onClick={() => setCurrentScreen(SCREENS.LOGIN)} className="bg-[#FF8A3D] text-black px-6 py-2 rounded-full font-medium text-sm hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,138,61,0.3)]">Log In</button>
          </div>
        </nav>
      ) : currentScreen === SCREENS.LOGIN ? (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-7xl h-16 rounded-full border backdrop-blur-2xl z-50 px-8 flex items-center justify-between shadow-lg transition-all duration-500" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
          <div onClick={() => setCurrentScreen(SCREENS.LANDING)} className="flex items-center cursor-pointer group">
             <img src={LOGO_URL} alt="aiai3D" className="h-7 w-auto object-contain group-hover:scale-105 transition-transform" />
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full border transition-all hover:scale-110" style={{ borderColor: theme.border, color: theme.text }}>{isDarkMode ? <Sun size={16} /> : <Moon size={16} />}</button>
        </nav>
      ) : (
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-7xl h-16 rounded-full border backdrop-blur-2xl z-50 px-8 flex items-center justify-between shadow-lg transition-all duration-500 ${uiHidden && currentScreen === SCREENS.ENGINE ? 'translate-y-[-150%] opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`} style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
          <div onClick={() => { setCurrentScreen(SCREENS.DASHBOARD); setActiveProject(null); setUiHidden(false); }} className="flex items-center cursor-pointer group">
             <img src={LOGO_URL} alt="aiai3D" className="h-7 w-auto object-contain group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-black/5 rounded-full p-1" style={{ border: `1px solid ${theme.border}` }}>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full transition-all hover:bg-white/10" style={{ color: theme.text }}>
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              
              {/* MESH SETTINGS TOGGLE */}
              <div className="relative">
                <button onClick={() => setShowMeshSettings(!showMeshSettings)} className={`p-2 rounded-full transition-all hover:bg-white/10 ${showMeshSettings ? 'text-[#FF8A3D]' : ''}`} style={{ color: showMeshSettings ? '#FF8A3D' : theme.text }}>
                  <Settings2 size={16} />
                </button>
                
                {/* Settings Dropdown Panel */}
                {showMeshSettings && (
                  <div className="absolute top-12 right-0 w-72 p-6 rounded-[2rem] border backdrop-blur-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-4" style={{ backgroundColor: theme.panel, borderColor: theme.border }}>
                     <div className="flex justify-between items-center mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.text }}>Mesh Dynamics</h4>
                        <button onClick={() => setShowMeshSettings(false)} className="opacity-40 hover:opacity-100" style={{ color: theme.text }}><X size={14}/></button>
                     </div>
                     <SettingsSlider label="Node Density" value={meshSettings.numParticles} min={10} max={250} step={5} onChange={(v) => setMeshSettings({...meshSettings, numParticles: v})} theme={theme} />
                     <SettingsSlider label="Connection Radius" value={meshSettings.maxDist} min={40} max={300} step={10} onChange={(v) => setMeshSettings({...meshSettings, maxDist: v})} theme={theme} />
                     <SettingsSlider label="Mouse Aura" value={meshSettings.mouseRadius} min={50} max={600} step={10} onChange={(v) => setMeshSettings({...meshSettings, mouseRadius: v})} theme={theme} />
                     <SettingsSlider label="Baseline Visibility" value={meshSettings.baseOpacity} min={0} max={0.5} step={0.01} onChange={(v) => setMeshSettings({...meshSettings, baseOpacity: v})} theme={theme} />
                     <SettingsSlider label="Data Pulse Intensity" value={meshSettings.pulseIntensity} min={0} max={1.5} step={0.1} onChange={(v) => setMeshSettings({...meshSettings, pulseIntensity: v})} theme={theme} />
                     <SettingsSlider label="Pulsar Speed" value={meshSettings.pulseSpeed} min={0.1} max={3.0} step={0.1} onChange={(v) => setMeshSettings({...meshSettings, pulseSpeed: v})} theme={theme} />
                     <SettingsSlider label="Mouse Nudge" value={meshSettings.mouseNudge} min={0} max={5.0} step={0.1} onChange={(v) => setMeshSettings({...meshSettings, mouseNudge: v})} theme={theme} />
                  </div>
                )}
              </div>
            </div>
            
            <button onClick={() => setCurrentScreen(SCREENS.ACCOUNT)} className="flex items-center space-x-3 border px-4 py-1.5 rounded-full hover:bg-white/5 transition-all group bg-transparent" style={{ borderColor: theme.border }}>
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#FF8A3D] to-[#C98C6C] flex items-center justify-center text-[8px] font-extrabold text-black">JA</div>
              <div className="flex flex-col items-start leading-none"><span className="text-[11px] font-medium" style={{ color: theme.text }}>Pro Architect</span></div>
            </button>
            <button onClick={() => { setCurrentScreen(SCREENS.LANDING); setActiveProject(null); }} className="p-2 rounded-full border transition-all hover:bg-white/10 hover:text-red-500" style={{ borderColor: theme.border, color: theme.text }} title="Log out">
              <LogOut size={16} />
            </button>
          </div>
        </nav>
      )}
      
      <main className={`relative z-10 transition-all duration-500 ${currentScreen !== SCREENS.ENGINE && currentScreen !== SCREENS.LANDING && currentScreen !== SCREENS.LOGIN ? 'pt-24' : ''}`}>
        {renderScreen()}
      </main>
    </div>
  );
}