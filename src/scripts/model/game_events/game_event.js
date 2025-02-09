class GameThemes {
    static ALL= "No theme specified";
    static WARGAME= "Wagame";
    static FANTASY= "Fatansy";
    static SCIFI= "Sci-Fi";
    static RACING= "Racing";
}

class GameEvent{
    constructor(title, description, event_date_begin, event_date_end, game_theme){
        this.title = title;
        this.description = description;

        this.event_date_begin = event_date_begin;
        this.event_date_end = event_date_end;

        this.game_theme = game_theme;
    }

    GetTitle(){
        return this.title;
    }
    
    GetDescription(){
        return this.description;
    }

    GetDateBegin(){
        return this.event_date_begin;
    }

    GetDateEnd(){
        return this.event_date_end
    }

    GetTheme(){
        return this.game_theme;
    }
}

class GameEventDatabase{
    static game_events = [];

    static PushEvent(game_event){
        this.game_events.push(game_event);
    }

    static GetEvents(){
        return this.game_events;
    }
}

export {GameEventDatabase ,GameEvent, GameThemes};