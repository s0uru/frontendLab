export default function AppReducer(state, action) {
    switch(action.type) {
        case "check":
            return state.map(person => 
                person.id === action.id 
                    ? { ...person, isChecked: !person.isChecked }
                    : person
            );
        
        case "rate":
            return state.map(person => 
                person.id === action.id 
                    ? { ...person, rating: person.rating >= 10 ? 0 : (person.rating || 0) + 1 }
                    : person
            );
        
        case "delete":
            return state.filter(person => person.id !== action.id);
        
        default:
            return state;
    }
}
