import {createStore} from 'redux'
import axios from 'axios'
const initState = []; 
const update=async(id,obj)=>{
  try {
    const res=await axios.put("https://6540a53a45bedb25bfc23dad.mockapi.io/ontap/"+id,obj)
    if(res.data){
    alert("OK")
    }
  } catch (error) {
    console.log(error);
  }
}
const reducer=(state=initState,action)=>{
    switch(action.type){
        case 'save':
            return action.payload;
            case 'post':
              console.log(action.payload);
                    state.vietnamese.push({id:state.vietnamese.length+1,content:action.payload.textVN})
                    state.english.push({id:state.english.length+1,content:action.payload.textEL})
                    console.log(action.payload.ID);
                    update(action.payload.ID,state)
                    console.log("state in redux",state);
                    return {...state,vietnamese:[...state.vietnamese],english:[...state.english]};
                case 'delete':
                  state.vietnamese=state.vietnamese.filter((a)=>a.id != action.payload.vnId)
                  state.english=state.english.filter((a)=>a.id != action.payload.eId)
                  update(action.payload.ID,state)
                return {...state};
                case 'update':
                  if(action.payload.textVN.length>0){
                  state.vietnamese.forEach(a => {
                    if(a.id==action.payload.vnId){
                      a.content=action.payload.textVN
                    }
                  });
                }
                  else{
                  state.english.forEach(a => {
                    if(a.id==action.payload.eId){
                      a.content=action.payload.textEL
                    }
                  });
                }
                update(action.payload.ID,state)
                  return {...state} 
        default:
            return state;
    }
}
const store =createStore(reducer)
export default store