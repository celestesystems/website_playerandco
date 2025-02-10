import { GameEvent, GameEventDatabase, GameThemes } from "../../model/game_events/game_event.js"
import GameEventBox from "../game_event/game_event.js";

const script_parent = document.getElementById("CarrousselEvent")
const selection_element = document.getElementById("CarrousselSelectorContainer");

class CarousselContent{
    constructor(position, game_event){
        this.position = position;

        this.game_event = game_event;
    }

    Display(){
        this.DisplayEventElement();
    }

    DisplayEventElement(){
        let event_element = document.createElement("div");
        event_element.className = "EventElement";
        event_element.style.backgroundImage = GameEventBox.GetUrlFromBanner(this.game_event.GetGameBanner());
        event_element.appendChild(GameEventBox.DisplayEventContent(this.game_event));

        script_parent.appendChild(event_element);
    }
}

class CarrousselSelector{
    constructor(position, carroussel){
        this.position = position;

        this.carroussel = carroussel;

        this.event_selector;
    }
    
    Select(){
        console.log("Event " + this.position + " has been selected");

        this.carroussel.ShiftEvents(this.position);

        this.event_selector.className = "EventSelector EventSelected";
    }

    Unselect(){
        this.event_selector.className = "EventSelector";
    }   

    DisplayEventSelector(){
        this.event_selector = document.createElement("div");

        this.event_selector.className = "EventSelector";
        selection_element.appendChild(this.event_selector);

        this.event_selector.addEventListener("click", () =>
            {
                this.carroussel.UnselectSelectors();
                this.Select();
            }
        )
    }
}

class Carroussel{
    selectors = [];

    constructor(game_events){
        this.game_events = game_events;

        this.DisplayCarroussel();
    }

    GetSelectors(){
        return this.selectors;
    }

    DisplayCarroussel(){
        let i = 0;

        this.game_events.forEach(game_event => {
            let content = new CarousselContent(i, game_event);

            content.Display();

            let selector = new CarrousselSelector(i++, this);

            selector.DisplayEventSelector();
        
            this.selectors.push(selector);
        });
    }

    ShiftEvents(position){
        script_parent.scroll({top: 0, left: document.body.style.getPropertyValue("100vw") * (position - 1), behavior: "smooth"});
    }

    UnselectSelectors(){
        this.selectors.forEach(selector => {
            selector.Unselect();
        });
    }
}

new Carroussel(GameEventDatabase.GetEvents());

export default {};