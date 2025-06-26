import { Code, Palette, Zap, Users } from 'lucide-react';

export default function AboutSection() {
  const skills = [
    { icon: Code, name: 'React & JavaScript', description: 'Modern component-based apps' },
    { icon: Palette, name: 'CSS & Styling', description: 'Responsive, beautiful designs' },
    { icon: Zap, name: 'Web Performance', description: 'Fast, optimized experiences' },
    { icon: Users, name: 'Version Control', description: 'Git & collaborative workflows' },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="w-80 h-80 bg-gradient-to-br from-gray-100 to-gray-300 mx-auto border-4 border-white shadow-2xl flex items-center justify-center">
              <div className="text-center text-gray-600">
                <Code className="w-16 h-16 mx-auto mb-4" />
                <p className="text-sm font-medium">Your Photo Here</p>
              </div>
            </div>
          </div>
          
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold mb-6">About Me</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              I'm a passionate frontend developer who loves building modern web applications 
              with React, JavaScript, and the latest web technologies. I focus on creating 
              user-friendly interfaces that are both beautiful and functional.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              My approach combines clean, maintainable code with great user experience design. 
              I'm always learning new technologies and best practices to stay current in this 
              fast-evolving field. Check out my GitHub projects below to see my work!
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="bg-white p-4 shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex items-center mb-2">
                    <skill.icon className="w-6 h-6 mr-3 text-black" />
                    <span className="font-medium">{skill.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{skill.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
