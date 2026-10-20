export interface Project {
  id: number;
  title: string;
  shortDesc: string;
  longDesc: string;
  tags: string[];
  status: "live" | "wip" | "archive";
  featured: boolean;
  image: string;
  github: string;
  demo: string;
  year: number;
}
