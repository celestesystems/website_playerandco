import { GameEventDatabase, GameEvent, GameThemes } from "../model/game_events/game_event.js";

class GameEventTester{
    static EventDatabaseTestInit(){
        let game_event_01 = new GameEvent("Undaunted Event", "Let us play Undaunted!", new Date(2001, 1, 1, 14, 0, 0, 0),  new Date(2001, 1, 1, 16, 0, 0, 0), GameThemes.WARGAME);

        GameEventDatabase.PushEvent(game_event_01);
        let game_event_02 = new GameEvent("Undaunted Event", "Let us play Undaunted!", new Date(2001, 1, 1, 16, 0, 0, 0),  new Date(2001, 1, 1, 20, 0, 0, 0), GameThemes.WARGAME);

        GameEventDatabase.PushEvent(game_event_02);
        
    }
}

export default GameEventTester;