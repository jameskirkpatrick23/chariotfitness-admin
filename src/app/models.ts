export interface Program {
  id: number;
  name: string;
  active: boolean;
  routines: [];
}

export interface Routine {
  id: number;
  name: string;
  description: string;
  programId: number;
  exerciseArray: any[];
}

export interface Exercise {
  id: number;
  name: string;
  mainMuscle: string;
  secondaryMuscle: string;
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  confirmationToken: string;
  programIds: number[];
}
