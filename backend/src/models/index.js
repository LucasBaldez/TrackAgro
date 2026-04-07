const User = require('./User');
const Animal = require('./Animal');
const Vaccine = require('./Vaccine');
const Disease = require('./Disease');
const Reproduction = require('./Reproduction');
const Movement = require('./Movement');

// Associations
User.hasMany(Animal, { foreignKey: 'ownerId', as: 'animals' });
Animal.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

Animal.hasMany(Vaccine, { foreignKey: 'animalId', as: 'vaccines' });
Vaccine.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

Animal.hasMany(Disease, { foreignKey: 'animalId', as: 'diseases' });
Disease.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

Animal.hasMany(Reproduction, { foreignKey: 'animalId', as: 'reproductions' });
Reproduction.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

Animal.hasMany(Movement, { foreignKey: 'animalId', as: 'movements' });
Movement.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

module.exports = {
  User,
  Animal,
  Vaccine,
  Disease,
  Reproduction,
  Movement,
};
