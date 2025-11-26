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

  const enTranslation = getTranslation(event, "en");
  const arTranslation = getTranslation(event, "ar");
  const twTranslation = getTranslation(event, "tw");
  const chTranslation = getTranslation(event, "ch");

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

            {/* Multi-language Content */}
            <Tabs defaultValue="en" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="en">English</TabsTrigger>
                <TabsTrigger value="ar">العربية</TabsTrigger>
                <TabsTrigger value="tw">Taiwan</TabsTrigger>
                <TabsTrigger value="ch">Chinese</TabsTrigger>
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

              {/* Taiwan / Chinese Content */}
              <TabsContent value="tw" className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {twTranslation.title}
                  </h3>
                  {twTranslation.location && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{twTranslation.location}</span>
                    </div>
                  )}
                </div>

                {twTranslation.description && (
                  <div>
                    <h4 className="font-semibold mb-2">描述</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {twTranslation.description}
                    </p>
                  </div>
                )}

                {twTranslation.details && (
                  <div>
                    <h4 className="font-semibold mb-2">額外詳情</h4>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: twTranslation.details,
                      }}
                    />
                  </div>
                )}
              </TabsContent>

              {/* Simplified / Chinese Content */}
              <TabsContent value="ch" className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {chTranslation.title}
                  </h3>
                  {chTranslation.location && (
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{chTranslation.location}</span>
                    </div>
                  )}
                </div>

                {chTranslation.description && (
                  <div>
                    <h4 className="font-semibold mb-2">描述</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {chTranslation.description}
                    </p>
                  </div>
                )}

                {chTranslation.details && (
                  <div>
                    <h4 className="font-semibold mb-2">额外详情</h4>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{
                        __html: chTranslation.details,
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
