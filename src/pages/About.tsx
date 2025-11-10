export default function AboutPage() {
  return (
    <section className="container-balanced mt-10">
      <div className="grid gap-8">
        <header className="grid gap-3">
          <h1 className="text-3xl font-semibold">О нас</h1>
          <p className="text-muted max-w-3xl">
            ProfiTest — это минималистичный и понятный сервис профориентации. Мы помогаем школьникам
            и студентам осознанно выбирать направление, опираясь на интересы, сильные стороны и
            предпочтительную среду работы. Наша цель — снизить тревогу выбора и дать практичные
            ориентиры для старта.
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <section className="card p-6">
            <h3 className="text-xl font-semibold">Информационный шум</h3>
            <p className="mt-2 text-muted">
              У молодёжи много источников — соцсети, блоги, советы знакомых. Сигнал тонет в шуме, а
              ожидания часто искажаются. Мы структурируем выбор: показываем сферы и роли, поясняем,
              какие задачи и навыки за ними стоят.
            </p>
          </section>

          <section className="card p-6">
            <h3 className="text-xl font-semibold">Страх ошибки</h3>
            <p className="mt-2 text-muted">
              Решение «на всю жизнь» пугает. На деле путь итеративный: можно пробовать и меняться.
              Тест помогает сделать первый шаг и получить безопасную отправную точку — без давления и
              категоричности.
            </p>
          </section>

          <section className="card p-6">
            <h3 className="text-xl font-semibold">Недостаток практики</h3>
            <p className="mt-2 text-muted">
              Курс или профессия выглядят абстрактно, пока не прояснены повседневные задачи. Мы
              объясняем, что именно делает специалист, какие инструменты нужны и как попробовать себя
              на практике через небольшие проекты.
            </p>
          </section>
        </div>

        <div className="card p-6">
          <h3 className="text-lg font-semibold">Наш подход</h3>
          <p className="mt-2 text-muted">
            Минимум лишнего, максимум пользы. Мы используем ясные формулировки и последовательную
            структуру вопросов, чтобы вы быстрее пришли к осмысленному выбору. Результаты лаконичны,
            а расширенный отчёт — практичен и ориентирован на действия.
          </p>
        </div>
      </div>
    </section>
  );
}


