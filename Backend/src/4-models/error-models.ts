class ClientError {
    public status: number;
    public message: string;
    public constructor(status: number, message: string) {
        this.status = status;
        this.message = message;
    }
}

export class ResourceNotFoundError extends ClientError {
    public constructor(id: number) {
        super(404, `id ${id} not found`);
    }
}

export class RouteNotFoundError extends ClientError {
    public constructor(method: string, route: string) {
        super(404, `Route ${route} on method ${method} not exist`);
    }
}

export class ValidationError extends ClientError {
    public constructor(message: string) {
        super(400, message);
    }
}

export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(401, message)
    }
}

export class ForbiddenError extends ClientError {
    public constructor(message: string) {
        super(403, message)
    }
}
