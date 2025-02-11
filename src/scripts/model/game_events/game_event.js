class GameThemes {
    static ALL= "All specified";
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
    static HISTORY = "History"
    static ABSTRACT = "Abstract";
}

class GameMechanics{
    static ALL = "All mechanics";
    static DRAFTING = "Drafting";
    static TILELAYING = "Tile laying";
    static DICEROLLING = "Dice rolling";
    static ENGINEBUILDING = "Engine building";
    static ROLLANDWRITE = "Roll and write";
    static TRICKTAKING = "Trick taking";
    static BLUFF = "Bluff";
    static NEGOTIATION = "Negotiation";
    static DECKBUILDING = "Deck building";
    static CARDS = "Cards";
    static HIDDENROLES = "Hidden roles";
    static PUSHYOURLUCK = "Push your luck";
    static REALTIME = "Real time";
    static RESOURCEMANAGEMENT = "Resource management";
    static WORDS = "Words";
    static WORKERPLACEMENT = "Worker placement";
    static AUCTION = "Auction";
    static DOMINO = "Dominoes";
    static COOP = "Co-op";
    static COMPETITION = "Competition";
    static SEMICOOP = "Semi co-op";
}

class GameComplexities{
    static ALL = "All complixites";
    static LIGHT = "Light games"
    static INTERMEDIATE = "Intermediate games";
    static HEAVY = "Heavy games";
}

class GameBanners{
    static DEFAULT = "Default banner";
    static WARGAME1 = "Wargame banner 1";
    static RACING1 = "Racing banner 1";
}

class GameEvent{
    constructor(title, description, event_date_begin, event_date_end, game_banner, game_theme, game_mechanics, game_complexity, capacity){
        this.title = title;
        this.description = description;

        this.event_date_begin = event_date_begin;
        this.event_date_end = event_date_end;

        this.game_banner = game_banner;

        this.game_theme = game_theme;
        this.game_mechanics = game_mechanics;
        this.game_complexity = game_complexity;

        this.capacity = capacity;
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

    GetGameBanner(){
        return this.game_banner;
    }

    GetTheme(){
        return this.game_theme;
    }

    GetMechanics(){
        return this.game_mechanics;
    }

    GetComplexity(){
        return this.game_complexity;
    }

    GetCapacity(){
        return this.capacity;
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

export {GameEventDatabase ,GameEvent, GameThemes, GameMechanics, GameComplexities, GameBanners};