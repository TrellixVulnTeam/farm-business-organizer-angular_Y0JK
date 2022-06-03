import { IProduct } from "./product";
import { IProductVariation } from "./productVariation";

export interface IRecipe {
    recipeId: number;
    name: string;
    amountCereal: number;
    amountProduct: number;
    product: IProduct;
    cereals: IProductVariation[];
}