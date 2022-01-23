import React from 'react';
import Tweet from './Tweet';

class Tweets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        //const url = 'https://stream.twitter.com/1.1/statuses/sample.json';
        const url = '/sample.json';
        fetch(url)
            .then((result) => result.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div className="alert alert-danger error">Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div className="alert alert-warning loading">Loading...</div>;
        } else {
            return (
                <Tweet items={items} />
            );
        }
    }
}

export default Tweets;