import { GameEventDatabase, GameEvent, GameThemes } from "../model/game_events/game_event.js";

class GameEventTester{
    static EventDatabaseTestInit(){
        let game_event_01 = new GameEvent("Undaunted Event", "Let us play Undaunted!", new Date(2001, 1, 1, 14, 0, 0, 0),  new Date(2001, 1, 1, 16, 0, 0, 0), GameThemes.WARGAME);

        GameEventDatabase.PushEvent(game_event_01);
        let game_event_02 = new GameEvent("Heah Event", "Let us play Heat!", new Date(2001, 1, 1, 16, 0, 0, 0),  new Date(2001, 1, 1, 20, 0, 0, 0), GameThemes.RACING);

        GameEventDatabase.PushEvent(game_event_02);
        let game_event_03 = new GameEvent("Clank! Event", "Let us play Clank!", new Date(2001, 1, 1, 15, 0, 0, 0),  new Date(2001, 1, 1, 22, 0, 0, 0), GameThemes.FANTASY);

        GameEventDatabase.PushEvent(game_event_03);
    }
}

export default GameEventTester;