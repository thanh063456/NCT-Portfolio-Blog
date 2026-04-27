export type PostStatus = "draft" | "published";

export interface Profile {
  id: string;
  email: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  status: PostStatus;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  created_at: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

export interface PostWithAuthor extends Post {
  profiles: Pick<Profile, "display_name" | "email" | "avatar_url"> | null;
}

export interface CommentWithAuthor extends Comment {
  profiles: Pick<Profile, "display_name" | "avatar_url"> | null;
}
