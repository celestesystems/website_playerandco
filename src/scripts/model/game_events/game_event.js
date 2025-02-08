class GameThemes {
    static ALL= 0;
    static WARGAME= 1;
    static FANTASY= 2;
    static SCIFI= 3;
}

class GameEvent{
    constructor(title, description, event_date, game_theme){
        this.title = title;
        this.description = description;

        this.event_date = event_date;

        this.game_theme = game_theme;
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

    GetTheme(){
        return this.game_theme;
    }
}

export {GameEvent, GameThemes};