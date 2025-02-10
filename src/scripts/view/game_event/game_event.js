import { GameBanners, GameEvent } from "../../model/game_events/game_event.js";

class GameEventBox{
    static DisplayEventContent(game_event){
        //create the event box
        let box = document.createElement("div");
        box.className = "EventBox"
    
        box.appendChild(this.DisplayImage(game_event));
        box.appendChild(this.DisplayInfo(game_event));
    
        return box;
    }

    static DisplayTitle(game_event){
        let box_title = document.createElement("div");
        box_title.className = "EventTitle";

        let box_title_header = document.createElement("h2");
        box_title.appendChild(box_title_header);

        box_title_header.innerHTML = game_event.GetTitle();

        return box_title;
    }

    static DisplayImage(game_event){
        let box_image = document.createElement("div");
        box_image.className = "EventImage";

        box_image.style.backgroundImage = this.GetUrlFromBanner(game_event.GetGameBanner());

        box_image.appendChild(this.DisplayTitle(game_event));

        return box_image;
    }

    static DisplayInfo(game_event){
        let box_info = document.createElement("div");
        box_info.className = "EventInfo";

        let box_info_content = document.createElement("div");
        box_info_content.className = "EventInfoContent"
        box_info.appendChild(box_info_content);

        let box_desc_p = document.createElement("p");
        box_info_content.appendChild(box_desc_p);
        box_desc_p.innerHTML = game_event.GetDescription();

        box_info_content.appendChild(document.createElement("br"));

        let box_theme_p = document.createElement("p");
        box_info_content.appendChild(box_theme_p);
        box_theme_p.innerHTML = game_event.GetTheme();

        box_info_content.appendChild(document.createElement("br"));

        let box_date_begin_p = document.createElement("p");
        box_info_content.appendChild(box_date_begin_p);
        let event_date_begin = game_event.GetDateBegin();
        box_date_begin_p.innerHTML = "Start of Event: " +event_date_begin.toLocaleString();

        let box_date_end_p = document.createElement("p");
        box_info_content.appendChild(box_date_end_p);
        let event_date_end = game_event.GetDateEnd();
        box_date_end_p.innerHTML = "End of Event: " +event_date_end.toLocaleString();

        let box_info_join_div = document.createElement("div");
        box_info_join_div.className = "Flex FlexDirectionCol FlexAlignCenter";
        box_info.appendChild(box_info_join_div);

        let box_info_join = document.createElement("a")
        box_info_join.className = "ButtonJoinEvent";
        box_info_join.setAttribute("href", "");
        box_info_join_div.appendChild(box_info_join);

        let box_info_join_text = document.createTextNode("Join!");
        box_info_join.appendChild(box_info_join_text);

        return box_info;
    }

    static GetUrlFromBanner(banner){
        let url;

        switch(banner){
            case(GameBanners.WARGAME1):{
                url = "url(../../assets/Banners/Event/EventBanner_Wargame_01.png";
                break;
            }
            case(GameBanners.RACING1):{
                url = "url(../../assets/Banners/Event/EventBanner_Racing_01.png)";
                break;
            }
            default:{
                url  = "url(../../assets/PlaceHolders/PlaceHolder_Event_BG.jpg)";
            }
        }

        return url;
    }
}

export default GameEventBox;