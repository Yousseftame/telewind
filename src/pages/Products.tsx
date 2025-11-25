// src/pages/Products.tsx - FIXED VERSION

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Loader2 } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import jsPDF from "jspdf";
import { useTranslation } from "react-i18next";
import { useSiteProducts } from "@/hooks/useSiteData";
import { useHomeCategories } from "@/hooks/useSiteHome";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  // ✅ Fetch categories for filter tabs
  const { data: categories = [], isLoading: categoriesLoading } = useHomeCategories();
  
  // ✅ Fetch products based on filters
  const { data: products = [], isLoading: productsLoading, error: productsError } = useSiteProducts(
    selectedCategory,
    searchQuery
  );

  // ✅ Initialize category from URL on mount and when searchParams change
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const categoryId = Number(categoryParam);
      if (!isNaN(categoryId)) {
        setSelectedCategory(categoryId);
      }
    } else {
      setSelectedCategory(0);
    }
  }, [searchParams]);

  // ✅ Update URL when category changes
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (categoryId === 0) {
      newSearchParams.delete("category");
    } else {
      newSearchParams.set("category", categoryId.toString());
    }
    
    setSearchParams(newSearchParams);
  };

  // ✅ PDF Download Function
  const generateProductPDF = (product: any) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text(product.title || "Untitled Product", 10, 20);

    doc.setFontSize(12);
    doc.text(`Category: ${product.category_name || "Uncategorized"}`, 10, 35);

    doc.text("Description:", 10, 50);
    const description = product.description || "No description available";
    const splitDescription = doc.splitTextToSize(description, 180);
    doc.text(splitDescription, 10, 58);

    let yPos = 75 + splitDescription.length * 7;

    if (product.key_features && product.key_features.length > 0) {
      doc.text("Key Features:", 10, yPos);
      yPos += 10;
      product.key_features.forEach((f: string, i: number) => {
        const feature = f || "No feature description";
        doc.text(`- ${feature}`, 12, yPos + i * 8);
      });
      yPos += product.key_features.length * 8 + 10;
    } else {
      doc.text("Key Features: Not specified", 10, yPos);
      yPos += 15;
    }

    if (product.supported_bands && product.supported_bands.length > 0) {
      doc.text("Supported Bands:", 10, yPos);
      doc.text(product.supported_bands.join(", "), 12, yPos + 10);
    } else {
      doc.text("Supported Bands: Not specified", 10, yPos);
    }

    doc.save(`${product.title || "product"}.pdf`);
  };

  const isLoading = categoriesLoading || productsLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-5xl font-bold mb-4 pt-5">
            {t("productsSection.title")}
          </h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            {t("productsSection.description")}
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
              
              {/* All Products Button */}
              <Button
                variant={selectedCategory === 0 ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryChange(0)}
              >
                {t("productCategories.all")}
              </Button>
              
              {/* Loading State */}
              {categoriesLoading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading categories...
                </div>
              )}
              
              {/* Category Buttons */}
              {!categoriesLoading && categories.length > 0 && categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </Button>
              ))}
              
              {/* No Categories Message */}
              {!categoriesLoading && categories.length === 0 && (
                <span className="text-sm text-muted-foreground">No categories available</span>
              )}
            </div>
          </div>
          
          {/* Selected Category Display */}
          {selectedCategory !== 0 && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Filtered by:</span>
              <Badge variant="secondary" className="text-sm">
                {categories.find(cat => cat.id === selectedCategory)?.name || "Category"}
              </Badge>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
          ) : productsError ? (
            <div className="text-center py-12">
              <p className="text-destructive text-lg mb-4">Error loading products</p>
              <p className="text-muted-foreground">Please try again later</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {products.length} product{products.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <div className="h-56 overflow-hidden">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-6">
                      <Badge className="mb-3 bg-accent text-accent-foreground hover:text-white">
                        ID : {product.category_id || "Product Id"}
                      </Badge>
                      <h3 className="font-heading text-xl font-bold mb-2">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {product.description}
                      </p>

                      {/* Features */}
                      {product.key_features && product.key_features.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                            {t("productsSection.keyFeature")}
                          </p>
                          <ul className="space-y-1">
                            {product.key_features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="text-sm flex items-start">
                                <span className="text-accent mr-2">•</span>
                                <span className="line-clamp-1">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Bands */}
                      {product.supported_bands && product.supported_bands.length > 0 && (
                        <div className="flex gap-2 flex-wrap mb-4">
                          {product.supported_bands.slice(0, 3).map((band, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {band}
                            </Badge>
                          ))}
                          {product.supported_bands.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.supported_bands.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${product.id}`);
                          }}
                        >
                          {t("productsSection.viewDetails")}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            generateProductPDF(product);
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {products.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">
                    No products found matching your criteria
                  </p>
                  {(selectedCategory !== 0 || searchQuery) && (
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        setSelectedCategory(0);
                        setSearchQuery("");
                        setSearchParams(new URLSearchParams());
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-bold mb-4">
            {t("productsSection.cantFind")}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("productsSection.customSolution")}
          </p>
          <Button
            variant="default"
            size="lg"
            onClick={() => navigate("/contact")}
          >
            {t("productsSection.contactButton")}
          </Button>
        </div>
      </section>
    </div>
  );
}