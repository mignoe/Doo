import request from 'supertest';
import { app } from '../main/server'; // Adjust the import according to your project

describe('Create tasks', () => {
    let projectId: string;
    let sessionId: string;

    beforeEach(async () => {
        // Sign up users
        await request(app)
            .post('/sign-up')
            .send({ name: "Test", password: "123" })
            .expect(201);

        await request(app)
            .post('/sign-up')
            .send({ name: "Test2", password: "123" })
            .expect(201);

        // Create project
        const projectRes = await request(app)
            .post('/projects/create')
            .send({ name: "TestProject", description: "Testing", userName: "Test", userPassword: "123" })
            .expect(201);
        projectId = projectRes.body.id;

        // Create session
        const sessionRes = await request(app)
            .post('/sessions/create')
            .send({ name: "Session Test", projectId, userName: "Test", password: "123" })
            .expect(201);
        sessionId = sessionRes.body.id;
    });

    describe('/POST create task', () => {
        it('should create the task', async () => {
            await request(app)
                .post('/tasks/create')
                .send({ name: "Task Test", sessionId, userName: "Test", password: "123" })
                .expect(201);
        });

        it('should not create the task with missing name', async () => {
            await request(app)
                .post('/tasks/create')
                .send({ name: "", sessionId, userName: "Test", password: "123" })
                .expect(500);
        });

        it('should not create the task with invalid sessionId', async () => {
            await request(app)
                .post('/tasks/create')
                .send({ name: "Task Test", sessionId: "<invalid>", userName: "Test", password: "123" })
                .expect(500);
        });
    });
});
