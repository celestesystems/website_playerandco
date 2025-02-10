import { GameEvent, GameEventDatabase, GameThemes, GameMechanics, GameComplexities } from "../../model/game_events/game_event.js";
import pop_up_event_manager from "../pop_up_event/pop_up_event.js";

const calendar_element = document.getElementById("CalendarContainer");

const calendar_filter_theme = document.getElementById("CalendarFilterTheme");
const calendar_filter_mechanic = document.getElementById("CalendarFilterMechanic");
const calendar_filter_complexity = document.getElementById("CalendarFilterComplexity");

const calendar_filter_button = document.getElementById("CalendarFilterRefreshButton");

class Calendar{
    calendar_elements;

    calendar_div;

    calendar_filter_element_theme;
    calendar_filter_element_mechanic;
    calendar_filter_element_complexity;

    constructor(game_events){
        this.game_events = game_events;

        this.Display();
    }

    Display(filters){
        if(filters == null){
            this.calendar_div = new CalendarDay(this.game_events);
        }
        else{
            let game_events_filtered = [];

            for(let i = this.game_events.length - 1; i >= 0; i--){
                if(filters.includes(this.game_events[i].GetTheme())){
                    game_events_filtered.push(this.game_events[i]);
                }
            }

            

            this.calendar_div = new CalendarDay(game_events_filtered);
        }

        this.calendar_filter_element_theme = new CalendarFilter(GameThemes,calendar_filter_theme);
        this.calendar_filter_element_mechanic =  new CalendarFilter(GameMechanics, calendar_filter_mechanic);
        this.calendar_filter_element_complexity =  new CalendarFilter(GameComplexities, calendar_filter_complexity);

        calendar_filter_button.addEventListener("click",() =>{
            this.Refresh();
        })
    }

    Refresh(){
        calendar_element.removeChild(this.calendar_div);

        let theme_filters = this.calendar_filter_element_theme.FetchFilterValue(calendar_filter_theme);

        this.Display(theme_filters);
    }
}

class CalendarFilter{
    constructor(filters, filter_element){
        this.Display(filters, filter_element);
    }

    Display(filters, filter_element){
        for (const key in filters) {
            let option = document.createElement("option");
            
            option.setAttribute("value", filters[key]);
            option.innerHTML = filters[key];

            filter_element.appendChild(option);
        }
    }

    FetchFilterValue(filter_element){
        let values = [];

        let options = filter_element.children

        for (let i = 0; i < options.length; i++) {
            if(options[i].selected){
                values.push(options[i].value);
            }
        }

        return values;
    }
}

class CalendarDay{
    constructor(game_events){
        this.game_events = game_events;

        return this.Display();
    }

    Display(){
        let event_day_container = document.createElement("div");

        event_day_container.className = "CalendarDayContainer";

        for (let i = 0; i < 24; i++) {
            let event_day_label_hour = document.createElement("div")

            event_day_label_hour.className = "CalendarHour";
            event_day_label_hour.setAttribute("style", `grid-column: 1; grid-row: ${i * 2 + 1}`);

            event_day_label_hour.innerHTML = i + "H";

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

        return event_day_container;
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

        let bg_color = "background-color: white";
        
        switch(this.game_event.GetTheme()){
            case(GameThemes.FANTASY): {
                bg_color = `background-color: hsl(${300}, 100%, 80%)`;
                break;
            }
            case(GameThemes.RACING): {
                bg_color = `background-color: hsl(${0}, 100%, 80%)`;
                break;
            }
            case(GameThemes.SCIFI): {
                bg_color = `background-color: hsl(${180}, 100%, 80%)`;
                break;
            }
            case(GameThemes.WARGAME): {
                bg_color = `background-color: hsl(${110}, 100%, 80%)`;
                break;
            }
        };

        event_box.className = "CalendarEventBox";
        event_box.setAttribute("style",`grid-row: ${pos_top * 2} / ${pos_bottom *  2}; grid-column: ${this.position + 1}; ${bg_color}`);

        event_box.appendChild(document.createTextNode(this.game_event.GetTitle()));

        event_box.addEventListener("click", () => {
            pop_up_event_manager.Display(this.game_event);
            
        });

        this.container.appendChild(event_box);
    }
}

new Calendar(GameEventDatabase.GetEvents());

export default {};