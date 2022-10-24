export const createTokenUser = (user) => {
  return { name: user.name, userUuid: user.uuid, role: user.role };
};
