// createDefaultData.js
const { Role } = require('../models/role.model'); // Asegúrate de que la ruta a 'models' sea correcta
const { User } = require('../models/user.model');
const bcrypt = require("bcryptjs");

async function createDefaultData() {
  try {
    await Role.create({
      code: 'CLI',
      name: 'CLIENTE',
      description: 'Descripción de cliente',
    });
    await Role.create({
      code: 'ADM',
      name: 'ADMIN',
      description: 'Descripción de administrador',
    });
    await Role.create({
      code: 'COL',
      name: 'COLABORADOR',
      description: 'Descripción de colaborador',
    });

    const password = 'password123'
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({ 
        email: 'client@gmail.com', 
        businessName: 'ESCUADRON SECURITY S.A.C', 
        name: 'Charles Castillo', 
        jobTitle: 'Gerente General', 
        phone: '977774529', 
        username: 'cliente', 
        password: hashedPassword,
        roleId: 1
    })
    await User.create({ 
        email: 'admin@gmail.com', 
        businessName: 'WOST S.A.C', 
        name: 'Marcelo Florez', 
        jobTitle: 'Gerente General', 
        phone: '977774529', 
        username: 'admin', 
        password: hashedPassword,
        roleId: 2
    })
    await User.create({ 
        email: 'colab@gmail.com', 
        businessName: 'YAWI S.A.C', 
        name: 'Andrei Perez', 
        jobTitle: 'Gerente General', 
        phone: '977774529', 
        username: 'colab', 
        password: hashedPassword,
        roleId: 3
    })

    console.log('Datos por defecto creados con éxito');
  } catch (error) {
    console.error('Error al crear datos por defecto:', error);
  }
}

module.exports = { createDefaultData };
