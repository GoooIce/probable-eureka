// createdAt     DateTime @default(now())
// createdBy     String
// lastUpdatedAt DateTime @updatedAt
// lastUpdatedBy String
export abstract class Auditable {
    createdAt: Date;
    createdBy: string = '';
    lastUpdatedAt: Date;
    lastUpdatedBy: string = '';

    constructor(createdAt: Date, lastUpdatedAt: Date) {
        this.createdAt = createdAt;
        this.lastUpdatedAt = lastUpdatedAt;
    }

    setCreatedBy(createdBy: string) {
        this.createdBy = createdBy;
    }

    setLastUpdatedBy(lastUpdatedBy: string) {
        this.lastUpdatedBy = lastUpdatedBy;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getCreatedBy(): string | undefined {
        return this.createdBy;
    }
}

export abstract class Entity extends Auditable {
    Id: number | undefined;
}