import { useState, useEffect } from "react";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Product {
  _id: string;
  productImage: string;
  name: string;
  price: number;
  featured: boolean;
  rating: number;
  company: string;
  createdAt: string;
}

const initialProducts: Product[] = [
  {
    _id: "66faf12f838b92a82de6dfa0",
    productImage:
      "https://res.cloudinary.com/duzmyzmpa/image/upload/v1727721773/onxhbgyggwc1leygeb0k.jpg",
    name: "leather tshirt",
    price: 78.4,
    featured: true,
    rating: 4.5,
    company: "Trendsphere",
    createdAt: "2024-09-30T18:42:55.080Z",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.price <= maxPrice &&
        (isFeatured ? product.featured : true) &&
        product.rating >= minRating
    );
    setFilteredProducts(filtered);
  }, [products, maxPrice, isFeatured, minRating]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <div className="mb-8 space-y-4">
        <div>
          <Label htmlFor="price-filter">Max Price: ${maxPrice}</Label>
          <Slider
            id="price-filter"
            min={0}
            max={200}
            step={1}
            value={[maxPrice]}
            onValueChange={(value) => setMaxPrice(value[0])}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="featured-filter"
            checked={isFeatured}
            onCheckedChange={setIsFeatured}
          />
          <Label htmlFor="featured-filter">Featured Only</Label>
        </div>

        <div>
          <Label htmlFor="rating-filter">Min Rating: {minRating}</Label>
          <Slider
            id="rating-filter"
            min={0}
            max={5}
            step={0.5}
            value={[minRating]}
            onValueChange={(value) => setMinRating(value[0])}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="border rounded-lg p-4 shadow-sm">
            <img
              src={product.productImage}
              alt={product.name}
              width={300}
              height={300}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Rating: {product.rating}</p>
            {product.featured && (
              <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full mt-2">
                Featured
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
