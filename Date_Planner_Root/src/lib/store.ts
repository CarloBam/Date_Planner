import { create } from 'zustand';
import { DateActivity } from './recommendationLogic';

interface PlanState {
    budget: number;
    activities: DateActivity[];
    availableActivities: DateActivity[];
    setBudget: (amount: number) => void;
    addActivity: (activity: DateActivity) => void;
    removeActivity: (activityId: number) => void;
    reorderActivities: (startIndex: number, endIndex: number) => void;
}

export const usePlanStore = create<PlanState>((set) => ({
    budget: 800,
    activities: [],
    availableActivities: [], // Could be fetched from DB and loaded here
    setBudget: (amount) => set({ budget: amount }),
    addActivity: (activity) =>
        set((state) => {
            if (state.activities.find((a) => a.id === activity.id)) return state; // Avoid duplicates
            return { activities: [...state.activities, activity] };
        }),
    removeActivity: (activityId) =>
        set((state) => ({
            activities: state.activities.filter((a) => a.id !== activityId),
        })),
    reorderActivities: (startIndex, endIndex) =>
        set((state) => {
            const result = Array.from(state.activities);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            return { activities: result };
        }),
}));
