import { GameEvent, GameEventDatabase, GameThemes, GameMechanics, GameComplexities } from "../../model/game_events/game_event.js";
import PopUpEventManager from "../pop_up_event/pop_up_event.js";

const list_element = document.getElementById("ListContainer");

const list_filter_theme = document.getElementById("ListFilterTheme");
const list_filter_mechanic = document.getElementById("ListFilterMechanic");
const list_filter_complexity = document.getElementById("ListFilterComplexity");

const list_filter_button = document.getElementById("ListFilterRefreshButton");

class EventList{
    list_elements;

    list_filter_element_theme;
    list_filter_element_mechanic;
    list_filter_element_complexity;

    constructor(game_events){
        this.game_events = game_events;

        this.DisplayFilters();
        this.Display();
    }

    DisplayFilters(){
        this.list_filter_element_theme = new ListFilter(GameThemes,list_filter_theme);
        this.list_filter_element_mechanic =  new ListFilter(GameMechanics, list_filter_mechanic);
        this.list_filter_element_complexity =  new ListFilter(GameComplexities, list_filter_complexity);

        list_filter_button.addEventListener("click",() =>{
            this.Refresh();
        })
    }

    Display(){
        this.list_elements = [];

        if(this.list_filter_element_theme.GetValues().length == 0 && this.list_filter_element_mechanic.GetValues().length == 0 && this.list_filter_element_complexity.GetValues().length == 0){
            this.game_events.forEach(game_event => {
                let list_row = new ListRow(game_event);
                
                this.list_elements.push(list_row);

                list_element.appendChild(list_row);
            });
        }
        else{
            let game_events_filtered = [];

            for(let i = 0; i < this.game_events.length; i++){               
                if((this.list_filter_element_theme.GetValues().length == 0 || this.list_filter_element_theme.GetValues().includes(this.game_events[i].GetTheme())) && (this.list_filter_element_complexity.GetValues().length == 0 || this.list_filter_element_complexity.GetValues().includes(this.game_events[i].GetComplexity()))){
                    let mechanic_match = false;

                    if(this.list_filter_element_mechanic.GetValues().length == 0){
                        mechanic_match = true;
                    }
                    else{
                        this.game_events[i].GetMechanics().forEach(mechanic => {
                            if(this.list_filter_element_mechanic.GetValues().includes(mechanic)){
                                mechanic_match = true;
                            }
                        });
                    }

                    if(mechanic_match){
                        game_events_filtered.push(this.game_events[i]);
                    }
                }
            }

            game_events_filtered.forEach(game_event => {
                let list_row = new ListRow(game_event);
                
                this.list_elements.push(list_row);

                list_element.appendChild(list_row);
            });
        }
    }    

    Refresh(){
        this.list_elements.forEach(list_element_ => {  
            list_element.removeChild(list_element_);
        });

        this.list_filter_element_theme.FetchFilterValue(list_filter_theme);
        this.list_filter_element_mechanic.FetchFilterValue(list_filter_mechanic);
        this.list_filter_element_complexity.FetchFilterValue(list_filter_complexity);

        this.Display();
    }
}

class ListFilter{
    filter_values = [];

    constructor(filters, filter_element){
        this.filters = filters;

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
        this.filter_values = [];

        let options = filter_element.children

        for (let i = 0; i < options.length; i++) {
            if(options[i].selected){
                if(options[i].index == 0){
                    this.filter_values = [];

                    return;
                }

                this.filter_values.push(options[i].value);
            }
        }
    }

    GetFilters(){
        return this.filters;
    }

    GetValues(){
        return this.filter_values;
    }
}

class ListRow{
    constructor(game_event){
        return this.Display(game_event);
    }

    Display(game_event){
        let table_row = document.createElement("tr");

        table_row.appendChild(this.DisplayTitle(game_event));
        table_row.appendChild(this.DisplayTheme(game_event));
        table_row.appendChild(this.DisplayMechanics(game_event));
        table_row.appendChild(this.DisplayComplexity(game_event));
        table_row.appendChild(this.DisplayDateBegin(game_event));
        table_row.appendChild(this.DisplayDateEnd(game_event));

        table_row.addEventListener("click", () =>{
            PopUpEventManager.Display(game_event);
        });

        table_row.addEventListener("mouseenter", () =>{
            table_row.style.backgroundColor = "#ddddff";
        });

        table_row.addEventListener("mouseleave", () =>{
            table_row.style.backgroundColor = "white";
        });

        return table_row;
    }

    DisplayTitle(game_event){
        let title = document.createElement("th");
        title.innerHTML = game_event.GetTitle();

        return title;
    }

    DisplayTheme(game_event){
        let theme = document.createElement("td");
        theme.innerHTML = game_event.GetTheme();

        return theme;
    }

    DisplayMechanics(game_event){
        let mechanics = document.createElement("td");

        game_event.GetMechanics().forEach(mechanic => {
            mechanics.innerHTML += mechanic + ". ";
        });

        return mechanics;
    }

    DisplayComplexity(game_event){
        let complixity = document.createElement("td");
        complixity.innerHTML = game_event.GetComplexity();

        return complixity;
    }

    DisplayDateBegin(game_event){
        let date_begin = document.createElement("td");
        date_begin.innerHTML = game_event.GetDateBegin().toLocaleString();

        return date_begin;
    }

    DisplayDateEnd(game_event){
        let date_end = document.createElement("td");
        date_end.innerHTML = game_event.GetDateEnd().toLocaleString();

        return date_end;
    }
}


/*
Not used anymore - deemed not appropriated as display

class Calendar{
    calendar_elements;

    calendar_div;

    calendar_filter_element_theme;
    calendar_filter_element_mechanic;
    calendar_filter_element_complexity;

    constructor(game_events){
        this.game_events = game_events;

        this.DisplayFilters();
        this.Display();
    }

    DisplayFilters(){
        this.calendar_filter_element_theme = new CalendarFilter(GameThemes,calendar_filter_theme);
        this.calendar_filter_element_mechanic =  new CalendarFilter(GameMechanics, calendar_filter_mechanic);
        this.calendar_filter_element_complexity =  new CalendarFilter(GameComplexities, calendar_filter_complexity);

        calendar_filter_button.addEventListener("click",() =>{
            this.Refresh();
        })
    }

    Display(){
        if(this.calendar_filter_element_theme.GetValues().length == 0 && this.calendar_filter_element_mechanic.GetValues().length == 0 && this.calendar_filter_element_complexity.GetValues().length == 0){
            this.calendar_div = new CalendarDay(this.game_events);
        }
        else{
            let game_events_filtered = [];

            for(let i = 0; i < this.game_events.length; i++){               
                if((this.calendar_filter_element_theme.GetValues().length == 0 || this.calendar_filter_element_theme.GetValues().includes(this.game_events[i].GetTheme())) && (this.calendar_filter_element_complexity.GetValues().length == 0 || this.calendar_filter_element_complexity.GetValues().includes(this.game_events[i].GetComplexity()))){
                    let mechanic_match = false;

                    if(this.calendar_filter_element_mechanic.GetValues().length == 0){
                        mechanic_match = true;
                    }
                    else{
                        this.game_events[i].GetMechanics().forEach(mechanic => {
                            if(this.calendar_filter_element_mechanic.GetValues().includes(mechanic)){
                                mechanic_match = true;
                            }
                        });
                    }

                    if(mechanic_match){
                        game_events_filtered.push(this.game_events[i]);
                    }
                }
            }

            this.calendar_div = new CalendarDay(game_events_filtered);
        }
    }

    Refresh(){
        calendar_element.removeChild(this.calendar_div)

        this.calendar_filter_element_theme.FetchFilterValue(calendar_filter_theme);
        this.calendar_filter_element_mechanic.FetchFilterValue(calendar_filter_mechanic);
        this.calendar_filter_element_complexity.FetchFilterValue(calendar_filter_complexity);

        this.Display();
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
            case(GameThemes.ABSTRACT): {
                bg_color = `background-color: hsl(${325}, 100%, 80%)`;
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
}*/

new EventList(GameEventDatabase.GetEvents());

export default {};