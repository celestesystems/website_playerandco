import { GameEvent } from "../game_events/game_event.js";

const calendar_element = document.getElementById("CalendarContainer");

class Calendar{
    Calendar_elements;

    constructor(game_events){

    }

    Display(){

    }
}

class CalendarDay{
    constructor(game_events){
        this.game_events = game_events;
    }
}

class CalendarEvent{
    constructor(game_event){
        this.game_event = game_event;
    }

    Display(){
        let event_box = document.createElement("div");
    }
}

export default {};