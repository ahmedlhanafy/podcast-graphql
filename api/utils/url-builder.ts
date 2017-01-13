export default class UrlBuilder {
    private hostUri: string;
    private lookupResource: string;
    private lookupId: string;
    private searchResource: string;
    private searchEntity: string;
    private searchTerm: string;
    private searchGenreId: number;
    private searchLimit: number;

    constructor() {
        this.hostUri = 'https://itunes.apple.com/';
        this.lookupResource = 'lookup?';
        this.searchResource = 'search?';
        this.searchEntity = 'podcast';
        return this;
    }

    public lookup(id: string) {
        this.lookupId = id;
        return this;
    }

    public search(term: string) {
        this.searchTerm = term;
        return this;
    }

    // https://affiliate.itunes.apple.com/resources/documentation/genre-mapping/
    public byGenreId(id: number) {
        this.searchGenreId = id;
        return this;
    }

    public withLimit(limit: number) {
        this.searchLimit = limit;
        return this;
    }

    public toString() {
        let str: string = this.hostUri;
        if (this.lookupId) {
            // Lookup
            str = str.concat(this.lookupResource)
                .concat('id=').concat(this.lookupId);
        } else {
            // Search
            str = str.concat(this.searchResource)
                .concat('entity=').concat(this.searchEntity).concat('&')
                .concat('term=').concat(this.searchTerm).concat('&');
            if (this.searchGenreId) {
                str = str.concat('genreId=').concat(this.searchGenreId.toString()).concat('&');
            }
            if (this.searchLimit) {
                str = str.concat('limit=').concat(this.searchLimit.toString()).concat('&');
            }
        }
        return str;
    }
}
