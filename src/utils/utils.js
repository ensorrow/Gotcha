export default {
    getPathQuery(){
        return window.location.hash.split('#')[1].split('&')[0];
    },
    getPath(){
        return window.location.hash.split('#')[1].split('?')[0];
    },
    compareTime(startDate, endDate, applyDate){
        const startTime = parseInt(new Date(startDate).getTime()/1000);
        const endTime = parseInt(new Date(endDate).getTime()/1000);
        const nowTime = parseInt(new Date().getTime()/1000);
        const applyTime = parseInt(new Date(applyDate).getTime()/1000);
        if(nowTime<(applyTime-3600)) return 0;
        if(nowTime<applyTime && nowTime<startTime) return 1;
        if(nowTime>=startTime && nowTime<=endTime) return 2;
        if(nowTime>endTime) return 3;
        return 0;
    }
}