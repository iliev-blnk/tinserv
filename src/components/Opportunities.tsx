import { useState } from 'react';
import { MapPin, Calendar, Clock, Filter } from 'lucide-react';
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
    <section id="opportunities" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-brand-600 font-semibold text-sm uppercase tracking-wider mb-3">
            Make a Difference
          </span>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Volunteer Opportunities
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find meaningful ways to contribute your time and skills to causes you care about.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <div className="flex items-center gap-2 text-gray-500 mr-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-200 ${activeCategory === category
                  ? 'bg-brand-600 text-white shadow-lg shadow-brand-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
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
              className="bg-white rounded-2xl shadow-sm overflow-hidden group card-hover"
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
                <div className={`absolute top-4 left-4 ${categoryColors[item.category]} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-lg`}>
                  {item.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
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
                    <div className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3" />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gray-50 border-2 border-brand-500 text-brand-600 font-semibold py-3 rounded-xl hover:bg-brand-500 hover:text-white transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:text-brand-700 transition-colors">
            <span>View All Opportunities</span>
            <span className="text-xl">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}