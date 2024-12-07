const { Role } = require('../models/role.model');

const services = {}

services.create = async (data) => {
  return await Role.create(data);
};

services.getAll = async () => {
  return await Role.findAll();
};

services.getById = async (id) => {
  return await Role.findByPk(id);
};

services.update = async (id, data) => {
  return await Role.update(data, { where: { roleId: id } });
};

services.delete = async (id) => {
  return await Role.destroy({ where: { roleId: id } });
};

module.exports = { RoleService: services }