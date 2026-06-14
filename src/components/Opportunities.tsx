import { useState } from 'react';
import { MapPin, Calendar, Clock } from 'lucide-react';
import type { Opportunity } from '../types';

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: "Community Garden Helper",
    category: "Environment",
    location: "Central Park, NY",
    date: "Sat, Oct 24",
    duration: "3 hours",
    imageUrl: "https://images.unsplash.com/photo-1592960655383-7454ba73b40d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "After-School Tutor",
    category: "Education",
    location: "Public Library",
    date: "Mon, Oct 26",
    duration: "2 hours",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Food Bank Sorter",
    category: "Healthcare",
    location: "Downtown Center",
    date: "Sun, Oct 25",
    duration: "4 hours",
    imageUrl: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Senior Center Companion",
    category: "Community",
    location: "Sunrise Care Home",
    date: "Wed, Oct 28",
    duration: "2 hours",
    imageUrl: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Beach Cleanup Crew",
    category: "Environment",
    location: "Sunny Beach",
    date: "Sat, Oct 31",
    duration: "3 hours",
    imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    title: "Youth Sports Coach",
    category: "Education",
    location: "Community Center",
    date: "Fri, Oct 30",
    duration: "2 hours",
    imageUrl: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=800"
  },
];

const categories = ['All', 'Environment', 'Education', 'Healthcare', 'Community'] as const;

const categoryColors: Record<string, string> = {
  Environment: 'badge-environment',
  Education: 'badge-education',
  Healthcare: 'badge-healthcare',
  Community: 'badge-community',
};

export default function Opportunities() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredOpportunities = activeCategory === 'All'
    ? opportunities
    : opportunities.filter((op) => op.category === activeCategory);

  return (
    <section id="opportunities" className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-brand-500 font-black text-xs uppercase tracking-[0.2em] mb-3">
            Make a Difference
          </span>
          <h2 className="font-black-heading text-5xl lg:text-7xl text-white mb-4">
            Volunteer Opportunities
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Find meaningful ways to contribute your time and skills to causes you care about.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 font-bold text-sm uppercase tracking-wide transition-all duration-200 ${activeCategory === category
                  ? 'bg-brand-500 text-white border border-brand-500'
                  : 'bg-white/5 border border-white/20 text-slate-300 hover:border-brand-500 hover:text-brand-400'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOpportunities.map((item, index) => (
            <div
              key={item.id}
              className="bg-white overflow-hidden group border-b-4 border-transparent hover:border-brand-500 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className={`absolute top-4 left-4 ${categoryColors[item.category]} text-white text-xs font-bold px-3 py-1.5 uppercase tracking-wide shadow-lg`}>
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-500 transition-colors">
                  {item.title}
                </h3>

                <div className="space-y-2 text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-brand-500" />
                    <span className="text-sm">{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-brand-500" />
                      <span className="text-sm">{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1">
                      <Clock className="h-3 w-3" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>

                <button className="btn-card w-full py-3 font-bold uppercase tracking-wide text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="text-brand-400 border-b-2 border-brand-400 hover:text-brand-300 hover:border-brand-300 font-bold uppercase tracking-widest text-sm inline-block transition-colors">
            View All Opportunities →
          </button>
        </div>
      </div>
    </section>
  );
}
