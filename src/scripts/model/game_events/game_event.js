class GameThemes {
    static ALL= "No theme specified";
    static WARGAME= "Wagame";
    static FANTASY= "Fatansy";
    static SCIFI= "Sci-Fi";
    static RACING= "Racing";
    static ADVENTURE = "Adventure";
    static TRANSPORTS = "Transports";
    static CITYBUILDING = "City Building";
    static HORROR = "Horror";
    static PIRATES = "Pirates";
    static ZOMBIES = "Zombies";
    static VIDEOGAME = "Video game theme";
    static LANDSCAPE = "Landscape";
    static MEDIEVAL = "Medieval";
    static ANIMAL = "Animal";
    static PREHISTORIC = "Prehistoric";
}

class GameMechanics{
    static DRAFTING = "Drafting";
    static TILELAYING = "Tile laying";
    static DICEROLLING = "Dice rolling";
    static ENGINEBUILDING = "EngineBuilding";
}

class GameComplexities{
    static FAMILYFRIENDLY = "Family friendly games";
    static LIGHT = "Light games"
    static INTERMEDIATE = "Intermediate games";
    static HEAVY = "Heavy games";
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

export {GameEventDatabase ,GameEvent, GameThemes, GameMechanics, GameComplexities};