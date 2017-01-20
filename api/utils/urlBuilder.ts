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

    public lookup(id: string): UrlBuilder {
        this.lookupId = id;
        return this;
    }

    public search(term: string): UrlBuilder {
        this.searchTerm = term;
        return this;
    }

    public byGenreId(id: number): UrlBuilder {
        this.searchGenreId = id;
        return this;
    }

    // https://affiliate.itunes.apple.com/resources/documentation/genre-mapping/
    public byGenre(genre: string): UrlBuilder {
        switch (genre) {
            case 'ARTS': this.byGenreId(1301); break;
            case 'COMEDY': this.byGenreId(1303); break;
            case 'EDUCATION': this.byGenreId(1304); break;
            case 'FAMILY': this.byGenreId(1305); break;
            case 'HEALTH': this.byGenreId(1307); break;
            case 'TV': this.byGenreId(1309); break;
            case 'MUSIC': this.byGenreId(1310); break;
            case 'NEWS': this.byGenreId(1311); break;
            case 'RELIGION': this.byGenreId(1314); break;
            case 'SCIENCE': this.byGenreId(1315); break;
            case 'SPORTS': this.byGenreId(1316); break;
            case 'TECHNOLOGY': this.byGenreId(1318); break;
            case 'BUSINESS': this.byGenreId(1321); break;
            case 'GAMES': this.byGenreId(1323); break;
            case 'SOCIETY': this.byGenreId(1324); break;
            case 'GOVERNMENT': this.byGenreId(1325); break;
            default: break;
        }
        return this;
    }

    public withLimit(limit: number): UrlBuilder {
        this.searchLimit = limit;
        return this;
    }

    public toString(): string {
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
                str = str.concat('genreId=')
                    .concat(this.searchGenreId.toString()).concat('&');
            }
            if (this.searchLimit) {
                str = str.concat('limit=')
                    .concat(this.searchLimit.toString()).concat('&');
            }
        }
        return str;
    }
}
