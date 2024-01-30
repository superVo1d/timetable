export interface IScheduleItem {
    id: string;
    name: string;
    date: string;
}

export interface ITimetableStoreState {
    currentDay: Date,
    schedule: IScheduleItem[];
    isSubmitting: boolean;
}

export interface IAddEventParams {
    name: string;
    date: string;
}
