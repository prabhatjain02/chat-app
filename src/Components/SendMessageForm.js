import React from 'react'

class SendMessageForm extends React.Component{
    constructor() {
        super() 
        this.state={
            enteredMessage: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            enteredMessage: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.sendMessage(this.state.enteredMessage)
        this.setState({
            enteredMessage: ""
        })
    }

    render() {
        return(
            <form 
                className="send-message-form"
                onSubmit={this.handleSubmit}>
                <input
                    disabled= {this.props.disabled}
                    placeholder="Send Message Form"
                    type="text " 
                    onChange={this.handleChange}
                    value={this.state.enteredMessage}
                />
            </form>
        )
    }
}

export default SendMessageForm 
