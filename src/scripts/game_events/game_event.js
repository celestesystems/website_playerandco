class GameEvent{
    constructor(title, description){
        this.title = title;
        this.description = description;
    }

    GetTitle(){
        return this.title;
    }
    
    GetDescription(){
        return this.description;
    }
}

export {GameEvent};