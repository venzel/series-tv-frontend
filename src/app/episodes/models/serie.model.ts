import { Season } from 'src/app/seasons/models';

export class Episode {
    constructor(
        public id?: string,
        public name?: string,
        public watched?: boolean,
        public season?: Season
    ) {}
}
