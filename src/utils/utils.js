export default {
    getPathQuery(){
        return window.location.hash.split('#')[1].split('&')[0];
    },
    getPath(){
        return window.location.hash.split('#')[1].split('?')[0];
    }
}