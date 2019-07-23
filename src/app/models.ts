export interface Program {
  id: string;
  name: string;
  active: boolean;
  routines: [];
}

export interface Routine {
  id: string;
  name: string;
  description: string;
  programId: string;
  exerciseArray: any[];
}

export interface Exercise {
  id: string;
  name: string;
  mainMuscle: string;
  secondaryMuscle: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmationToken: string;
  programIds: string[];
}

export interface Workout {
  id: string;
  notes: string;
  completedAt: typeof Date;
  startedAt: typeof Date;
  routineId: number;
  userId: string;
  exerciseResults: [
    {
      exerciseId: string,
      sets: number,
      reps: number
    }
  ];
}
