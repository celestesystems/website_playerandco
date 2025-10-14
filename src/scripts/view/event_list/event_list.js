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

new EventList(GameEventDatabase.GetEvents());

export default {};