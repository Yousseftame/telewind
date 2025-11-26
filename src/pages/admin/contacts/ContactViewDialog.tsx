import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Contact } from "@/services/types";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Building2, MapPin, MessageSquare, Tag } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  contact: Contact | null;
}

export function ContactViewDialog({ open, onOpenChange, contact }: Props) {
  if (!contact) return null;

  // Format inquiry type for display
  const formatInquiryType = (type: string) => {
    if (!type) return "N/A";
    return type.charAt(0).toUpperCase() + type.slice(1).replace(/_/g, " ");
  };

  // Get color for inquiry type badge
  const getInquiryTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      product: "bg-blue-100 text-blue-700 border-blue-200",
      technical: "bg-purple-100 text-purple-700 border-purple-200",
      sales: "bg-green-100 text-green-700 border-green-200",
      partnership: "bg-orange-100 text-orange-700 border-orange-200",
      other: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[type?.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Contact Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-100">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-1">
                  {contact.name}
                </h2>
                <p className="text-slate-600 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {contact.company}
                </p>
              </div>
              <Badge className={`${getInquiryTypeColor(contact.inquiry_type)} border`}>
                <Tag className="w-3 h-3 mr-1" />
                {formatInquiryType(contact.inquiry_type)}
              </Badge>
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Mail className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Email Address
                  </h3>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-sm font-medium text-slate-800 hover:text-indigo-600 transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Phone Number
                  </h3>
                  <a 
                    href={`tel:${contact.phone}`}
                    className="text-sm font-medium text-slate-800 hover:text-indigo-600 transition-colors"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Company */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <Building2 className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Company
                  </h3>
                  <p className="text-sm font-medium text-slate-800">
                    {contact.company}
                  </p>
                </div>
              </div>
            </div>

            {/* Country */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">
                    Country
                  </h3>
                  <p className="text-sm font-medium text-slate-800">
                    {contact.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message Section */}
          <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">
                  Message
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {contact.message}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              Contact ID: <span className="font-medium text-slate-700">#{contact.id}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}