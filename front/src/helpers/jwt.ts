export const decodeJwt = (jwt: string): object | null => {
  if (!jwt) return null;
  return JSON.parse(
    window.atob(jwt.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
  );
};
