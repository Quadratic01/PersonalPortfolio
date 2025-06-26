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
            <img 
              src="https://avatars.githubusercontent.com/u/101266782?v=4" 
              alt="Quadri Abdulsalam" 
              className="w-80 h-80 object-cover mx-auto shadow-2xl rounded-lg"
            />
          </div>
          
          <div className="animate-slide-up">
            <h3 className="text-2xl font-semibold mb-6">About Me</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              I'm Quadri Abdulsalam, a versatile creative professional based in Nigeria. 
              I'm a frontend developer, dynamic graphics designer, ebook ghostwriter, and video editor. 
              I specialize in building modern web applications and creating compelling visual content.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              With expertise spanning multiple creative domains, I bring a unique perspective to 
              every project. Whether it's developing responsive web applications, designing 
              eye-catching graphics, or crafting engaging content, I'm passionate about 
              delivering high-quality creative solutions.
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
