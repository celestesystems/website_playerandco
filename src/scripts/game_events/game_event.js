class GameEvent{
    constructor(title, description, date, time_begin, time_end){
        this.title = title;
        this.description = description;

        this.date = date;

        this.timeBegin = time_begin;
        this.timeEnd = time_end;
    }

    GetTitle(){
        return this.title;
    }
    
    GetDescription(){
        return this.description;
    }

    GetDate(){
        return this.date;
    }

    getTimeBegin(){
        return this.timeBegin;
    }

    getTimeEnd(){
        return this.timeEnd;
    }
}

export {GameEvent};