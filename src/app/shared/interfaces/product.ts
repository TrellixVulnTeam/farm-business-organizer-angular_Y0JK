import { IProductVariation } from "./productVariation";

export interface IProduct {
    productId: number;
    name: string;
    barcode: string;
    isFood: boolean;
    description: string;
    companyID: number;
}