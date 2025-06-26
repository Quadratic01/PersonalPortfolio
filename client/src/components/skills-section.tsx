import { Code, Database, Globe, Smartphone, GitBranch, Zap, Palette, Video, BookOpen } from 'lucide-react';
import { SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiGit, SiNodedotjs, SiAdobe, SiFigma } from 'react-icons/si';

export default function SkillsSection() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code,
      skills: [
        { name: 'React', icon: SiReact, level: 85 },
        { name: 'JavaScript', icon: SiJavascript, level: 90 },
        { name: 'HTML5', icon: SiHtml5, level: 95 },
        { name: 'CSS3', icon: SiCss3, level: 90 },
        { name: 'Responsive Design', icon: Smartphone, level: 85 },
        { name: 'Git', icon: SiGit, level: 80 },
      ]
    },
    {
      title: 'Creative & Design',
      icon: Palette,
      skills: [
        { name: 'Graphics Design', icon: SiAdobe, level: 90 },
        { name: 'Video Editing', icon: Video, level: 85 },
        { name: 'Ebook Writing', icon: BookOpen, level: 80 },
        { name: 'UI Design', icon: SiFigma, level: 75 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Skills & Technologies</h2>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-gray-50 p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <category.icon className="w-8 h-8 mr-3 text-black" />
                <h3 className="text-2xl font-semibold">{category.title}</h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <skill.icon className="w-5 h-5 mr-3 text-gray-700" />
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2">
                      <div 
                        className="bg-black h-2 transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}