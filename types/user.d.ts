export interface ChatUser {
  _id: string;
  id: string; // Keeping both for compatibility
  name: string;
  message: string;
  time: string;
  unread: number;
  src: any; // Can be string (uri) or number (require)
  isOnline: boolean;
  lastActive?: string;
  email?: string;
  isFavorite?: boolean;
  isArchived?: boolean;
  type?: "direct" | "group";
}
export interface UserStore {
  users: ChatUser[];
  loading: boolean;
  error: string | null;

  fetchAllUsers: (
    search?: string,
    page?: number,
    limit?: number,
  ) => Promise<void>;
  setUsers: (users: ChatUser[]) => void;
  clearUsers: () => void;
  resetError: () => void;
}
