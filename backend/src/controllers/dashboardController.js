const { Animal, Vaccine, Disease, Reproduction } = require('../models');
const { Op } = require('sequelize');

const getDashboardStats = async (req, res) => {
  try {
    const totalAnimals = await Animal.count();
    const activeAnimals = await Animal.count({ where: { status: 'Ativo' } });
    const sickAnimals = await Disease.count({ where: { status: 'Em tratamento' } });
    
    // Proximas vacinas (proximos 30 dias)
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setDate(today.getDate() + 30);
    const pendingVaccines = await Vaccine.count({
      where: {
        nextDose: { [Op.between]: [today, nextMonth] }
      }
    });

    // Proximos partos (proximos 60 dias)
    const nextTwoMonths = new Date();
    nextTwoMonths.setDate(today.getDate() + 60);
    const upcomingBirths = await Reproduction.count({
      where: {
        pregnancyStatus: 'Prenhez Confirmada',
        expectedBirthDate: { [Op.between]: [today, nextTwoMonths] }
      }
    });

    res.json({
      totalAnimals,
      activeAnimals,
      sickAnimals,
      pendingVaccines,
      upcomingBirths,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
