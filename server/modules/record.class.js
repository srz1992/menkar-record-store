class Record {
    constructor (artist, albumName, year, genreList){
        this.artist = artist;
        this.albumName = albumName;
        this.year = year;
        this.genreList = genreList; 
    }
    addGenre(string){
        if (this.genreList == null){
            this.genreList = [];
        }
        this.genreList.push(string);
    }
}
module.exports = Record;