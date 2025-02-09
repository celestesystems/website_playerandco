import { GameEvent, GameEventDatabase } from "../../model/game_events/game_event.js";
import pop_up_event_manager from "../pop_up_event/pop_up_event.js";

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

            event_day_label_hour.className = "CalendarHour";
            event_day_label_hour.setAttribute("style", `grid-column: 1; grid-row: ${i * 2 + 1}`);

            event_day_label_hour.appendChild(document.createTextNode(i + "H"));

            event_day_container.appendChild(event_day_label_hour);


            let event_day_line = document.createElement("div")

            event_day_line.className = "CalendarLine";
            event_day_line.setAttribute("style", `grid-row: ${(i + 1) * 2}; grid-column: 1 / ${this.game_events.length + 2}`);

            event_day_container.appendChild(event_day_line);
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

        let bg_color = Math.random() * 360;

        event_box.className = "CalendarEventBox";
        event_box.setAttribute("style",`grid-row: ${pos_top * 2} / ${pos_bottom *  2}; grid-column: ${this.position + 1}; background-color: hsl(${bg_color}, 100%, 80%)`);

        event_box.appendChild(document.createTextNode(this.game_event.GetTitle()));

        event_box.addEventListener("click", () => {
            pop_up_event_manager.Display(this.game_event);
            
        });

        this.container.appendChild(event_box);
    }
}

new Calendar(GameEventDatabase.GetEvents());

export default {};