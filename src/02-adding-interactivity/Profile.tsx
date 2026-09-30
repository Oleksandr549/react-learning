import { useState } from 'react';
import type { SubmitEvent, MouseEvent, ReactNode } from 'react';
import { sculptureList } from './data';

type ButtonProps = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
};

function Button({ onClick, children }: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
    >
      {children}
    </button>
  );
}

function Toolbar() {
  const [log, setLog] = useState('Nothing clicked yet');

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setLog('Form submitted without page reload');
  }

  return (
    <>
      <div className="toolbar" onClick={() => setLog('Clicked on the toolbar')}>
        <Button onClick={() => setLog('Playing!')}>Play Movie</Button>
        <Button onClick={() => setLog('Uploading!')}>Upload Image</Button>
      </div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Type something" />
        <button>Send</button>
      </form>
      <p>{log}</p>
    </>
  );
}

function Gallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const hasNext = index < sculptureList.length - 1;
  const hasPrev = index > 0;
  const sculpture = sculptureList[index];

  function handleNextClick() {
    setIndex(hasNext ? index + 1 : 0);
  }

  function handlePrevClick() {
    setIndex(hasPrev ? index - 1 : sculptureList.length - 1);
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  return (
    <div className="gallery">
      <button onClick={handlePrevClick}>Previous</button>
      <button onClick={handleNextClick}>Next</button>
      <h3>
        <i>{sculpture.name}</i> by {sculpture.artist}
      </h3>
      <p>
        ({index + 1} of {sculptureList.length})
      </p>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img src={sculpture.url} alt={sculpture.alt} />
    </div>
  );
}

function RenderAndCommit() {
  const [renders, setRenders] = useState(1);

  return (
    <>
      <p>Renders: {renders}</p>
      <input placeholder="This text stays after re-render" />
      <button onClick={() => setRenders(renders + 1)}>Re-render</button>
    </>
  );
}

function Snapshot() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h3>{number}</h3>
      <button
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +3 (but really +1)
      </button>
      <button
        onClick={() => {
          setNumber(number + 5);
          setTimeout(() => alert('Number in this render: ' + number), 1000);
        }}
      >
        +5 and alert
      </button>
    </>
  );
}

function Queue() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h3>{number}</h3>
      <button
        onClick={() => {
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
        }}
      >
        +3
      </button>
      <button
        onClick={() => {
          setNumber(number + 5);
          setNumber((n) => n + 1);
        }}
      >
        +5 then +1
      </button>
      <button onClick={() => setNumber(0)}>Reset</button>
    </>
  );
}

function ObjectForm() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
    },
  });

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={(e) => setPerson({ ...person, name: e.target.value })}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={(e) =>
            setPerson({
              ...person,
              artwork: { ...person.artwork, title: e.target.value },
            })
          }
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={(e) =>
            setPerson({
              ...person,
              artwork: { ...person.artwork, city: e.target.value },
            })
          }
        />
      </label>
      <p>
        <i>{person.artwork.title}</i> by {person.name}, located in{' '}
        {person.artwork.city}
      </p>
    </>
  );
}

type Artist = {
  id: number;
  name: string;
  seen: boolean;
};

const initialArtists: Artist[] = [
  { id: 0, name: 'Marta Colvin Andrade', seen: false },
  { id: 1, name: 'Lamidi Olonade Fakeye', seen: true },
  { id: 2, name: 'Louise Nevelson', seen: false },
];

function ArtistList() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState(initialArtists);
  const [nextId, setNextId] = useState(initialArtists.length);

  function handleAdd() {
    if (!name.trim()) return;
    setArtists([...artists, { id: nextId, name, seen: false }]);
    setNextId(nextId + 1);
    setName('');
  }

  function handleDelete(id: number) {
    setArtists(artists.filter((a) => a.id !== id));
  }

  function handleToggle(id: number) {
    setArtists(artists.map((a) => (a.id === id ? { ...a, seen: !a.seen } : a)));
  }

  function handleReverse() {
    setArtists([...artists].reverse());
  }

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleReverse}>Reverse</button>
      <ul>
        {artists.map((a) => (
          <li key={a.id}>
            <label>
              <input
                type="checkbox"
                checked={a.seen}
                onChange={() => handleToggle(a.id)}
              />
              {a.name}
            </label>{' '}
            <button onClick={() => handleDelete(a.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Profile() {
  return (
    <main className="lesson">
      <h1 className="title">Adding Interactivity</h1>

      <h2>1. Responding to Events</h2>
      <Toolbar />

      <h2>2. State: A Component's Memory</h2>
      <Gallery />

      <h2>3. Render and Commit</h2>
      <RenderAndCommit />

      <h2>4. State as a Snapshot</h2>
      <Snapshot />

      <h2>5. Queueing a Series of State Updates</h2>
      <Queue />

      <h2>6. Updating Objects in State</h2>
      <ObjectForm />

      <h2>7. Updating Arrays in State</h2>
      <ArtistList />
    </main>
  );
}
