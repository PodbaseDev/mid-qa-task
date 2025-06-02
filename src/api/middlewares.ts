const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
    });
};

const tryCatch = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

const requestLogger = (req, res, next) => {
    const start = Date.now();

    console.log(`➡️  ${req.method} ${req.originalUrl}`);
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && req.body) {
        console.log(`   📨 Body: ${JSON.stringify(req.body)}`);
    }

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`⬅️  ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
    });

    next();
};

export { errorHandler, tryCatch, requestLogger };