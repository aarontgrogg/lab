import React from "react";


class Tweet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            items: props.items
        }
    }
    render() {
        const items = this.state.items;
        const result = items.map((item, key) => {
            return (
                <li key={key} data-id={key}>{item.text}</li>
            );
        })
        return (
            <ul>{result}</ul>
        )
    }
}

export default Tweet;