import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950 pt-16 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
            Hi, I'm Quadri Abdulsalam
          </h1>
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 h-8 overflow-hidden">
            <span className="block animate-typing whitespace-nowrap">
              Frontend Developer
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            I specialize in building modern, responsive web applications using React, JavaScript, 
            and cutting-edge frontend technologies. I transform ideas into beautiful, 
            high-performance digital experiences that users love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 transition-colors duration-200 inline-flex items-center justify-center group rounded-lg shadow-lg hover:shadow-emerald-500/25"
            >
              View My Work
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-emerald-500 text-emerald-500 dark:text-emerald-400 px-8 py-3 hover:bg-emerald-500 hover:text-white transition-all duration-200 inline-flex items-center justify-center rounded-lg"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
