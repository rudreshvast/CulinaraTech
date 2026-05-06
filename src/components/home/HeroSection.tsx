'use client';

import Link from 'next/link';
import Image from 'next/image';
import { GraduationCap, Briefcase, MapPin, CheckCircle2, AlertCircle, BookOpen, Factory, IndianRupee, CalendarDays } from 'lucide-react';
import { CountUpBar } from './CountUpBar';

const avatarColors = ['#fbbf24', '#34d399', '#60a5fa', '#f87171', '#a78bfa'];

export function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen flex items-center bg-[#fdfaf5] overflow-hidden" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        {/* Dot grid texture overlay */}
        <div className="absolute inset-0 dot-pattern pointer-events-none z-0" style={{ opacity: 0.35 }} />

        {/* Decorative wheat illustration (bottom-left) */}
        <svg
          className="absolute z-0"
          width="280"
          height="280"
          viewBox="0 0 100 100"
          style={{ bottom: '-20px', left: '-40px', transform: 'rotate(-15deg)', opacity: 0.08 }}
        >
          <g stroke="#d4870a" strokeWidth="2" fill="none">
            <line x1="50" y1="80" x2="50" y2="20" />
            <line x1="48" y1="30" x2="45" y2="25" />
            <line x1="48" y1="30" x2="50" y2="24" />
            <line x1="48" y1="30" x2="52" y2="25" />
            <line x1="50" y1="40" x2="47" y2="35" />
            <line x1="50" y1="40" x2="50" y2="34" />
            <line x1="50" y1="40" x2="53" y2="35" />
            <line x1="50" y1="50" x2="47" y2="45" />
            <line x1="50" y1="50" x2="50" y2="44" />
            <line x1="50" y1="50" x2="53" y2="45" />
          </g>
        </svg>

        {/* Grain dots (top-right) */}
        <div className="absolute top-[60px] right-[80px] z-0" style={{ opacity: 0.1 }}>
          <div className="w-1 h-1 bg-[#1a5c38] rounded-full absolute" style={{ top: 0, left: 0 }} />
          <div className="w-1.5 h-1.5 bg-[#1a5c38] rounded-full absolute" style={{ top: '20px', left: '10px' }} />
          <div className="w-1 h-1 bg-[#1a5c38] rounded-full absolute" style={{ top: '15px', left: '30px' }} />
          <div className="w-2 h-2 bg-[#1a5c38] rounded-full absolute" style={{ top: '-10px', left: '40px' }} />
          <div className="w-1 h-1 bg-[#1a5c38] rounded-full absolute" style={{ top: '30px', left: '-5px' }} />
          <div className="w-1.5 h-1.5 bg-[#1a5c38] rounded-full absolute" style={{ top: '10px', left: '50px' }} />
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT COLUMN - TEXT */}
            <div>
              {/* Category tag */}
              <div className="inline-flex items-center gap-1.5 bg-[#e8f5ee] border border-[#b8dcc8] rounded-full px-3.5 py-1.5 mb-6">
                <div className="w-1.5 h-1.5 bg-[#1a5c38] rounded-full" style={{ animation: 'pulse-dot 2s infinite' }} />
                <span className="text-xs font-medium text-[#1a5c38]">Food Technology Education Platform</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#1a1a1a]" style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>
                From Classroom{' '}
                <span className="block relative inline-block">
                  to <span className="relative inline-block text-[#d4870a]">
                    Factory Floor
                    <span
                      className="absolute bottom-[-4px] left-0 right-0 h-1 bg-gradient-to-r from-[#d4870a] to-[#f0a832] rounded"
                      style={{ height: '3px' }}
                    />
                  </span>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg mb-8 text-[#6b6b6b] max-w-md leading-relaxed">
                Bridge the gap between your food technology degree and real industry practice. Learn from experts at Nestlé, ITC, Britannia, and 10+ leading food companies.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-[#1a5c38] hover:bg-[#144a2d] text-white px-7 py-3.5 rounded-[10px] font-semibold text-sm transition-all hover:-translate-y-0.5"
                  style={{ transitionProperty: 'all' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(26, 92, 56, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 0 rgba(26, 92, 56, 0.25)';
                  }}
                >
                  <GraduationCap size={18} />
                  Explore Courses
                </Link>
                <Link
                  href="/internships"
                  className="inline-flex items-center gap-2 border-2 border-[#1a5c38] text-[#1a5c38] hover:bg-[#e8f5ee] px-7 py-3.5 rounded-[10px] font-semibold text-sm transition-all"
                >
                  <Briefcase size={18} />
                  Browse Internships
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#1a5c38]" />
                  <span className="text-xs font-medium text-[#6b6b6b]">10+ Industry Partners</span>
                </div>
                <div className="w-px h-3.5 bg-[#d0c8bc] hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#1a5c38]" />
                  <span className="text-xs font-medium text-[#6b6b6b]">Paid Internships</span>
                </div>
                <div className="w-px h-3.5 bg-[#d0c8bc] hidden sm:block" />
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-[#1a5c38]" />
                  <span className="text-xs font-medium text-[#6b6b6b]">Govt-Certified Workshops</span>
                </div>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold text-xs"
                      style={{ backgroundColor: avatarColors[i], zIndex: 5 - i }}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1a1a1a]">Join 2,400+ food technology students</div>
                  <div className="text-xs text-[#6b6b6b]">
                    <span className="text-[#d4870a]">★★★★★</span> 4.8 rating
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN - CARD COMPOSITION */}
            <div className="relative hidden lg:block" style={{ height: '520px' }}>
              {/* Background blob */}
              <div
                className="absolute inset-5 rounded-3xl z-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, #fef3e2 0%, #e8f5ee 100%)',
                }}
              />

              {/* Main Course Card */}
              <div
                className="absolute bg-white rounded-2xl p-4 transition-all hover:shadow-lg hover:-translate-y-1"
                style={{
                  width: '240px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-20%, -50%) rotate(-2deg)',
                  zIndex: 10,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #f0ebe3',
                  animation: 'float-card 4s ease-in-out infinite',
                }}
              >
                <div className="relative w-full h-24 rounded-[10px] overflow-hidden mb-3">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlAXxEkk02V8VGFfDr3Hptt-uULUfr5ThKnclmweoH6aFzIJV_Iwxwb6b0xDJNNFtO5SzmjTU76N3DYC9OoSe88zRz5w1gmRh7pFbduM3QpiEh-ju3G6jCDBigLq3fJXqTOwLMWCZaOgJLz0CKpXfM4e0742GS3n6H8K1G_fPJ9MyW5uxy3WazHaIaizPHQtiPgBF_AB0rzI3071ZOTWlizIjVwA2gxOwty0zlH-4814AAT0lDvcCEEuh-fi3k0lJSGf0htkQTCn8"
                    alt="Dairy Processing"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="inline-block bg-[#e8f5ee] text-[#1a5c38] text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  Popular
                </div>
                <h3 className="text-sm font-semibold text-[#1a1a1a] mt-1.5 leading-snug">Industrial Dairy Processing</h3>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#1a5c38] flex items-center justify-center text-white text-xs font-semibold">
                    P
                  </div>
                  <span className="text-xs text-[#6b6b6b]">Dr. Priya Nair</span>
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                  <span className="text-[#d4870a] font-semibold text-xs">★ 4.7</span>
                  <span className="text-[#9ca3af] text-[10px]">(12.8k)</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-[#6b6b6b]">Progress</span>
                    <span className="text-[10px] font-semibold text-[#1a5c38]">65%</span>
                  </div>
                  <div className="w-full h-1 bg-[#e8f5ee] rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-[#1a5c38]" />
                  </div>
                </div>
                <button className="w-full mt-2.5 bg-[#1a5c38] text-white text-xs font-semibold py-2 rounded-lg hover:bg-[#144a2d] transition-colors">
                  Continue Learning →
                </button>
              </div>

              {/* Internship Card (top-left) */}
              <div
                className="absolute bg-white rounded-xl p-3.5 transition-all hover:shadow-lg hover:-translate-y-1"
                style={{
                  width: '200px',
                  top: '30px',
                  left: '-20px',
                  transform: 'rotate(3deg)',
                  zIndex: 20,
                  boxShadow: '0 6px 24px rgba(0,0,0,0.09)',
                  borderLeft: '3px solid #d4870a',
                }}
              >
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <div className="inline-block bg-[#fef3e2] text-[#d4870a] text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    New
                  </div>
                  <Briefcase size={14} className="text-[#d4870a]" />
                </div>
                <h3 className="text-xs font-semibold text-[#1a1a1a]">QA Intern — Nestlé India</h3>
                <div className="text-xs font-semibold text-[#1a5c38] mt-1">₹15,000/month</div>
                <div className="flex items-center gap-1 mt-0.5 text-[10px] text-[#9ca3af]">
                  <MapPin size={10} />
                  Moga, Punjab
                </div>
                <button className="w-full mt-2.5 bg-[#e8f5ee] border border-[#b8dcc8] text-[#1a5c38] text-xs font-semibold py-1.5 rounded-lg hover:bg-[#d5f0eb] transition-colors">
                  Apply Now
                </button>
              </div>

              {/* Plant Visit Card (bottom-right) */}
              <div
                className="absolute bg-white rounded-xl p-3.5 transition-all hover:shadow-lg hover:-translate-y-1"
                style={{
                  width: '195px',
                  bottom: '40px',
                  right: '-10px',
                  transform: 'rotate(-1deg)',
                  zIndex: 20,
                  boxShadow: '0 6px 24px rgba(0,0,0,0.09)',
                  borderLeft: '3px solid #1a5c38',
                }}
              >
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <div className="inline-block bg-[#e8f5ee] text-[#1a5c38] text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    Plant Visit
                  </div>
                  <Factory size={14} className="text-[#1a5c38]" />
                </div>
                <h3 className="text-xs font-semibold text-[#1a1a1a]">Britannia Biscuit Factory</h3>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-[#9ca3af]">
                  <CalendarDays size={10} />
                  Jun 21 · Rudrapur
                </div>
                <div className="flex items-center gap-1 mt-0.5 text-[10px] text-[#9ca3af]">
                  <IndianRupee size={10} />
                  ₹1,500/person
                </div>
                <div className="inline-flex items-center gap-1 mt-2 bg-[#fef3e2] rounded-full px-2 py-1">
                  <AlertCircle size={10} className="text-[#d4870a]" />
                  <span className="text-[10px] font-semibold text-[#d4870a]">10 seats left</span>
                </div>
              </div>

              {/* Placement Badge (top-right) */}
              <div
                className="absolute w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all hover:shadow-lg hover:-translate-y-1"
                style={{
                  top: '20px',
                  right: '20px',
                  zIndex: 20,
                  background: 'linear-gradient(135deg, #1a5c38, #2d7a52)',
                  boxShadow: '0 4px 20px rgba(26,92,56,0.30)',
                }}
              >
                <div className="text-2xl font-bold text-white">94%</div>
                <div className="text-xs text-white opacity-80 font-medium">placed</div>
              </div>

              {/* Workshop Badge (left side) */}
              <div
                className="absolute bg-white rounded-2xl p-3 transition-all hover:shadow-lg hover:-translate-y-1"
                style={{
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  width: '160px',
                }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <BookOpen size={12} className="text-[#d4870a]" />
                  <span className="text-[10px] font-semibold text-[#d4870a]">Workshop</span>
                </div>
                <h3 className="text-xs font-semibold text-[#1a1a1a]">HACCP Masterclass</h3>
                <div className="text-[10px] text-[#6b6b6b] mt-0.5">NIFTEM · Jun 14–16</div>
                <div className="mt-1.5">
                  <div className="text-[10px] text-[#6b6b6b] mb-1">11 seats left</div>
                  <div className="w-full h-1 bg-[#f0ebe3] rounded-full overflow-hidden">
                    <div className="w-[37%] h-full bg-[#d4870a]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes pulse-dot {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.5); opacity: 0; }
          }

          @keyframes float-card {
            0%, 100% { transform: rotate(-2deg) translateY(0px); }
            50% { transform: rotate(-2deg) translateY(-6px); }
          }
        `}</style>
      </section>

      {/* Stat Counter Bar */}
      <CountUpBar />
    </>
  );
}
