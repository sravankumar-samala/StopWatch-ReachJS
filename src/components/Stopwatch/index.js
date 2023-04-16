// Write your code here
import {Component} from 'react'
import './index.css'

export default class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    seconds: 0,
    interval: null,
  }

  componentWillUnmount = () => {
    this.reset()
  }

  startTimer = () => {
    const {isTimerRunning} = this.state

    if (!isTimerRunning) {
      const intervalId = setInterval(() => {
        this.setState(prevState => ({seconds: prevState.seconds + 1}))
      }, 1000)

      this.setState({
        isTimerRunning: true,
        interval: intervalId,
      })
    }
  }

  stopTimer = () => {
    const {interval} = this.state
    clearInterval(interval)
    this.setState({
      isTimerRunning: false,
      interval: null,
    })
  }

  reset = () => {
    const {interval} = this.state
    clearInterval(interval)
    this.setState({
      isTimerRunning: false,
      seconds: 0,
      interval: null,
    })
  }

  format = num => num.toString().padStart(2, '0')

  render() {
    const {isTimerRunning, seconds} = this.state
    console.log(isTimerRunning)
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds - hours * 3600) / 60)
    const secs = seconds % 60

    return (
      <div className="container">
        <div className="app-container">
          <div className="stop-watch-container">
            <h1>Stopwatch</h1>
            <div className="timer-container">
              <div className="timer-heading">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                  alt="stopwatch"
                />
                <p>Timer</p>
              </div>
              <h1 className="timer">
                {seconds >= 3600 && `${this.format(hours)}:`}
                {this.format(minutes)}:{this.format(secs)}
              </h1>
              <div className="timer-buttons">
                <button
                  type="button"
                  className="btn-start"
                  onClick={this.startTimer}
                >
                  Start
                </button>
                <button
                  type="button"
                  className="btn-stop"
                  onClick={this.stopTimer}
                >
                  Stop
                </button>
                <button
                  type="button"
                  className="btn-reset"
                  onClick={this.reset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
