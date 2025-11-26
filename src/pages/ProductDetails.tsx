import { useParams, Link, useNavigate } from "react-router-dom";
import { useSiteProducts } from "@/hooks/useSiteData";
import { Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // ✅ Fetch all products and find the specific one
  const { data: allProducts, isLoading, error } = useSiteProducts();
  const product = allProducts?.find(p => p.id === Number(id));

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="font-heading text-3xl font-bold text-destructive mb-4">
            Error Loading Product
          </h2>
          <p className="text-muted-foreground mb-6">
            {error instanceof Error ? error.message : "Unable to load product details. Please try again."}
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild variant="default">
              <Link to="/products">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Link>
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show not found state (when products loaded but specific product not found)
  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-20">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
            Product Not Found
          </h2>
          <p className="text-muted-foreground mb-6">
            The product you're looking for doesn't exist or may have been removed.
          </p>
          <Button asChild variant="default">
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Show product details
  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          asChild 
          variant="ghost" 
          className="mb-6 hover:bg-muted"
        >
          <Link to="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="overflow-hidden rounded-xl shadow-lg bg-muted/30 p-4">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-auto object-contain rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            {product.category_name && (
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">
                {product.category_name}
              </Badge>
            )}
            
            {/* Title */}
            <h1 className="font-heading text-4xl md:text-5xl font-bold leading-tight">
              {product.title}
            </h1>

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            {product.key_features && product.key_features.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-accent rounded-full"></span>
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.key_features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-accent text-xl mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-foreground leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Supported Bands */}
            {product.supported_bands && product.supported_bands.length > 0 && (
              <div className="bg-muted/50 rounded-lg p-6">
                <h3 className="font-heading text-xl font-semibold mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-accent rounded-full"></span>
                  Supported Bands
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.supported_bands.map((band, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-sm px-3 py-1 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {band}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4 md:flex-row md:items-center md:gap-4">
              <Button 
                size="lg"
                onClick={() => navigate("/contact")}
                className="flex-1"
              >
                Contact Us
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => navigate("/products")}
              >
                View All Products
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Information Section */}
        {(product.key_features || product.supported_bands) && (
          <div className="mt-16 pt-8 border-t border-border">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="font-heading text-2xl font-bold mb-4">
                Need More Information?
              </h2>
              <p className="text-muted-foreground mb-6">
                Our team is here to help you find the perfect solution for your needs.
                Get in touch with us for detailed specifications, pricing, or custom solutions.
              </p>
              <Button 
                variant="default"
                size="lg"
                onClick={() => navigate("/contact")}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}