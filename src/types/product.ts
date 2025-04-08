export class Product {
  Name: string;
  Supplier: string;
  Category: string;
  QuantityPerUnit: string;
  PricePerUnit: number;
  UnitsInStock: number;
  UnitsOnOrder: number;
  Discontinued: boolean;
  ReorderLevel?: number;
  "@metadata"?: {
    "@collection": string;
    "@flags": string;
  };

  constructor(
    Name: string,
    Supplier: string,
    Category: string,
    QuantityPerUnit: string,
    PricePerUnit: number,
    UnitsInStock: number,
    UnitsOnOrder: number,
    Discontinued: boolean,
    ReorderLevel?: number,
    metadata?: { "@collection": string; "@flags": string }
  ) {
    this.Name = Name;
    this.Supplier = Supplier;
    this.Category = Category;
    this.QuantityPerUnit = QuantityPerUnit;
    this.PricePerUnit = PricePerUnit;
    this.UnitsInStock = UnitsInStock;
    this.UnitsOnOrder = UnitsOnOrder;
    this.Discontinued = Discontinued;
    this.ReorderLevel = ReorderLevel;
    this["@metadata"] = metadata;
  }
}