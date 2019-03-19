import React from 'react';

import Header from './header';
import GuessSection from './guess-section';
import StatusSection from './status-section';
import InfoSection from './info-section';

import {connect} from 'react-redux';

export class Game extends React.Component {

  restartGame() {
    this.props.dispatch(restartGame());
  }

  makeGuess(guess) {
    this.props.dispatch(makeGuess(guess));
  }

  generateAuralUpdate() {
    this.props.dispatch(generateAuralUpdate())
  }

  render() {
    return (
      <div>
        <Header
          onRestartGame={() => this.restartGame()}
          onGenerateAuralUpdate={() => this.generateAuralUpdate()}
        />
        <main role="main">
          <GuessSection
            feedback={this.props.feedback}
            guessCount={this.props.guesses.length}
            onMakeGuess={guess => this.makeGuess(guess)}
          />
          <StatusSection guesses={this.props.guesses} 
            auralStatus={this.props.auralStatus}
          />
          <InfoSection />
        </main>
      </div>
    );
  }
}

Game.defaultProps = {
  guesses: [],
  feedback: 'Make your guess!',
  auralStatus: '',
  correctAnswer: Math.floor(Math.random() * 100) + 1  
}

export const mapStateToProps = state => ({
  guesses: state.guesses,
  feedback: state.feedback,
  auralStatus: state.auralStatus,
  correctAnswer: state.correctAnswer
});

export default connect(mapStateToProps)(Game);
