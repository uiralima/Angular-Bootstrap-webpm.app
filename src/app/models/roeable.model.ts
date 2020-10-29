export abstract class Roleable {
    constructor(owner: string) {
        this.owner = owner;
    }
    public owner: string;
    public writer: string[] = [];
    public reader: string[] = [];
}