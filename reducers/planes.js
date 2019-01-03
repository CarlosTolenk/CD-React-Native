function planes(state = {}, action) {
    
    switch (action.type) {

        case 'SET_PLANES_LIST': {
            return { ...state, ...action.payload }          
        }

        case 'SET_LIKED_PLAN': {
            return { ...state, ...action.payload }       
        }

        case 'SET_EVENTOS_LIST': {
            return { ...state, ...action.payload }       
        }

        case 'SET_LOTERIA_LIST': {
            return { ...state, ...action.payload }       
        }

        case 'SET_ANUNCIOS_LIST': {
            return { ...state, ...action.payload }  
        }

        case 'SET_ALERTA_LIST': {
            return { ...state, ...action.payload }  
        }

        case 'SET_NUMBER_DIAMANTE' : {
            return {...state, ...action.payload}
        }      
        
        case 'SET_LINEA_DIRECTA' : {
            return {...state, ...action.payload}
        } 
        case 'SET_LINEA_DIRECTA_OLD' : {
            return {...state, ...action.payload}
        } 

        case 'SET_LINEA_DIRECTA_UPDATE' : {
            return {...state, ...action.payload}
        } 

        case 'SET_TIMMER_START' : {
            return {...state, ...action.payload}
        } 
        case 'SET_TIMMER_END' : {
            return {...state, ...action.payload}
        } 

        


        default:
            return state

    }
}

export default planes;