import { useParams, Link } from "react-router-dom";
import { useSiteProductDetail } from "@/hooks/useSiteData";
import { Loader2, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useSiteProductDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-destructive mb-4">
            Product Not Found
          </h2>
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

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6">
          <Link to="/products">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </Button>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div className="overflow-hidden rounded-xl shadow-lg">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <Badge className="mb-3 bg-accent text-accent-foreground">
              {product.category_name || "Product"}
            </Badge>
            
            <h1 className="font-heading text-4xl font-bold mb-4">
              {product.title}
            </h1>

            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Key Features */}
            {product.key_features && product.key_features.length > 0 && (
              <div className="mb-8">
                <h3 className="font-heading text-xl font-semibold mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.key_features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent mr-2 mt-1">•</span>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Supported Bands */}
            {product.supported_bands && product.supported_bands.length > 0 && (
              <div>
                <h3 className="font-heading text-xl font-semibold mb-4">
                  Supported Bands
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.supported_bands.map((band, index) => (
                    <Badge key={index} variant="outline">
                      {band}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
