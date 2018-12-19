//import actions 
import {} from '../actions/index'

const initialState = [
    {
      id:12340,
      workout: 'tuesday',
      dateCreated: Date.now(),
      dateModified: '',
      exercises: [{
        id:1234,
        exercise: 'Pushup',
        resistance: 'self',
        resistUnit: 'other',
        reps: 12,
        sets: 2,
        notes: 'something'
      },{
        id:1235,
        exercise: 'chest press',
        resistance: '120',
        resistUnit: 'lb',
        reps: 8,
        sets: 2,
        notes: 'something'
      }]
    },{
      id: 12350,
      dateCreated: Date.now(),
      dateModified: '11-18-2018',
      workout: 'mondays',
      exercises: [{
        id:1236,
        exercise: 'squat',
        resistance: '600',
        resistUnit: 'lb',
        reps: 10,
        sets: 2,
        notes: 'something'
      },{
        id: 1237,
        exercise: 'deadlift',
        resistance: '450',
        resistUnit: 'lb',
        reps: 8,
        sets: 2,
        notes: 'something'
      }]
    }
  ];

const workoutReducer = (state = initialState, action) => {
  switch(action.type){
    case ACTION: //some action
      return; //do something with action
      
    default:
      return state;
  }
}

export default workoutReducer;