import {RESTART, MAKE_GUESS, GENERATE_AURAL_UPDATE} from '../actions';

const initialState = {
    guesses: [],
    feedback: 'Make your guess!',
    auralStatus: '',
    correctAnswer: Math.floor(Math.random() * 100) + 1
};

export const hotColdReducer = (state = initialState, action) => {
    if (action.type === RESTART) {
        return Object.assign({}, state, {
            guesses: [],
            feedback: 'Make your guess!',
            auralStatus: '',
            correctAnswer: Math.floor(Math.random() * 100) + 1    
        });
    }

    else if (action.type === MAKE_GUESS) {       
        guess = parseInt(guess, 10);
        if (isNaN(guess)) {
            return Object.assign({}, state, {
                feedback: 'Please enter a valid number',
                guesses: [...state.guesses, guess]
            });
        }

        const difference = Math.abs(guess - state.correctAnswer);

        let feedback;
        if (difference >= 50) {
        feedback = 'You\'re Ice Cold...';
        } else if (difference >= 30) {
        feedback = 'You\'re Cold...';
        } else if (difference >= 10) {
        feedback = 'You\'re Warm.';
        } else if (difference >= 1) {
        feedback = 'You\'re Hot!';
        } else {
        feedback = 'You got it!';
        }

        return Object.assign({}, state, {
            feedback: feedback, 
            guesses: [...state.guesses, guess]
        });
    }
    
    else if (action.type === GENERATE_AURAL_UPDATE) {

        // If there's not exactly 1 guess, we want to
        // pluralize the nouns in this aural update.
        const pluralize = state.guesses.length !== 1;

        let  auralStatus = `Here's the status of the game right now: ${state.feedback} You've made ${state.guesses.length} ${pluralize ? 'guesses' : 'guess'}.`;

        if (state.guesses.length > 0) {
        auralStatus += ` ${pluralize ? 'In order of most- to least-recent, they are' : 'It was'}: ${state.guesses.reverse().join(', ')}`;
        }

        return Object.assign({}, state, {
            auralStatus: auralStatus    
        });
    }
    return state;
};