// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Calendar, MapPin, Tag } from "lucide-react";
// import { Event } from "@/services/types";
// import { getTranslation } from "@/utils/formDataHelpers";

// interface EventViewDialogProps {
//   open: boolean;
//   onClose: () => void;
//   event?: Event | null;
// }

// export default function EventViewDialog({
//   open,
//   onClose,
//   event,
// }: EventViewDialogProps) {
//   if (!event) return null;

//   const enTranslation = getTranslation(event.translations, "en");
//   const arTranslation = getTranslation(event.translations, "ar");
//   const twTranslation = getTranslation(event.translations, "tw");

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//         <DialogHeader>
//           <DialogTitle>Event Details</DialogTitle>
//         </DialogHeader>

//         <div className="space-y-6">
//           {/* Basic Info */}
//           <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
//             <div className="flex items-center gap-2">
//               <Calendar className="h-4 w-4 text-muted-foreground" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Date</p>
//                 <p className="font-medium">
//                   {new Date(event.date).toLocaleDateString("en-US", {
//                     year: "numeric",
//                     month: "long",
//                     day: "numeric",
//                   })}
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <Tag className="h-4 w-4 text-muted-foreground" />
//               <div>
//                 <p className="text-xs text-muted-foreground">Type</p>
//                 <Badge variant="secondary" className="capitalize">
//                   {event.type}
//                 </Badge>
//               </div>
//             </div>

//             <div>
//               <p className="text-xs text-muted-foreground">Event ID</p>
//               <p className="font-medium">#{event.id}</p>
//             </div>
//           </div>

//           {/* Multi-language Content */}
//           <Tabs defaultValue="en" className="w-full">
//             <TabsList className="grid w-full grid-cols-3">
//               <TabsTrigger value="en">English</TabsTrigger>
//               <TabsTrigger value="ar">العربية</TabsTrigger>
//               <TabsTrigger value="tw">中文</TabsTrigger>
//             </TabsList>

//             {/* English Content */}
//             <TabsContent value="en" className="space-y-4">
//               <div>
//                 <h3 className="text-xl font-bold mb-2">{enTranslation?.title}</h3>
//                 <div className="flex items-center gap-2 text-muted-foreground mb-4">
//                   <MapPin className="h-4 w-4" />
//                   <span>{enTranslation?.location}</span>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-semibold mb-2">Description</h4>
//                 <p className="text-muted-foreground leading-relaxed">
//                   {enTranslation?.description}
//                 </p>
//               </div>

//               {enTranslation?.details && (
//                 <div>
//                   <h4 className="font-semibold mb-2">Additional Details</h4>
//                   <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
//                     {enTranslation.details}
//                   </p>
//                 </div>
//               )}
//             </TabsContent>

//             {/* Arabic Content */}
//             <TabsContent value="ar" className="space-y-4" dir="rtl">
//               <div>
//                 <h3 className="text-xl font-bold mb-2">{arTranslation?.title}</h3>
//                 <div className="flex items-center gap-2 text-muted-foreground mb-4">
//                   <MapPin className="h-4 w-4" />
//                   <span>{arTranslation?.location}</span>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-semibold mb-2">الوصف</h4>
//                 <p className="text-muted-foreground leading-relaxed">
//                   {arTranslation?.description}
//                 </p>
//               </div>

//               {arTranslation?.details && (
//                 <div>
//                   <h4 className="font-semibold mb-2">تفاصيل إضافية</h4>
//                   <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
//                     {arTranslation.details}
//                   </p>
//                 </div>
//               )}
//             </TabsContent>

//             {/* Chinese Content */}
//             <TabsContent value="tw" className="space-y-4">
//               <div>
//                 <h3 className="text-xl font-bold mb-2">{twTranslation?.title}</h3>
//                 <div className="flex items-center gap-2 text-muted-foreground mb-4">
//                   <MapPin className="h-4 w-4" />
//                   <span>{twTranslation?.location}</span>
//                 </div>
//               </div>

//               <div>
//                 <h4 className="font-semibold mb-2">描述</h4>
//                 <p className="text-muted-foreground leading-relaxed">
//                   {twTranslation?.description}
//                 </p>
//               </div>

//               {twTranslation?.details && (
//                 <div>
//                   <h4 className="font-semibold mb-2">額外詳情</h4>
//                   <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
//                     {twTranslation.details}
//                   </p>
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>

//           {/* Metadata */}
//           <div className="pt-4 border-t text-xs text-muted-foreground">
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <span className="font-medium">Created:</span>{" "}
//                 {new Date(event.created_at).toLocaleString()}
//               </div>
//               <div>
//                 <span className="font-medium">Updated:</span>{" "}
//                 {new Date(event.updated_at).toLocaleString()}
//               </div>
//               <div>
//                 <span className="font-medium">Slug:</span> {event.slug}
//               </div>
//             </div>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }