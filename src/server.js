const Hapi = require('@hapi/hapi');
const db = require('./models');
const routes = require('./routes/routes');

const init = async () => {
    const server = Hapi.server({
        port: 9000,
        host: 'localhost'
    });

    try {
        await db.sequelize.authenticate();
        console.log('Success connect database');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }

    server.route(routes);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

init();
