export class Question {

    id: string;
    type: string;
    dt: number;
    isOptional: boolean;

    constructor(id: string, type: string, dt: number, isOptional: boolean) {
        this.id = id;
        this.type = type;
        this.dt = dt;
        this.isOptional = isOptional;
    }
}