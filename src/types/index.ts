export interface JsonPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface JsonUser {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  tech: string[];
  status: "Hoan thanh" | "Dang lam" | "Y tuong";
  url: string;
}
