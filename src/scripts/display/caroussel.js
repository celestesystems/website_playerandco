import { GameEvent } from "../game_events/game_event.js";

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
        event_element.appendChild(this.DisplayEventContent(this.game_event));

        script_parent.appendChild(event_element);
    }
    
    DisplayEventContent(){
        //create the event box
        let box = document.createElement("div");
        box.className = "EventBox"
    
        box.appendChild(this.DisplayTitle(this.game_event));
        box.appendChild(this.DisplayImage(this.game_event));
        box.appendChild(this.DisplayInfo(this.game_event));
    
        return box;
    }

    DisplayTitle(){
        let box_title = document.createElement("div");
        box_title.className = "EventTitle";
    
        let box_title_header = document.createElement("h2");
        box_title.appendChild(box_title_header);
    
        let header_text = document.createTextNode(this.game_event.GetTitle());
        box_title_header.appendChild(header_text);
    
        return box_title;
    }
    
    DisplayImage(){
        let box_image = document.createElement("div");
        box_image.className = "EventImage";
    
        return box_image;
    }
    
    DisplayInfo(){
        let box_info = document.createElement("div");
        box_info.className = "EventInfo";
    
        let box_info_content = document.createElement("div");
        box_info_content.className = "EventInfoContent"
        box_info.appendChild(box_info_content);
    
        let box_info_paragraph = document.createElement("p");
        box_info_content.appendChild(box_info_paragraph);
    
        let box_info_content_text = document.createTextNode(this.game_event.GetDescription());
        box_info_paragraph.appendChild(box_info_content_text);
    
        let box_info_join_div = document.createElement("div");
        box_info_join_div.className = "Flex FlexDirectionCol FlexAlignCenter";
        box_info.appendChild(box_info_join_div);
    
        let box_info_join = document.createElement("a")
        box_info_join.className = "ButtonJoinEvent";
        box_info_join_div.appendChild(box_info_join);
    
        let box_info_join_text = document.createTextNode("Join!");
        box_info_join.appendChild(box_info_join_text);
    
        return box_info;
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

    constructor(amount, style_sheet){
        this.DisplayCarroussel(amount, 0);

        this.style_sheet = style_sheet;
    }

    GetSelectors(){
        return this.selectors;
    }

    DisplayCarroussel(amount){
        for(let i = 0; i < amount; i++){
            let game_event =  new GameEvent("Test " + i, "Hello World");

            let content = new CarousselContent(i, game_event);

            content.Display();

            let selector = new CarrousselSelector(i, this);

            selector.DisplayEventSelector();
        
            this.selectors.push(selector);
        }
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

function getStyleSheet(unique_title) {
    for (const sheet of document.styleSheets) {
        if (sheet.title === unique_title) {
            return sheet;
        }
    }
}

new Carroussel(6, getStyleSheet("main_style"));

export default {};