import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: 'https://github.com/Quadratic01',
      label: 'GitHub'
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/in/quadri-abdulsalam',
      label: 'LinkedIn'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/_Quadraticc',
      label: 'Twitter'
    },
    {
      icon: Mail,
      href: 'https://github.com/Quadratic01',
      label: 'Contact'
    },
  ];

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">Quadri Abdulsalam</p>
          <p className="text-gray-400 mb-6">Frontend Developer</p>
          
          <div className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label={social.label}
              >
                <social.icon className="w-6 h-6" />
              </a>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-sm">
              &copy; {currentYear} Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
