import { IFarm } from "./farm";

export interface IReport {
    reportId: number;
    name: string;
    madeOn: Date;
    eggProduction: number;
    deaths: number;
    vitamins: string;
    foodAmount: number;
    coefficient: number;
    farmId: number;
}