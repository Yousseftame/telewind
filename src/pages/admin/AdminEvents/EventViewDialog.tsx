import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Tag } from "lucide-react";
import { Event } from "@/services/types";
import { getTranslation } from "@/utils/formDataHelpers";

interface EventViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: Event | null;
  isLoading?: boolean;
}

export default function EventViewDialog({
  open,
  onOpenChange,
  event,
  isLoading = false,
}: EventViewDialogProps) {
  if (!event) return null;

  // ✅ UPDATED: Changed from tw/ch to fr/de
  const enTranslation = getTranslation(event, "en");
  const arTranslation = getTranslation(event, "ar");
  const frTranslation = getTranslation(event, "fr");
  const deTranslation = getTranslation(event, "de");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Event Details</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="py-10 text-center text-muted-foreground">
            Loading event details...
          </div>
        ) : (
          <div className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {event.date
                      ? new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "-"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Type</p>
                  <Badge variant="secondary" className="capitalize">
                    {event.type || "-"}
                  </Badge>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Event ID</p>
                <p className="font-medium">#{event.id}</p>
              </div>
            </div>

            {/* Multi-language Content - ✅ UPDATED */}
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
                <TabsTrigger value="fr">Français</TabsTrigger>
                <TabsTrigger value="de">Deutsch</TabsTrigger>
              </TabsList>

              {/* English Content */}
              <TabsContent value="en" className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {enTranslation.title}
                  </h3>
                  {enTranslation.location && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{enTranslation.location}</span>
                    </div>
                  )}
                </div>

                {enTranslation.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {enTranslation.description}
                    </p>
                  </div>
                )}

                {enTranslation.details && (
                  <div>
                    <h4 className="font-semibold mb-2">Additional Details</h4>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: enTranslation.details,
                      }}
                    />
                  </div>
                )}
              </TabsContent>

              {/* Arabic Content */}
              <TabsContent value="ar" className="space-y-4" dir="rtl">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {arTranslation.title}
                  </h3>
                  {arTranslation.location && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{arTranslation.location}</span>
                    </div>
                  )}
                </div>

                {arTranslation.description && (
                  <div>
                    <h4 className="font-semibold mb-2">الوصف</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {arTranslation.description}
                    </p>
                  </div>
                )}

                {arTranslation.details && (
                  <div>
                    <h4 className="font-semibold mb-2">تفاصيل إضافية</h4>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: arTranslation.details,
                      }}
                    />
                  </div>
                )}
              </TabsContent>

              {/* French Content - ✅ UPDATED */}
              <TabsContent value="fr" className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {frTranslation.title}
                  </h3>
                  {frTranslation.location && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{frTranslation.location}</span>
                    </div>
                  )}
                </div>

                {frTranslation.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Description</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {frTranslation.description}
                    </p>
                  </div>
                )}

                {frTranslation.details && (
                  <div>
                    <h4 className="font-semibold mb-2">Détails supplémentaires</h4>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: frTranslation.details,
                      }}
                    />
                  </div>
                )}
              </TabsContent>

              {/* German Content - ✅ UPDATED */}
              <TabsContent value="de" className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {deTranslation.title}
                  </h3>
                  {deTranslation.location && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{deTranslation.location}</span>
                    </div>
                  )}
                </div>

                {deTranslation.description && (
                  <div>
                    <h4 className="font-semibold mb-2">Beschreibung</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {deTranslation.description}
                    </p>
                  </div>
                )}

                {deTranslation.details && (
                  <div>
                    <h4 className="font-semibold mb-2">Zusätzliche Details</h4>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: deTranslation.details,
                      }}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}