import sequelize from "../infrastructure/http/sequelize/sequelize.js";

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ c кайфом бд');
        return true;
    } catch (error) {
        console.error('❌ неудача бд', error);
        return false;
    }
};  

export {
    testConnection
}