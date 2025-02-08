import { GameEventDatabase, GameEvent, GameThemes } from "../model/game_events/game_event.js";

class GameEventTester{
    static EventDatabaseTestInit(amount){
        for(let i = 0; i < amount; i++){
            let game_event = new GameEvent("Test : " + i, "Let us play Undaunted", new Date(2001, 1, 1, 14, 0, 0, 0),  new Date(2001, 1, 1, 16, 0, 0, 0), GameThemes.WARGAME);

            GameEventDatabase.PushEvent(game_event);
        }
    }
}

export default GameEventTester;