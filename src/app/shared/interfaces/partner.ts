import { IInvoice } from "./invoice";

export interface IPartner {
    partnerId: number;
    name: string;
    address: string;
    idNumber: number;
    pdvNumber: number;
    description: string;
    companyID: number;
}