export class CacheService {
    /*@ngInject*/
    constructor() {
        //inject private

        this.immovables = new Map();
        this.timeout = new Map();
        this.components = [];
    }
}