export interface Project {
  id: string;
  name: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority?: "low" | "medium" | "high";
  tags?: string[];
  subtasks?: Subtask[];
  comments?: Comment[];
  links?: string[];
  images?: string[];
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
}
