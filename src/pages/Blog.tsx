import RevealOnScroll from "@/components/RevealOnScroll";
const POSTS = [
  { title: "Best Pre-Wedding Shoot Locations in Delhi NCR (2025)", cat: "Pre-Wedding", date: "March 2025", excerpt: "Discover the most photogenic locations across Delhi NCR for your pre-wedding shoot." },
  { title: "Hindu Wedding Traditions: A Photographer's Guide", cat: "Weddings", date: "February 2025", excerpt: "Understanding every ritual helps us capture the moments that matter most." },
  { title: "How to Choose Your Wedding Photographer", cat: "Tips", date: "January 2025", excerpt: "Essential questions every couple should ask before booking their photographer." },
  { title: "Why Candid Photography Beats Posed Portraits", cat: "Photography", date: "December 2024", excerpt: "The art of capturing real emotions over forced smiles." },
  { title: "Destination Wedding in Udaipur: A Complete Guide", cat: "Destination", date: "November 2024", excerpt: "Everything you need to know about planning a dream Udaipur wedding." },
];
const Blog = () => (
  <div className="bg-white">
    <div className="pt-24" />
    <section className="max-w-site mx-auto px-6 md:px-12 py-12">
      <RevealOnScroll>
        <span className="section-tag">Journal</span>
        <h1 className="section-h2">STORIES & INSPIRATION</h1>
      </RevealOnScroll>
    </section>
    <section className="max-w-site mx-auto px-6 md:px-12 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POSTS.map((post, i) => (
          <RevealOnScroll key={post.title} delay={i * 80}>
            <div className="border border-[#E8E0D5] overflow-hidden group cursor-pointer hover:border-[hsl(36,58%,51%)]/40 transition-colors">
              <div className="aspect-[16/10] bg-surface" />
              <div className="p-5">
                <span className="text-[10px] text-gold uppercase tracking-[0.12em] font-semibold">{post.cat}</span>
                <h3 className="font-heading text-charcoal text-xl mt-1 mb-2">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                  <span className="text-xs text-gold font-semibold">Read More →</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  </div>
);
export default Blog;
