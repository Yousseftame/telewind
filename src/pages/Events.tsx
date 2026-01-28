// src/pages/Events.tsx - UPDATED with Media section and separated Upcoming/Past Events

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Loader2, Play, Video } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSiteEvents, useSiteAnnouncements } from "@/hooks/useSiteData";
import { useMemo, useState } from "react";

export default function Events() {
  const { t } = useTranslation();
  const { data: events = [], isLoading: eventsLoading } = useSiteEvents();
  const { data: announcements = [], isLoading: announcementsLoading } = useSiteAnnouncements();
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  // Separate events into upcoming and past based on date
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    const upcoming = events.filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date ascending

    const past = events.filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate < today;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date descending

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4 pt-5">
            {t("eventsMedia.title")}
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            {t("eventsMedia.description")}
          </p>
        </div>
      </section>

      {/* Media Section - NEW */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-8 text-center">
            {t("eventsMedia.mediaSection") || "Media"}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
              {!isVideoPlaying ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="group flex flex-col items-center gap-4 transition-transform hover:scale-105"
                  >
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-lg group-hover:bg-primary/90 transition-colors">
                      <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                    <span className="text-white text-lg font-medium">
                      {t("eventsMedia.playVideo") || "Play Video"}
                    </span>
                  </button>
                  {/* Optional: Background thumbnail */}
                  <div className="absolute inset-0 opacity-20 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                </div>
              ) : (
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  playsInline
                  controlsList="nodownload "
  
                  onEnded={() => setIsVideoPlaying(false)}
                >
                  <source src="/videos/telewind-Media.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            
            <p className="text-center text-muted-foreground mt-4 text-sm">
              {t("eventsMedia.mediaDescription") || "Watch our latest company presentation and product showcases"}
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events - UPDATED */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl font-bold">
              {t("eventsMedia.upcomingEvents")}
            </h2>
          </div>

          {eventsLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="hover:shadow-xl transition-shadow border-t-4 border-accent"
                  >
                      {/* ✅ NEW: Video Display */}
                    {event.video && (
                      <div className="relative aspect-video bg-black">
                        <video
                          src={event.video}
                          controls
                          className="w-full h-full object-cover"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-accent/90 text-accent-foreground btnHover backdrop-blur-sm">
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </Badge>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <Badge className="mb-4 bg-accent text-accent-foreground btnHover">
                        {event.type}
                      </Badge>
                      <h3 className="font-heading text-xl font-bold mb-4">
                        {event.title}
                      </h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">
                        {event.description}
                      </p>

                      {event.details && (
                        <div className="bg-muted/50 p-3 rounded-sm mb-4">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                            {t("eventsMedia.eventDetails")}
                          </p>
                          <p className="text-sm font-medium" dangerouslySetInnerHTML={{ __html: event.details }}></p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {upcomingEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {t("eventsMedia.noUpcomingEvents")}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Past Events - NEW SECTION */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl font-bold">
              {t("eventsMedia.pastEvents") || "Past Events"}
            </h2>
          </div>

          {eventsLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="hover:shadow-xl transition-shadow border-t-4 border-muted-foreground/30 opacity-90"
                  >
                     {/* ✅ NEW: Video Display */}
                    {event.video && (
                      <div className="relative aspect-video bg-black">
                        <video
                          src={event.video}
                          controls
                          className="w-full h-full object-cover"
                          preload="metadata"
                        >
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-accent/90 text-accent-foreground btnHover backdrop-blur-sm">
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </Badge>
                        </div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <Badge className="mb-4 bg-muted-foreground/20 text-foreground btnHover">
                        {event.type}
                      </Badge>
                      <h3 className="font-heading text-xl font-bold mb-4">
                        {event.title}
                      </h3>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-start gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-start gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">
                        {event.description}
                      </p>

                      {event.details && (
                        <div className="bg-muted/50 p-3 rounded-sm mb-4">
                          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
                            {t("eventsMedia.eventDetails")}
                          </p>
                          <p className="text-sm font-medium" dangerouslySetInnerHTML={{ __html: event.details }}></p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {pastEvents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {t("eventsMedia.noPastEvents") || "No past events to display"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Latest News & Announcements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl font-bold">
              {t("eventsMedia.latestNews")}
            </h2>
          </div>

          {announcementsLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {announcements.map((article) => (
                  <Card
                    key={article.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline">{article.type}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {new Date(article.date).toLocaleDateString()}
                            </span>
                          </div>
                          <h3 className="font-heading text-xl font-bold mb-2">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {article.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {announcements.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    {t("eventsMedia.noAnnouncements")}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-4xl font-bold mb-4">
            {t("eventsMedia.mediaInquiries")}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {t("eventsMedia.mediaDescription")}
          </p>
          <Button variant="hero" size="lg">
            <Link to="/contact">{t("eventsMedia.contactMedia")}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}