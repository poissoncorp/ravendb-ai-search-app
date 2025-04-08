"use client"

import type { Product } from "@/types/product"
import { ProductCard } from "@/components/product-card"
import { Skeleton } from "@/components/ui/skeleton"

interface ProductListProps {
  products: Product[]
  isLoading: boolean
}

// ProductList is used directly in page.tsx to display the list of products

export function ProductList({ products, isLoading }: ProductListProps) {
  // display cards skeletons (without content, just frames) if the data is still loading
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-3/4 mb-2" />
          </div>
        ))}
      </div>
    )
  }

  // display the actual results (or no results message)
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found. Try a different search term.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  )
}

