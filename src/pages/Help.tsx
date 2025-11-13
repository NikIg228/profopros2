import Accordion from '../components/Accordion';

const faqItems = [
  {
    q: 'Как начать тест?',
    a: 'Нажмите «Начать тестирование» на главной, заполните форму и подтвердите согласие. После этого вы перейдёте к вопросам.',
  },
  {
    q: 'Сколько времени займёт прохождение?',
    a: 'Базовый тест длится около 5–7 минут, расширенный — до 12 минут. Premium-версия включает дополнительные рекомендации.',
  },
  {
    q: 'Как получить результаты?',
    a: 'Результаты показываются сразу после завершения, а также могут быть отправлены на указанный email.',
  },
  {
    q: 'Возникли технические проблемы?',
    a: 'Перезагрузите страницу и попробуйте снова. Если проблема не решилась — напишите нам, указав устройство и браузер.',
  },
];

export default function HelpPage() {
  return (
    <div className="container-balanced mt-10 sm:mt-16 mb-20 flex flex-col gap-12">
      <section className="fade-section">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Помощь</h1>
        <p className="mt-4 text-muted text-lg max-w-2xl">
          Найдите ответы на популярные вопросы или свяжитесь с поддержкой — мы поможем разобраться с любыми сложностями.
        </p>
      </section>

      <section className="fade-section">
        <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
        <Accordion items={faqItems} />
      </section>

      <section className="fade-section">
        <div className="card p-6 md:p-8 border border-secondary/40">
          <h2 className="text-2xl font-semibold">Нужна помощь?</h2>
          <p className="mt-3 text-muted max-w-xl">
            Напишите нам на email, и команда поддержки ответит в течение одного рабочего дня. Подробно опишите вашу ситуацию и приложите скриншоты — так мы быстрее найдём решение.
          </p>
          <div className="inline-flex items-center gap-2 mt-5 px-5 py-3 rounded-xl bg-primary text-white font-medium">
            support@profilevelup.com
          </div>
        </div>
      </section>
    </div>
  );
}

