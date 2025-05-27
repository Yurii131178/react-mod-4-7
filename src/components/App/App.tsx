// export default function App() {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.currentTarget;

//     const formData = new FormData(form);
//     const username = formData.get('username');
//     console.log('Username:', username);

//     form.reset();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }

//////////////////////////////////////////

// export default function App() {
//   const handleSubmit = (formData: FormData) => {
//     const username = formData.get('username') as string;
//     console.log('Name:', username);
//   };

//   return (
//     <form action={handleSubmit}>
//       <input type="text" name="username" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
////////////////////////////////////////////

// import OrderForm from '../OrderForm/OrderForm';

// export default function App() {
//   const handleOrder = (data: string) => {
//     console.log('Order received from', data);
//     // можна зберегти замовлення, викликати API, показати повідомлення тощо
//   };

//   return (
//     <>
//       <h1>Place your order</h1>
//       <OrderForm onSubmit={handleOrder} />
//     </>
//   );
// }

/**
 У компоненті App ми використовуємо OrderForm і передаємо в неї пропс onSubmit, який є функцією для обробки замовлення. 
 
 * Що тут важливо:

OrderForm не знає, що буде з даними – вона просто викликає onSubmit(data)
Компонент форми не залежить від того, як саме обробляються дані – це зовнішня відповідальність.
Код стає чистішим: форма не має логіки, яку вона не повинна знати.
 */

//==========================================================//
// import axios from 'axios';
//==================================///
import SearchForm from '../SearchForm/SearchForm';
import { useState } from 'react';
import { Article } from '../../types/articles';
import ArticleList from '../ArticleList/ArticleList';
import Loader from '../Loader/Barloader';
// 1. Імпортуємо HTTP-функцію
import { fetchArticles } from '../sevices/articleService';

// interface ArticlesHttpResponse {
//   hits: Article[];
// }

export default function App() {
  // 1. Оголошуємо і типізуємо стан
  const [articles, setArticles] = useState<Article[]>([]);
  // 1. Додаємо стан індикатора завантаження
  const [isLoading, setIsloading] = useState(false);
  // 1. Оголошуємо стан для обробки помилок запиту
  const [isError, setIsError] = useState(false);

  const handleSearch = async (topic: string) => {
    try {
      setIsloading(true);
      setIsError(false);

      const data = await fetchArticles(topic);
      setArticles(data);
    } catch {
      setIsError(true);
    } finally {
      // 5. Встановлюємо стан isLoading в false
      // після будь якого результату запиту
      setIsloading(false);
    }
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </>
  );
}
//=================HOOK useId==================//

// import OrderForm1 from '../OrderForm1/order Form1';

// export default function App() {
//   return (
//     <div>
//       <h1>Welcome to our store!</h1>
//       <OrderForm1 />
//     </div>
//   );
// }

//==================================//

// -------------OrderFormRadio-rev.-FINAL--------------//

// import OrderFormRadio from '../OrderFormRadio/OrderFormRadio';

// export default function App() {
//   return (
//     <>
//       <OrderFormRadio />
//     </>
//   );
// }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

//==============PRACTICE==========================//

// export default function App() {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const form = event.currentTarget;

//     const formData = new FormData(form);

//     const values = Object.fromEntries(formData);
//     //.........................................................//
//     // ця штука створить для нас під капотом обєкт, в який ми записували властивості(fieldname) та їхні значення:

//     /****************************************************
//      * const values = {
//       username: formData.get('username'),
//       email: formData.get('email'),
//     };
//      ****************************************************/

//     // Object.fromEntries(formData) - створи об'єкт з набориу записів(наш набір)
//     // — це автоматичне створення об’єкта зі всіма полями форми. Тобто всі name="..."
//     //.........................................................//
//     console.log('handleSubmit', values);

//     form.reset();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="username" />
//       <input type="email" name="email" />
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
//.................................................................
// оптимізуємо ще!!! Бо це забагато коду...
//.....................................................................
// export default function App() { // ↓↓↓
// const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//   event.preventDefault();
//   const form = event.currentTarget;

//   const formData = new FormData(form);
//   const values = Object.fromEntries(formData);
//   console.log('handleSubmit', values);

//   form.reset();
// };

/**
 * Замість передачі onSubmit ми передамо в форму атрибут "action" і вставимо в нього наш колбек sction={handleSubmit}
                         ↓↓↓                   */
//...........................................................
//   const handleSubmit = (formData: FormData) => {
//     console.log('handleSubmit', formData);
//     const values = Object.fromEntries(formData);
//     console.log(values);
//   };

//   return (
//     <form action={handleSubmit}>
//       <input type="text" name="username" defaultValue="Mr. Хтось" />
//       <input type="email" name="email" />
//       <textarea name="textarea" rows={5}></textarea>
//       <button type="submit">Submit</button>
//     </form>
//   );
// }
//................................................................
// *ПЛЮСИ*
// + НЕ ПЕРЕЗАВАНТАЖУЄТЬСЯ СТОРІНКА (не треба робити preventDefault();)
// + НE ПОТРІБНО ЗбИРАТИ formData, томущо вона вже буде тут →
// const handleSubmit = (тут буде якийсь параметрб а його типлм буде formData))б тобто НЕ ТРЕБА БРАТИ З event. currentTarget, формувати: const formData = new FormData(form). Вона робить це за нас і передає, як аргумент (formDatsa: (тип FormData))
// + СКИДАЄ ФОРМУ

// НАША ЗАДАЧА ЗАБРАТИ values вже з готової form Data
