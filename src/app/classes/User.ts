
export class User {

    public id: string;
    public name: string;
    public room: string;

    constructor( id: string, name: string ) {
        this.id = id;
        this.name = name;
        this.room = 'unregistered-room';
    }
}