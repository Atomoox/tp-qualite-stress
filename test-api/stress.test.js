const request = require('supertest');

const baseURL = 'http://localhost:3000';

jest.setTimeout(300000);

const sendRequest = async ({ name, message }) => {
    const start = Date.now();

    try {
        const response = await request(baseURL)
            .get(`/feedback`)
            .query({ name, message });

        return {
            success: response.status === 200,
            responseTime: Date.now() - start,
        };
    } catch (error) {
        return {
            success: false,
            responseTime: Date.now() - start,
            error: error.message,
        };
    }
};

const testLoad = async (userCount, duration) => {
    const endTime = Date.now() + duration;
    let successCount = 0;
    let failureCount = 0;
    let responseTimeAcc = 0;
    let requestNumber = 0;

    while (Date.now() < endTime) {
        const results = await Promise.all(
            Array.from({ length: userCount }, (_, i) => {
                return sendRequest({
                    name: `user-${i}`,
                    message: `message-${i}`,
                });
            })
        );

        const resultsAcc = results.reduce((acc, curr) => {
            if (curr.success) {
                return {
                    success: acc.success + 1,
                    failure: acc.failure,
                    responseTimeAcc: acc.responseTimeAcc + curr.responseTime,
                    requestNumber: acc.requestNumber + 1
                }
            }
            return {
                success: acc.success,
                failure: acc.failure + 1,
                responseTimeAcc: acc.responseTimeAcc + curr.responseTime,
                requestNumber: acc.requestNumber + 1
            }
        }, {
            success: 0,
            failure: 0,
            responseTimeAcc: 0,
            requestNumber: 0,
        });

        successCount += resultsAcc.success;
        failureCount += resultsAcc.failure;
        responseTimeAcc += resultsAcc.responseTimeAcc;
        requestNumber += resultsAcc.requestNumber;
    }

    console.log(`Load test with ${userCount} users for ${duration / 1000} seconds:`);
    console.log(`Average response time: ${responseTimeAcc / requestNumber}ms`);
    console.log(`Success count: ${successCount}`);
    console.log(`Failure count: ${failureCount}`);
};

describe('API Load Testing', () => {
    test('Load test with 1 users for 10s', async () => {
        await testLoad(1, 10000);
    });

    test('Load test with 10 users for 10s', async () => {
        await testLoad(10, 10000);
    });

    test('Load test with 100 users for 10s', async () => {
        await testLoad(100, 10000);
    });

    test('Load test with 500 users for 10s', async () => {
        await testLoad(500, 10000);
    });

    test('Load test with 1000 users for 10s', async () => {
        await testLoad(1000, 10000);
    });

    test('Load test with 1000 users for 1 minute', async () => {
        await testLoad(1000, 60000);
    });
});
