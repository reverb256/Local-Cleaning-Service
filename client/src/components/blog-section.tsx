import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why Eco-Friendly Cleaning Matters for Your Winnipeg Office",
    excerpt: "Discover how sustainable cleaning practices improve employee health, reduce environmental impact, and enhance your company's reputation in the competitive Winnipeg business landscape.",
    author: "Workplace Janitorial Team",
    date: "December 2024",
    readTime: "5 min read",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=800",
    slug: "eco-friendly-cleaning-winnipeg-offices"
  },
  {
    id: 2,
    title: "Post-Construction Cleanup: Winnipeg's Premier Service Standards",
    excerpt: "Learn about our comprehensive post-construction cleaning protocols that ensure your new Winnipeg facility meets the highest safety and cleanliness standards before occupancy.",
    author: "Construction Cleanup Specialists",
    date: "November 2024",
    readTime: "7 min read",
    category: "Construction",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800",
    slug: "post-construction-cleanup-winnipeg"
  },
  {
    id: 3,
    title: "Floor Care Excellence: Maintaining Professional Appearances",
    excerpt: "Explore advanced floor maintenance techniques that keep your Winnipeg office looking pristine while extending the life of your flooring investment.",
    author: "Floor Care Specialists",
    date: "October 2024",
    readTime: "6 min read",
    category: "Floor Care",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800",
    slug: "floor-care-excellence-winnipeg"
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Industry Insights & Best Practices
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed with expert insights on commercial cleaning, facility management, 
            and workplace wellness from Winnipeg's leading janitorial service professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <span className="font-medium">{post.readTime}</span>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 group">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-medium border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-300">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}