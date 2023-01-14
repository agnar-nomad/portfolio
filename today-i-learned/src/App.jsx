import { useState, useEffect } from 'react';
import supabase from './supabase';
import './styles.css';
import { CATEGORIES } from './data/data.js';
import logo from './assets/logo.png';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');

  useEffect(() => {
    async function getFacts() {
      setIsLoading(true);

      // set up database query
      let query = supabase.from('facts').select('*');

      if (currentCategory !== 'all') {
        query = query.eq('category', currentCategory);
      }
      // request and destructure data
      const { data: facts, error } = await query
        .order('votesInteresting', { ascending: false })
        .limit(100);
      console.log('SupaBase ERROR', error || 'no error');

      if (!error) setFacts(facts);
      else {
        alert('There was a problem getting data. Please refresh or try later.');
      }
      setIsLoading(false);
    }
    getFacts();
  }, [currentCategory]);
  // this useEffect will run on each change of the above state, i.e. when a user clicks a filter button

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <NewFactForm setFacts={setFacts} /> : null}

      <main>
        <CategoryFilter setCurrentCategory={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="loading-message">Loading....</p>;
}

function Header(props) {
  return (
    <header className="header">
      <div className="logo-group">
        <img className="logo" src={logo} alt="Today I learned custom logo" />
        <h1>Today I Learned</h1>
      </div>

      <button
        className="btn btn-large btn-open"
        onClick={() => props.setShowForm((prevState) => !prevState)}>
        {props.showForm ? 'Close' : 'Share a fact'}
      </button>
    </header>
  );
}

function NewFactForm({ setFacts }) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  // url validation for the source link (grabbed from stackoverflow)
  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log(text, source, category);

    // Check data validity
    if (text && isValidHttpUrl(source) && category && text.length <= 200) {
      console.log('Input is VALID.');

      // Upload fact to Supabase and update local dataset
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from('facts')
        .insert([{ text, source_link: source, category }])
        .select();
      setIsUploading(false);

      console.log('Return new fact:', newFact);

      // Add new fact to UI, add it to state
      if (!error) setFacts((prevState) => [newFact[0], ...prevState]);

      // Reset input fields
      setText('');
      setCategory('');
      setSource('');
    } else {
      console.log('INSERT ERROR:', error);
      alert('Invalid data. Please check your input and try again.');
      return;
    }
  };

  return (
    <form action="" className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="fact-text"
        id="fact-text"
        placeholder="Share a fact"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        disabled={isUploading}
      />
      <span className="char-count">{200 - textLength} char left</span>
      <input
        type="text"
        name="url-link"
        id="url-link"
        placeholder="Trusty source"
        value={source}
        onChange={(e) => {
          setSource(e.target.value);
        }}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        disabled={isUploading}>
        <option value="">Choose category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            onClick={() => {
              setCurrentCategory('all');
            }}
            className="btn btn-all-categories">
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              onClick={() => {
                setCurrentCategory(cat.name);
              }}
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}>
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
      <p class="copyright">
        &copy; Copyright by{' '}
        <a
          class="twitter-link"
          target="_blank"
          href="https://twitter.com/jonasschmedtman">
          <i>Jonas Schmedtmann</i>
        </a>
        . Permission granted to use for portfolio purposes.
      </p>
    </aside>
  );
}

function FactList(props) {
  if (props.facts.length === 0) {
    return (
      <p className="loading-message">
        No facts for this category yet. Create the first one! 🙌
      </p>
    );
  }

  return (
    <section>
      <ul className="facts-list">
        {props.facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={props.setFacts} />
        ))}
      </ul>
      <p>
        There are currently {props.facts.length} facts in this list. Add your
        own!
      </p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);

  // if more False votes then good ones, it will render differently
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    // send and update the corresponding column on the corresponding fact(row)
    const { data: updatedFact, error } = await supabase
      .from('facts')
      .update({ [columnName]: fact[columnName] + 1 })
      .eq('id', fact.id)
      .select();
    console.log(updatedFact);
    setIsUpdating(false);
    if (!error)
      setFacts((prevState) =>
        prevState.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? (
          <span className="disputed">[💥 DISPUTED Fact]</span>
        ) : null}
        {fact.text}
        <a className="source-link" href={fact.source_link} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}>
        {fact.category}
      </span>
      <div className="vote-button-group">
        <button
          onClick={() => handleVote('votesInteresting')}
          disabled={isUpdating}
          className="vote-button">
          🙌 <strong>{fact.votesInteresting}</strong>
        </button>
        <button
          onClick={() => handleVote('votesMindblowing')}
          disabled={isUpdating}
          className="vote-button">
          🤯 <strong>{fact.votesMindblowing}</strong>
        </button>
        <button
          onClick={() => handleVote('votesFalse')}
          disabled={isUpdating}
          className="vote-button">
          🔴 <strong>{fact.votesFalse}</strong>
        </button>
      </div>
    </li>
  );
}

export default App;
