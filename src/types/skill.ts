import { Job } from "./job";
import { Language } from "./root";

export interface Skill {
  id: number;
  name: Language;
  description: Language;
  icon: string;
  job: Job;
}
