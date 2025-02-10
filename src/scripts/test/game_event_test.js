import { GameEventDatabase, GameEvent, GameThemes, GameBanners } from "../model/game_events/game_event.js";

class GameEventTester{
    static EventDatabaseTestInit(){
        let game_event_01 = new GameEvent("Undaunted Event", "Let us play Undaunted!", new Date(2001, 1, 1, 14, 0, 0, 0),  new Date(2001, 1, 1, 16, 0, 0, 0), GameBanners.WARGAME1, GameThemes.WARGAME);

        GameEventDatabase.PushEvent(game_event_01);
        let game_event_02 = new GameEvent("Heat Event", "Let us play Heat!", new Date(2001, 1, 1, 16, 0, 0, 0),  new Date(2001, 1, 1, 20, 0, 0, 0), GameBanners.RACING1, GameThemes.RACING);

        GameEventDatabase.PushEvent(game_event_02);
        let game_event_03 = new GameEvent("Clank! Event", "Let us play Clank!", new Date(2001, 1, 1, 15, 0, 0, 0),  new Date(2001, 1, 1, 22, 0, 0, 0), GameBanners.DEFAULT,GameThemes.FANTASY);

        GameEventDatabase.PushEvent(game_event_03);
        let game_event_04 = new GameEvent("Memoire 44 Event", "Let us play Memoire 44!", new Date(2001, 1, 1, 13, 0, 0, 0),  new Date(2001, 1, 1, 16, 0, 0, 0), GameBanners.WARGAME1,GameThemes.WARGAME);

        GameEventDatabase.PushEvent(game_event_04);
    }
}

export default GameEventTester;