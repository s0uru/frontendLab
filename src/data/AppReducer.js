export default function AppReducer(state, action) {
    switch(action.type) {
        case "add":
            // Generowanie nowego ID (max + 1)
            const newId = state.length > 0 ? Math.max(...state.map(p => p.id)) + 1 : 1;
            return [...state, { ...action.person, id: newId }];
        
        case "edit":
            return state.map(person => 
                person.id === action.person.id 
                    ? { ...person, ...action.person }
                    : person
            );
        
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