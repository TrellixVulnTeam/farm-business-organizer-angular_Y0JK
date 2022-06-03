import { IProductVariation } from "./productVariation";

export interface IWarehouse {
    warehouseId: number;
    name: string;
    description: string;
    capacity: number;
    companyID: number;
    productVariations: IProductVariation[];
}