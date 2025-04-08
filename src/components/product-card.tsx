"use client"

import type { Product } from "@/types/product"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Package, DollarSign, Truck, Archive } from "lucide-react"
import {Card, CardContent, CardHeader, CardTitle} from "./ui/card"

interface ProductCardProps {
  product: Product
}

// This component displays a card with product details, used in product-list.tsx to show each product
export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{product.Name}</CardTitle>
          {product.Discontinued && (
            <Badge variant="destructive" className="ml-2">
              Discontinued
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Package className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{product.QuantityPerUnit}</span>
          </div>

          <div className="flex items-center text-sm">
            <DollarSign className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-700">${product.PricePerUnit.toFixed(2)} per unit</span>
          </div>

          <div className="flex items-center text-sm">
            <Archive className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{product.UnitsInStock} units in stock</span>
          </div>

          <div className="flex items-center text-sm">
            <Truck className="mr-2 h-4 w-4 text-gray-500" />
            <span className="text-gray-700">{product.UnitsOnOrder} units on order</span>
          </div>

          {product.ReorderLevel !== undefined && (
            <div className="flex items-center text-sm">
              <AlertCircle className="mr-2 h-4 w-4 text-gray-500" />
              <span className="text-gray-700">Reorder at {product.ReorderLevel} units</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

