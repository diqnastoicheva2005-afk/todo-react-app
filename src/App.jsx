import { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedUser, setSelectedUser] = useState('all');
  const [sortOrder, setSortOrder] = useState('asc');
  const [completedSort, setCompletedSort] = useState('newest');
  const [visibleCount, setVisibleCount] = useState(10);
  const [showModal, setShowModal] = useState(false);

  const userNames = {
    1: 'Ivan Ivanov',
    2: 'Maria Petrova',
    3: 'Georgi Georgiev',
    4: 'Petya Dimitrova',
    5: 'Nikolay Nikolov',
  };

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) =>
        setTodos(
          data.map((todo) => ({
            ...todo,
            completedAt: null,
            completedBy: null,
          }))
        )
      );
  }, []);

  const completeTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: true,
              completedAt: new Date(),
              completedBy:
                selectedUser === 'all'
                  ? 'Unknown User'
                  : userNames[selectedUser],
            }
          : todo
      )
    );
  };

  const uncompleteTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: false,
              completedAt: null,
              completedBy: null,
            }
          : todo
      )
    );
  };

  const goToCV = () => {
    window.location.href = '/CV_Diyana_Stoycheva.pdf';
  };

  const uncompletedTodos = todos
    .filter(
      (todo) =>
        !todo.completed &&
        (selectedUser === 'all' || todo.userId === Number(selectedUser))
    )
    .sort((a, b) =>
      sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    )
    .slice(0, visibleCount);

  const completedTodos = todos
    .filter(
      (todo) =>
        todo.completed &&
        (selectedUser === 'all' || todo.userId === Number(selectedUser))
    )
    .sort((a, b) =>
      completedSort === 'newest'
        ? new Date(b.completedAt) - new Date(a.completedAt)
        : new Date(a.completedAt) - new Date(b.completedAt)
    );

  return (
    <div
      style={{
        backgroundColor: '#9078AD',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      {/* HEADER 1 */}
      <div
        style={{
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>
          My Todo Project
        </h1>

        <div style={{ marginTop: '10px' }}>
          <span>If you are interested in me, you can find my CV here:</span>

          <img
            src="/cv_snimka.png"
            alt="CV"
            onClick={() => setShowModal(true)}
            style={{ width: '40px', marginLeft: '10px', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* HEADER 2 */}
      <div
        style={{
          backgroundColor: '#fff',
          padding: '15px',
          marginTop: '10px',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <span style={{ fontFamily: 'Times New Roman', fontStyle: 'italic' }}>
          Filtered by username:
        </span>

        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          style={{ marginLeft: '10px' }}
        >
          <option value="all">All Users</option>
          <option value="1">Ivan Ivanov</option>
          <option value="2">Maria Petrova</option>
          <option value="3">Georgi Georgiev</option>
          <option value="4">Petya Dimitrova</option>
          <option value="5">Nikolay Nikolov</option>
        </select>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
            }}
          >
            <p>Сигурен ли си че искаш да отидеш там?</p>

            <button onClick={goToCV} style={{ margin: '10px' }}>
              Да
            </button>

            <button onClick={goToCV} style={{ margin: '10px' }}>
              Да, определено
            </button>
          </div>
        </div>
      )}

      {/* MAIN */}
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* LEFT */}
        <div
          style={{
            width: '50%',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '12px',
          }}
        >
          <h2>Uncompleted Todos</h2>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">A → Z</option>
            <option value="desc">Z → A</option>
          </select>

          <ul style={{ padding: 0 }}>
            {uncompletedTodos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  listStyle: 'none',
                  background: '#f3f3f3',
                  marginTop: '10px',
                  padding: '10px',
                  borderRadius: '8px',
                }}
              >
                <div>{todo.title}</div>

                <button
                  onClick={() => completeTodo(todo.id)}
                  style={{
                    marginTop: '5px',
                    background: 'green',
                    color: 'white',
                  }}
                >
                  Complete Task
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT */}
        <div
          style={{
            width: '50%',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '12px',
          }}
        >
          <h2>Completed Todos</h2>

          <select
            value={completedSort}
            onChange={(e) => setCompletedSort(e.target.value)}
          >
            <option value="newest">Delete(Newest)</option>
            <option value="oldest">Delete (Oldest)</option>
          </select>

          <ul style={{ padding: 0 }}>
            {completedTodos.map((todo) => (
              <li
                key={todo.id}
                style={{
                  listStyle: 'none',
                  background: '#f3f3f3',
                  marginTop: '10px',
                  padding: '10px',
                  borderRadius: '8px',
                }}
              >
                <div>{todo.title}</div>

                <div style={{ fontSize: '12px' }}>
                  Completed by: {todo.completedBy || 'Unknown'} <br />
                  {todo.completedAt &&
                    new Date(todo.completedAt).toLocaleString()}
                </div>

                <button
                  onClick={() => uncompleteTodo(todo.id)}
                  style={{
                    marginTop: '5px',
                    background: 'red',
                    color: 'white',
                  }}
                >
                  Return to Active Tasks
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
