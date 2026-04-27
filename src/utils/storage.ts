export const storage = {
  getToken: () => localStorage.getItem("token"),
  getRoleId: () => {
    const value = localStorage.getItem("roleId");
    return value ? Number(value) : null;
  },
  setSession: (data: {
    token: string;
    username: string;
    role: string;
    roleId: number;
  }) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);
    localStorage.setItem("roleId", String(data.roleId));
  },
  clearSession: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("roleId");
  },
};