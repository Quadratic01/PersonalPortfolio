import { Code, Palette, Zap, Users } from 'lucide-react';

export default function AboutSection() {
  const skills = [
    { icon: Code, name: 'React.js', description: 'Modern web applications' },
    { icon: Palette, name: 'UI/UX Design', description: 'Beautiful interfaces' },
    { icon: Zap, name: 'Performance', description: 'Optimized experiences' },
    { icon: Users, name: 'Collaboration', description: 'Team-focused development' },
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
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
              alt="Professional headshot" 
              className="w-80 h-80 object-cover mx-auto border-4 border-white shadow-2xl"
            />
          </div>
          
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold mb-6">Passionate Frontend Developer</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              With expertise in modern frontend development, I specialize in creating 
              responsive, user-friendly web applications using cutting-edge JavaScript frameworks. 
              My passion lies in transforming complex problems into simple, elegant solutions.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              I believe in writing clean, maintainable code and staying up-to-date with the 
              latest industry trends and best practices. When I'm not coding, you'll find me 
              exploring new technologies or contributing to open-source projects.
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
