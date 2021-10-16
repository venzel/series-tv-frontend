import { Serie } from 'src/app/series/models';

export class Season {
    constructor(
        public id?: string,
        public name?: string,
        public total_episodes?: number,
        public episodes_watcheds?: number,
        public serie?: Serie
    ) {}
}
