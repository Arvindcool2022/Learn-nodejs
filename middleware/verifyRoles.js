export const verifyRoles =
  (...args) =>
  (req, res, next) => {
    console.log(req?.roles);
    if (!req?.roles) return res.sendStatus(401);
    const rolesArr = [...args];
    console.log('roles: ', rolesArr, req.roles);
    const result = req.roles
      .map(role => rolesArr.includes(role))
      .find(val => val);

    if (!result) return res.sendStatus(401);
    next();
  };
