import { GameEventDatabase, GameEvent, GameThemes } from "../model/game_events/game_event.js";

class GameEventTester{
    static EventDatabaseTestInit(amount){
        for(let i = 0; i < amount; i++){
            let game_event = new GameEvent("Test : " + i, "Let us play Undaunted", new Date(), GameThemes.WARGAME);

            GameEventDatabase.PushEvent(game_event);
        }
    }
}

export default GameEventTester;