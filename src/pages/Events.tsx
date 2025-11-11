import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ExternalLink, FileText, Download } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    name: "DefenseExpo 2025",
    date: "March 15-18, 2025",
    location: "Abu Dhabi, UAE",
    type: "Exhibition",
    description: "Join TeleWind at the world's leading defense exhibition. Visit our booth to see live demonstrations of our latest radar and EW systems.",
    booth: "Hall 5, Stand B-42",
  },
  {
    id: 2,
    name: "Tactical Communications Summit",
    date: "April 22-24, 2025",
    location: "Washington D.C., USA",
    type: "Conference",
    description: "Our CTO will present on next-generation secure tactical communication systems and AI-enabled spectrum management.",
    session: "Day 2, 14:00-15:30",
  },
  {
    id: 3,
    name: "European Defense & Security Conference",
    date: "May 10-12, 2025",
    location: "Paris, France",
    type: "Conference",
    description: "Exploring the future of electronic warfare and advanced radar technologies in modern defense operations.",
    session: "Day 1, 10:00-11:30",
  },
];

const newsArticles = [
  {
    id: 1,
    title: "TeleWind Announces New TR-6000 Radar Series",
    date: "January 15, 2025",
    category: "Product Launch",
    excerpt: "The next generation of tactical radar systems featuring enhanced detection range and AI-powered target classification.",
  },
  {
    id: 2,
    title: "Partnership Expansion in Southeast Asia",
    date: "December 20, 2024",
    category: "Business",
    excerpt: "TeleWind Electronics expands distribution network with new partnerships across ASEAN countries to better serve the region.",
  },
  {
    id: 3,
    title: "Advanced EW Capabilities Demonstrated at DSEI",
    date: "November 10, 2024",
    category: "Event",
    excerpt: "Successful live demonstration of EW-400 suite showcasing advanced jamming and direction finding capabilities.",
  },
  {
    id: 4,
    title: "ISO 13485 Certification Renewed",
    date: "October 5, 2024",
    category: "Company News",
    excerpt: "TeleWind Electronics successfully renews ISO 13485 certification, demonstrating continued commitment to quality management.",
  },
];

export default function Events() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4">Events & Media</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Stay updated on TeleWind's latest events, news, and industry insights
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl font-bold">Upcoming Events</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-xl transition-shadow border-t-4 border-accent">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-accent text-accent-foreground">{event.type}</Badge>
                  <h3 className="font-heading text-xl font-bold mb-4">{event.name}</h3>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">{event.description}</p>

                  {(event.booth || event.session) && (
                    <div className="bg-muted/50 p-3 rounded-sm mb-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                        {event.booth ? "Booth Location" : "Session Details"}
                      </p>
                      <p className="text-sm font-medium">{event.booth || event.session}</p>
                    </div>
                  )}

                  <Button variant="outline" size="sm" className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Event Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl font-bold">Latest News & Announcements</h2>
          </div>

          <div className="space-y-4">
            {newsArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">{article.category}</Badge>
                        <span className="text-sm text-muted-foreground">{article.date}</span>
                      </div>
                      <h3 className="font-heading text-xl font-bold mb-2">{article.title}</h3>
                      <p className="text-muted-foreground text-sm">{article.excerpt}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Read More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Resources */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-8">Media Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">Corporate Profile</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Download our comprehensive company profile and capabilities brochure
                </p>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Download className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">Logo Package</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  High-resolution TeleWind Electronics logos for media use
                </p>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Assets
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-heading text-lg font-bold mb-2">Technical Whitepapers</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  In-depth technical documentation and research papers
                </p>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  View Library
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">Media Inquiries</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            For press releases, interviews, or media information, contact our communications team
          </p>
          <Button variant="hero" size="lg">
            Contact Media Relations
          </Button>
        </div>
      </section>
    </div>
  );
}
