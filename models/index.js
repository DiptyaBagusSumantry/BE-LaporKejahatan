const dbConfig = require ('../config/config.js')
const Sequelize = require ('sequelize')
const User = require ('./UserModels.js')
const Laporan = require('./LaporanModel.js')
const Kejahatan = require('./KejahatanModels.js')
const DetailKejahatan = require('./DetailKejahatan.js')
const DesaKecamatan = require('./DesaKecamtanModels.js')
const Berita = require('./BeritaModels.js')
const StatusLaporan = require('./StatuslaporanModels.js')

const sequelizeInstance = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
});

const db = {};
db.sequelizeInstance = sequelizeInstance
db.User = User(sequelizeInstance)
db.Laporan = Laporan(sequelizeInstance)
db.Kejahatan = Kejahatan(sequelizeInstance)
db.DetailKejahatan = DetailKejahatan(sequelizeInstance)
db.DesaKecamatan = DesaKecamatan(sequelizeInstance)
db.Berita = Berita(sequelizeInstance)
db.StatusLaporan = StatusLaporan(sequelizeInstance)

//Laporan - User
db.User.hasMany(db.Laporan, {
    foreignKey: {
        name: 'userId',
        type: Sequelize.UUID,
        allowNull: false
    }
})

db.Laporan.belongsTo(db.User, {
    targetKey: 'id'
})

//Status Laporan - laporan
db.Laporan.hasMany(db.StatusLaporan, {
    foreignKey: {
        name: 'laporanId',
        type: Sequelize.UUID,
        allowNull: false
    }
})

db.StatusLaporan.belongsTo(db.Laporan, {
    targetKey: 'id'
})

//laporan - Desa Kecamatan
db.DesaKecamatan.hasMany(db.Laporan, {
    foreignKey: {
        name: 'desaKecamatanId',
        type: Sequelize.UUID,
        allowNull: false
    }
})

db.Laporan.belongsTo(db.DesaKecamatan, {
    targetKey: 'id'
})

//Detail Kejahatan - Desa Kecamatan
db.DesaKecamatan.hasMany(db.DetailKejahatan, {
    foreignKey: {
        name: 'desaKecamatanId',
        type: Sequelize.UUID,
        allowNull: false
    }
})

db.DetailKejahatan.belongsTo(db.DesaKecamatan, {
    targetKey: 'id'
})

module.exports = db
