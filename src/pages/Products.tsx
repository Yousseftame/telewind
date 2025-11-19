import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download } from "lucide-react";
import radarSystems from "@/assets/radar-systems.jpg";
import electronicWarfare from "@/assets/electronic-warfare.jpg";
import tacticalComms from "@/assets/tactical-comms.jpg";
import rfAmplifiers from "@/assets/rf-amplifiers.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import jsPDF from "jspdf";



// Demo products data - in production, this would come from CMS
const products = [
  {
    id: 1,
    name: "TR-5000 Tactical Radar System",
    category: "Radar & Microwave",
    image: radarSystems,
    description: "Advanced phased-array radar for surveillance and tracking",
    features: ["360° Coverage", "Multi-target Tracking", "Weather Resistant"],
    bands: ["X-Band", "S-Band"],
  },
  {
    id: 2,
    name: "EW-300 Electronic Warfare Suite",
    category: "Electronic Warfare",
    image: electronicWarfare,
    description: "Comprehensive EW solution for spectrum dominance",
    features: ["Signal Intelligence", "Jamming Capabilities", "Direction Finding"],
    bands: ["HF", "VHF", "UHF"],
  },
  {
    id: 3,
    name: "TC-4000 Secure Tactical Radio",
    category: "Tactical Communications",
    image: tacticalComms,
    description: "Military-grade encrypted communication system",
    features: ["AES-256 Encryption", "Frequency Hopping", "Long Range"],
    bands: ["HF", "VHF"],
  },
  {
    id: 4,
    name: "RFA-2000 RF Power Amplifier",
    category: "RF Power Amplifiers",
    image: rfAmplifiers,
    description: "High-power solid-state RF amplification",
    features: ["2kW Output", "Wide Bandwidth", "Remote Control"],
    bands: ["HF", "VHF", "UHF"],
  },
];

const categories = ["All", "Radar & Microwave", "Electronic Warfare", "Tactical Communications", "RF Power Amplifiers"];

export default function Products() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);


  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  // pdf download 
  const generateProductPDF = (product: any) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(product.name, 10, 20);

  doc.setFontSize(12);
  doc.text(`Category: ${product.category}`, 10, 35);

  doc.text("Description:", 10, 50);
  doc.text(product.description, 10, 58);

  doc.text("Key Features:", 10, 75);
  product.features.forEach((f: string, i: number) => {
    doc.text(`- ${f}`, 12, 85 + i * 8);
  });

  doc.text("Supported Bands:", 10, 120);
  doc.text(product.bands.join(", "), 12, 130);

  const img = product.image;
  const imgWidth = 60;
  const imgHeight = 40;

  doc.addImage(img, "JPEG", 140, 20, imgWidth, imgHeight);

  // Save file
  doc.save(`${product.name}.pdf`);
};

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4 pt-5">Products & Solutions</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Defense-grade electronics built on 45+ years of engineering excellence
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="border-b border-border bg-muted/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all overflow-hidden">
                <div className="h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-3 bg-accent text-accent-foreground">{product.category}</Badge>
                  <h3 className="font-heading text-xl font-bold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>

                  {/* Features */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Key Features</p>
                    <ul className="space-y-1">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="text-sm flex items-start">
                          <span className="text-accent mr-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bands */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    {product.bands.map((band, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {band}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex-1" onClick={
                            () => navigate(`/products/${product.id}`)
                            // // console.log(task.id)
                          }>
                      View Details
                    </Button>
                    <Button variant="outline" size="sm"  onClick={() => generateProductPDF(product)}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No products found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">Can't Find What You Need?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our engineering team can design custom solutions to meet your specific requirements
          </p>
          <Button variant="default" size="lg" onClick={ () => navigate('/contact') }>
            Contact Engineering Team
          </Button>
        </div>
      </section>
    </div>
  );
}
