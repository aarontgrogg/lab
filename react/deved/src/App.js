import Logo from './Logo';
import Tweets from './Tweets';
import './App.css';

function App() {
  const twitterHandle = 'aarontgrogg';
  const twitterLink = `https://twitter.com/${twitterHandle}`;

  return (
    <div className="app">
      <header className="app-header">
        <Logo />
        <p className="app-handle">
          by <a
            href={twitterLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            @{twitterHandle}
          </a>
        </p>
      </header>
      <main>
        <Tweets />
      </main>
    </div>
  );
}

export default App;
