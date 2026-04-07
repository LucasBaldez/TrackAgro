const { User } = require('../models');
const { sequelize } = require('../config/db');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedAdmin = async () => {
  try {
    // Authenticate and Sync
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    
    console.log('🌱 Conectado ao SQLite para seeding...');

    const adminExists = await User.findOne({ where: { email: 'admin@trackagro.com' } });

    if (adminExists) {
      console.log('⚠️ Administrador já existe no sistema.');
    } else {
      await User.create({
        name: 'Administrador TrackAgro',
        email: 'admin@trackagro.com',
        password: 'admin123', // Will be hashed by beforeSave hook
        role: 'admin',
      });
      console.log('✅ Usuário Administrador criado com SUCESSO!');
      console.log('📧 E-mail: admin@trackagro.com');
      console.log('🔑 Senha: admin123');
    }

    await sequelize.close();
  } catch (error) {
    console.error('❌ Erro no Seeding:', error.message);
    process.exit(1);
  }
};

seedAdmin();
