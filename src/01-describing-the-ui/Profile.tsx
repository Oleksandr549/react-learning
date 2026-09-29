import type { ReactNode } from 'react';
import { people } from './data';
import { getImageUrl } from './utils';

function Scientist() {
  return (
    <img
      className="avatar"
      src={getImageUrl('MK3eW3A')}
      alt="Katherine Johnson"
      width={70}
      height={70}
    />
  );
}

function TodoList() {
  return (
    <>
      <h3>Hedy Lamarr's Todos</h3>
      <ul>
        <li>Invent new traffic lights</li>
        <li>Rehearse a movie scene</li>
        <li>Improve the spectrum technology</li>
      </ul>
    </>
  );
}

const person = {
  name: 'Gregorio Y. Zara',
  imageId: '7vQD0fP',
  theme: {
    backgroundColor: '#222',
    color: 'pink',
  },
};

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date);
}

function CurlyBraces() {
  return (
    <div style={person.theme}>
      <h3>{person.name}'s Todos</h3>
      <p>Today is {formatDate(new Date())}</p>
      <img
        className="avatar"
        src={getImageUrl(person.imageId)}
        alt={person.name}
        style={{ width: 60, height: 60 }}
      />
    </div>
  );
}

type AvatarProps = {
  name: string;
  imageId: string;
  size?: number;
};

function Avatar({ name, imageId, size = 100 }: AvatarProps) {
  return (
    <img
      className="avatar"
      src={getImageUrl(imageId)}
      alt={name}
      width={size}
      height={size}
    />
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="card">{children}</div>;
}

function PropsExample() {
  return (
    <Card>
      <Avatar name="Katsuko Saruhashi" imageId="YfeOqp2" size={100} />
      <Avatar name="Aklilu Lemma" imageId="OKS67lh" size={80} />
      <Avatar name="Lin Lanying" imageId="1bX5QH6" />
    </Card>
  );
}

function Item({ name, isPacked }: { name: string; isPacked: boolean }) {
  return (
    <li className="item">
      {name} {isPacked ? '✅' : '❌'}
    </li>
  );
}

function PackingList() {
  return (
    <section>
      <h3>Sally Ride's Packing List</h3>
      <ul>
        <Item isPacked={true} name="Space suit" />
        <Item isPacked={true} name="Helmet with a golden leaf" />
        <Item isPacked={false} name="Photo of Tam" />
      </ul>
    </section>
  );
}

function ScientistList() {
  const chemists = people.filter((p) => p.profession === 'chemist');

  const listItems = people.map((p) => (
    <li key={p.id}>
      <img src={getImageUrl(p.imageId)} alt={p.name} />
      <p>
        <b>{p.name}</b>
        <br />
        {p.profession}, known for {p.accomplishment}
      </p>
    </li>
  ));

  return (
    <article>
      <h3>Scientists</h3>
      <ul className="scientists">{listItems}</ul>
      <p>
        Chemists only: {chemists.map((c) => c.name).join(', ')}
      </p>
    </article>
  );
}

function Cup({ guest }: { guest: number }) {
  return <p>Tea cup for guest #{guest}</p>;
}

function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}

export default function Profile() {
  return (
    <main className="lesson">
      <h1 className="title">Describing the UI</h1>

      <h2>1. Your First Component</h2>
      <Scientist />

      <h2>3. Writing Markup with JSX</h2>
      <TodoList />

      <h2>4. JavaScript in JSX with Curly Braces</h2>
      <CurlyBraces />

      <h2>5. Passing Props to a Component</h2>
      <PropsExample />

      <h2>6. Conditional Rendering</h2>
      <PackingList />

      <h2>7. Rendering Lists</h2>
      <ScientistList />

      <h2>8. Keeping Components Pure</h2>
      <TeaSet />
    </main>
  );
}
