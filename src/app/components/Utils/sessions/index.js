//GETTING SESSIONS
export const getAuthorizationSession = () => {
  return sessionStorage.getItem("Authorization");
};
