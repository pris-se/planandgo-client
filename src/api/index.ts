export const API = {
  //profile
  login: "/api/login",
  register: "/api/register",
  resetPassword: "/api/reset",
  getProfile: "/api/profile",
  updateProfile: "/api/profile",
  //users
  getUsers: (query: string) => `/api/users?${query}`,
  getUserById: (id: string) => `/api/users/${id}`,
  //chats
  getChats: "/api/chats",
  createChat: "/api/chats",
  getChatById: (id: string) => `/api/chats/${id}`,
  //messages
  getMessagesByChatId: (chatId: string) => `/api/messages/${chatId}`,
  createMessage: "/api/messages",
  //tasks
  getTasks: (query: string) => `/api/tasks?${query}`,
  getTaskById: (id: string) => `/api/tasks/${id}`,
  getTaskByIds: (ids: string[] | string | URLSearchParams) => `/api/tasks/ids/${ids}`,
  createTask: "/api/tasks",
  updateTask: (id: string) => `/api/tasks/${id}`,
  deleteTask: (id: string) => `/api/tasks/${id}`,
  //events
  getEventsByUserId: (id: string) => `/api/events/user/${id}`,
  getEventById: (id: string) => `/api/events/${id}`,
  getEvents: (query: string) => `/api/events${query}`,
  createEvent: "/api/events",
  updateEvent: (id: string) => `/api/events/${id}`,
  deleteEvent: (id: string) => `/api/events/${id}`,
} as const;
