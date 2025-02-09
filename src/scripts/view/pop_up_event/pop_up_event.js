import { GameEvent } from "../../model/game_events/game_event.js";
import GameEventBox from "../game_event/game_event.js";

const pop_up_div = document.getElementById("PopUpDiv");

class pop_up_event_manager{
    static pop_up_container;

    static Flush(){
        if(this.pop_up_container != null){
            this.pop_up_container.remove();
        }
    }

    static Display(game_event){
        this.Flush();

        this.pop_up_container = GameEventBox.DisplayEventContent(game_event);

        pop_up_div.setAttribute("style", "display: block;");

        pop_up_div.addEventListener("click", (evt) => {
            if(evt.target == pop_up_div){
                pop_up_div.setAttribute("style", "display: none;");
            }
        });

        pop_up_div.appendChild(this.pop_up_container);
    }
}

export default pop_up_event_manager;