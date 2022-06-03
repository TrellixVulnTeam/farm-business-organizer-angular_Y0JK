import { IPartner } from "./partner";
import { IProduct } from "./product";

export interface IInvoice {
    invoiceId: number;
    number: number;
    creationDate: Date;
    //type: string;
    description: string;
    totalPrice: number;
    partnerId: number;
    items: IProduct[];
}