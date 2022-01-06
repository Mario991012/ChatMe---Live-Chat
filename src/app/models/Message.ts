export class Message {
    
    public from: string;
    public body: string;
    public sameUser: boolean;

    constructor() {
        this.from = '';
        this.body = '';
        this.sameUser = false;
    }
}