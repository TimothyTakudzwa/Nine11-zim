

export interface ReportsResponse{
    status:number;
    Case_ID:string;
    status_message:string;
}
export interface alerts{
    reports:ReportsResponse[];
}