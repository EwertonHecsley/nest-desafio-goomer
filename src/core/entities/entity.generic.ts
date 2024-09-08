import Identity from "./identity.generic";

export default abstract class Entity<T> {
    private entityId: Identity;
    protected attibutes: T;

    protected constructor(attributes: T, id?: Identity) {
        this.entityId = id ?? new Identity();
        this.attibutes = attributes;
    }

    get id(): Identity {
        return this.entityId;
    }
}