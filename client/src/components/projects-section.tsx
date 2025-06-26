import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Github, ExternalLink, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Project } from '@shared/schema';

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const { data: projects = [], isLoading, error } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'react', label: 'React' },
    { id: 'vue', label: 'Vue' },
  ];

  const filteredProjects = projects.filter(project => {
    if (selectedFilter === 'all') return true;
    
    const language = project.language?.toLowerCase();
    const topics = project.topics?.map(topic => topic.toLowerCase()) || [];
    
    return language === selectedFilter || topics.includes(selectedFilter);
  });

  const formatDate = (dateString: string | Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  if (error) {
    return (
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-600">Failed to load projects. Please check your GitHub configuration.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h2>
          <div className="w-24 h-1 bg-black mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of projects showcasing my skills in frontend development, 
            fetched directly from my GitHub repositories.
          </p>
        </div>

        {/* Project Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? 'default' : 'outline'}
              onClick={() => setSelectedFilter(filter.id)}
              className={selectedFilter === filter.id ? 'bg-black text-white' : ''}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="border border-gray-200">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3 mb-4" />
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No projects found for the selected filter.</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <Card key={project.id} className="group border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <Github className="w-12 h-12 text-gray-400" />
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-1" />
                      {project.stargazers_count}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {project.description || 'No description available'}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.language && (
                      <Badge variant="secondary" className="text-xs">
                        {project.language}
                      </Badge>
                    )}
                    {project.topics?.slice(0, 2).map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    Updated {formatDate(project.updated_at)}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black hover:underline font-medium text-sm inline-flex items-center"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                    {project.homepage && (
                      <a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:underline font-medium text-sm inline-flex items-center"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <a
            href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'octocat'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-200"
          >
            <Github className="w-5 h-5 mr-2" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
