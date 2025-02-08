import { GameEvent, GameEventDatabase } from "../../model/game_events/game_event.js";

const calendar_element = document.getElementById("CalendarContainer");

class Calendar{
    Calendar_elements;

    constructor(game_events){
        this.game_events = game_events;

        this.Display();
    }

    Display(){
        new CalendarDay(this.game_events);
    }
}

class CalendarDay{
    constructor(game_events){
        this.game_events = game_events;

        this.Display();
    }

    Display(){
        let event_day_container = document.createElement("div");

        event_day_container.className = "CalendarDayContainer";

        for (let i = 0; i < 24; i++) {
            let event_day_label_hour = document.createElement("div")

            event_day_label_hour.setAttribute("style", `grid-column: 1; grid-row: ${i + 1}`);

            event_day_label_hour.appendChild(document.createTextNode(i + "H"));

            event_day_container.appendChild(event_day_label_hour);
        }

        let pos = 1;

        this.game_events.forEach(game_event => {
            new CalendarEvent(game_event, pos++, event_day_container);
        });

        calendar_element.appendChild(event_day_container);
    }
}

class CalendarEvent{
    constructor(game_event, position, container){
        this.game_event = game_event;
        this.position = position;

        this.container = container;

        this.Display();
    }

    Display(){
        let event_box = document.createElement("div");

        let pos_top = this.game_event.GetDateBegin().getHours() + 1;
        let pos_bottom = this.game_event.GetDateEnd().getHours() + 1;

        event_box.className = "CalendarEventBox";
        event_box.setAttribute("style",`grid-row: ${pos_top} / ${pos_bottom}; grid-column: ${this.position + 1};`);

        event_box.appendChild(document.createTextNode(this.game_event.GetTitle()));

        this.container.appendChild(event_box);
    }
}

new Calendar(GameEventDatabase.GetEvents());

export default {};