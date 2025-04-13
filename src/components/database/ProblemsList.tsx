
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Mock problems database
const problemsData = [
  {
    id: '1',
    title: 'Check Engine Light',
    description: 'Common causes and solutions for check engine lights.',
    category: 'diagnostics',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Brake Squeaking',
    description: 'Why brakes squeak and how to fix the issue.',
    category: 'brakes',
    isPremium: false,
  },
  {
    id: '3',
    title: 'Oil Leaks',
    description: 'Identifying and fixing common oil leaks.',
    category: 'engine',
    isPremium: false,
  },
  {
    id: '4',
    title: 'Battery Drain',
    description: 'Troubleshooting unexpected battery drain issues.',
    category: 'electrical',
    isPremium: false,
  },
  {
    id: '5',
    title: 'Transmission Slipping',
    description: 'Causes and fixes for transmission slipping problems.',
    category: 'transmission',
    isPremium: true,
  },
  {
    id: '6',
    title: 'AC Not Cooling',
    description: 'Diagnosing and repairing air conditioning problems.',
    category: 'hvac',
    isPremium: false,
  },
  {
    id: '7',
    title: 'Steering Wheel Vibration',
    description: 'Common causes of steering wheel vibration at different speeds.',
    category: 'suspension',
    isPremium: false,
  },
  {
    id: '8',
    title: 'Engine Overheating',
    description: 'Troubleshooting and fixing engine overheating problems.',
    category: 'engine',
    isPremium: true,
  },
  {
    id: '9',
    title: 'Fuel Efficiency Problems',
    description: 'Reasons for poor fuel economy and how to improve it.',
    category: 'fuel',
    isPremium: false,
  },
  {
    id: '10',
    title: 'Exhaust Smoke',
    description: 'Different colors of exhaust smoke and what they indicate.',
    category: 'exhaust',
    isPremium: true,
  },
];

const categories = [
  { id: 'all', name: 'All Problems' },
  { id: 'diagnostics', name: 'Diagnostics' },
  { id: 'engine', name: 'Engine' },
  { id: 'brakes', name: 'Brakes' },
  { id: 'electrical', name: 'Electrical' },
  { id: 'transmission', name: 'Transmission' },
  { id: 'hvac', name: 'HVAC' },
  { id: 'suspension', name: 'Suspension' },
  { id: 'fuel', name: 'Fuel System' },
  { id: 'exhaust', name: 'Exhaust' },
];

export const ProblemsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();
  const { user } = useAuth();

  const filteredProblems = problemsData.filter((problem) => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || problem.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Problems & Solutions</h2>
        <p className="text-muted-foreground">
          Browse common vehicle problems and their solutions
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search problems..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="whitespace-nowrap"
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredProblems.map((problem) => (
          <Card key={problem.id} className="glass-card animate-fade-in overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-4 w-4" />
                {problem.title}
                {problem.isPremium && !user?.isPremium && (
                  <span className="ml-auto text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-4">
              <p className="text-sm text-muted-foreground">{problem.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {categories.find(c => c.id === problem.category)?.name || problem.category}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center"
                  disabled={problem.isPremium && !user?.isPremium}
                  onClick={() => navigate(`/database/${problem.id}`)}
                >
                  {problem.isPremium && !user?.isPremium ? 'Upgrade to View' : 'View Solution'}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredProblems.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No problems found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
