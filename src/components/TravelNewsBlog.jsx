import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ArrowRight, Plane, Camera, Mountain, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const TravelNewsBlog = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const newsItems = [
    {
      id: 1,
      category: 'destinations',
      title: 'Hidden Gems: 10 Undiscovered Islands in Southeast Asia',
      excerpt: 'Escape the crowds and discover pristine beaches, crystal-clear waters, and untouched natural beauty in these lesser-known tropical paradises.',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
      author: 'Sarah Chen',
      date: '2025-07-28',
      readTime: '8 min read',
      location: 'Southeast Asia',
      featured: true
    },
    {
      id: 2,
      category: 'news',
      title: 'New High-Speed Rail Connects Major European Cities',
      excerpt: 'Travel time between Paris, Berlin, and Vienna reduced by 40% with the launch of the new EuroSpeed rail network.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=250&fit=crop',
      author: 'Marcus Weber',
      date: '2025-07-30',
      readTime: '5 min read',
      location: 'Europe'
    },
    {
      id: 3,
      category: 'adventure',
      title: 'Sustainable Trekking: The Future of Mountain Tourism',
      excerpt: 'How eco-friendly practices are transforming mountain adventures and protecting alpine environments for future generations.',
      image: 'https://images.unsplash.com/photo-1464822759844-d150badb5b84?w=400&h=250&fit=crop',
      author: 'Elena Rodriguez',
      date: '2025-07-29',
      readTime: '12 min read',
      location: 'Global'
    },
    {
      id: 4,
      category: 'culture',
      title: 'Street Food Revolution: Asia\'s Culinary Renaissance',
      excerpt: 'From Bangkok to Seoul, discover how street food culture is evolving and attracting international food enthusiasts.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop',
      author: 'James Park',
      date: '2025-07-27',
      readTime: '7 min read',
      location: 'Asia'
    },
    {
      id: 5,
      category: 'destinations',
      title: 'Arctic Adventures: Northern Lights Tourism Boom',
      excerpt: 'Record numbers of travelers are heading north for aurora viewing experiences, transforming local economies.',
      image: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=400&h=250&fit=crop',
      author: 'Anna Larsson',
      date: '2025-07-26',
      readTime: '6 min read',
      location: 'Arctic Circle'
    },
    {
      id: 6,
      category: 'news',
      title: 'Digital Nomad Visas: 15 New Countries Join Program',
      excerpt: 'Remote work opportunities expand as more nations launch specialized visa programs for location-independent professionals.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=250&fit=crop',
      author: 'Alex Thompson',
      date: '2025-07-25',
      readTime: '4 min read',
      location: 'Global'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Stories', icon: Globe },
    { id: 'destinations', name: 'Destinations', icon: MapPin },
    { id: 'news', name: 'Travel News', icon: Plane },
    { id: 'adventure', name: 'Adventure', icon: Mountain },
    { id: 'culture', name: 'Culture', icon: Camera }
  ];

  const filteredNews = activeCategory === 'all' 
    ? newsItems 
    : newsItems.filter(item => item.category === activeCategory);

  const featuredArticle = newsItems.find(item => item.featured);
  const regularArticles = newsItems.filter(item => !item.featured);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 px-4 py-2 rounded-full mb-4">
            <Globe className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-700 font-medium">Latest Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Travel News & <span className="text-yellow-400">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest travel news, destination highlights, and inspiring stories from around the world
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-yellow-400 text-gray-900 shadow-lg shadow-yellow-400/25'
                    : 'bg-white text-gray-600 hover:bg-yellow-50 hover:text-yellow-700 shadow-sm'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Featured Article */}
        {featuredArticle && activeCategory === 'all' && (
          <div className="mb-16">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{featuredArticle.location}</span>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {featuredArticle.category}
                    </span>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredArticle.date).toLocaleDateString()}
                    </div>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                        {featuredArticle.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{featuredArticle.author}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          {featuredArticle.readTime}
                        </div>
                      </div>
                    </div>
                    <button className="flex items-center gap-2 text-yellow-600 font-semibold hover:gap-3 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(activeCategory === 'all' ? regularArticles : filteredNews).map((article, index) => (
            <div 
              key={article.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold capitalize">
                    {article.category}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-yellow-400 text-gray-900 p-2 rounded-full">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{article.location}</span>
                  <span>•</span>
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {article.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{article.author}</p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>
                  <button className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm">
                    Read →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:from-yellow-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-yellow-400/25">
            Load More Stories
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 text-center">
          <Plane className="w-12 h-12 text-yellow-400 mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Never Miss an Adventure
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Get the latest travel news, destination guides, and exclusive stories delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-1 px-6 py-4 rounded-full border-0 focus:ring-2 focus:ring-yellow-400 outline-none"
            />
            <button className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-yellow-500 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelNewsBlog;