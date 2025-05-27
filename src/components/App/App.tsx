/**
 * Хук useQuery

const myQuery = useQuery({
  queryKey: ['myQueryKey'], // ключ запиту
  queryFn: myQueryFunction   // функція запиту
});

queryKey – унікальний ключ запиту,
queryFn – асинхронна функція, що виконує запит до API або іншого джерела даних. Ця функція повинна повертати проміс із даними. Вона автоматично викликається для запиту.

Хук useQuery повертає об’єкт з корисною інформацією про запит:

const { data, error, isLoading, isError, isSuccess } = useQuery({
  queryKey: ['myQueryKey'], 
  queryFn: myQueryFunction  
});
data – дані, які були успішно отримані в результаті запиту.
error – якщо запит завершився помилкою, ця властивість містить інформацію про помилку.
isLoading – якщо запит ще виконується, значення буде true.
isError – якщо запит не вдалося виконати (наприклад, через мережеві помилки), значення буде true.
isSuccess – якщо запит успішно виконався і дані отримано, значення буде true.


Хук useQuery призначений тільки для виконання GET-запитів, тобто отримання даних з API, 
 */
//...........................................................................
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const fetchPerson = async () => {
//   const response = await axios.get(`https://swapi.info/api/people/13`);
//   return response.data;
// };

// export default function App() {
//   const { data, error, isLoading, isError } = useQuery({
//     queryKey: ['person'],
//     queryFn: fetchPerson,
//   });

//   return (
//     <>
//       {isLoading && <p>Loading...</p>}
//       {isError && <p>An error occurred: {error.message}</p>}
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </>
//   );
// }
//.............................................................................
/**
 * ------------------------Ключі запиту-----------------------------------------//
В основі React Query лежить управління кешуванням запитів, яке здійснюється на основі ключів запитів. Якщо ключ запиту змінюється, React Query розуміє, що це новий запит, і виконує його знову. Це дуже корисно, коли ви хочете, щоб запит повторювався, наприклад, при зміні значення в інтерфейсі.

Зміна ключа запиту зазвичай використовується, коли потрібно виконати новий запит після зміни стану або пропсів у компоненті.

Розглянемо приклад, коли ви хочете отримати нові дані при зміні значення лічильника. Наприклад, при кожному кліку на кнопку лічильник збільшується, і ви робите запит на сервер для отримання нового персонажа з API (Star Wars API).
 */
//......................................................................
// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const fetchPerson = async (id: number) => {
//   const response = await axios.get(`https://swapi.info/api/people/${id}`);
//   return response.data;
// };

// export default function App() {
//   const [count, setCount] = useState(1);

//   const { data, error, isLoading, isError } = useQuery({
//     queryKey: ['person', count], // змінюємо ключ запиту залежно від count
//     queryFn: () => fetchPerson(count),
//   });

//   return (
//     <>
//       <button onClick={() => setCount(count + 1)}>
//         Get next character with ID: {count}
//       </button>
//       {isLoading && <p>Loading...</p>}
//       {isError && <p>Error: {error?.message}</p>}
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </>
//   );
// }
//.......................................................................................
/**
 * queryKey: ['person', count] – унікальний ключ для запиту, який містить масив. Важливо, що ми додаємо змінну count до цього ключа. Коли count змінюється, React Query буде вважати це новим запитом і автоматично виконає його знову.
queryFn: () => fetchPerson(count) – функція запиту, яка приймає count як параметр. Це дозволяє кожного разу запитувати нові дані для персонажа залежно від значення лічильника.

🧠 Кожного разу, коли змінюється count, зміна ключа запиту гарантує, що запит буде повторно виконаний з новими даними. Цей запит виконується при монтуванні компонента і після кожного оновлення стану count.
 */
//==================================================================//
/**
 * -------------------Залежні запити------------------------------//
 * 
Залежні запити (Dependent Queries) – це запити, які залежать від результату інших запитів або стану компонента. В React Query ви можете використовувати властивість enabled для відкладеного виконання useQuery.

Якщо хук useQuery не містить властивості enabled, запит виконується автоматично при монтуванні компонента. Ви можете використовувати enabled, щоб умовно активувати запит залежно від певних значень або подій. Наприклад, запит на отримання даних не буде виконуватись до того, як користувач введе дані в форму чи вибере параметри в інтерфейсі.

const myQuery = useQuery({
	queryKey: ['myKey'],
	queryFn: myQueryFn,
	enabled: false
});

enabled: true – запит виконується одразу або після зміни залежностей.
enabled: false – запит не виконується, навіть якщо компоненти монтуються чи залежності змінюються.

Уявіть, що у вас є форма, де користувач вводить ключ для пошуку. Запит на сервер має виконуватись тільки після того, як користувач натисне кнопку для підтвердження введених даних. Для цього ми можемо використати enabled.
 */
//...................................................................
// import { useState } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const fetchCharacter = async (id: string) => {
//   const response = await axios.get(`https://swapi.info/api/people/${id}`);
//   return response.data;
// };

// export default function App() {
//   const [characterId, setCharacterId] = useState('');

//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ['character', characterId],
//     queryFn: () => fetchCharacter(characterId),
//     enabled: characterId !== '',
//   });

//   const handleSearch = (formData: FormData) => {
//     const id = formData.get('id') as string;
//     setCharacterId(id);
//   };

//   return (
//     <>
//       <form action={handleSearch}>
//         <input type="text" name="id" placeholder="Enter character ID" />
//         <button type="submit">Search</button>
//       </form>
//       {isLoading && <p>Loading data, please wait...</p>}
//       {isError && <p>Whoops, something went wrong! {error?.message}</p>}
//       {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
//     </>
//   );
// }
//..................................................................
/**
 * Завдяки enabled: characterId !== "" – запит буде виконуватись тільки тоді, коли в поле пошуку введено значення. Якщо characterId порожнє, запит не буде виконуватись.

🧠 Властивість enabled корисна для відкладених GET-запитів, коли запит має виконуватись лише після того, як зміниться стан або користувач виконає певну дію (наприклад, введе дані в форму або вибере опцію).
 */
//==========================================================================//
import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import SearchForm from '../SearchForm/SearchForm';
import ArticleList from '../ArticleList/ArticleList';
import { fetchArticles } from '../sevices/ArticleServis';

export default function App() {
  const [topic, setTopic] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['articles', topic, currentPage],
    queryFn: () => fetchArticles(topic, currentPage),
    enabled: topic !== '',
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.nbPages ?? 0;

  const handleSearch = async (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      <p>
        Current page {currentPage} | Total pages {totalPages}
      </p>
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {data && data.hits.length > 0 && <ArticleList items={data.hits} />}
    </>
  );
}
