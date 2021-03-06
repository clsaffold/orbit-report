export class Satellite {
    name: string;
    type: string;
    orbitType: string;
    launchDate: string;
    operational: boolean;
    constructor(name: string, type: string, launchDate: string, orbitType: string, operational: boolean) {
        this.name = name;
        this.orbitType = orbitType;
        this.type = type;
        this.operational = operational;
        this.launchDate = launchDate
    };
    
    shouldShowWarning(): boolean {
        if (this.type.toLowerCase() === 'Space Debris'.toLowerCase()) {
            return true
        } else {
            return false
        };
    };

};
