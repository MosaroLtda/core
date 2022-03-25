function initLogErrors() {
    process.on('uncaughtException', function (err) {
        console.error(err);
    });
    process.on('unhandledRejection', function (err) {
        console.error(err);
    });
    process.on('uncaughtExceptionMonitor', function (err) {
        console.error(err);
    });
}
initLogErrors();
