# Doo
Repositório para o projeto da disciplina "Princípios de Desenvolvimento Web"


Especificação:
- Doo é um sistema de listas de afazeres divido em seções, onde cada seção tem cartilhas de tarefas que contém as tarefas


Rotas:
GET /projects
    payload: {"user": String, "password": String}
    response: [Project]

GET /project
    payload: {"projectId": Integer, "user": String, "password": String}

POST /project
    payload: {
        "projectName": String,
        "description": String,
        "user": String,
        "password": String
    }
    response: {
        "projectId": Integer,
        "message": String
    }

PUT /project
    payload: {
        "projectId": Integer,
        "projectName": String (optional),
        "description": String (optional),
        "user": String,
        "password": String
    }
    response: {
        "message": String
    }

DELETE /project
    payload: {
        "projectId": Integer,
        "user": String,
        "password": String
    }
    response: {
        "message": String
    }

POST /project/{projectId}/session
    payload: {
        "sessionName": String,
        "description": String,
        "user": String,
        "password": String
    }
    response: {
        "sessionId": Integer,
        "message": String
    }

PUT /project/{projectId}/session
    payload: {
        "sessionId": Integer,
        "sessionName": String (optional),
        "description": String (optional),
        "user": String,
        "password": String
    }
    response: {
        "message": String
    }

DELETE /project/{projectId}/session
    payload: {
        "sessionId": Integer,
        "user": String,
        "password": String
    }
    response: {
        "message": String
    }
